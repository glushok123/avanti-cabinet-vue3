<!--
  Сегмент переключателя способа получения («IBAN» / «Carta»).

  От сегмента анкеты (avanti_choice_option) отличается по существу: две строки
  текста вместо одной, обычный регистр, невыбранный вариант нейтрально-серый,
  а выбранный — не залит фирменным цветом, а обведён им по светлой подложке.
  Поэтому это отдельный компонент, а не переопределение размеров.

  Внутри — нативный radio: он даёт группировку, переходы стрелками и один
  вход по Tab без собственной клавиатурной логики. Визуально radio скрыт,
  всё оформление живёт на подписи.

  Высота сегмента задана макетом точно (58px), поэтому обводка рисуется
  внутрь через inner-border: обычный border прибавил бы к высоте 2–4px.
-->
<template>
  <label class="avanti-withdrawal-method-option" :class="stateClasses">
    <input
      class="avanti-withdrawal-method-option__input"
      type="radio"
      :name="group"
      :value="value"
      :checked="selected"
      :disabled="disabled"
      @change="handleChange"
    />
    <span class="avanti-withdrawal-method-option__title">{{ title }}</span>
    <span class="avanti-withdrawal-method-option__subtitle">{{ subtitle }}</span>
  </label>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    /** Значение сегмента, уходит наружу при выборе. */
    value: string
    /** Имя группы radio — общее у всех сегментов одного переключателя. */
    group: string
    title: string
    subtitle: string
    selected?: boolean
    disabled?: boolean
  }>(),
  {
    selected: false,
    disabled: false,
  },
)

const emit = defineEmits<{ select: [value: string] }>()

const stateClasses = computed(() => ({
  'avanti-withdrawal-method-option--selected': props.selected,
  'avanti-withdrawal-method-option--disabled': props.disabled,
}))

function handleChange(): void {
  emit('select', props.value)
}
</script>

<style lang="scss" scoped>
.avanti-withdrawal-method-option {
  @include inner-border(var(--avanti-color-border-soft), 1px);

  /* Якорь для скрытого radio: иначе при фокусе с клавиатуры страница
     прокручивается к его абсолютной позиции в начале документа. */
  position: relative;
  display: flex;
  flex: 1 0 0;
  flex-direction: column;
  gap: 4px;
  align-items: center;
  justify-content: center;
  min-width: 0;
  height: 58px;
  padding: 12px;
  text-align: center;
  cursor: pointer;
  background-color: var(--avanti-color-surface-muted);
  border-radius: var(--avanti-radius-md);
  transition:
    background-color var(--avanti-transition-base),
    box-shadow var(--avanti-transition-base),
    color var(--avanti-transition-base);

  /* Фокус приходит на скрытый radio — рамку рисуем вокруг всего сегмента. */
  &:has(.avanti-withdrawal-method-option__input:focus-visible) {
    outline: 2px solid var(--avanti-color-primary);
    outline-offset: 2px;
  }

  &:hover:not(.avanti-withdrawal-method-option--disabled) {
    @include inner-border(var(--avanti-color-primary-soft-border), 1px);
  }

  &__input {
    @include visually-hidden;
  }

  &__title {
    max-width: 100%;
    overflow: hidden;
    font-size: 14px;
    font-weight: var(--avanti-font-weight-semibold);
    line-height: normal;
    color: var(--avanti-color-text-secondary);
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__subtitle {
    max-width: 100%;
    overflow: hidden;
    font-size: 11px;
    font-weight: var(--avanti-font-weight-medium);
    line-height: normal;
    color: var(--avanti-color-text-tertiary);
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  /* --- Выбранный сегмент: светлая фирменная подложка и обводка 2px --- */
  &--selected,
  &--selected:hover {
    @include inner-border(var(--avanti-color-primary), 2px);

    background-color: var(--avanti-color-primary-soft);
  }

  &--selected &__title {
    font-weight: var(--avanti-font-weight-bold);
    color: var(--avanti-color-primary);
  }

  &--selected &__subtitle {
    color: var(--avanti-color-primary);
    opacity: 0.8;
  }

  &--disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
}
</style>
