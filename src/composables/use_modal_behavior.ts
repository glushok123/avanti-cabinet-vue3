import { nextTick, onBeforeUnmount, onMounted, ref, watch, type Ref } from 'vue'

/**
 * Поведение модального слоя, не зависящее от его оформления:
 * блокировка прокрутки страницы, ловушка фокуса, возврат фокуса
 * инициатору и закрытие по Escape.
 *
 * Одна реализация на все модальные слои проекта: центрированное окно
 * `avanti_modal.vue`, выезжающая панель чата `avanti_chat_dialog.vue`
 * и мобильное меню `avanti_mobile_menu.vue`. Различия между ними
 * описаны параметрами `initialFocus` и `restoreFocus`.
 */

/** Класс на body: пока слой открыт, страница под ним не прокручивается. */
const SCROLL_LOCK_CLASS = 'avanti-scroll-locked'

/** Кандидаты на фокус внутри слоя; реально отбираются по tabIndex >= 0. */
const FOCUSABLE_SELECTOR = 'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])'

/**
 * Куда уходит фокус при открытии:
 * `container` — на сам контейнер (окно объявляет себя целиком),
 * `first` — на первый фокусируемый элемент (панели: кнопка закрытия).
 */
export type AvantiModalInitialFocus = 'container' | 'first'

/** Что слой сообщает о себе композиции. */
export interface AvantiModalBehaviorOptions {
  /** Слой открыт прямо сейчас. */
  isOpen: () => boolean
  /** Escape закрывает слой. */
  closeOnEscape: () => boolean
  /** Вызывается, когда пользователь нажал Escape при разрешённом закрытии. */
  onEscape: () => void
  /** Куда уводить фокус при открытии. По умолчанию — на контейнер. */
  initialFocus?: AvantiModalInitialFocus
  /** Возвращать ли фокус инициатору при закрытии. По умолчанию — да. */
  restoreFocus?: boolean
}

/**
 * Возвращает ссылку, которую компонент вешает на корневой элемент слоя:
 * по ней считаются фокусируемые элементы и уводится фокус при открытии.
 */
export function useModalBehavior(options: AvantiModalBehaviorOptions): Ref<HTMLElement | null> {
  const windowRef = ref<HTMLElement | null>(null)

  /** Элемент, с которого слой открыли: на него возвращается фокус при закрытии. */
  let opener: HTMLElement | null = null

  /** Фокусируемые элементы внутри слоя в порядке обхода Tab. */
  function focusableElements(): HTMLElement[] {
    const box = windowRef.value
    const found = box?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR) ?? []
    return Array.from(found).filter((el) => el.tabIndex >= 0 && !el.hasAttribute('disabled'))
  }

  /** Ловушка фокуса: Tab и Shift+Tab ходят по кругу внутри слоя. */
  function trapFocus(event: KeyboardEvent): void {
    const box = windowRef.value
    const elements = focusableElements()
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

  /** Уводит фокус внутрь слоя так, как просит компонент. */
  function focusInside(): void {
    if (options.initialFocus === 'first') {
      focusableElements()[0]?.focus()
      return
    }
    windowRef.value?.focus()
  }

  /* Открытие уводит фокус в слой и запоминает инициатора, закрытие его возвращает. */
  watch(
    options.isOpen,
    (open) => {
      toggleScrollLock(open)
      if (!open) {
        if (options.restoreFocus !== false) {
          opener?.focus()
        }
        opener = null
        return
      }
      opener = document.activeElement instanceof HTMLElement ? document.activeElement : null
      void nextTick(focusInside)
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
