import { computed, onBeforeUnmount, onMounted, ref, shallowRef, watch, type ComputedRef, type Ref } from 'vue'

/**
 * Рисование подписи на <canvas>: буфер под плотность экрана, штрихи
 * указателем и подпись, набранная с клавиатуры.
 *
 * Вынесено из `avanti_signature_pad.vue`, чтобы компонент отвечал только
 * за разметку и оставался в пределах лимита в 300 строк.
 *
 * Цвет и начертание линии читаются из вычисленных стилей холста, поэтому
 * «сырых» цветов здесь нет: всё оформление остаётся в SCSS.
 */

/** Точка штриха в CSS-пикселях относительно левого верхнего угла холста. */
interface AvantiSignaturePoint {
  x: number
  y: number
}

/** Толщина росчерка в CSS-пикселях. */
const LINE_WIDTH = 2.5

/** Что композиция отдаёт компоненту поля подписи. */
export interface AvantiSignatureCanvas {
  /** Область поля: по ней измеряются размеры холста. */
  surfaceRef: Ref<HTMLElement | null>
  canvasRef: Ref<HTMLCanvasElement | null>
  /** Размеры растрового буфера — это атрибуты width/height, а не стили. */
  bitmapWidth: ComputedRef<number>
  bitmapHeight: ComputedRef<number>
  /** Ни росчерков, ни введённого имени. */
  isEmpty: ComputedRef<boolean>
  handlePointerDown: (event: PointerEvent) => void
  handlePointerMove: (event: PointerEvent) => void
  handlePointerUp: (event: PointerEvent) => void
  /** Стирает нарисованное. Введённое имя очищает владелец — это его состояние. */
  clear: () => void
  toDataUrl: (type?: string, quality?: number) => string
}

export function useSignatureCanvas(typedName: () => string): AvantiSignatureCanvas {
  const surfaceRef = ref<HTMLElement | null>(null)
  const canvasRef = ref<HTMLCanvasElement | null>(null)

  /** Размер поля в CSS-пикселях и плотность экрана — из них считается буфер. */
  const cssWidth = ref<number>(0)
  const cssHeight = ref<number>(0)
  const pixelRatio = ref<number>(1)

  /** Завершённые и текущий штрихи. Хранятся, чтобы пережить смену размера. */
  const strokes = shallowRef<AvantiSignaturePoint[][]>([])

  /** Ссылка на штрих, который рисуется прямо сейчас. */
  let activeStroke: AvantiSignaturePoint[] | null = null

  let observer: ResizeObserver | null = null

  const bitmapWidth = computed<number>(() => Math.max(1, Math.round(cssWidth.value * pixelRatio.value)))
  const bitmapHeight = computed<number>(() => Math.max(1, Math.round(cssHeight.value * pixelRatio.value)))

  const isEmpty = computed<boolean>(() => strokes.value.length === 0 && typedName().trim().length === 0)

  /** Рисует один штрих: середины отрезков сглаживают ломаную в кривую. */
  function drawStroke(ctx: CanvasRenderingContext2D, points: AvantiSignaturePoint[]): void {
    if (points.length === 1) {
      ctx.beginPath()
      ctx.arc(points[0].x, points[0].y, ctx.lineWidth / 2, 0, Math.PI * 2)
      ctx.fill()
      return
    }
    ctx.beginPath()
    ctx.moveTo(points[0].x, points[0].y)
    for (let index = 1; index < points.length - 1; index += 1) {
      const middleX = (points[index].x + points[index + 1].x) / 2
      const middleY = (points[index].y + points[index + 1].y) / 2
      ctx.quadraticCurveTo(points[index].x, points[index].y, middleX, middleY)
    }
    const last = points[points.length - 1]
    ctx.lineTo(last.x, last.y)
    ctx.stroke()
  }

  /** Рисует введённое имя по центру поля — подпись, поставленная с клавиатуры. */
  function drawTypedName(ctx: CanvasRenderingContext2D, style: CSSStyleDeclaration): void {
    const name = typedName().trim()
    if (name.length === 0) {
      return
    }
    ctx.font = `${style.fontStyle} ${style.fontWeight} ${style.fontSize} ${style.fontFamily}`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(name, cssWidth.value / 2, cssHeight.value / 2, cssWidth.value - 24)
  }

  /** Полностью перерисовывает буфер: сначала имя, затем росчерки поверх него. */
  function redraw(): void {
    const canvas = canvasRef.value
    const ctx = canvas?.getContext('2d') ?? null
    if (!canvas || !ctx) {
      return
    }
    const style = window.getComputedStyle(canvas)
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.scale(pixelRatio.value, pixelRatio.value)
    ctx.fillStyle = style.color
    ctx.strokeStyle = style.color
    ctx.lineWidth = LINE_WIDTH
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    drawTypedName(ctx, style)
    for (const points of strokes.value) {
      drawStroke(ctx, points)
    }
  }

  /** Пересчитывает размер поля: буфер обязан совпадать с ним по плотности. */
  function measure(): void {
    const surface = surfaceRef.value
    if (!surface) {
      return
    }
    cssWidth.value = surface.clientWidth
    cssHeight.value = surface.clientHeight
    pixelRatio.value = window.devicePixelRatio > 0 ? window.devicePixelRatio : 1
  }

  function pointFrom(event: PointerEvent): AvantiSignaturePoint {
    const rect = canvasRef.value?.getBoundingClientRect()
    if (!rect) {
      return { x: 0, y: 0 }
    }
    return { x: event.clientX - rect.left, y: event.clientY - rect.top }
  }

  function handlePointerDown(event: PointerEvent): void {
    const canvas = canvasRef.value
    if (!canvas || event.button > 0) {
      return
    }
    canvas.setPointerCapture(event.pointerId)
    activeStroke = [pointFrom(event)]
    strokes.value = [...strokes.value, activeStroke]
    redraw()
  }

  function handlePointerMove(event: PointerEvent): void {
    if (!activeStroke) {
      return
    }
    activeStroke.push(pointFrom(event))
    redraw()
  }

  function handlePointerUp(event: PointerEvent): void {
    if (!activeStroke) {
      return
    }
    activeStroke = null
    const canvas = canvasRef.value
    if (canvas?.hasPointerCapture(event.pointerId)) {
      canvas.releasePointerCapture(event.pointerId)
    }
  }

  function clear(): void {
    activeStroke = null
    strokes.value = []
    redraw()
  }

  function toDataUrl(type?: string, quality?: number): string {
    return canvasRef.value?.toDataURL(type, quality) ?? ''
  }

  /* Смена размеров буфера сбрасывает содержимое холста — рисуем заново после
     того, как Vue обновит атрибуты width/height, отсюда flush: 'post'. */
  watch([bitmapWidth, bitmapHeight, typedName], redraw, { flush: 'post' })

  onMounted(() => {
    measure()
    redraw()
    observer = new ResizeObserver(measure)
    if (surfaceRef.value) {
      observer.observe(surfaceRef.value)
    }
  })

  onBeforeUnmount(() => {
    observer?.disconnect()
    observer = null
  })

  return {
    surfaceRef,
    canvasRef,
    bitmapWidth,
    bitmapHeight,
    isEmpty,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    clear,
    toDataUrl,
  }
}
