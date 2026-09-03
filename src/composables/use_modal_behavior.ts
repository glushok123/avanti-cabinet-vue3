import { nextTick, onBeforeUnmount, onMounted, ref, watch, type Ref } from 'vue'

/**
 * Поведение модального окна, не зависящее от его оформления:
 * блокировка прокрутки страницы, ловушка фокуса, возврат фокуса
 * инициатору и закрытие по Escape.
 *
 * Вынесено из `avanti_modal.vue`, чтобы сам компонент отвечал только
 * за разметку и оставался с запасом до лимита в 300 строк.
 */

/** Класс на body: пока окно открыто, страница под ним не прокручивается. */
const SCROLL_LOCK_CLASS = 'avanti-scroll-locked'

/** Кандидаты на фокус внутри окна; реально отбираются по tabIndex >= 0. */
const FOCUSABLE_SELECTOR = 'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])'

/** Что окно сообщает о себе композиции. */
export interface AvantiModalBehaviorOptions {
  /** Окно открыто прямо сейчас. */
  isOpen: () => boolean
  /** Escape закрывает окно. */
  closeOnEscape: () => boolean
  /** Вызывается, когда пользователь нажал Escape при разрешённом закрытии. */
  onEscape: () => void
}

/**
 * Возвращает ссылку, которую компонент вешает на корневой элемент окна:
 * по ней считаются фокусируемые элементы и уводится фокус при открытии.
 */
export function useModalBehavior(options: AvantiModalBehaviorOptions): Ref<HTMLElement | null> {
  const windowRef = ref<HTMLElement | null>(null)

  /** Элемент, с которого окно открыли: на него возвращается фокус при закрытии. */
  let opener: HTMLElement | null = null

  /** Ловушка фокуса: Tab и Shift+Tab ходят по кругу внутри окна. */
  function trapFocus(event: KeyboardEvent): void {
    const box = windowRef.value
    const found = box?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR) ?? []
    const elements = Array.from(found).filter((el) => el.tabIndex >= 0 && !el.hasAttribute('disabled'))
    if (elements.length === 0) {
      event.preventDefault()
      box?.focus()
      return
    }
    const first = elements[0]
    const last = elements[elements.length - 1]
    const active = document.activeElement
    const inside = box !== null && box.contains(active) && active !== box
    if (event.shiftKey && (!inside || active === first)) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && (!inside || active === last)) {
      event.preventDefault()
      first.focus()
    }
  }

  function handleKeydown(event: KeyboardEvent): void {
    if (!options.isOpen()) {
      return
    }
    if (event.key === 'Escape' && options.closeOnEscape()) {
      options.onEscape()
      return
    }
    if (event.key === 'Tab') {
      trapFocus(event)
    }
  }

  function toggleScrollLock(locked: boolean): void {
    document.body.classList.toggle(SCROLL_LOCK_CLASS, locked)
  }

  /* Открытие уводит фокус в окно и запоминает инициатора, закрытие его возвращает. */
  watch(
    options.isOpen,
    (open) => {
      toggleScrollLock(open)
      if (!open) {
        opener?.focus()
        opener = null
        return
      }
      opener = document.activeElement instanceof HTMLElement ? document.activeElement : null
      void nextTick(() => windowRef.value?.focus())
    },
    { immediate: true },
  )

  onMounted(() => {
    window.addEventListener('keydown', handleKeydown)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('keydown', handleKeydown)
    toggleScrollLock(false)
  })

  return windowRef
}
