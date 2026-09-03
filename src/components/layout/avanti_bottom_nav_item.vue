<!--
  Пункт мобильной нижней навигации: иконка над подписью.
  Вариант «accent» — «Assistenza» с фирменной заливкой.

  С маршрутом пункт рендерится ссылкой (RouterLink), без него — кнопкой:
  оформление у них общее, поэтому корневой класс один и тот же.
-->
<template>
  <component
    :is="rootTag"
    class="avanti-bottom-nav-item"
    :class="[variantClass, activeClass]"
    v-bind="rootAttrs"
    :aria-current="ariaCurrent"
  >
    <span class="avanti-bottom-nav-item__icon">
      <slot name="icon" />
    </span>
    <span class="avanti-bottom-nav-item__label">{{ label }}</span>
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

type BottomNavItemVariant = 'default' | 'accent'

const props = withDefaults(
  defineProps<{
    label: string
    /** Маршрут пункта. Без него пункт остаётся кнопкой без перехода. */
    to?: string
    active?: boolean
    variant?: BottomNavItemVariant
  }>(),
  {
    to: undefined,
    active: false,
    variant: 'default',
  },
)

const rootTag = computed(() => (props.to ? RouterLink : 'button'))

/** У ссылки нужен маршрут, у кнопки — явный тип, иначе она отправляет форму. */
const rootAttrs = computed(() => (props.to ? { to: props.to } : { type: 'button' as const }))

/** Активный пункт передаётся не только цветом: скринридер объявляет текущую страницу. */
const ariaCurrent = computed(() => (props.active ? ('page' as const) : undefined))

const variantClass = computed(() => `avanti-bottom-nav-item--${props.variant}`)
const activeClass = computed(() => (props.active ? 'avanti-bottom-nav-item--active' : ''))
</script>

<style lang="scss" scoped>
.avanti-bottom-nav-item {
  @include button-reset;
  @include focus-ring;

  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: center;
  justify-content: center;
  line-height: normal;
  border-radius: var(--avanti-radius-sm);

  &__icon {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  &__label {
    white-space: nowrap;
  }

  /* --- Обычный пункт --- */
  &--default {
    color: var(--avanti-color-text-strong);

    .avanti-bottom-nav-item__icon {
      width: 20px;
      height: 20px;
    }

    .avanti-bottom-nav-item__icon :slotted(svg) {
      width: 17.778px;
      height: 17.778px;
    }

    .avanti-bottom-nav-item__label {
      font-size: 14px;
      font-weight: var(--avanti-font-weight-medium);
    }
  }

  &--default.avanti-bottom-nav-item--active {
    color: var(--avanti-color-primary);

    .avanti-bottom-nav-item__label {
      font-weight: var(--avanti-font-weight-semibold);
    }
  }

  /* --- Кнопка «Assistenza» --- */
  &--accent {
    height: 43px;
    padding: 4px 16px;
    color: var(--avanti-color-text-on-primary);
    background-color: var(--avanti-color-primary);

    .avanti-bottom-nav-item__icon {
      width: 16px;
      height: 16px;
    }

    .avanti-bottom-nav-item__icon :slotted(svg) {
      width: 14px;
      height: 14px;
    }

    .avanti-bottom-nav-item__label {
      font-size: 12px;
      font-weight: var(--avanti-font-weight-semibold);
      text-transform: uppercase;
    }
  }
}
</style>
