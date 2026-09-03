<!--
  Модальная оболочка панели чата.
  Мобильная: панель занимает весь экран (в макете это отдельный экран 390×844).
  Десктоп: выезжает справа поверх затемнения — рядом с кнопкой «Assistenza»
  в шапке кабинета, при этом страница под ней остаётся видимой.
  Закрывается по Escape и по клику вне панели, пока открыта — держит фокус
  внутри себя и блокирует прокрутку страницы.
-->
<template>
  <Teleport to="body">
    <Transition name="avanti-chat-dialog">
      <div v-if="open" class="avanti-chat-dialog">
        <div class="avanti-chat-dialog__backdrop" @click="handleClose" />
        <div
          ref="panelRef"
          class="avanti-chat-dialog__panel"
          role="dialog"
          aria-modal="true"
          :aria-label="label"
        >
          <slot />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'

const props = defineProps<{
  /** Панель открыта. */
  open: boolean
  /** Доступное имя диалога. */
  label: string
}>()

const emit = defineEmits<{ close: [] }>()

/** Класс на body: пока диалог открыт, страница под ним не прокручивается. */
const SCROLL_LOCK_CLASS = 'avanti-chat-scroll-locked'

/** Элементы, на которые может встать фокус внутри панели. */
const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

const panelRef = ref<HTMLElement | null>(null)

function handleClose(): void {
  emit('close')
}

function focusableElements(): HTMLElement[] {
  if (!panelRef.value) {
    return []
  }

  return Array.from(panelRef.value.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR))
}

/** Ловушка фокуса: Tab и Shift+Tab ходят по кругу внутри панели. */
function trapFocus(event: KeyboardEvent): void {
  const elements = focusableElements()
  if (elements.length === 0) {
    return
  }

  const first = elements[0]
  const last = elements[elements.length - 1]
  const active = document.activeElement
  const outside = panelRef.value === null || !panelRef.value.contains(active)

  if (event.shiftKey && (outside || active === first)) {
    event.preventDefault()
    last.focus()
    return
  }

  if (!event.shiftKey && (outside || active === last)) {
    event.preventDefault()
    first.focus()
  }
}

function handleKeydown(event: KeyboardEvent): void {
  if (!props.open) {
    return
  }

  if (event.key === 'Escape') {
    handleClose()
    return
  }

  if (event.key === 'Tab') {
    trapFocus(event)
  }
}

function toggleScrollLock(locked: boolean): void {
  document.body.classList.toggle(SCROLL_LOCK_CLASS, locked)
}

/* Открытие переводит фокус внутрь панели; возврат фокуса — забота вызывающей кнопки. */
watch(
  () => props.open,
  (open) => {
    toggleScrollLock(open)

    if (open) {
      void nextTick(() => {
        focusableElements()[0]?.focus()
      })
    }
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
</script>

<style lang="scss" scoped>
$dialog-layer: 110;
$panel-width: 420px;

.avanti-chat-dialog {
  position: fixed;
  inset: 0;
  z-index: $dialog-layer;
  display: flex;
  justify-content: flex-end;

  &__backdrop {
    position: absolute;
    inset: 0;
    cursor: pointer;
    background-color: var(--avanti-color-overlay);
  }

  &__panel {
    position: relative;
    display: flex;
    flex-direction: column;
    width: min(100%, #{$panel-width});
    height: 100%;
    overflow: hidden;
    background-color: var(--avanti-color-page);
    box-shadow: var(--avanti-shadow-drawer);
  }

  /* Мобильная: панель — отдельный экран, затемнения под ней нет. */
  @include mobile {
    &__backdrop {
      display: none;
    }

    &__panel {
      width: 100%;
      box-shadow: none;
    }
  }
}

/* --- Анимация: панель выезжает справа, затемнение проявляется --- */
.avanti-chat-dialog-enter-active,
.avanti-chat-dialog-leave-active {
  .avanti-chat-dialog__backdrop {
    transition: opacity var(--avanti-transition-base);
  }

  .avanti-chat-dialog__panel {
    transition: transform var(--avanti-transition-base);
  }
}

.avanti-chat-dialog-enter-from,
.avanti-chat-dialog-leave-to {
  .avanti-chat-dialog__backdrop {
    opacity: 0;
  }

  .avanti-chat-dialog__panel {
    transform: translateX(100%);
  }
}
</style>

<style lang="scss">
/* Глобальный класс: пока панель чата открыта, страница под ней не прокручивается. */
body.avanti-chat-scroll-locked {
  overflow: hidden;
}
</style>
