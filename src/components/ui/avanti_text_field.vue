<!--
  Текстовое поле анкеты: надпись, поле ввода с плейсхолдером и место под иконку
  справа. Габариты полностью из макета (58px на мобильной, 85px на десктопе),
  поэтому обводка рисуется внутрь через inner-border — обычный border прибавил бы
  к высоте 3px.
-->
<template>
  <div class="avanti-text-field" :class="stateClasses">
    <AvantiFieldLabel
      v-if="label"
      class="avanti-text-field__label"
      :text="label"
      :hint="hint"
      :field-id="inputId"
    />
    <div class="avanti-text-field__control">
      <input
        :id="inputId"
        class="avanti-text-field__input"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :name="name"
        :autocomplete="autocomplete"
        :disabled="disabled"
        :aria-invalid="invalidAttr"
        :aria-describedby="describedBy"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
      />
      <span v-if="$slots.icon" class="avanti-text-field__icon">
        <slot name="icon" />
      </span>
    </div>
    <p v-if="errorMessage" :id="errorId" class="avanti-text-field__error">{{ errorMessage }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed, useId } from 'vue'
import AvantiFieldLabel from '@/components/ui/avanti_field_label.vue'

type TextFieldType = 'text' | 'email' | 'tel' | 'password' | 'search' | 'url'

const props = withDefaults(
  defineProps<{
    modelValue?: string
    /** Надпись над полем; пустая строка — поле без надписи. */
    label?: string
    /** Поясняющая подпись под надписью. */
    hint?: string
    placeholder?: string
    type?: TextFieldType
    name?: string
    autocomplete?: string
    disabled?: boolean
    /** Ошибочное состояние без текста ошибки. */
    invalid?: boolean
    /** Текст ошибки под полем; непустое значение само включает invalid. */
    errorMessage?: string
    /** Явный id поля; по умолчанию генерируется. */
    id?: string
  }>(),
  {
    modelValue: '',
    label: '',
    hint: '',
    placeholder: '',
    type: 'text',
    name: undefined,
    autocomplete: undefined,
    disabled: false,
    invalid: false,
    errorMessage: '',
    id: undefined,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
}>()

const uid = useId()
const inputId = computed(() => props.id ?? `${uid}-input`)
const errorId = computed(() => `${uid}-error`)

const hasError = computed(() => props.invalid || props.errorMessage.length > 0)
const invalidAttr = computed(() => (hasError.value ? 'true' : undefined))
const describedBy = computed(() => (props.errorMessage ? errorId.value : undefined))

const stateClasses = computed(() => ({
  'avanti-text-field--disabled': props.disabled,
  'avanti-text-field--invalid': hasError.value,
}))

function handleInput(event: Event): void {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}

function handleFocus(event: FocusEvent): void {
  emit('focus', event)
}

function handleBlur(event: FocusEvent): void {
  emit('blur', event)
}
</script>

<style lang="scss" scoped>
.avanti-text-field {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;

  &__control {
    @include inner-border(var(--avanti-color-primary), 1.5px, var(--avanti-shadow-field));

    display: flex;
    gap: 12px;
    align-items: center;
    width: 100%;
    height: 58px;
    padding: 0 16px;
    background-color: var(--avanti-color-surface-muted);
    border-radius: var(--avanti-radius-lg);
    transition: box-shadow var(--avanti-transition-base);

    &:hover {
      @include inner-border(var(--avanti-color-primary-dark), 1.5px, var(--avanti-shadow-field));
    }

    &:focus-within {
      @include inner-border(var(--avanti-color-primary-dark), 1.5px, var(--avanti-shadow-field));

      outline: 2px solid var(--avanti-color-primary);
      outline-offset: 2px;
    }
  }

  &__input {
    flex: 1 0 0;
    min-width: 0;
    font-family: var(--avanti-font-family-base);
    font-size: 16px;
    font-weight: var(--avanti-font-weight-regular);
    line-height: normal;
    color: var(--avanti-color-text-strong);
    background: none;
    border: none;
    outline: none;

    &::placeholder {
      color: var(--avanti-color-text-muted);
      opacity: 1;
    }
  }

  &__icon {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    color: var(--avanti-color-primary);
  }

  &__error {
    font-size: 13px;
    line-height: normal;
    color: var(--avanti-color-danger);
  }

  /* --- Состояния --- */
  &--invalid &__control,
  &--invalid &__control:hover {
    @include inner-border(var(--avanti-color-danger), 1.5px, var(--avanti-shadow-field));
  }

  &--disabled &__control,
  &--disabled &__control:hover {
    @include inner-border(var(--avanti-color-border-neutral), 1.5px);

    background-color: var(--avanti-color-surface-neutral);
  }

  &--disabled &__input {
    color: var(--avanti-color-text-tertiary);
    cursor: not-allowed;
  }

  @include desktop-up {
    gap: 12px;

    &__control {
      height: 85px;
      padding: 0 24px;
      border-radius: var(--avanti-radius-2xl);
    }

    &__input {
      font-size: 18px;
    }

    &__error {
      font-size: 15px;
    }
  }
}
</style>
