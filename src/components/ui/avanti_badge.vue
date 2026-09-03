<!--
  Бейдж-«пилюля». Используется для счётчика шагов и статусной подписи
  на карточке одобренной суммы.

  Тон `soft` — счётчик шагов просторной карточки чеклиста (кадр 31:6473):
  светлая подложка, фирменный текст и собственный кегль.
-->
<template>
  <span class="avanti-badge" :class="[toneClass, { 'avanti-badge--uppercase': uppercase }]">
    <slot />
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type BadgeTone = 'primary' | 'translucent' | 'soft'

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

  /* Размер задан кадром: бейдж 116×23 при подписи «5 / 5 completati». */
  &--soft {
    font-family: var(--avanti-font-family-alt);
    font-size: 12px;
    font-weight: var(--avanti-font-weight-semibold);
    line-height: 15px;
    color: var(--avanti-color-primary);
    background-color: var(--avanti-color-primary-soft);
  }

  &--translucent {
    padding: 4px 10px;
    background-color: var(--avanti-color-surface-translucent);
  }
}
</style>
