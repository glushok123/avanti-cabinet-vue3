<!--
  Универсальная карточка: белая поверхность со скруглением, границей и тенью.
  Отступы и тень выбираются пропами, чтобы один компонент покрывал все
  карточки макета (шаги, личные данные, чеклист верификации).
-->
<template>
  <component :is="tag" class="avanti-card" :class="[paddingClass, shadowClass]">
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type CardPadding = 'none' | 'sm' | 'md' | 'lg'
type CardShadow = 'none' | 'card' | 'soft'

const props = withDefaults(
  defineProps<{
    padding?: CardPadding
    shadow?: CardShadow
    tag?: string
  }>(),
  {
    padding: 'md',
    shadow: 'card',
    tag: 'div',
  },
)

const paddingClass = computed(() => `avanti-card--padding-${props.padding}`)
const shadowClass = computed(() => `avanti-card--shadow-${props.shadow}`)
</script>

<style lang="scss" scoped>
.avanti-card {
  background-color: var(--avanti-color-surface);
  border: 1px solid var(--avanti-color-border);
  border-radius: var(--avanti-radius-xl);

  &--padding-none {
    padding: 0;
    overflow: hidden;
  }

  &--padding-sm {
    padding: 16px;
  }

  &--padding-md {
    padding: 20px 24px;
  }

  &--padding-lg {
    padding: 24px;
  }

  &--shadow-none {
    box-shadow: none;
  }

  &--shadow-card {
    border-color: var(--avanti-color-border-soft);
    box-shadow: var(--avanti-shadow-card);
  }

  &--shadow-soft {
    box-shadow: var(--avanti-shadow-card-soft);
  }
}
</style>
