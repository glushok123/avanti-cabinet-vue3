<!--
  Строка метаданных документа: слева город и дата, справа номер договора
  (кадр Figma 22:4911). Номер выделен фирменным цветом.
-->
<template>
  <div class="avanti-contract-meta-row">
    <p class="avanti-contract-meta-row__item">
      <span class="avanti-contract-meta-row__label">{{ meta.placeLabel }}</span>
      <span class="avanti-contract-meta-row__value">{{ meta.placeValue }}</span>
    </p>
    <p class="avanti-contract-meta-row__item">
      <span class="avanti-contract-meta-row__label">{{ meta.numberLabel }}</span>
      <span class="avanti-contract-meta-row__value avanti-contract-meta-row__value--accent">{{
        meta.numberValue
      }}</span>
    </p>
  </div>
</template>

<script setup lang="ts">
import type { AvantiContractMeta } from '@/types/avanti_contract'

defineProps<{ meta: AvantiContractMeta }>()
</script>

<style lang="scss" scoped>
.avanti-contract-meta-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 16px;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 14px 32px;
  font-size: 12px;
  line-height: normal;

  &__item {
    display: flex;
    gap: 6px;
    align-items: center;
    margin: 0;
  }

  &__label {
    font-weight: var(--avanti-font-weight-regular);
    color: var(--avanti-color-text-secondary);
  }

  &__value {
    font-weight: var(--avanti-font-weight-semibold);
    color: var(--avanti-color-text-strong);

    &--accent {
      color: var(--avanti-color-primary);
    }
  }

  @include mobile {
    padding: 12px 16px;
    font-size: 11px;
  }
}
</style>
