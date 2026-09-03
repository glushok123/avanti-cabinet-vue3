<!--
  Лента сообщений. Обёртка помечена role="log" с aria-live="polite",
  поэтому скринридер зачитывает приходящие сообщения, не перебивая пользователя.
  Сама переписка приходит массивом через props: на этапе интеграции
  моковые данные заменяются ответом API.
-->
<template>
  <div ref="logRef" class="avanti-chat-message-list" role="log" aria-live="polite" :aria-label="label">
    <ul class="avanti-chat-message-list__items">
      <template v-for="row in rows" :key="row.message.id">
        <AvantiChatDateDivider v-if="row.message.dateLabel" :label="row.message.dateLabel" />
        <AvantiChatMessage :message="row.message" :avatar="row.avatar" :author-label="row.authorLabel" />
      </template>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import AvantiChatDateDivider from '@/components/chat/avanti_chat_date_divider.vue'
import AvantiChatMessage from '@/components/chat/avanti_chat_message.vue'
import type {
  AvantiChatAuthor,
  AvantiChatMessage as AvantiChatMessageItem,
  AvantiChatMessageRow,
} from '@/types/avanti_chat'

const props = defineProps<{
  messages: AvantiChatMessageItem[]
  /** Аватары по авторам: консультант и сам пользователь. */
  avatars: Record<AvantiChatAuthor, string>
  /** Доступные имена авторов для скринридера. */
  authorLabels: Record<AvantiChatAuthor, string>
  /** Доступное имя области сообщений. */
  label: string
}>()

const logRef = ref<HTMLElement | null>(null)

/* Аватар и имя автора вычисляются заранее: в шаблоне не должно быть логики. */
const rows = computed<AvantiChatMessageRow[]>(() =>
  props.messages.map((message) => ({
    message,
    avatar: props.avatars[message.author],
    authorLabel: props.authorLabels[message.author],
  })),
)

/* Новое сообщение прокручивает ленту к низу — как в любом мессенджере. */
watch(
  () => props.messages.length,
  () => {
    void nextTick(() => {
      const log = logRef.value
      if (log) {
        log.scrollTop = log.scrollHeight
      }
    })
  },
)
</script>

<style lang="scss" scoped>
.avanti-chat-message-list {
  flex: 1 1 auto;
  min-height: 0;
  padding: 24px 16px 16px;
  overflow-y: auto;
  background-color: var(--avanti-color-page);

  &__items {
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: stretch;
  }
}
</style>
