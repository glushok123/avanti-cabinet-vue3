<!--
  Пункт горизонтального меню десктопной шапки.
  Иконка приходит слотом, подпись и состояние — пропами.
  Вариант «accent» — кнопка «Assistenza» с фирменной заливкой и счётчиком.

  С маршрутом пункт рендерится ссылкой (RouterLink), без него — кнопкой:
  оформление у них общее, поэтому корневой класс один и тот же.
-->
<template>
  <component
    :is="rootTag"
    class="avanti-nav-item"
    :class="[variantClass, activeClass]"
    v-bind="rootAttrs"
    :aria-current="ariaCurrent"
  >
    <span class="avanti-nav-item__icon">
      <slot name="icon" />
    </span>
    <span class="avanti-nav-item__label">{{ label }}</span>
    <AvantiNotificationBadge v-if="notifications" :count="notifications" size="md" />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import AvantiNotificationBadge from '@/components/ui/avanti_notification_badge.vue'

type NavItemVariant = 'default' | 'accent'

const props = withDefaults(
  defineProps<{
    label: string
    /** Маршрут пункта. Без него пункт остаётся кнопкой без перехода. */
    to?: string
    active?: boolean
    variant?: NavItemVariant
    notifications?: number
  }>(),
  {
    to: undefined,
    active: false,
    variant: 'default',
    notifications: 0,
  },
)

const rootTag = computed(() => (props.to ? RouterLink : 'button'))

/** У ссылки нужен маршрут, у кнопки — явный тип, иначе она отправляет форму. */
const rootAttrs = computed(() => (props.to ? { to: props.to } : { type: 'button' as const }))

/** Активный пункт передаётся не только цветом: скринридер объявляет текущую страницу. */
const ariaCurrent = computed(() => (props.active ? ('page' as const) : undefined))

const variantClass = computed(() => `avanti-nav-item--${props.variant}`)
const activeClass = computed(() => (props.active ? 'avanti-nav-item--active' : ''))
</script>

<style lang="scss" scoped>
.avanti-nav-item {
  @include button-reset;
  @include focus-ring;

  position: relative;
  display: flex;
  gap: 12px;
  align-items: center;

  /* В макете отступы 10/12 при рамке, нарисованной поверх границы кадра,
     поэтому здесь рамка компенсируется отступами — габариты совпадают. */
  padding: 9px 11px;
  font-size: 14px;
  font-weight: var(--avanti-font-weight-medium);
  line-height: normal;
  border-radius: var(--avanti-radius-sm);
  transition:
    background-color var(--avanti-transition-base),
    color var(--avanti-transition-base);

  &__icon {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    width: 18px;
    height: 18px;
    overflow: hidden;
  }

  &__icon :slotted(svg) {
    width: 16px;
    height: 16px;
  }

  &__label {
    white-space: nowrap;
  }

  /* --- Обычный пункт меню --- */
  &--default {
    color: var(--avanti-color-text-strong);
    background-color: var(--avanti-color-surface-muted);
    border: 1px solid var(--avanti-color-primary-soft);

    &:hover {
      background-color: var(--avanti-color-primary-soft);
    }
  }

  /* --- Активный пункт: заливка мягким фирменным цветом --- */
  &--default.avanti-nav-item--active {
    font-weight: var(--avanti-font-weight-semibold);
    color: var(--avanti-color-primary);
    background-color: var(--avanti-color-primary-soft);
    border-color: transparent;
  }

  /* --- Кнопка «Assistenza» --- */
  &--accent {
    font-size: 16px;
    font-weight: var(--avanti-font-weight-semibold);
    color: var(--avanti-color-text-on-primary);
    text-transform: uppercase;
    background-color: var(--avanti-color-primary);
    border: 1px solid transparent;

    &:hover {
      background-color: var(--avanti-color-primary-dark);
    }
  }
}
</style>
