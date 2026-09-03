<!--
  Блок способа оплаты шага «2. COMMISSIONE» (кадр «Секция оплаты»,
  Figma 246:7028 / 232:17745): иконка банковской карты в бирюзовом квадрате,
  заголовок «Pagamento servizi» и пояснение под ним.

  Иконка (lucide credit-card) вложена в разметку, а не вынесена в общий каталог
  иконок: она встречается только на этом экране.
-->
<template>
  <div class="avanti-commission-payment-method">
    <span class="avanti-commission-payment-method__icon">
      <svg
        class="avanti-commission-payment-method__glyph"
        viewBox="0 0 20 20"
        fill="none"
        aria-hidden="true"
        focusable="false"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1.666 8.33314H18.334M3.3328 4.166H16.6672C17.5877 4.166 18.334 4.91228 18.334 5.83286V14.1671C18.334 15.0877 17.5877 15.834 16.6672 15.834H3.3328C2.41225 15.834 1.666 15.0877 1.666 14.1671V5.83286C1.666 4.91228 2.41225 4.166 3.3328 4.166Z"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
        />
      </svg>
    </span>
    <div class="avanti-commission-payment-method__text">
      <p class="avanti-commission-payment-method__title">{{ method.title }}</p>
      <p class="avanti-commission-payment-method__description">{{ method.description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { AvantiCommissionPaymentMethod } from '@/types/avanti_commission'

defineProps<{
  /** Заголовок и пояснение способа оплаты. */
  method: AvantiCommissionPaymentMethod
}>()
</script>

<style lang="scss" scoped>
.avanti-commission-payment-method {
  display: flex;
  gap: 12px;
  align-items: flex-start;

  &__icon {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    width: 22px;
    height: 22px;
    color: var(--avanti-color-primary);
    background-color: var(--avanti-color-primary-soft);
    border-radius: var(--avanti-radius-xs);
  }

  &__glyph {
    width: 11px;
    height: 11px;
  }

  &__text {
    display: flex;
    flex-direction: column;
    gap: 4px;
    min-width: 0;
  }

  &__title {
    font-size: 12px;
    font-weight: var(--avanti-font-weight-semibold);
    line-height: normal;
    color: var(--avanti-color-text-strong);
  }

  &__description {
    font-size: 10px;
    font-weight: var(--avanti-font-weight-regular);
    line-height: normal;
    color: var(--avanti-color-text-secondary);
  }

  /* Десктоп: иконка вдвое крупнее, тексты на несколько пунктов больше. */
  @include desktop-up {
    &__icon {
      width: 40px;
      height: 40px;
      border-radius: var(--avanti-radius-sm);
    }

    &__glyph {
      width: 20px;
      height: 20px;
    }

    &__title {
      font-size: 16px;
    }

    &__description {
      font-size: 13px;
      line-height: 18px;
    }
  }
}
</style>
