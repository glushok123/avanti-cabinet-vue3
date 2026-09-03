<!--
  Список реквизитов Прендитора под блоком сторон (кадр Figma 22:4923):
  пять строк «подпись — значение», каждая с нижним разделителем.
-->
<template>
  <dl class="avanti-contract-fields">
    <AvantiContractFieldRow
      v-for="field in fields"
      :key="field.id"
      :label="field.label"
      :value="field.value"
    />
  </dl>
</template>

<script setup lang="ts">
import AvantiContractFieldRow from '@/components/contract/avanti_contract_field_row.vue'
import type { AvantiContractField } from '@/types/avanti_contract'

defineProps<{ fields: AvantiContractField[] }>()
</script>

<style lang="scss" scoped>
.avanti-contract-fields {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  padding: 20px 32px;
  margin: 0;

  @include mobile {
    padding: 12px 16px;
  }
}
</style>
