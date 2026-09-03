<!--
  Поле ввода внутри модального окна.

  Разметку, связь надписи с input и обработку ввода даёт примитив
  `avanti_text_field` — здесь только габариты: поля модальных окон ниже
  анкетных (42/44px на мобильной и 50px на десктопе против 58/85px).

  Два размера из макета:
  * `sm` — окна авторизации (кадры 0:1235, 0:1338): 42px, подпись 11px,
    ввод 13px, нейтральная обводка;
  * `md` — окна настроек аккаунта (кадры 1:2773, 1:2997, 1:3226): 44px,
    подпись 12px, ввод 16px, обводка полей ввода.

  Справа в поле может стоять кнопка (слот `icon`), под полем — пояснение
  с круглым значком «i».

  Состояния поля (`disabled`, `invalid`, `errorMessage`) и подпись `hint`
  просто прокидываются в примитив: рисует их он, здесь только габариты.
  По умолчанию все они пустые — поведение поля без них прежнее.
-->
<template>
  <div class="avanti-modal-field" :class="sizeClass">
    <AvantiTextField
      :id="id"
      class="avanti-modal-field__field"
      :model-value="modelValue"
      :label="label"
      :type="type"
      :name="name"
      :placeholder="placeholder"
      :autocomplete="autocomplete"
      :hint="hint"
      :disabled="disabled"
      :invalid="invalid"
      :error-message="errorMessage"
      @update:model-value="handleUpdate"
    >
      <template v-if="$slots.icon" #icon>
        <slot name="icon" />
      </template>
    </AvantiTextField>
    <p v-if="note" class="avanti-modal-field__note">
      <span class="avanti-modal-field__note-mark" aria-hidden="true">i</span>
      <span class="avanti-modal-field__note-text">{{ note }}</span>
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import AvantiTextField from '@/components/ui/avanti_text_field.vue'
import type { AvantiModalFieldSize, AvantiModalFieldType } from '@/types/avanti_form'

const props = withDefaults(
  defineProps<{
    modelValue: string
    label: string
    type?: AvantiModalFieldType
    name?: string
    placeholder?: string
    autocomplete?: string
    /** Поясняющая подпись под надписью поля — примитив рисует её сам. */
    hint?: string
    disabled?: boolean
    /** Ошибочное состояние без текста ошибки. */
    invalid?: boolean
    /** Текст ошибки под полем; непустое значение само включает invalid. */
    errorMessage?: string
    /** Пояснение под полем; пустая строка убирает его. */
    note?: string
    size?: AvantiModalFieldSize
    /** Явный id поля; по умолчанию его генерирует примитив. */
    id?: string
  }>(),
  {
    type: 'text',
    name: undefined,
    placeholder: '',
    autocomplete: undefined,
    hint: '',
    disabled: false,
    invalid: false,
    errorMessage: '',
    note: '',
    size: 'md',
    id: undefined,
  },
)

const emit = defineEmits<{ 'update:modelValue': [value: string] }>()

const sizeClass = computed(() => `avanti-modal-field--${props.size}`)

function handleUpdate(value: string): void {
  emit('update:modelValue', value)
}
</script>

<style lang="scss" scoped>
.avanti-modal-field {
  display: flex;
  flex-direction: column;

  /* Зазор между полем и пояснением под ним. */
  gap: 4px;
  width: 100%;

  &__field :deep(.avanti-text-field__control),
  &__field :deep(.avanti-text-field__control:hover) {
    padding: 0 12px;
    background-color: var(--avanti-color-surface);
    border-radius: var(--avanti-radius-sm);
  }

  /* --- Окна авторизации --- */
  &--sm &__field {
    gap: 6px;
  }

  &--sm &__field :deep(.avanti-field-label__text) {
    font-size: 11px;
    font-weight: var(--avanti-font-weight-semibold);
    color: var(--avanti-color-text-secondary);
    letter-spacing: 0.5px;
  }

  &--sm &__field :deep(.avanti-text-field__control),
  &--sm &__field :deep(.avanti-text-field__control:hover) {
    @include inner-border(var(--avanti-color-border), 1px, var(--avanti-shadow-field));

    gap: 8px;
    height: 42px;
  }

  &--sm &__field :deep(.avanti-text-field__control:focus-within) {
    @include inner-border(var(--avanti-color-primary), 1px, var(--avanti-shadow-field));
  }

  &--sm &__field :deep(.avanti-text-field__input) {
    font-size: 13px;
  }

  /* Кнопка-глаз в этих кадрах шире стандартных 24px примитива. */
  &--sm &__field :deep(.avanti-text-field__icon) {
    width: auto;
    height: auto;
  }

  /* --- Окна настроек аккаунта --- */
  &--md &__field :deep(.avanti-field-label__text) {
    font-size: 12px;
    font-weight: var(--avanti-font-weight-semibold);
    color: var(--avanti-color-text-secondary);
    letter-spacing: normal;
  }

  &--md &__field :deep(.avanti-text-field__control),
  &--md &__field :deep(.avanti-text-field__control:hover) {
    @include inner-border(var(--avanti-color-border-input), 1px, var(--avanti-shadow-input));

    height: 44px;
  }

  &--md &__field :deep(.avanti-text-field__control:focus-within) {
    @include inner-border(var(--avanti-color-primary), 1px, var(--avanti-shadow-input));
  }

  &--md &__field :deep(.avanti-text-field__input) {
    font-size: 16px;
    color: var(--avanti-color-text-black);
  }

  &--md &__field :deep(.avanti-text-field__icon) {
    width: 32px;
    height: 32px;
  }

  /* --- Пояснение под полем --- */
  &__note {
    display: flex;
    gap: 8px;
    align-items: center;
    justify-content: center;
    min-height: 32px;
  }

  &__note-mark {
    @include inner-border(var(--avanti-color-primary), 0.4px);

    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;

    /* Кегль знака «i» из кадра Figma — дробная величина перенесена как есть,
       отдельного токена под неё нет. То же значение в `avanti_iban_hint`. */
    font-size: 12.8px;
    font-weight: var(--avanti-font-weight-semibold);
    line-height: normal;
    color: var(--avanti-color-primary);
    border-radius: var(--avanti-radius-round);
  }

  &__note-text {
    flex: 1 1 0;
    min-width: 0;
    font-size: 12px;
    font-weight: var(--avanti-font-weight-light);
    line-height: normal;
    color: var(--avanti-color-text-muted);

    /* Трекинг из кадра Figma: 4% кегля (12 × 0.04). Токена трекинга нет. */
    letter-spacing: 0.48px;
  }

  @include desktop-up {
    gap: 6px;

    /* Высота поля на десктопе одинакова в обоих кадрах. */
    &--sm &__field :deep(.avanti-text-field__control),
    &--sm &__field :deep(.avanti-text-field__control:hover),
    &--md &__field :deep(.avanti-text-field__control),
    &--md &__field :deep(.avanti-text-field__control:hover) {
      height: 50px;
    }

    &--sm &__field {
      gap: 8px;
    }

    &--sm &__field :deep(.avanti-field-label__text),
    &--md &__field :deep(.avanti-field-label__text) {
      font-size: 14px;
      font-weight: var(--avanti-font-weight-regular);
      letter-spacing: 0;
    }

    &--sm &__field :deep(.avanti-text-field__input) {
      font-size: 16px;
    }

    &--md &__field :deep(.avanti-text-field__input) {
      font-size: 18px;
    }

    &__note-text {
      font-size: 14px;

      /* Тот же трекинг 4% кегля, что и на мобильной, но при 14px (14 × 0.04). */
      letter-spacing: 0.56px;
    }
  }
}
</style>
