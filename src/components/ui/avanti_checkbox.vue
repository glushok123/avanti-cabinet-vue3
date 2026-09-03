<!--
  Чекбокс с подписью. Нативный input скрыт визуально, но остаётся доступным
  с клавиатуры и для скринридеров; внешний вид рисует псевдоэлемент.
-->
<template>
  <label class="avanti-checkbox">
    <input
      class="avanti-checkbox__input"
      type="checkbox"
      :checked="modelValue"
      :disabled="disabled"
      @change="handleChange"
    />
    <span class="avanti-checkbox__box">
      <AvantiIconCheck v-if="modelValue" :stroke-width="2.6" />
    </span>
    <span class="avanti-checkbox__label">
      <slot />
    </span>
  </label>
</template>

<script setup lang="ts">
import AvantiIconCheck from '@/components/icons/avanti_icon_check.vue'

withDefaults(
  defineProps<{
    modelValue?: boolean
    disabled?: boolean
  }>(),
  {
    modelValue: false,
    disabled: false,
  },
)

const emit = defineEmits<{ 'update:modelValue': [value: boolean] }>()

function handleChange(event: Event): void {
  emit('update:modelValue', (event.target as HTMLInputElement).checked)
}
</script>

<style lang="scss" scoped>
.avanti-checkbox {
  display: inline-flex;
  gap: 8px;
  align-items: center;
  cursor: pointer;

  &__input {
    @include visually-hidden;
  }

  &__box {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    color: var(--avanti-color-text-on-primary);
    background-color: var(--avanti-color-surface);
    border: 1px solid var(--avanti-color-primary);
    border-radius: var(--avanti-radius-xs);
    transition: background-color var(--avanti-transition-fast);

    @include desktop-up {
      width: 18px;
      height: 18px;
    }
  }

  &__input:checked + &__box {
    background-color: var(--avanti-color-primary);
  }

  &__input:focus-visible + &__box {
    outline: 2px solid var(--avanti-color-primary);
    outline-offset: 2px;
  }

  &__label {
    font-family: var(--avanti-font-family-alt);
    font-size: 13px;
    font-weight: var(--avanti-font-weight-medium);
    line-height: normal;
    color: var(--avanti-color-text-strong);
    white-space: nowrap;
  }
}
</style>
