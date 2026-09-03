<!--
  Мобильная шапка личного кабинета: логотип, колокольчик со счётчиком
  уведомлений и компактный профиль (аватар 32px + инициалы).
-->
<template>
  <header class="avanti-app-header-mobile">
    <AvantiLogo size="sm" tone="strong" />
    <div class="avanti-app-header-mobile__actions">
      <button class="avanti-app-header-mobile__bell" type="button" :aria-label="bellLabel">
        <AvantiIconBell />
        <AvantiNotificationBadge v-if="notifications" :count="notifications" size="sm" />
      </button>
      <button class="avanti-app-header-mobile__profile" type="button">
        <AvantiAvatar :src="user.avatarMobile" :alt="user.name" size="sm" />
        <span class="avanti-app-header-mobile__initials">{{ user.initials }}</span>
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import AvantiLogo from '@/components/ui/avanti_logo.vue'
import AvantiAvatar from '@/components/ui/avanti_avatar.vue'
import AvantiNotificationBadge from '@/components/ui/avanti_notification_badge.vue'
import AvantiIconBell from '@/components/icons/avanti_icon_bell.vue'
import type { AvantiUser } from '@/types/avanti_dashboard'

/** notificationsLabel — начало доступного имени кнопки уведомлений. */
const props = withDefaults(
  defineProps<{
    user: AvantiUser
    notificationsLabel: string
    notifications?: number
  }>(),
  { notifications: 0 },
)

/** К подписи добавляется текущее число непрочитанных. */
const bellLabel = computed(() => `${props.notificationsLabel}: ${props.notifications}`)
</script>

<style lang="scss" scoped>
.avanti-app-header-mobile {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 12px 16px;
  background-color: var(--avanti-color-surface);
  border-bottom: 1px solid var(--avanti-color-border);

  &__actions {
    display: flex;
    gap: 12px;
    align-items: center;
  }

  &__bell {
    @include button-reset;
    @include focus-ring;

    position: relative;
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    width: 38px;
    height: 38px;
    color: var(--avanti-color-text-strong);

    /* Значение из Figma, отдельного токена нет. */
    border-radius: 6.333px;

    /* Глиф колокольчика в макете занимает 19×23.75px внутри области 38×38. */
    svg {
      width: 19px;
      height: 23.75px;
    }
  }

  &__profile {
    @include button-reset;
    @include focus-ring;

    display: flex;
    gap: 6px;
    align-items: center;
  }

  &__initials {
    font-size: 13px;
    font-weight: var(--avanti-font-weight-semibold);
    line-height: normal;
    color: var(--avanti-color-text-strong);
  }
}
</style>
