<!--
  Круглый контейнер для иконки. Покрывает все круглые «пилюли» макета:
  иконки шагов, статусные галочки, кнопки-стрелки и иконку замка в баннере.
  Размер круга и иконки задаются пропами с фиксированным набором значений,
  чтобы не появлялись инлайновые стили.

  Мобильные размеры тоже живут внутри компонента (пропы mobile-*),
  чтобы родителям не приходилось лезть внутрь через :deep().
-->
<template>
  <component
    :is="tag"
    class="avanti-icon-circle"
    :class="[
      sizeClass,
      iconSizeClass,
      toneClass,
      shadowClass,
      mobileSizeClass,
      mobileIconSizeClass,
      mobileShadowClass,
    ]"
    :type="nativeType"
    :aria-label="label"
  >
    <span class="avanti-icon-circle__icon">
      <slot />
    </span>
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type CircleSize = 22 | 28 | 32 | 36 | 44
type CircleIconSize = 'xs' | 'sm' | 'md' | 'ml' | 'lg' | 'xl'
type CircleTone = 'primary' | 'outline' | 'neutral'
type CircleShadow = 'none' | 'icon' | 'action'

/**
 * label — доступное имя: нужно, когда круг рендерится кнопкой без текста.
 * mobileSize / mobileIconSize / mobileShadow — значения для ширины до 767px.
 */
const props = withDefaults(
  defineProps<{
    size?: CircleSize
    iconSize?: CircleIconSize
    tone?: CircleTone
    shadow?: CircleShadow
    tag?: string
    label?: string
    mobileSize?: CircleSize
    mobileIconSize?: CircleIconSize
    mobileShadow?: CircleShadow
  }>(),
  {
    size: 44,
    iconSize: 'xl',
    tone: 'primary',
    shadow: 'none',
    tag: 'div',
    label: undefined,
    mobileSize: undefined,
    mobileIconSize: undefined,
    mobileShadow: undefined,
  },
)

const sizeClass = computed(() => `avanti-icon-circle--size-${props.size}`)
const iconSizeClass = computed(() => `avanti-icon-circle--icon-${props.iconSize}`)
const toneClass = computed(() => `avanti-icon-circle--${props.tone}`)
const shadowClass = computed(() => `avanti-icon-circle--shadow-${props.shadow}`)

const mobileSizeClass = computed(() =>
  props.mobileSize ? `avanti-icon-circle--mobile-size-${props.mobileSize}` : undefined,
)
const mobileIconSizeClass = computed(() =>
  props.mobileIconSize ? `avanti-icon-circle--mobile-icon-${props.mobileIconSize}` : undefined,
)
const mobileShadowClass = computed(() =>
  props.mobileShadow ? `avanti-icon-circle--mobile-shadow-${props.mobileShadow}` : undefined,
)

/** У нативной кнопки обязателен type, иначе она отправляет форму. */
const nativeType = computed(() => (props.tag === 'button' ? 'button' : undefined))
</script>

<style lang="scss" scoped>
.avanti-icon-circle {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  border-radius: var(--avanti-radius-round);

  /*
   * Интерактивный вариант (tag="button"). Селектор обёрнут в :where,
   * чтобы сброс не перебивал по специфичности классы тонов ниже:
   * иначе background из button-reset затирал бы заливку круга.
   */
  &:where(button) {
    @include button-reset;
    @include focus-ring;

    cursor: pointer;
  }

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

  &--icon-ml .avanti-icon-circle__icon {
    width: 14.222px;
    height: 14.222px;
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

  &--neutral {
    color: var(--avanti-color-text-tertiary);
    background-color: var(--avanti-color-surface-neutral);
  }

  /* --- Тени --- */
  &--shadow-icon {
    box-shadow: var(--avanti-shadow-icon-circle);
  }

  &--shadow-action {
    box-shadow: var(--avanti-shadow-icon-action);
  }

  /* --- Мобильные переопределения (идут ниже — перебивают базовые) --- */
  @include mobile {
    &--mobile-size-22 {
      width: 22px;
      height: 22px;
    }

    &--mobile-size-32 {
      width: 32px;
      height: 32px;
    }

    &--mobile-size-36 {
      width: 36px;
      height: 36px;
    }

    &--mobile-icon-xs .avanti-icon-circle__icon {
      width: 10px;
      height: 10px;
    }

    &--mobile-icon-ml .avanti-icon-circle__icon {
      width: 14.222px;
      height: 14.222px;
    }

    &--mobile-icon-lg .avanti-icon-circle__icon {
      width: 16px;
      height: 16px;
    }

    /* На мобильной круг меньше — обводка тоньше десктопных 2.444px. */
    &--outline.avanti-icon-circle--mobile-size-36 {
      border-width: 2px;
    }

    &--mobile-shadow-none {
      box-shadow: none;
    }
  }
}
</style>
