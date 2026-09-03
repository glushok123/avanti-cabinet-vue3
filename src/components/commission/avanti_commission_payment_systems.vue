<!--
  Полоса платёжных систем под кнопкой шага «2. COMMISSIONE»
  (кадр «Нижний колонтитул», Figma 246:7037 / 232:17753).

  В макете это одна текстовая строка «Connessione SSL · Visa · Mastercard ·
  SEPA» — фирменных знаков платёжных систем в кадре нет, поэтому выгружать
  нечего: названия набраны тем же шрифтом, а точки-разделители рисует CSS.
-->
<template>
  <p class="avanti-commission-payment-systems">
    <span v-for="item in items" :key="item" class="avanti-commission-payment-systems__item">{{ item }}</span>
  </p>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { AvantiCommissionPaymentSystems } from '@/types/avanti_commission'

const props = defineProps<{
  /** Подпись о защищённом соединении и названия платёжных систем. */
  content: AvantiCommissionPaymentSystems
}>()

/** Строка целиком: сначала отметка о защите соединения, затем системы. */
const items = computed<string[]>(() => [props.content.securityLabel, ...props.content.systems])
</script>

<style lang="scss" scoped>
.avanti-commission-payment-systems {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  padding-top: 8px;
  font-size: 12px;
  font-weight: var(--avanti-font-weight-regular);
  line-height: normal;
  color: var(--avanti-color-text-secondary);
  text-align: center;

  /* Разделитель между названиями: в макете точка с широкими отступами. */
  &__item + &__item::before {
    margin: 0 8px;
    content: '·';
  }
}
</style>
