<!--
  Кнопка прикрепления файла слева от поля ввода.
  По макету 44×44, светлая заливка и обводка того же тона, что у поля.
-->
<template>
  <button class="avanti-chat-attach-button" type="button" :aria-label="label" @click="handleClick">
    <span class="avanti-chat-attach-button__icon">
      <AvantiChatIconAttach />
    </span>
  </button>
</template>

<script setup lang="ts">
import AvantiChatIconAttach from '@/components/chat/avanti_chat_icon_attach.vue'

defineProps<{
  /** Доступное имя кнопки. */
  label: string
}>()

const emit = defineEmits<{ attach: [] }>()

function handleClick(): void {
  emit('attach')
}
</script>

<style lang="scss" scoped>
.avanti-chat-attach-button {
  @include button-reset;
  @include focus-ring;
  @include inner-border(var(--avanti-color-border-soft));

  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  color: var(--avanti-color-text-strong);
  background-color: var(--avanti-color-page);
  border-radius: var(--avanti-radius-md);
  transition: background-color var(--avanti-transition-base);

  &:hover {
    background-color: var(--avanti-color-primary-soft);
  }

  &__icon {
    display: block;
    width: 20px;
    height: 20px;
  }
}
</style>
