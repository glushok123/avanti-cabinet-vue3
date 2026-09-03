<!--
  Модальная оболочка панели чата.
  Мобильная: панель занимает весь экран (в макете это отдельный экран 390×844).
  Десктоп: выезжает справа поверх затемнения — рядом с кнопкой «Assistenza»
  в шапке кабинета, при этом страница под ней остаётся видимой.
  Закрывается по Escape и по клику вне панели, пока открыта — держит фокус
  внутри себя и блокирует прокрутку страницы.
  Поведение слоя живёт в `@/composables/use_modal_behavior`.
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
import { useModalBehavior } from '@/composables/use_modal_behavior'

const props = defineProps<{
  /** Панель открыта. */
  open: boolean
  /** Доступное имя диалога. */
  label: string
}>()

const emit = defineEmits<{ close: [] }>()

function handleClose(): void {
  emit('close')
}

/*
 * Ловушка фокуса, Escape и блокировка прокрутки — общая композиция модального
 * слоя. Фокус при открытии уходит на первый элемент панели (кнопку закрытия),
 * а возврат фокуса остаётся заботой вызывающей кнопки.
 */
const panelRef = useModalBehavior({
  isOpen: () => props.open,
  closeOnEscape: () => true,
  onEscape: handleClose,
  initialFocus: 'first',
  restoreFocus: false,
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
/* Глобальный класс модального слоя: страница под открытой панелью не прокручивается. */
body.avanti-scroll-locked {
  overflow: hidden;
}
</style>
