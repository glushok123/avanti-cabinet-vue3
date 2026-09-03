<!--
  Поле ввода IBAN: надпись сверху и строка номера, разбитая на группы
  по четыре символа (кадры Figma 31:6444, 1:1393, 104:8469).

  Ввод фильтруется прямо во время набора: остаются только латинские буквы
  и цифры, регистр повышается, длина ограничена длиной номера страны.
  После переписывания строки каретка возвращается на прежнее место —
  по числу значащих символов слева от неё (тот же приём, что в поле суммы
  симуляции: пробелы-разделители сдвигают позицию, поэтому индекс нельзя
  сохранять напрямую).
-->
<template>
  <div class="avanti-iban-field">
    <label class="avanti-iban-field__label" :for="inputId">{{ label }}</label>
    <div class="avanti-iban-field__control">
      <input
        :id="inputId"
        ref="inputRef"
        class="avanti-iban-field__input"
        type="text"
        inputmode="text"
        autocomplete="off"
        autocapitalize="characters"
        spellcheck="false"
        :value="modelValue"
        :placeholder="placeholder"
        :aria-describedby="describedBy"
        @input="handleInput"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, useId } from 'vue'
import { AVANTI_IBAN_GROUP_SIZE, AVANTI_IBAN_LENGTH } from '@/constants/avanti_iban_content'

const props = withDefaults(
  defineProps<{
    /** Отформатированный номер — ровно та строка, что видна в поле. */
    modelValue: string
    label: string
    placeholder?: string
    /** Максимальная длина номера без пробелов. */
    maxLength?: number
    /** id подсказки под полем, если она есть. */
    describedBy?: string
    /** Явный id поля; по умолчанию генерируется. */
    id?: string
  }>(),
  {
    placeholder: '',
    maxLength: AVANTI_IBAN_LENGTH,
    describedBy: undefined,
    id: undefined,
  },
)

const emit = defineEmits<{ 'update:modelValue': [value: string] }>()

const uid = useId()
const inputId = computed(() => props.id ?? `${uid}-iban`)
const inputRef = ref<HTMLInputElement | null>(null)

/** Значащие символы номера: латиница и цифры в верхнем регистре. */
function keepSignificant(text: string): string {
  return text.replace(/[^0-9a-zA-Z]/g, '').toUpperCase()
}

/** Расстановка пробелов между группами по четыре символа. */
function formatIban(chars: string): string {
  const groups = chars.match(new RegExp(`.{1,${AVANTI_IBAN_GROUP_SIZE}}`, 'g'))
  return groups === null ? '' : groups.join(' ')
}

/** Позиция каретки сразу после `count`-го значащего символа строки. */
function caretAfterChars(text: string, count: number): number {
  if (count <= 0) {
    return 0
  }

  let seen = 0
  for (let index = 0; index < text.length; index += 1) {
    if (/[0-9A-Z]/.test(text.charAt(index))) {
      seen += 1
      if (seen === count) {
        return index + 1
      }
    }
  }

  return text.length
}

/**
 * Строка переписывается вручную: если после фильтрации значение совпало
 * с прежним (пользователь ввёл недопустимый символ), Vue не перерисует
 * инпут сам и в поле останется лишний знак.
 */
function handleInput(event: Event): void {
  const input = event.target as HTMLInputElement
  const caret = input.selectionStart ?? input.value.length
  const charsBefore = keepSignificant(input.value.slice(0, caret)).length
  const formatted = formatIban(keepSignificant(input.value).slice(0, props.maxLength))

  input.value = formatted

  const position = caretAfterChars(formatted, Math.min(charsBefore, props.maxLength))
  input.setSelectionRange(position, position)

  if (formatted !== props.modelValue) {
    emit('update:modelValue', formatted)
  }
}
</script>

<style lang="scss" scoped>
.avanti-iban-field {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;

  &__label {
    font-size: 14px;
    font-weight: var(--avanti-font-weight-regular);
    line-height: 20px;
    color: var(--avanti-color-text-secondary);
    text-transform: uppercase;
  }

  /*
   * Рамка поля рисуется внутрь: в макете высота ровно 50px, а обычный
   * border прибавил бы к ней 2px.
   */
  &__control {
    @include inner-border(var(--avanti-color-border), 1px, var(--avanti-shadow-card));

    display: flex;
    align-items: center;
    width: 100%;
    height: 50px;
    padding: 0 12px;
    overflow: hidden;
    background-color: var(--avanti-color-surface);
    border-radius: var(--avanti-radius-sm);
    transition: box-shadow var(--avanti-transition-fast);

    &:hover {
      @include inner-border(var(--avanti-color-primary), 1px, var(--avanti-shadow-card));
    }

    &:focus-within {
      @include inner-border(var(--avanti-color-primary), 1px, var(--avanti-shadow-card));

      outline: 2px solid var(--avanti-color-primary);
      outline-offset: 2px;
    }
  }

  &__input {
    width: 100%;
    min-width: 0;
    padding: 0;
    font-family: var(--avanti-font-family-base);
    font-size: 18px;
    font-weight: var(--avanti-font-weight-regular);
    line-height: normal;
    color: var(--avanti-color-text-strong);
    text-transform: uppercase;
    appearance: none;
    background: none;
    border: none;

    &:focus {
      outline: none;
    }

    &::placeholder {
      color: var(--avanti-color-text-muted);
      opacity: 1;
    }
  }

  @include mobile {
    gap: 6px;

    &__label {
      font-size: 12px;
      font-weight: var(--avanti-font-weight-medium);
      line-height: 16px;
    }

    &__input {
      font-size: 14px;
    }
  }
}
</style>
