<!--
  Поле ввода суммы кредита: крупное редактируемое значение и знак валюты
  в бирюзовой рамке. Наружу компонент отдаёт число (v-model), внутри хранит
  отформатированную по-итальянски строку («12.000»).
  Знак валюты нарисован отдельным элементом и в значение инпута не входит.
-->
<template>
  <div class="avanti-simulation-amount-field" @click="focusInput">
    <input
      ref="inputRef"
      class="avanti-simulation-amount-field__input"
      type="text"
      inputmode="numeric"
      autocomplete="off"
      :value="displayValue"
      :aria-label="label"
      @input="handleInput"
      @blur="handleBlur"
    />
    <span class="avanti-simulation-amount-field__currency">{{ currency }}</span>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { clampAmount, formatAmount, parseAmount } from '@/composables/use_credit_simulation'
import { AVANTI_AMOUNT_MIN } from '@/constants/avanti_simulation_config'

const props = withDefaults(
  defineProps<{
    /** Текущая сумма кредита в евро. */
    modelValue: number
    /** Знак валюты справа от поля. */
    currency: string
    /** Доступное имя поля для скринридера. */
    label: string
    /** Верхняя граница суммы: в макете она разная на десктопе и на мобильной. */
    max: number
    /** Нижняя граница суммы. */
    min?: number
  }>(),
  { min: AVANTI_AMOUNT_MIN },
)

const emit = defineEmits<{ 'update:modelValue': [value: number] }>()

const inputRef = ref<HTMLInputElement | null>(null)

/** Клик по рамке или по знаку валюты ставит курсор в поле. */
function focusInput(): void {
  inputRef.value?.focus()
}

/** Строка в поле — всегда с разделителями разрядов: «12.000». */
const displayValue = ref<string>(formatAmount(props.modelValue))

/* Значение, изменённое снаружи (пересчёт, сброс формы), возвращается в поле. */
watch(
  () => props.modelValue,
  (value) => {
    if (parseAmount(displayValue.value) !== value) {
      displayValue.value = formatAmount(value)
    }
  },
)

/*
 * Границы суммы зависят от ширины экрана (в макете десктоп и мобильная
 * подписаны разными максимумами). При переходе через брейкпоинт текущее
 * значение может оказаться вне новых границ — приводим его сразу,
 * не дожидаясь потери фокуса.
 */
watch([() => props.min, () => props.max], () => {
  const clamped = clampAmount(props.modelValue, props.min, props.max)
  if (clamped !== props.modelValue) {
    emit('update:modelValue', clamped)
    displayValue.value = formatAmount(clamped)
  }
})

/** Количество цифр в строке — по нему восстанавливается позиция каретки. */
function countDigits(text: string): number {
  return text.replace(/\D/g, '').length
}

/** Позиция каретки в отформатированной строке сразу после digitsBefore-й цифры. */
function caretAfterDigits(text: string, digitsBefore: number): number {
  if (digitsBefore <= 0) {
    return 0
  }

  let seen = 0
  for (let index = 0; index < text.length; index += 1) {
    if (/\d/.test(text.charAt(index))) {
      seen += 1
      if (seen === digitsBefore) {
        return index + 1
      }
    }
  }

  return text.length
}

/**
 * Разделители разрядов проставляются прямо во время набора.
 * Границы диапазона здесь НЕ применяются: пока пользователь печатает,
 * ему не мешают — клэмп срабатывает на потере фокуса.
 */
function handleInput(event: Event): void {
  const input = event.target as HTMLInputElement
  const caret = input.selectionStart ?? input.value.length
  const digitsBefore = countDigits(input.value.slice(0, caret))
  const parsed = parseAmount(input.value)
  const formatted = parsed === null ? '' : formatAmount(parsed)

  /*
   * Значение в DOM переписывается вручную: если после чистки строка совпала
   * с прежней (пользователь ввёл букву), Vue не перерисует инпут сам.
   */
  input.value = formatted
  displayValue.value = formatted

  const position = caretAfterDigits(formatted, digitsBefore)
  input.setSelectionRange(position, position)

  if (parsed !== null && parsed !== props.modelValue) {
    emit('update:modelValue', parsed)
  }
}

/** На потере фокуса сумма приводится к границам, пустое поле — к минимуму. */
function handleBlur(): void {
  const parsed = parseAmount(displayValue.value)
  const value = parsed === null ? props.min : clampAmount(parsed, props.min, props.max)

  displayValue.value = formatAmount(value)

  if (value !== props.modelValue) {
    emit('update:modelValue', value)
  }
}
</script>

<style lang="scss" scoped>
.avanti-simulation-amount-field {
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 14px 16px;
  overflow: hidden;
  font-size: 24px;
  font-weight: var(--avanti-font-weight-semibold);
  line-height: normal;
  color: var(--avanti-color-primary);
  cursor: text;
  background-color: var(--avanti-color-surface);
  border-radius: var(--avanti-radius-lg);

  /*
   * Мобильный макет отводит полю ровно 57px и рисует обводку внутрь кадра.
   * Обычный border прибавился бы к габаритам (59px) и сдвинул бы вниз всё
   * содержимое страницы, поэтому линия нарисована inset-тенью.
   */
  @include inner-border(var(--avanti-color-primary), 1px, var(--avanti-shadow-amount-field-mobile));

  transition:
    border-color var(--avanti-transition-fast),
    box-shadow var(--avanti-transition-fast);

  &:hover {
    @include inner-border(var(--avanti-color-primary-dark), 1px, var(--avanti-shadow-amount-field-mobile));
  }

  /* Фокус подсвечивается мягким бирюзовым кольцом поверх тени из макета. */
  &:focus-within {
    box-shadow:
      inset 0 0 0 1px var(--avanti-color-primary-dark),
      var(--avanti-shadow-amount-field-mobile),
      0 0 0 3px var(--avanti-color-primary-soft-border);
  }

  /* Инпут без собственного оформления: рамку, фон и типографику задаёт контейнер. */
  &__input {
    width: 100%;
    min-width: 0;
    padding: 0;
    font: inherit;
    color: inherit;
    text-transform: inherit;
    appearance: none;
    cursor: inherit;
    background-color: transparent;
    border: none;

    &:focus {
      outline: none;
    }
  }

  &__currency {
    flex-shrink: 0;
  }

  @include desktop-up {
    /* По макету поле 85px высотой, значение и знак валюты отбиты на 17px. */
    align-items: flex-start;
    height: 85px;
    padding: 17px;
    font-size: 40px;
    text-transform: uppercase;

    /* На десктопе высота поля задана явно, поэтому обводка обычная. */
    border: 1px solid var(--avanti-color-primary);
    border-radius: var(--avanti-radius-2xl);
    box-shadow: var(--avanti-shadow-amount-field);

    &:hover {
      border-color: var(--avanti-color-primary-dark);
      box-shadow: var(--avanti-shadow-amount-field);
    }

    &:focus-within {
      border-color: var(--avanti-color-primary-dark);
      box-shadow:
        var(--avanti-shadow-amount-field),
        0 0 0 3px var(--avanti-color-primary-soft-border);
    }
  }
}
</style>
