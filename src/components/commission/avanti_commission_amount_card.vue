<!--
  Карточка суммы к оплате шага «2. COMMISSIONE» (кадр «Карточка суммы»,
  Figma 246:7013 / 232:17726): малая надпись, крупная сумма, разделитель
  и построчная разбивка.

  Заливка карточки в макете разная: на мобильной сплошная фирменная с белым
  текстом, на десктопе — светло-бирюзовая с тёмным. Разметка одна, различие
  описано внутри `desktop-up`.
-->
<template>
  <div class="avanti-commission-amount-card">
    <div class="avanti-commission-amount-card__total">
      <p class="avanti-commission-amount-card__label">{{ amount.label }}</p>
      <p class="avanti-commission-amount-card__value">{{ totalText }}</p>
    </div>
    <hr class="avanti-commission-amount-card__divider" />
    <ul class="avanti-commission-amount-card__lines">
      <AvantiCommissionAmountRow v-for="line in amount.lines" :key="line.id" :line="line" />
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import AvantiCommissionAmountRow from '@/components/commission/avanti_commission_amount_row.vue'
import { formatAmount } from '@/composables/use_credit_simulation'
import type { AvantiCommissionFeeAmount } from '@/types/avanti_commission'

const props = defineProps<{
  /** Сумма к оплате, валюта и строки разбивки. */
  amount: AvantiCommissionFeeAmount
}>()

/** Крупная сумма в итальянском формате с символом валюты: «37 €». */
const totalText = computed<string>(() => `${formatAmount(props.amount.total)} ${props.amount.currency}`)
</script>

<style lang="scss" scoped>
.avanti-commission-amount-card {
  @include inner-border(var(--avanti-color-primary));

  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: stretch;
  padding: 16px;
  color: var(--avanti-color-text-on-primary);
  background-color: var(--avanti-color-primary);
  border-radius: var(--avanti-radius-xl);

  &__total {
    display: flex;
    flex-direction: column;
    gap: 4px;
    align-items: flex-start;
  }

  &__label {
    font-size: 11px;
    font-weight: var(--avanti-font-weight-bold);
    line-height: normal;
    color: var(--avanti-color-text-on-primary-soft);
    letter-spacing: 0.8px;
  }

  &__value {
    font-size: 48px;
    font-weight: var(--avanti-font-weight-bold);
    line-height: normal;
  }

  /* Разделитель из макета: линия в 30% прозрачности поверх заливки. */
  &__divider {
    height: 0;
    margin: 0;
    border: none;
    border-top: 1px solid var(--avanti-color-divider-on-primary);
  }

  &__lines {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 0;
    margin: 0;
    list-style: none;
  }

  /* --- Десктоп: светлая заливка и тёмный текст --- */
  @include desktop-up {
    padding: 20px;
    color: var(--avanti-color-text-strong);
    background-color: var(--avanti-color-primary-soft);

    &__label {
      color: var(--avanti-color-primary);
    }

    &__divider {
      border-top-color: var(--avanti-color-primary-soft-border);
    }
  }
}
</style>
