<!--
  Блок «Importo da ricevere»: сумма перевода, её доля от доступного остатка
  и слайдер выбора.

  Слайдер — общий примитив avanti_range_slider. Подпись над ползунком
  (слот value) в этом макете не используется: сумма стоит в шапке блока.
  Суммы форматируются по-итальянски общей функцией formatAmount.
-->
<template>
  <div class="avanti-withdrawal-amount">
    <div class="avanti-withdrawal-amount__info">
      <p class="avanti-withdrawal-amount__label">{{ label }}</p>
      <p class="avanti-withdrawal-amount__values">
        <span class="avanti-withdrawal-amount__value">{{ valueText }}</span>
        <span class="avanti-withdrawal-amount__total">{{ totalText }}</span>
      </p>
      <p class="avanti-withdrawal-amount__share">{{ shareText }}</p>
    </div>
    <AvantiRangeSlider
      class="avanti-withdrawal-amount__slider"
      :model-value="modelValue"
      :min="min"
      :max="max"
      :step="step"
      :aria-label="sliderLabel"
      @update:model-value="handleUpdate"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import AvantiRangeSlider from '@/components/ui/avanti_range_slider.vue'
import { formatAmount } from '@/composables/use_credit_simulation'

const props = defineProps<{
  /** Выбранная сумма перевода, евро. */
  modelValue: number
  /** Нижняя граница слайдера, евро. */
  min: number
  /** Верхняя граница слайдера — весь доступный остаток, евро. */
  max: number
  step: number
  /** Надпись над суммой («Importo da ricevere»). */
  label: string
  /** Подпись слайдера для скринридеров. */
  sliderLabel: string
  /** Хвост подписи про долю от остатка («del totale disponibile»). */
  shareSuffix: string
  currency: string
}>()

const emit = defineEmits<{ 'update:modelValue': [value: number] }>()

const valueText = computed(() => `${formatAmount(props.modelValue)} ${props.currency}`)
const totalText = computed(() => `/ ${formatAmount(props.max)} ${props.currency}`)

/** Доля выбранной суммы от доступного остатка, целые проценты. */
const sharePercent = computed(() => {
  if (props.max <= 0) {
    return 0
  }
  return Math.round((props.modelValue / props.max) * 100)
})

const shareText = computed(() => `${sharePercent.value}% ${props.shareSuffix}`)

function handleUpdate(value: number): void {
  emit('update:modelValue', value)
}
</script>

<style lang="scss" scoped>
.avanti-withdrawal-amount {
  @include inner-border(var(--avanti-color-border-soft), 1px);

  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  padding: 22px 16px;
  background-color: var(--avanti-color-primary-soft);
  border-radius: var(--avanti-radius-xl);

  &__info {
    display: flex;
    flex-direction: column;
    gap: 4px;
    width: 100%;
  }

  &__label {
    font-size: 13px;
    font-weight: var(--avanti-font-weight-bold);
    line-height: normal;
    color: var(--avanti-color-text-secondary);
    text-transform: uppercase;
  }

  &__values {
    display: flex;
    gap: 6px;
    align-items: baseline;
  }

  &__value {
    font-size: 28px;
    font-weight: var(--avanti-font-weight-extrabold);
    line-height: normal;
    color: var(--avanti-color-primary);
  }

  &__total {
    font-size: 15px;
    font-weight: var(--avanti-font-weight-semibold);
    line-height: normal;
    color: var(--avanti-color-text-secondary);
  }

  &__share {
    font-size: 12px;
    font-weight: var(--avanti-font-weight-semibold);
    line-height: normal;
    color: var(--avanti-color-primary);
  }

  @include desktop-up {
    /* Толщина трека в этом блоке одинакова на обеих ширинах макета (8px),
       тогда как примитив на десктопе утолщает её до 12px. */
    &__slider :deep(.avanti-slider__track) {
      height: 8px;
    }
  }
}
</style>
