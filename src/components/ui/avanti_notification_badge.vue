<!--
  Красный счётчик непрочитанных уведомлений. Позиционируется относительно
  родителя, поэтому родителю нужен position: relative.
-->
<template>
  <span class="avanti-notification-badge" :class="sizeClass">{{ count }}</span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type BadgeSize = 'sm' | 'md' | 'lg'

const props = withDefaults(
  defineProps<{
    count: number | string
    size?: BadgeSize
  }>(),
  {
    size: 'md',
  },
)

const sizeClass = computed(() => `avanti-notification-badge--${props.size}`)
</script>

<style lang="scss" scoped>
.avanti-notification-badge {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: var(--avanti-font-weight-bold);
  line-height: normal;
  color: var(--avanti-color-text-on-primary);
  background-color: var(--avanti-color-danger);
  border-color: var(--avanti-color-surface);
  border-style: solid;
  border-radius: var(--avanti-radius-round);

  &--sm {
    top: 2px;
    right: 3px;
    width: 13px;
    height: 13px;
    font-size: 6.333px;
    border-width: 1.152px;
  }

  &--md {
    top: -10px;
    right: -11px;
    width: 22px;
    height: 22px;
    font-size: 11px;
    border-width: 2px;
  }

  /* Счётчик плавающего виджета консультанта: без обводки, тёмно-красный. */
  &--lg {
    top: -2px;
    right: -6px;
    width: 28.444px;
    height: 28.444px;
    font-size: 17.778px;
    background-color: var(--avanti-color-danger-dark);
    border-width: 0;
  }
}
</style>
