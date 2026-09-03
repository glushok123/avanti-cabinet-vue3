<!--
  Секция «Per quale durata?»: заголовок, текущее значение срока над треком,
  слайдер и подписи границ диапазона.

  Подпись значения рендерится внутри слайдера (слот #value) — она стоит ровно
  над ползунком, а долю заполнения слайдер уже знает сам, поэтому расчёт
  позиции здесь не дублируется.
-->
<template>
  <section class="avanti-simulation-duration-section">
    <AvantiSimulationSectionHeading :overline="overline" :title="title" />
    <div class="avanti-simulation-duration-section__slider">
      <AvantiRangeSlider
        :model-value="modelValue"
        :min="min"
        :max="max"
        :step="step"
        :aria-label="sliderLabel"
        @update:model-value="handleUpdate"
      >
        <template #value>
          <p class="avanti-simulation-duration-section__value-text">
            <span class="avanti-simulation-duration-section__value-number">{{ modelValue }}</span>
            <span class="avanti-simulation-duration-section__value-unit">{{ unit }}</span>
          </p>
        </template>
      </AvantiRangeSlider>
      <AvantiSimulationRangeHint :min="minLabel" :max="maxLabel" />
    </div>
  </section>
</template>

<script setup lang="ts">
import AvantiSimulationSectionHeading from '@/components/simulation/avanti_simulation_section_heading.vue'
import AvantiSimulationRangeHint from '@/components/simulation/avanti_simulation_range_hint.vue'
import AvantiRangeSlider from '@/components/ui/avanti_range_slider.vue'

defineProps<{
  overline: string
  title: string
  /** Текущий срок возврата в месяцах. */
  modelValue: number
  min: number
  max: number
  step: number
  /** Единица измерения рядом со значением, например «mesi». */
  unit: string
  /** Доступное имя слайдера. */
  sliderLabel: string
  minLabel: string
  maxLabel: string
}>()

const emit = defineEmits<{ 'update:modelValue': [value: number] }>()

function handleUpdate(value: number): void {
  emit('update:modelValue', value)
}
</script>

<style lang="scss" scoped>
.avanti-simulation-duration-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;

  /*
   * Подпись значения вынута из потока (она внутри слайдера), поэтому место
   * над треком резервирует отступ: 34px строки подписи + 16px зазора.
   */
  &__slider {
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
    padding-top: 50px;
  }

  /* Нижний отступ поднимает подпись над треком ровно на зазор макета. */
  &__value-text {
    margin-bottom: 16px;
    color: var(--avanti-color-primary);
    white-space: nowrap;
  }

  &__value-number {
    font-size: 28px;
    font-weight: var(--avanti-font-weight-semibold);
    line-height: normal;
  }

  &__value-unit {
    margin-left: 0.25em;
    font-size: 18px;
    font-weight: var(--avanti-font-weight-medium);
    line-height: normal;
  }

  @include desktop-up {
    gap: 22px;

    .avanti-simulation-duration-section__slider {
      gap: 22px;
      padding-top: 56px;
    }

    .avanti-simulation-duration-section__value-text {
      margin-bottom: 8px;
      text-transform: uppercase;
    }

    .avanti-simulation-duration-section__value-number {
      font-size: 40px;
    }

    .avanti-simulation-duration-section__value-unit {
      font-size: 24px;
      font-weight: var(--avanti-font-weight-semibold);
    }
  }
}
</style>
