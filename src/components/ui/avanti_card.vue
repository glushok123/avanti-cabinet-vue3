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

type CardPadding = 'none' | 'lg'
type CardShadow = 'none' | 'card' | 'soft'

const props = withDefaults(
  defineProps<{
    padding?: CardPadding
    shadow?: CardShadow
    tag?: string
  }>(),
  {
    padding: 'none',
    shadow: 'card',
    tag: 'div',
  },
)

const paddingClass = computed(() => `avanti-card--padding-${props.padding}`)
const shadowClass = computed(() => `avanti-card--shadow-${props.shadow}`)
</script>

<style lang="scss" scoped>
.avanti-card {
  /* Обводка рисуется внутрь (см. миксин inner-border), поэтому габариты
     карточки совпадают с размерами кадра в Figma до пикселя. */
  background-color: var(--avanti-color-surface);
  border-radius: var(--avanti-radius-xl);

  &--padding-none {
    padding: 0;
    overflow: hidden;
  }

  &--padding-lg {
    padding: 24px;
  }

  &--shadow-none {
    @include inner-border(var(--avanti-color-border));
  }

  &--shadow-card {
    @include inner-border(var(--avanti-color-border-soft), 1px, var(--avanti-shadow-card));
  }

  &--shadow-soft {
    @include inner-border(var(--avanti-color-border), 1px, var(--avanti-shadow-card-soft));
  }
}
</style>
