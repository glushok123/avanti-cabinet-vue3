<!--
  Секция «Importo del credito»: заголовок, поле суммы и подписи диапазона.
-->
<template>
  <section class="avanti-simulation-amount-section">
    <AvantiSimulationSectionHeading :overline="overline" :title="title" :title-tag="titleTag" />
    <div class="avanti-simulation-amount-section__control">
      <AvantiSimulationAmountField
        :model-value="modelValue"
        :currency="currency"
        :label="fieldLabel"
        :max="max"
        @update:model-value="handleUpdate"
      />
      <AvantiSimulationRangeHint :min="minLabel" :max="maxLabel" />
    </div>
  </section>
</template>

<script setup lang="ts">
import AvantiSimulationSectionHeading from '@/components/simulation/avanti_simulation_section_heading.vue'
import AvantiSimulationAmountField from '@/components/simulation/avanti_simulation_amount_field.vue'
import AvantiSimulationRangeHint from '@/components/simulation/avanti_simulation_range_hint.vue'

defineProps<{
  overline: string
  title: string
  /** Тег заголовка секции — задаётся страницей ради корректной иерархии. */
  titleTag?: string
  /** Текущая сумма кредита в евро — секция только транслирует её полю. */
  modelValue: number
  currency: string
  /** Доступное имя поля суммы. */
  fieldLabel: string
  /** Верхняя граница суммы для клэмпа в поле ввода. */
  max: number
  minLabel: string
  maxLabel: string
}>()

const emit = defineEmits<{ 'update:modelValue': [value: number] }>()

function handleUpdate(value: number): void {
  emit('update:modelValue', value)
}
</script>

<style lang="scss" scoped>
.avanti-simulation-amount-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;

  &__control {
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
  }

  @include desktop-up {
    gap: 22px;

    .avanti-simulation-amount-section__control {
      gap: 18px;
    }
  }
}
</style>
