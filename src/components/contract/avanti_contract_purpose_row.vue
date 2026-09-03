<!--
  Строка назначения кредита «Finalità del credito» (кадр Figma 22:4964):
  подпись и значение в одну строку под финансовыми условиями.
-->
<template>
  <p class="avanti-contract-purpose-row">
    <span class="avanti-contract-purpose-row__label">{{ purpose.label }}</span>
    <span class="avanti-contract-purpose-row__value">{{ purpose.value }}</span>
  </p>
</template>

<script setup lang="ts">
import type { AvantiContractPurpose } from '@/types/avanti_contract'

defineProps<{ purpose: AvantiContractPurpose }>()
</script>

<style lang="scss" scoped>
.avanti-contract-purpose-row {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  align-items: center;
  width: 100%;
  padding: 16px 32px 20px;
  margin: 0;
  font-size: 12px;
  line-height: normal;

  &__label {
    font-weight: var(--avanti-font-weight-semibold);
    color: var(--avanti-color-text-secondary);
  }

  &__value {
    font-weight: var(--avanti-font-weight-bold);
    color: var(--avanti-color-text-strong);
  }

  @include mobile {
    padding: 12px 16px 16px;
  }
}
</style>
