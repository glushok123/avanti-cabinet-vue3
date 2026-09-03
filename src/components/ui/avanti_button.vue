<!--
  Базовая кнопка проекта.
  Два визуальных варианта из макета: заливка фирменным цветом (primary)
  и контурная (outline). Слоты icon-before / icon-after принимают иконки,
  размер которых задан стилями кнопки.

  Размер `size` — три габарита из макета:
    · lg — кнопка-герой страниц и карточек: 43px на мобильной, 60px и 24px
      текста на десктопе (значение по умолчанию, базовые стили блока);
    · md — кнопка шага мастера и панели: 48/50px, 16px, скругление 8px,
      плоская подача (тень поля вместо кнопочной);
    · sm — кнопка окон входа и регистрации: 44/50px, 15/16px, скругление 8px.
  Проп `uppercase` набирает надпись прописными — так она стоит в кадрах
  IBAN, подписания и формы настроек профиля.
-->
<template>
  <button
    class="avanti-button"
    :class="[variantClass, sizeClass, { 'avanti-button--uppercase': uppercase }]"
    :type="type"
    :disabled="disabled"
  >
    <span v-if="$slots['icon-before']" class="avanti-button__icon">
      <slot name="icon-before" />
    </span>
    <span class="avanti-button__label">
      <slot />
    </span>
    <span v-if="$slots['icon-after']" class="avanti-button__icon">
      <slot name="icon-after" />
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type ButtonVariant = 'primary' | 'outline'
type ButtonSize = 'sm' | 'md' | 'lg'

const props = withDefaults(
  defineProps<{
    variant?: ButtonVariant
    type?: 'button' | 'submit' | 'reset'
    disabled?: boolean
    /** Габарит из макета; по умолчанию — крупная кнопка страниц. */
    size?: ButtonSize
    /** Надпись прописными буквами. */
    uppercase?: boolean
  }>(),
  {
    variant: 'primary',
    type: 'button',
    disabled: false,
    size: 'lg',
    uppercase: false,
  },
)

const variantClass = computed(() => `avanti-button--${props.variant}`)

/*
 * У размера lg отдельных правил нет: это базовые стили блока. Класс для него
 * не добавляется, поэтому разметка кнопок, размер не указавших, прежняя.
 */
const sizeClass = computed<string | null>(() => (props.size === 'lg' ? null : `avanti-button--${props.size}`))
</script>

<style lang="scss" scoped>
.avanti-button {
  @include button-reset;
  @include focus-ring;

  display: inline-flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 12px 16px;
  font-size: 16px;
  font-weight: var(--avanti-font-weight-semibold);

  /* Высота строки из макета: при line-height: normal Chrome даёт 20px
     и кнопка выходит 44px вместо макетных 43px. */
  line-height: 19px;
  border-radius: var(--avanti-radius-md);
  transition:
    background-color var(--avanti-transition-base),
    color var(--avanti-transition-base),
    opacity var(--avanti-transition-base);

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &__icon {
    display: flex;
    flex-shrink: 0;
    width: 16px;
    height: 16px;
  }

  &__label {
    white-space: nowrap;
  }

  /* --- Вариант с заливкой --- */
  &--primary {
    color: var(--avanti-color-text-on-primary);
    background-color: var(--avanti-color-primary);
    box-shadow: var(--avanti-shadow-button-primary-mobile);

    &:hover:not(:disabled) {
      background-color: var(--avanti-color-primary-dark);
    }
  }

  /* --- Контурный вариант --- */
  &--outline {
    color: var(--avanti-color-primary);
    background-color: transparent;

    /* Обводка нарисована внутрь: обычный border сделал бы кнопку 46px
       вместо макетных 43px. */
    @include inner-border(var(--avanti-color-primary), 1.5px);

    &:hover:not(:disabled) {
      background-color: var(--avanti-color-primary-soft);
    }
  }

  /* Прописная надпись: кадры IBAN, подписания и настроек профиля. */
  &--uppercase {
    text-transform: uppercase;
  }

  @include desktop-up {
    gap: 12px;
    height: 60px;
    padding: 8px 10px;
    font-size: 24px;
    font-weight: var(--avanti-font-weight-medium);
    line-height: normal;

    &--primary {
      border: 1px solid var(--avanti-color-surface);
      box-shadow: var(--avanti-shadow-button-primary);
    }

    /* На десктопе высота кнопки задана явно, обводка обычная. */
    &--outline {
      border: 1px solid var(--avanti-color-primary);
      box-shadow: none;
    }
  }

  /*
   * Размеры идут после вариантов и после десктопного блока: специфичность у
   * них одинаковая, поэтому порядок и решает, чьи правила останутся.
   * Размер md — кнопка шага мастера и панели (кадры комиссии и вывода
   * средств): 48px на мобильной, 50px на десктопе, подача плоская —
   * вместо кнопочной тени тень поля, белой обводки в кадре нет.
   */
  &--md {
    height: 48px;
    border-radius: var(--avanti-radius-sm);
    box-shadow: var(--avanti-shadow-input);

    /* Десктопный рост базовой кнопки гасится: в кадре она те же 16px. */
    @include desktop-up {
      gap: 8px;
      height: 50px;
      padding: 12px 16px;
      font-size: 16px;
      font-weight: var(--avanti-font-weight-semibold);
      border: none;
    }
  }

  /* Размер sm — кнопка окон входа и регистрации. */
  &--sm {
    height: 44px;
    font-size: 15px;
    border-radius: var(--avanti-radius-sm);

    /* Тут кнопка тоже не растёт до 60px, но заливку и обводку сохраняет. */
    @include desktop-up {
      height: 50px;
      padding: 8px 16px;
      font-size: 16px;
    }
  }
}
</style>
