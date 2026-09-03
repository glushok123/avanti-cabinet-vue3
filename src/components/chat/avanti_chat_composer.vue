<!--
  Нижняя панель ввода: кнопка вложения, текстовое поле и кнопка отправки.
  Поле — управляемое (v-model), отправка идёт наверх событием send.

  Отправку целиком берёт на себя `@submit` формы: так сообщение уходит и по
  щелчку по кнопке (она типа submit), и по Enter из поля ввода. Отдельного
  обработчика щелчка у кнопки нет — иначе одно сообщение уходило бы дважды.
-->
<template>
  <form class="avanti-chat-composer" @submit.prevent="handleSend">
    <AvantiChatAttachButton :label="attachLabel" @attach="handleAttach" />
    <input
      class="avanti-chat-composer__input"
      type="text"
      autocomplete="off"
      :value="modelValue"
      :aria-label="inputLabel"
      :placeholder="placeholder"
      @input="handleInput"
    />
    <AvantiChatSendButton :label="sendLabel" :disabled="isEmpty" />
  </form>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import AvantiChatAttachButton from '@/components/chat/avanti_chat_attach_button.vue'
import AvantiChatSendButton from '@/components/chat/avanti_chat_send_button.vue'

const props = defineProps<{
  /** Текущий текст сообщения. */
  modelValue: string
  /** Доступное имя поля ввода. */
  inputLabel: string
  /** Подсказка внутри поля. */
  placeholder: string
  /** Доступное имя кнопки вложения. */
  attachLabel: string
  /** Доступное имя кнопки отправки. */
  sendLabel: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
  send: [value: string]
  attach: []
}>()

/** Пустое поле блокирует отправку. */
const isEmpty = computed(() => props.modelValue.trim().length === 0)

function handleInput(event: Event): void {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}

function handleSend(): void {
  if (isEmpty.value) {
    return
  }

  emit('send', props.modelValue.trim())
}

function handleAttach(): void {
  emit('attach')
}
</script>

<style lang="scss" scoped>
.avanti-chat-composer {
  /* Обводка только сверху, поэтому вместо inner-border — обычный border:
     высота панели задаётся содержимым, лишний пиксель габаритов не ломает. */
  display: flex;
  flex-shrink: 0;
  gap: 10px;
  align-items: center;
  padding: 12px 16px 24px;
  background-color: var(--avanti-color-surface);
  border-top: 1px solid var(--avanti-color-border-soft);

  &__input {
    @include inner-border(var(--avanti-color-border-soft));

    flex: 1 1 0;
    min-width: 0;
    height: 44px;
    padding: 0 16px;
    font-size: 14px;
    font-weight: var(--avanti-font-weight-medium);
    line-height: normal;
    color: var(--avanti-color-text-strong);
    background-color: var(--avanti-color-page);
    border: none;
    border-radius: var(--avanti-radius-md);

    &::placeholder {
      color: var(--avanti-color-text-strong);
    }

    &:focus-visible {
      outline: 2px solid var(--avanti-color-primary);
      outline-offset: 2px;
    }
  }
}
</style>
