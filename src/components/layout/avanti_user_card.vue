<!--
  Карточка пользователя нижней панели десктопной шапки:
  аватар 40px, имя и e-mail.
-->
<template>
  <div class="avanti-user-card">
    <AvantiAvatar :src="avatar" :alt="name" size="md" />
    <div class="avanti-user-card__info">
      <span class="avanti-user-card__name">{{ name }}</span>
      <span class="avanti-user-card__email">{{ email }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import AvantiAvatar from '@/components/ui/avanti_avatar.vue'

defineProps<{
  name: string
  email: string
  avatar: string
}>()
</script>

<style lang="scss" scoped>
.avanti-user-card {
  display: flex;
  gap: 12px;
  align-items: center;

  &__info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    line-height: normal;
    white-space: nowrap;
  }

  &__name {
    font-size: 14px;
    font-weight: var(--avanti-font-weight-semibold);
    color: var(--avanti-color-text-strong);
  }

  &__email {
    font-size: 12px;
    font-weight: var(--avanti-font-weight-regular);
    color: var(--avanti-color-text-secondary);
  }
}
</style>
