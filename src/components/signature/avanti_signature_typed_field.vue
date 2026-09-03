<!--
  Клавиатурная альтернатива рисованию подписи.

  СВЕРХ МАКЕТА: в Figma этого поля нет. Рисование мышью или пальцем недоступно
  с клавиатуры и скринридера, поэтому подписаться можно и текстом: введённое
  имя воспроизводится на холсте рукописным начертанием и учитывается как
  подпись. Если заказчик откажется от альтернативы, удаляется один компонент.
-->
<template>
  <div class="avanti-signature-typed-field">
    <label class="avanti-signature-typed-field__label" :for="inputId">{{ label }}</label>
    <input
      :id="inputId"
      class="avanti-signature-typed-field__input"
      type="text"
      autocomplete="name"
      :placeholder="placeholder"
      :aria-describedby="hintId"
      :value="modelValue"
      @input="handleInput"
    />
    <p :id="hintId" class="avanti-signature-typed-field__hint">{{ hint }}</p>
  </div>
</template>

<script setup lang="ts">
import { useId } from 'vue'

defineProps<{
  label: string
  placeholder: string
  hint: string
  modelValue: string
}>()

const emit = defineEmits<{ 'update:modelValue': [value: string] }>()

const uid = useId()
const inputId = `${uid}-signature-name`
const hintId = `${uid}-signature-name-hint`

function handleInput(event: Event): void {
  const target = event.target
  if (target instanceof HTMLInputElement) {
    emit('update:modelValue', target.value)
  }
}
</script>

<style lang="scss" scoped>
.avanti-signature-typed-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;

  &__label {
    font-size: 13px;
    font-weight: var(--avanti-font-weight-medium);
    line-height: normal;
    color: var(--avanti-color-text-label);
  }

  &__input {
    @include focus-ring(0);
    @include inner-border(var(--avanti-color-border), 1px, var(--avanti-shadow-field));

    width: 100%;
    height: 44px;
    padding: 0 14px;
    font-size: 15px;
    font-weight: var(--avanti-font-weight-regular);
    line-height: normal;
    color: var(--avanti-color-text-strong);
    background-color: var(--avanti-color-surface);
    border: none;
    border-radius: var(--avanti-radius-sm);

    &::placeholder {
      color: var(--avanti-color-text-tertiary);
    }
  }

  &__hint {
    font-size: 12px;
    font-weight: var(--avanti-font-weight-regular);
    line-height: 16px;
    color: var(--avanti-color-text-secondary);
  }
}
</style>
