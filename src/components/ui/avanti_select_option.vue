<!--
  Пункт выпадающего списка. Сам по себе состоянием не владеет: выбранность и
  клавиатурную подсветку задаёт родительский avanti_select через пропы.

  По паттерну WAI-ARIA listbox пункт не получает фокус: фокус остаётся на
  триггере, а активный пункт помечается через aria-activedescendant. Поэтому
  здесь <li role="option">, а не <button>.
-->
<template>
  <li
    :id="id"
    class="avanti-select-option"
    :class="stateClasses"
    role="option"
    :aria-selected="selectedAttr"
    :aria-disabled="disabledAttr"
    @click="handleClick"
    @mousemove="handleMouseMove"
  >
    <span class="avanti-select-option__label">
      <slot>{{ label }}</slot>
    </span>
    <span v-if="selected" class="avanti-select-option__check">
      <AvantiIconCheck :stroke-width="2" />
    </span>
  </li>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import AvantiIconCheck from '@/components/icons/avanti_icon_check.vue'

const props = withDefaults(
  defineProps<{
    /** id пункта — на него ссылается aria-activedescendant триггера. */
    id: string
    /** Подпись пункта; можно заменить содержимым слота по умолчанию. */
    label?: string
    /** Пункт соответствует текущему значению v-model. */
    selected?: boolean
    /** Пункт подсвечен клавиатурной навигацией. */
    active?: boolean
    disabled?: boolean
  }>(),
  {
    label: '',
    selected: false,
    active: false,
    disabled: false,
  },
)

const emit = defineEmits<{
  /** Пользователь выбрал пункт мышью. */
  select: []
  /** Указатель вошёл в пункт — родитель синхронизирует подсветку. */
  activate: []
}>()

const selectedAttr = computed(() => (props.selected ? 'true' : 'false'))
const disabledAttr = computed(() => (props.disabled ? 'true' : undefined))

const stateClasses = computed(() => ({
  'avanti-select-option--selected': props.selected,
  'avanti-select-option--active': props.active,
  'avanti-select-option--disabled': props.disabled,
}))

function handleClick(): void {
  if (props.disabled) {
    return
  }
  emit('select')
}

function handleMouseMove(): void {
  if (props.disabled) {
    return
  }
  emit('activate')
}
</script>

<style lang="scss" scoped>
.avanti-select-option {
  /* Разделитель — inset-тень, а не border: обычный border прибавлял бы
     по пикселю к высоте каждого пункта и ломал расчёт max-height списка. */
  display: flex;
  gap: 8px;
  align-items: center;
  width: 100%;
  padding: 8px 16px;
  font-size: 12px;
  font-weight: var(--avanti-font-weight-light);
  line-height: normal;
  color: var(--avanti-color-text-muted);
  text-align: left;
  text-transform: uppercase;
  cursor: pointer;
  background-color: var(--avanti-color-surface);
  box-shadow: inset 0 -1px 0 var(--avanti-color-primary);
  transition:
    background-color var(--avanti-transition-fast),
    color var(--avanti-transition-fast);

  &:last-child {
    box-shadow: none;
  }

  &__label {
    flex: 1 0 0;
    min-width: 0;
  }

  &__check {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    width: 10px;
    height: 10px;
    color: var(--avanti-color-text-on-primary);
  }

  /* --- Состояния --- */
  &--active {
    background-color: var(--avanti-color-primary-soft);
  }

  &--selected {
    font-weight: var(--avanti-font-weight-medium);
    color: var(--avanti-color-text-on-primary);
    background-color: var(--avanti-color-primary);
  }

  &--disabled {
    cursor: not-allowed;
    opacity: 0.4;
  }

  @include desktop-up {
    padding: 12px 16px;
    font-size: 18px;

    &__check {
      width: 16px;
      height: 16px;
    }
  }
}
</style>
