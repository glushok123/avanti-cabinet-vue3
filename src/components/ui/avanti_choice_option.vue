<!--
  Сегмент переключателя («UOMO» / «DONNA»). Состоянием не владеет — выбранность
  и место в клавиатурной навигации задаёт родительский avanti_choice_group.

  Высота сегмента задана макетом точно (58px / 85px), поэтому обводка
  неактивного варианта рисуется внутрь через inner-border.
-->
<template>
  <button
    class="avanti-choice-option"
    :class="stateClasses"
    type="button"
    role="radio"
    :aria-checked="checkedAttr"
    :disabled="disabled"
    :tabindex="tabIndex"
    @click="handleClick"
  >
    <span v-if="iconComponent" class="avanti-choice-option__icon">
      <component :is="iconComponent" />
    </span>
    <span class="avanti-choice-option__label">
      <slot>{{ label }}</slot>
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed, type Component } from 'vue'
import AvantiIconGenderFemale from '@/components/icons/avanti_icon_gender_female.vue'
import AvantiIconGenderMale from '@/components/icons/avanti_icon_gender_male.vue'
import type { AvantiChoiceIcon } from '@/types/avanti_form'

const props = withDefaults(
  defineProps<{
    /** Подпись сегмента; можно заменить содержимым слота по умолчанию. */
    label?: string
    /** Символ пола слева от подписи. */
    icon?: AvantiChoiceIcon
    selected?: boolean
    disabled?: boolean
    /** Сегмент участвует в обходе по Tab (роль «roving tabindex»). */
    tabbable?: boolean
  }>(),
  {
    label: '',
    icon: undefined,
    selected: false,
    disabled: false,
    tabbable: true,
  },
)

const emit = defineEmits<{ select: [] }>()

/** Соответствие значения пропа icon реальному компоненту-глифу. */
const ICONS: Record<AvantiChoiceIcon, Component> = {
  male: AvantiIconGenderMale,
  female: AvantiIconGenderFemale,
}

const iconComponent = computed(() => (props.icon ? ICONS[props.icon] : null))
const checkedAttr = computed(() => (props.selected ? 'true' : 'false'))
const tabIndex = computed(() => (props.tabbable ? 0 : -1))

const stateClasses = computed(() => ({
  'avanti-choice-option--selected': props.selected,
}))

function handleClick(): void {
  emit('select')
}
</script>

<style lang="scss" scoped>
.avanti-choice-option {
  @include button-reset;
  @include inner-border(var(--avanti-color-primary), 1.5px);
  @include focus-ring;

  display: flex;
  flex: 1 0 0;
  gap: 8px;
  align-items: center;
  justify-content: center;
  min-width: 0;
  height: 58px;
  padding: 0 12px;
  font-size: 16px;
  font-weight: var(--avanti-font-weight-semibold);
  line-height: normal;
  color: var(--avanti-color-primary);
  text-transform: uppercase;
  background-color: var(--avanti-color-surface);
  border-radius: var(--avanti-radius-lg);
  transition:
    background-color var(--avanti-transition-base),
    box-shadow var(--avanti-transition-base),
    color var(--avanti-transition-base);

  &:hover:not(:disabled) {
    background-color: var(--avanti-color-primary-soft);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &__icon {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    font-size: 22px;
  }

  &__label {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  /* --- Активный сегмент: заливка фирменным цветом и бирюзовая тень --- */
  &--selected {
    color: var(--avanti-color-text-on-primary);
    background-color: var(--avanti-color-primary);
    box-shadow: var(--avanti-shadow-choice-active);

    &:hover:not(:disabled) {
      background-color: var(--avanti-color-primary-dark);
    }
  }

  @include desktop-up {
    gap: 12px;
    height: 85px;
    padding: 0 32px;
    font-size: 22px;
    border-radius: var(--avanti-radius-2xl);

    &__icon {
      font-size: 40px;
    }
  }
}
</style>
