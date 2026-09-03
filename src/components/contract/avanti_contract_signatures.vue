<!--
  Блок подписей сторон (кадр Figma 22:5173): два пустых поля 291×61
  с чёрной линией снизу и подписью «Firma del …» под каждой.
-->
<template>
  <div class="avanti-contract-signatures">
    <div v-for="item in signatures" :key="item.id" class="avanti-contract-signatures__item">
      <span class="avanti-contract-signatures__field" aria-hidden="true" />
      <span class="avanti-contract-signatures__label">{{ item.label }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { AvantiContractSignature } from '@/types/avanti_contract'

defineProps<{ signatures: AvantiContractSignature[] }>()
</script>

<style lang="scss" scoped>
.avanti-contract-signatures {
  display: flex;
  gap: 24px;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  padding: 0 32px 24px;

  &__item {
    display: flex;
    flex-direction: column;
    gap: 8px;
    align-items: flex-start;
  }

  /* Поле для подписи: высота задана макетом, линия — нижняя граница. */
  &__field {
    display: block;
    width: 291px;
    max-width: 100%;
    height: 61px;
    border-bottom: 1px solid var(--avanti-color-text-black);
  }

  &__label {
    font-size: 12px;
    font-weight: var(--avanti-font-weight-regular);
    line-height: normal;
    color: var(--avanti-color-text-secondary);
  }

  @include mobile {
    /* На 390px два поля по 291px рядом не помещаются — ставим друг под другом. */
    flex-direction: column;
    gap: 20px;
    padding: 0 16px 20px;

    &__item {
      width: 100%;
    }

    &__field {
      width: 100%;
      height: 48px;
    }
  }
}
</style>
