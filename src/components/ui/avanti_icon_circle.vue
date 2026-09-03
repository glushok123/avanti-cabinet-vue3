<!--
  Круглый контейнер для иконки. Покрывает все круглые «пилюли» макета:
  иконки шагов, статусные галочки, кнопки-стрелки и иконку замка в баннере.
  Размер круга и иконки задаются пропами с фиксированным набором значений,
  чтобы не появлялись инлайновые стили.
-->
<template>
  <component
    :is="tag"
    class="avanti-icon-circle"
    :class="[sizeClass, iconSizeClass, toneClass, shadowClass]"
  >
    <span class="avanti-icon-circle__icon">
      <slot />
    </span>
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type CircleSize = 22 | 28 | 32 | 36 | 44
type CircleIconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
type CircleTone = 'primary' | 'outline' | 'soft' | 'neutral' | 'neutral-outline'
type CircleShadow = 'none' | 'icon' | 'action'

const props = withDefaults(
  defineProps<{
    size?: CircleSize
    iconSize?: CircleIconSize
    tone?: CircleTone
    shadow?: CircleShadow
    tag?: string
  }>(),
  {
    size: 44,
    iconSize: 'xl',
    tone: 'primary',
    shadow: 'none',
    tag: 'div',
  },
)

const sizeClass = computed(() => `avanti-icon-circle--size-${props.size}`)
const iconSizeClass = computed(() => `avanti-icon-circle--icon-${props.iconSize}`)
const toneClass = computed(() => `avanti-icon-circle--${props.tone}`)
const shadowClass = computed(() => `avanti-icon-circle--shadow-${props.shadow}`)
</script>

<style lang="scss" scoped>
.avanti-icon-circle {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  border-radius: var(--avanti-radius-round);

  &__icon {
    display: flex;
    flex-shrink: 0;
  }

  /* --- Диаметр круга --- */
  &--size-22 {
    width: 22px;
    height: 22px;
  }

  &--size-28 {
    width: 28px;
    height: 28px;
  }

  &--size-32 {
    width: 32px;
    height: 32px;
  }

  &--size-36 {
    width: 36px;
    height: 36px;
  }

  &--size-44 {
    width: 44px;
    height: 44px;
  }

  /* --- Размер вложенной иконки --- */
  &--icon-xs .avanti-icon-circle__icon {
    width: 10px;
    height: 10px;
  }

  &--icon-sm .avanti-icon-circle__icon {
    width: 12.727px;
    height: 12.727px;
  }

  &--icon-md .avanti-icon-circle__icon {
    width: 14px;
    height: 14px;
  }

  &--icon-lg .avanti-icon-circle__icon {
    width: 16px;
    height: 16px;
  }

  &--icon-xl .avanti-icon-circle__icon {
    width: 19.556px;
    height: 19.556px;
  }

  /* --- Цветовые варианты --- */
  &--primary {
    color: var(--avanti-color-text-on-primary);
    background-color: var(--avanti-color-primary);
  }

  &--outline {
    color: var(--avanti-color-primary);
    background-color: var(--avanti-color-surface);
    border: 2px solid var(--avanti-color-primary);

    &.avanti-icon-circle--size-44 {
      border-width: 2.444px;
    }
  }

  &--soft {
    color: var(--avanti-color-primary);
    background-color: var(--avanti-color-primary-soft);
    border: 2px solid var(--avanti-color-primary);
  }

  &--neutral {
    color: var(--avanti-color-text-tertiary);
    background-color: var(--avanti-color-surface-neutral);
  }

  &--neutral-outline {
    color: var(--avanti-color-text-tertiary);
    background-color: var(--avanti-color-surface-neutral);
    border: 1.5px solid var(--avanti-color-border-neutral);
  }

  /* --- Тени --- */
  &--shadow-icon {
    box-shadow: var(--avanti-shadow-icon-circle);
  }

  &--shadow-action {
    box-shadow: var(--avanti-shadow-icon-action);
  }
}
</style>
