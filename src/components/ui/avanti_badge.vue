<!--
  Бейдж-«пилюля». Используется для счётчика шагов и статусной подписи
  на карточке одобренной суммы.
-->
<template>
  <span class="avanti-badge" :class="[toneClass, { 'avanti-badge--uppercase': uppercase }]">
    <slot />
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type BadgeTone = 'primary' | 'translucent'

const props = withDefaults(
  defineProps<{
    tone?: BadgeTone
    uppercase?: boolean
  }>(),
  {
    tone: 'primary',
    uppercase: false,
  },
)

const toneClass = computed(() => `avanti-badge--${props.tone}`)
</script>

<style lang="scss" scoped>
.avanti-badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  font-size: 11px;
  font-weight: var(--avanti-font-weight-bold);
  line-height: normal;
  color: var(--avanti-color-text-on-primary);
  white-space: nowrap;
  border-radius: var(--avanti-radius-pill);

  &--uppercase {
    text-transform: uppercase;
    letter-spacing: 0.33px;
  }

  &--primary {
    font-family: var(--avanti-font-family-alt);
    background-color: var(--avanti-color-primary);
  }

  &--translucent {
    padding: 4px 10px;
    background-color: var(--avanti-color-surface-translucent);
  }
}
</style>
