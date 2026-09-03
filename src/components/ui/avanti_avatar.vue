<!--
  Аватар пользователя. На мобильной шапке — 32px с фирменной обводкой,
  на десктопной — 40px без обводки.
-->
<template>
  <img class="avanti-avatar" :class="sizeClass" :src="src" :alt="alt" loading="lazy" decoding="async" />
</template>

<script setup lang="ts">
import { computed } from 'vue'

type AvatarSize = 'sm' | 'md'

const props = withDefaults(
  defineProps<{
    src: string
    alt?: string
    size?: AvatarSize
  }>(),
  {
    alt: '',
    size: 'md',
  },
)

const sizeClass = computed(() => `avanti-avatar--${props.size}`)
</script>

<style lang="scss" scoped>
.avanti-avatar {
  flex-shrink: 0;
  object-fit: cover;
  border-radius: var(--avanti-radius-round);

  &--sm {
    width: 32px;
    height: 32px;
    border: 1px solid var(--avanti-color-primary);
  }

  &--md {
    width: 40px;
    height: 40px;
  }
}
</style>
