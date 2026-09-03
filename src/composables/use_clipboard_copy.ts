import { computed, onBeforeUnmount, readonly, ref, type ComputedRef, type DeepReadonly, type Ref } from 'vue'

/**
 * Копирование значения в системный буфер обмена.
 *
 * Одна реализация на все места, где в макете есть кнопка копирования:
 * строка реквизита в карточке комиссии и поле «подпись — значение с копией».
 * Композиция держит состояние последней попытки и сама возвращает его
 * в исходное через `resetDelay`, чтобы компонент отвечал только за разметку.
 */

/** Результат последней попытки копирования. */
export type AvantiCopyStatus = 'idle' | 'copied' | 'failed'

/** Сколько по умолчанию держится отметка «скопировано», мс. */
const DEFAULT_RESET_DELAY = 2000

/** Что композиция отдаёт компоненту. */
export interface AvantiClipboardCopy {
  /** Состояние последней попытки: по нему подменяются иконка и сообщение. */
  status: DeepReadonly<Ref<AvantiCopyStatus>>
  /** Держится ли отметка «скопировано». */
  isCopied: ComputedRef<boolean>
  /** Кладёт текст в буфер; возвращает `true`, если это удалось. */
  copy: (text: string) => Promise<boolean>
}

export function useClipboardCopy(resetDelay: number = DEFAULT_RESET_DELAY): AvantiClipboardCopy {
  const status = ref<AvantiCopyStatus>('idle')

  let resetTimer: ReturnType<typeof setTimeout> | undefined

  const isCopied = computed<boolean>(() => status.value === 'copied')

  /** Возвращает состояние в исходное через resetDelay. */
  function scheduleReset(): void {
    clearTimeout(resetTimer)
    resetTimer = setTimeout(() => {
      status.value = 'idle'
    }, resetDelay)
  }

  async function copy(text: string): Promise<boolean> {
    let copied = false
    try {
      await navigator.clipboard.writeText(text)
      copied = true
      status.value = 'copied'
    } catch {
      /* Буфер недоступен: страница без защищённого соединения или отказ пользователя. */
      status.value = 'failed'
    }
    scheduleReset()
    return copied
  }

  onBeforeUnmount(() => {
    clearTimeout(resetTimer)
  })

  return { status: readonly(status), isCopied, copy }
}
