<!--
  Текстовое поле панели IBAN: надпись сверху и обычная строка ввода
  (кадр Figma 31:6448 «Поле — Владелец счёта»).

  Оформление совпадает с полем номера, но форматирования здесь нет —
  значение уходит наружу как есть.
-->
<template>
  <div class="avanti-iban-text-field">
    <label class="avanti-iban-text-field__label" :for="inputId">{{ label }}</label>
    <div class="avanti-iban-text-field__control">
      <input
        :id="inputId"
        class="avanti-iban-text-field__input"
        type="text"
        :value="modelValue"
        :placeholder="placeholder"
        :name="name"
        :autocomplete="autocomplete"
        @input="handleInput"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, useId } from 'vue'

const props = withDefaults(
  defineProps<{
    modelValue: string
    label: string
    placeholder?: string
    name?: string
    autocomplete?: string
    /** Явный id поля; по умолчанию генерируется. */
    id?: string
  }>(),
  {
    placeholder: '',
    name: undefined,
    autocomplete: undefined,
    id: undefined,
  },
)

const emit = defineEmits<{ 'update:modelValue': [value: string] }>()

const uid = useId()
const inputId = computed(() => props.id ?? `${uid}-text`)

function handleInput(event: Event): void {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}
</script>

<style lang="scss" scoped>
.avanti-iban-text-field {
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

  /* Обводка внутрь — высота поля в макете ровно 50px. */
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
