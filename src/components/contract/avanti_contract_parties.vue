<!--
  Блок сторон договора «Tra i sottoscritti» (кадр Figma 22:4919):
  бирюзовый заголовок и абзац с описанием Престатора и Прендитора.
-->
<template>
  <section class="avanti-contract-parties">
    <AvantiContractSectionTitle :text="parties.title" />
    <p class="avanti-contract-parties__text">{{ parties.text }}</p>
  </section>
</template>

<script setup lang="ts">
import AvantiContractSectionTitle from '@/components/contract/avanti_contract_section_title.vue'
import type { AvantiContractParties } from '@/types/avanti_contract'

defineProps<{ parties: AvantiContractParties }>()
</script>

<style lang="scss" scoped>
.avanti-contract-parties {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-start;
  width: 100%;
  padding: 20px 32px;

  &__text {
    margin: 0;
    font-size: 12px;
    font-weight: var(--avanti-font-weight-regular);
    line-height: normal;
    color: var(--avanti-color-text-secondary);
  }

  @include mobile {
    padding: 16px;
  }
}
</style>
