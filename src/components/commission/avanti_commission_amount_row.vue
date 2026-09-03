<!--
  Строка построчной разбивки суммы комиссии («IVA 22% — 6,67 €»,
  кадр «Строка — НДС», Figma 246:7019 / 232:17732).

  Цвет строки не задаётся: он наследуется от карточки суммы, которая на
  десктопе тёмная на светлой заливке, а на мобильной — белая на бирюзовой.
-->
<template>
  <li class="avanti-commission-amount-row">
    <span class="avanti-commission-amount-row__label">{{ line.label }}</span>
    <span class="avanti-commission-amount-row__value">{{ line.value }}</span>
  </li>
</template>

<script setup lang="ts">
import type { AvantiCommissionFeeLine } from '@/types/avanti_commission'

defineProps<{
  /** Название составляющей и её сумма. */
  line: AvantiCommissionFeeLine
}>()
</script>

<style lang="scss" scoped>
.avanti-commission-amount-row {
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  line-height: normal;

  &__label {
    font-weight: var(--avanti-font-weight-regular);
  }

  /* Сумма выровнена по правому краю и не переносится по разряду. */
  &__value {
    flex-shrink: 0;
    font-weight: var(--avanti-font-weight-semibold);
    white-space: nowrap;
  }
}
</style>
