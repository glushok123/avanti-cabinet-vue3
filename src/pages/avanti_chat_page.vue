<!--
  Страница-обёртка панели чат-консультанта.
  Нужна, чтобы панель можно было открыть по роуту и посмотреть отдельно:
  в кабинете её открывает кнопка «Assistenza» в шапке (десктоп) и пункт
  нижней навигации (мобильная). Сама панель — модальная и не зависит от страницы.
-->
<template>
  <div class="avanti-chat-page">
    <h1 class="avanti-chat-page__title">{{ texts.pageTitle }}</h1>
    <div ref="launcherRef" class="avanti-chat-page__launcher">
      <AvantiButton @click="handleOpen">{{ texts.openLabel }}</AvantiButton>
    </div>

    <AvantiChatPanel
      :open="isOpen"
      :consultant="consultant"
      :messages="messages"
      :user-avatar="userAvatar"
      :texts="texts"
      @close="handleClose"
      @send="handleSend"
    />
  </div>
</template>

<script setup lang="ts">
import { nextTick, ref } from 'vue'
import AvantiButton from '@/components/ui/avanti_button.vue'
import AvantiChatPanel from '@/components/chat/avanti_chat_panel.vue'
import {
  AVANTI_CHAT_CONSULTANT as consultant,
  AVANTI_CHAT_MESSAGES,
  AVANTI_CHAT_TEXTS as texts,
  AVANTI_CHAT_USER_AVATAR as userAvatar,
} from '@/constants/avanti_chat_content'
import type { AvantiChatMessage } from '@/types/avanti_chat'

/** Панель открыта сразу: страница существует именно ради её просмотра. */
const isOpen = ref<boolean>(true)

/*
 * Локальная копия моковой переписки. На этапе интеграции список приходит
 * из API — панель принимает его через props, поэтому разметка не изменится.
 */
const messages = ref<AvantiChatMessage[]>([...AVANTI_CHAT_MESSAGES])

const launcherRef = ref<HTMLElement | null>(null)

function handleOpen(): void {
  isOpen.value = true
}

/** Закрытие возвращает фокус на кнопку, которая панель открыла. */
function handleClose(): void {
  isOpen.value = false
  void nextTick(() => {
    launcherRef.value?.querySelector('button')?.focus()
  })
}

/** Отправка добавляет сообщение в ленту — проверка озвучивания role="log". */
function handleSend(value: string): void {
  messages.value = [...messages.value, { id: `local-${messages.value.length}`, author: 'user', text: value }]
}
</script>

<style lang="scss" scoped>
.avanti-chat-page {
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 40px 16px;
  background-color: var(--avanti-color-page);

  &__title {
    font-size: 24px;
    font-weight: var(--avanti-font-weight-semibold);
    line-height: normal;
    color: var(--avanti-color-text-heading);
    text-align: center;
  }

  &__launcher {
    width: 100%;
    max-width: 260px;
  }
}
</style>
