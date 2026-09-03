<!--
  Переключатель способа получения средств: ряд равных по ширине сегментов.

  Состоянием не владеет — выбранное значение приходит через v-model.
  Группировку и клавиатурную навигацию обеспечивают нативные radio внутри
  сегментов, поэтому здесь нужно только общее имя группы и подпись для
  скринридеров (в макете видимой надписи над переключателем нет).
-->
<template>
  <div class="avanti-withdrawal-method-group" role="radiogroup" :aria-label="label">
    <AvantiWithdrawalMethodOption
      v-for="method in methods"
      :key="method.id"
      :value="method.id"
      :group="group"
      :title="method.title"
      :subtitle="method.subtitle"
      :selected="method.id === modelValue"
      :disabled="disabled"
      @select="handleSelect"
    />
  </div>
</template>

<script setup lang="ts">
import { useId } from 'vue'
import AvantiWithdrawalMethodOption from '@/components/withdrawal/avanti_withdrawal_method_option.vue'
import type { AvantiWithdrawalMethod, AvantiWithdrawalMethodId } from '@/types/avanti_withdrawal'

withDefaults(
  defineProps<{
    modelValue: AvantiWithdrawalMethodId
    methods: AvantiWithdrawalMethod[]
    /** Подпись группы для скринридеров. */
    label: string
    disabled?: boolean
  }>(),
  { disabled: false },
)

const emit = defineEmits<{ 'update:modelValue': [value: AvantiWithdrawalMethodId] }>()

/** Общее имя набора radio: у каждой формы на странице оно своё. */
const group = `${useId()}-method`

function handleSelect(value: string): void {
  emit('update:modelValue', value as AvantiWithdrawalMethodId)
}
</script>

<style lang="scss" scoped>
.avanti-withdrawal-method-group {
  display: flex;
  gap: 10px;
  align-items: stretch;
  width: 100%;
}
</style>
