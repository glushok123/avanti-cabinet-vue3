<!--
  Круглая кнопка закрытия из шапки модального окна: 40×40, серый круг,
  иконка 24×24 по центру (кадр «Кнопка — Закрыть», Figma 1:346).

  Тем же компонентом верстается и кнопка «Назад» — она в макете отличается
  только глифом, поэтому иконка подменяется содержимым слота по умолчанию.
  Собственного события нет: корневой элемент — <button>, поэтому слушатель
  `@click` родителя навешивается на него напрямую через fallthrough-атрибуты.

  Вариант `plain` — крестик без подложки из окон авторизации и настроек
  аккаунта (кадры 0:1235, 1:2773): 32×32, глиф 16px на мобильной и 20px
  на десктопе.
-->
<template>
  <button class="avanti-modal-close-button" :class="variantClass" type="button" :aria-label="label">
    <span class="avanti-modal-close-button__icon">
      <slot>
        <AvantiIconClose :stroke-width="1.5" />
      </slot>
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import AvantiIconClose from '@/components/icons/avanti_icon_close.vue'

type CloseButtonVariant = 'circle' | 'plain'

const props = withDefaults(
  defineProps<{
    /** Доступное имя кнопки: у иконки нет текста, читает только скринридер. */
    label?: string
    /** Оформление: круг с подложкой или крестик без неё. */
    variant?: CloseButtonVariant
  }>(),
  {
    label: 'Chiudi',
    variant: 'circle',
  },
)

const variantClass = computed(() => `avanti-modal-close-button--${props.variant}`)
</script>

<style lang="scss" scoped>
.avanti-modal-close-button {
  @include button-reset;
  @include focus-ring;

  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  color: var(--avanti-color-text-strong);
  transition:
    background-color var(--avanti-transition-fast),
    color var(--avanti-transition-fast);

  &:hover {
    color: var(--avanti-color-primary);
  }

  /* --- Круг с подложкой: базовый вариант модальных окон --- */
  &--circle {
    width: 40px;
    height: 40px;
    background-color: var(--avanti-color-surface-neutral);
    border-radius: var(--avanti-radius-round);

    &:hover {
      background-color: var(--avanti-color-border);
    }

    /* Внутренний квадрат 24×24 — размер иконки в макете (отступ круга 8px). */
    .avanti-modal-close-button__icon {
      width: 24px;
      height: 24px;
    }
  }

  /* --- Крестик без подложки: окна авторизации и настроек аккаунта --- */
  &--plain {
    width: 32px;
    height: 32px;
    border-radius: var(--avanti-radius-xs);

    .avanti-modal-close-button__icon {
      width: 16px;
      height: 16px;
    }

    @include desktop-up {
      .avanti-modal-close-button__icon {
        width: 20px;
        height: 20px;
      }
    }
  }

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
