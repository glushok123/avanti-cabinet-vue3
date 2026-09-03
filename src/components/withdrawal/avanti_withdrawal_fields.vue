<!--
  Поля реквизитов выбранного способа получения.

  Состав полей описан в справочнике способов, поэтому список одинаково
  работает и для IBAN, и для карты. Значениями не владеет: они приходят
  сверху, а изменения уходят наружу вместе с именем поля.
-->
<template>
  <div class="avanti-withdrawal-fields">
    <AvantiWithdrawalField
      v-for="item in items"
      :key="item.name"
      :name="item.name"
      :model-value="item.value"
      :label="item.label"
      :placeholder="item.placeholder"
      :caption="item.caption"
      :autocomplete="item.autocomplete"
      :disabled="disabled"
      @update="handleUpdate"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import AvantiWithdrawalField from '@/components/withdrawal/avanti_withdrawal_field.vue'
import type { AvantiWithdrawalDetails, AvantiWithdrawalField as FieldItem } from '@/types/avanti_withdrawal'

const props = withDefaults(
  defineProps<{
    fields: FieldItem[]
    /** Введённые значения: ключ поля → строка. */
    values: AvantiWithdrawalDetails
    disabled?: boolean
  }>(),
  { disabled: false },
)

const emit = defineEmits<{ update: [name: string, value: string] }>()

/** Описания полей вместе с текущими значениями — чтобы шаблон остался без логики. */
const items = computed(() =>
  props.fields.map((field) => ({
    ...field,
    value: props.values[field.name] ?? '',
  })),
)

function handleUpdate(name: string, value: string): void {
  emit('update', name, value)
}
</script>

<style lang="scss" scoped>
.avanti-withdrawal-fields {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
}
</style>
