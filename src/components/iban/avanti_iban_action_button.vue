<!--
  Кнопка панели IBAN (кадры Figma 1:1452, 246:6031, 1:1559, 107:8593).
  Габариты и типографика в панели свои: 50px высотой, надпись 16px
  прописными, скругление 8px — базовая кнопка проекта заметно крупнее,
  поэтому здесь отдельный компонент.

  Вариант `primary` — фирменная заливка, `outline` — светлая подложка
  с фирменной обводкой.

  Проп `uppercase` отключается для кнопки формы вывода средств: в кадре
  31:6452 надпись набрана обычным регистром («Vai alla commissione»),
  тогда как в модальной панели она прописная.
-->
<template>
  <button
    class="avanti-iban-action-button"
    :class="[variantClass, { 'avanti-iban-action-button--sentence': !uppercase }]"
    :type="type"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type AvantiIbanButtonVariant = 'primary' | 'outline'

const props = withDefaults(
  defineProps<{
    variant?: AvantiIbanButtonVariant
    type?: 'button' | 'submit'
    disabled?: boolean
    /** Прописные буквы надписи; в форме вывода средств их нет. */
    uppercase?: boolean
  }>(),
  { variant: 'primary', type: 'button', disabled: false, uppercase: true },
)

const variantClass = computed(() => `avanti-iban-action-button--${props.variant}`)
</script>

<style lang="scss" scoped>
.avanti-iban-action-button {
  @include button-reset;
  @include focus-ring;

  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50px;
  padding: 8px 16px;
  font-size: 16px;
  font-weight: var(--avanti-font-weight-medium);
  line-height: 20px;
  text-align: center;
  text-transform: uppercase;
  border-radius: var(--avanti-radius-sm);
  transition:
    background-color var(--avanti-transition-fast),
    color var(--avanti-transition-fast);

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  /* Надпись обычным регистром: в макете она ещё и легче по начертанию. */
  &--sentence {
    font-weight: var(--avanti-font-weight-regular);
    text-transform: none;
  }

  &--primary {
    color: var(--avanti-color-text-on-primary);
    background-color: var(--avanti-color-primary);

    &:hover:not(:disabled) {
      background-color: var(--avanti-color-primary-dark);
    }
  }

  /* Обводка внутрь — иначе контурная кнопка выше залитой на 2px. */
  &--outline {
    @include inner-border(var(--avanti-color-primary));

    color: var(--avanti-color-primary);
    background-color: var(--avanti-color-surface-muted);

    &:hover:not(:disabled) {
      background-color: var(--avanti-color-primary-soft);
    }
  }

  @include mobile {
    height: 48px;
    padding: 12px 16px;
    font-size: 15px;
    line-height: normal;
  }
}
</style>
