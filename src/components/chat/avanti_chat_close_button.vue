<!--
  Кнопка закрытия панели чата: круглая, светлая иконка на тёмной шапке.
  По макету 40×40 с иконкой 24×24 (паддинг 8px).
-->
<template>
  <button class="avanti-chat-close-button" type="button" :aria-label="label" @click="handleClick">
    <AvantiChatIconCloseCircle />
  </button>
</template>

<script setup lang="ts">
import AvantiChatIconCloseCircle from '@/components/chat/avanti_chat_icon_close_circle.vue'

defineProps<{
  /** Доступное имя кнопки. */
  label: string
}>()

const emit = defineEmits<{ close: [] }>()

function handleClick(): void {
  emit('close')
}
</script>

<style lang="scss" scoped>
.avanti-chat-close-button {
  @include button-reset;
  @include focus-ring;

  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  padding: 8px;
  color: var(--avanti-color-text-on-primary);
  border-radius: var(--avanti-radius-pill);
  transition: background-color var(--avanti-transition-base);

  &:hover {
    background-color: var(--avanti-color-surface-translucent);
  }
}
</style>
