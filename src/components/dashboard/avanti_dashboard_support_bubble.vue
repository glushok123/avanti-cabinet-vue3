<!--
  Плавающий виджет чат-консультанта мобильной главной:
  круглый аватар с фирменным свечением и красный счётчик сообщений.
  Виджет кликабельный, поэтому корень — нативная кнопка.
-->
<template>
  <button class="avanti-dashboard-support-bubble" type="button" :aria-label="alt">
    <img class="avanti-dashboard-support-bubble__avatar" :src="src" alt="" loading="lazy" decoding="async" />
    <AvantiNotificationBadge v-if="count" :count="count" size="lg" />
  </button>
</template>

<script setup lang="ts">
import AvantiNotificationBadge from '@/components/ui/avanti_notification_badge.vue'

/** alt — доступное имя кнопки; сама картинка декоративная (alt=""). */
withDefaults(
  defineProps<{
    src: string
    alt?: string
    count?: number
  }>(),
  {
    alt: '',
    count: 0,
  },
)
</script>

<style lang="scss" scoped>
.avanti-dashboard-support-bubble {
  @include button-reset;
  @include focus-ring;

  position: relative;
  display: block;
  width: 56.889px;
  height: 56.889px;

  &__avatar {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: 62% 50%;
    border: 1.778px solid var(--avanti-color-primary);
    border-radius: var(--avanti-radius-round);
    box-shadow: var(--avanti-shadow-support-glow);
  }
}
</style>
