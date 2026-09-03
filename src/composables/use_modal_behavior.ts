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
 *
 * Слои складываются в общий стек (см. `openLayers`): клавиатуру обслуживает
 * только верхний слой, а прокрутка страницы разблокируется, лишь когда стек
 * опустел. Без этого вложенное окно и окно под ним боролись бы за фокус,
 * а закрытие вложенного снимало бы блокировку с ещё открытой страницы.
 */

/** Класс на body: пока открыт хотя бы один слой, страница не прокручивается. */
const SCROLL_LOCK_CLASS = 'avanti-scroll-locked'

/** Кандидаты на фокус внутри слоя; реально отбираются по tabIndex >= 0. */
const FOCUSABLE_SELECTOR = 'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])'

/**
 * Стек открытых слоёв, общий на всё приложение: последний элемент — верхний
 * слой, тот, что нарисован поверх остальных. Обработчик клавиатуры висит
 * у каждого слоя, но срабатывает только у верхнего.
 */
const openLayers: symbol[] = []

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

/** Прокрутка страницы заблокирована, пока в стеке есть хотя бы один слой. */
function syncScrollLock(): void {
  document.body.classList.toggle(SCROLL_LOCK_CLASS, openLayers.length > 0)
}

/** Слой открылся: встаёт на вершину стека и забирает себе клавиатуру. */
function pushLayer(layer: symbol): void {
  if (!openLayers.includes(layer)) {
    openLayers.push(layer)
    syncScrollLock()
  }
}

/**
 * Слой закрылся или размонтирован. Снимаем его из любого места стека:
 * компонент может уйти из дерева и не с вершины.
 */
function removeLayer(layer: symbol): void {
  const index = openLayers.indexOf(layer)
  if (index !== -1) {
    openLayers.splice(index, 1)
    syncScrollLock()
  }
}

/** Клавиатуру обслуживает только верхний слой стека. */
function isTopLayer(layer: symbol): boolean {
  return openLayers[openLayers.length - 1] === layer
}

/**
 * Возвращает ссылку, которую компонент вешает на корневой элемент слоя:
 * по ней считаются фокусируемые элементы и уводится фокус при открытии.
 */
export function useModalBehavior(options: AvantiModalBehaviorOptions): Ref<HTMLElement | null> {
  const windowRef = ref<HTMLElement | null>(null)

  /** Метка этого слоя в общем стеке. */
  const layer = Symbol('avanti-modal-layer')

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
    if (!options.isOpen() || !isTopLayer(layer)) {
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
      if (!open) {
        removeLayer(layer)
        if (options.restoreFocus !== false) {
          opener?.focus()
        }
        opener = null
        return
      }
      opener = document.activeElement instanceof HTMLElement ? document.activeElement : null
      pushLayer(layer)
      void nextTick(focusInside)
    },
    { immediate: true },
  )

  onMounted(() => {
    window.addEventListener('keydown', handleKeydown)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('keydown', handleKeydown)
    removeLayer(layer)
  })

  return windowRef
}
