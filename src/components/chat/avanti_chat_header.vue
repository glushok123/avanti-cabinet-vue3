<!--
  Шапка панели чата: тёмная полоса с аватаром консультанта, его именем,
  строкой статуса и кнопкой закрытия. По макету высота 80px (48 + 16×2).
-->
<template>
  <header class="avanti-chat-header">
    <div class="avanti-chat-header__person">
      <span class="avanti-chat-header__avatar-box">
        <img
          class="avanti-chat-header__avatar"
          :src="consultant.avatar"
          alt=""
          loading="lazy"
          decoding="async"
        />
        <span v-if="consultant.online" class="avanti-chat-header__online" />
      </span>
      <div class="avanti-chat-header__text">
        <p class="avanti-chat-header__name">{{ consultant.name }}</p>
        <AvantiChatStatusLine
          :status-label="consultant.statusLabel"
          :reply-time-label="consultant.replyTimeLabel"
        />
      </div>
    </div>
    <AvantiChatCloseButton :label="closeLabel" @close="handleClose" />
  </header>
</template>

<script setup lang="ts">
import AvantiChatCloseButton from '@/components/chat/avanti_chat_close_button.vue'
import AvantiChatStatusLine from '@/components/chat/avanti_chat_status_line.vue'
import type { AvantiChatConsultant } from '@/types/avanti_chat'

defineProps<{
  consultant: AvantiChatConsultant
  /** Доступное имя кнопки закрытия. */
  closeLabel: string
}>()

const emit = defineEmits<{ close: [] }>()

function handleClose(): void {
  emit('close')
}
</script>

<style lang="scss" scoped>
.avanti-chat-header {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: space-between;
  padding: 16px;

  /* Тёмная подложка шапки. Отдельного токена поверхности пока нет —
     используется тот же цвет, что у основного текста макета. */
  background-color: var(--avanti-color-surface-dark, var(--avanti-color-text-strong));

  &__person {
    display: flex;
    gap: 12px;
    align-items: center;
    min-width: 0;
  }

  &__avatar-box {
    position: relative;
    display: block;
    flex-shrink: 0;
    width: 48px;
    height: 48px;
  }

  &__avatar {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: var(--avanti-radius-round);
  }

  /* Индикатор «на связи»: обводка того же цвета, что и шапка, —
     она вырезает кружок из подложки, как в макете. */
  &__online {
    position: absolute;
    right: 0;
    bottom: 0;
    display: block;
    width: 12px;
    height: 12px;
    background-color: var(--avanti-color-success, var(--avanti-color-primary));
    border: 2px solid var(--avanti-color-surface-dark, var(--avanti-color-text-strong));
    border-radius: var(--avanti-radius-round);
  }

  &__text {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
  }

  &__name {
    overflow: hidden;
    font-size: 16px;
    font-weight: var(--avanti-font-weight-bold);
    line-height: normal;
    color: var(--avanti-color-text-on-primary);
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
