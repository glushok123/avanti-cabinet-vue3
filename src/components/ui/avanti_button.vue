<!--
  Базовая кнопка проекта.
  Два визуальных варианта из макета: заливка фирменным цветом (primary)
  и контурная (outline). Слоты icon-before / icon-after принимают иконки,
  размер которых задан стилями кнопки.
-->
<template>
  <button class="avanti-button" :class="variantClass" :type="type" :disabled="disabled">
    <span v-if="$slots['icon-before']" class="avanti-button__icon">
      <slot name="icon-before" />
    </span>
    <span class="avanti-button__label">
      <slot />
    </span>
    <span v-if="$slots['icon-after']" class="avanti-button__icon">
      <slot name="icon-after" />
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type ButtonVariant = 'primary' | 'outline'

const props = withDefaults(
  defineProps<{
    variant?: ButtonVariant
    type?: 'button' | 'submit' | 'reset'
    disabled?: boolean
  }>(),
  {
    variant: 'primary',
    type: 'button',
    disabled: false,
  },
)

const variantClass = computed(() => `avanti-button--${props.variant}`)
</script>

<style lang="scss" scoped>
.avanti-button {
  @include button-reset;
  @include focus-ring;

  display: inline-flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 12px 16px;
  font-size: 16px;
  font-weight: var(--avanti-font-weight-semibold);

  /* Высота строки из макета: при line-height: normal Chrome даёт 20px
     и кнопка выходит 44px вместо макетных 43px. */
  line-height: 19px;
  border-radius: var(--avanti-radius-md);
  transition:
    background-color var(--avanti-transition-base),
    color var(--avanti-transition-base),
    opacity var(--avanti-transition-base);

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &__icon {
    display: flex;
    flex-shrink: 0;
    width: 16px;
    height: 16px;
  }

  &__label {
    white-space: nowrap;
  }

  /* --- Вариант с заливкой --- */
  &--primary {
    color: var(--avanti-color-text-on-primary);
    background-color: var(--avanti-color-primary);
    box-shadow: var(--avanti-shadow-button-primary-mobile);

    &:hover:not(:disabled) {
      background-color: var(--avanti-color-primary-dark);
    }
  }

  /* --- Контурный вариант --- */
  &--outline {
    color: var(--avanti-color-primary);
    background-color: transparent;

    /* Обводка нарисована внутрь: обычный border сделал бы кнопку 46px
       вместо макетных 43px. */
    @include inner-border(var(--avanti-color-primary), 1.5px);

    &:hover:not(:disabled) {
      background-color: var(--avanti-color-primary-soft);
    }
  }

  @include desktop-up {
    gap: 12px;
    height: 60px;
    padding: 8px 10px;
    font-size: 24px;
    font-weight: var(--avanti-font-weight-medium);
    line-height: normal;

    &--primary {
      border: 1px solid var(--avanti-color-surface);
      box-shadow: var(--avanti-shadow-button-primary);
    }

    /* На десктопе высота кнопки задана явно, обводка обычная. */
    &--outline {
      border: 1px solid var(--avanti-color-primary);
      box-shadow: none;
    }
  }
}
</style>
