<!--
  Одно сообщение переписки: мини-аватар автора и пузырь с текстом и временем.
  Входящее прижато влево, исходящее — вправо (та же разметка, row-reverse).
-->
<template>
  <li class="avanti-chat-message" :class="authorClass">
    <img class="avanti-chat-message__avatar" :src="avatar" alt="" loading="lazy" decoding="async" />
    <div class="avanti-chat-message__bubble">
      <span class="avanti-chat-message__author">{{ authorLabel }}</span>
      <p class="avanti-chat-message__text">{{ message.text }}</p>
      <p v-if="message.time" class="avanti-chat-message__time">{{ message.time }}</p>
    </div>
  </li>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { AvantiChatMessage } from '@/types/avanti_chat'

const props = defineProps<{
  message: AvantiChatMessage
  /** Аватар автора сообщения. */
  avatar: string
  /** Имя автора для скринридера — визуально скрыто. */
  authorLabel: string
}>()

const authorClass = computed(() => `avanti-chat-message--${props.message.author}`)
</script>

<style lang="scss" scoped>
.avanti-chat-message {
  display: flex;
  gap: 10px;
  align-items: flex-end;
  width: 100%;

  &__avatar {
    flex-shrink: 0;
    width: 28px;
    height: 28px;
    object-fit: cover;
    border-radius: var(--avanti-radius-round);
  }

  &__bubble {
    /* Обводка рисуется внутрь: ширина пузыря по макету ровно 270px. */
    @include inner-border(var(--avanti-color-border-soft), 1px, var(--avanti-shadow-chat-bubble));

    display: flex;
    flex-direction: column;
    gap: 4px;
    width: 270px;
    max-width: 100%;
    padding: 14px;
  }

  &__author {
    @include visually-hidden;
  }

  &__text {
    font-size: 14px;
    font-weight: var(--avanti-font-weight-medium);
    line-height: 1.4;
    color: var(--avanti-color-text-strong);
    overflow-wrap: anywhere;
  }

  &__time {
    font-size: 10px;
    font-weight: var(--avanti-font-weight-medium);
    line-height: normal;
    color: var(--avanti-color-text-tertiary);
    text-align: right;
  }

  /* --- Входящее: аватар слева, «хвостик» у нижнего левого угла --- */
  &--consultant {
    .avanti-chat-message__bubble {
      background-color: var(--avanti-color-primary-soft);
      border-radius: var(--avanti-radius-xl) var(--avanti-radius-xl) var(--avanti-radius-xl)
        var(--avanti-radius-xs);
    }
  }

  /* --- Исходящее: аватар справа, «хвостик» у нижнего правого угла --- */
  &--user {
    flex-direction: row-reverse;

    .avanti-chat-message__bubble {
      background-color: var(--avanti-color-surface);
      border-radius: var(--avanti-radius-xl) var(--avanti-radius-xl) var(--avanti-radius-xs)
        var(--avanti-radius-xl);
    }
  }
}
</style>
