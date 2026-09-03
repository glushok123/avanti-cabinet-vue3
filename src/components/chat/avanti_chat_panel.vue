<!--
  Панель чат-консультанта целиком: шапка, лента сообщений и поле ввода
  внутри модальной оболочки. Переписка приходит массивом через props —
  на этапе интеграции моковые данные заменяются ответом API.
-->
<template>
  <AvantiChatDialog :open="open" :label="texts.dialogLabel" @close="handleClose">
    <div class="avanti-chat-panel">
      <AvantiChatHeader :consultant="consultant" :close-label="texts.closeLabel" @close="handleClose" />
      <AvantiChatMessageList
        :messages="messages"
        :avatars="avatars"
        :author-labels="texts.authorLabels"
        :label="texts.logLabel"
      />
      <AvantiChatComposer
        v-model="draft"
        :input-label="texts.inputLabel"
        :placeholder="texts.inputPlaceholder"
        :attach-label="texts.attachLabel"
        :send-label="texts.sendLabel"
        @send="handleSend"
        @attach="handleAttach"
      />
    </div>
  </AvantiChatDialog>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import AvantiChatComposer from '@/components/chat/avanti_chat_composer.vue'
import AvantiChatDialog from '@/components/chat/avanti_chat_dialog.vue'
import AvantiChatHeader from '@/components/chat/avanti_chat_header.vue'
import AvantiChatMessageList from '@/components/chat/avanti_chat_message_list.vue'
import type {
  AvantiChatAuthor,
  AvantiChatConsultant,
  AvantiChatMessage,
  AvantiChatTexts,
} from '@/types/avanti_chat'

const props = defineProps<{
  /** Панель открыта. */
  open: boolean
  consultant: AvantiChatConsultant
  messages: AvantiChatMessage[]
  /** Аватар пользователя рядом с исходящими сообщениями. */
  userAvatar: string
  texts: AvantiChatTexts
}>()

const emit = defineEmits<{
  close: []
  send: [value: string]
  attach: []
}>()

/** Черновик сообщения живёт в панели: наружу уходит только готовый текст. */
const draft = ref<string>('')

const avatars = computed<Record<AvantiChatAuthor, string>>(() => ({
  consultant: props.consultant.avatar,
  user: props.userAvatar,
}))

function handleClose(): void {
  emit('close')
}

function handleSend(value: string): void {
  draft.value = ''
  emit('send', value)
}

function handleAttach(): void {
  emit('attach')
}
</script>

<style lang="scss" scoped>
.avanti-chat-panel {
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  min-height: 0;
  background-color: var(--avanti-color-page);
}
</style>
