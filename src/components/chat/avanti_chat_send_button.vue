<!--
  Кнопка отправки сообщения: круг 44×44 с фирменным градиентом.
  Тип button (а не submit) — отправку инициирует обработчик панели.
-->
<template>
  <button
    class="avanti-chat-send-button"
    type="button"
    :aria-label="label"
    :disabled="disabled"
    @click="handleClick"
  >
    <span class="avanti-chat-send-button__icon">
      <AvantiChatIconSend />
    </span>
  </button>
</template>

<script setup lang="ts">
import AvantiChatIconSend from '@/components/chat/avanti_chat_icon_send.vue'

withDefaults(
  defineProps<{
    /** Доступное имя кнопки. */
    label: string
    /** Пустое поле ввода — отправлять нечего. */
    disabled?: boolean
  }>(),
  { disabled: false },
)

const emit = defineEmits<{ send: [] }>()

function handleClick(): void {
  emit('send')
}
</script>

<style lang="scss" scoped>
.avanti-chat-send-button {
  @include button-reset;
  @include focus-ring;

  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  color: var(--avanti-color-text-on-primary);
  background: var(--avanti-gradient-primary);
  border-radius: var(--avanti-radius-round);
  transition: opacity var(--avanti-transition-base);

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &__icon {
    display: block;
    width: 18px;
    height: 18px;
  }
}
</style>
