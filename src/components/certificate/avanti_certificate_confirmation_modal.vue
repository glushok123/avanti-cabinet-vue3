<!--
  Карточка подтверждения просмотра сертификата в модальном окне
  (кадры 256:12255 — десктоп, 232:16446 — мобильная): она встаёт поверх
  открытого просмотрщика, поэтому оболочка берётся в варианте `bare` —
  затемнение, ловушка фокуса и Escape без собственного оформления.
  Крестика у карточки в кадре нет, закрыть окно можно кнопкой подтверждения.
-->
<template>
  <AvantiModal
    :open="open"
    variant="bare"
    :closable="false"
    :label="content.title"
    @update:open="emit('update:open', $event)"
  >
    <AvantiCertificateConfirmationCard
      :label="content.label"
      :title="content.title"
      :description="content.description"
      :checkbox-label="content.checkboxLabel"
      :action-label="content.actionLabel"
      @confirm="emit('update:open', false)"
    />
  </AvantiModal>
</template>

<script setup lang="ts">
import AvantiModal from '@/components/ui/avanti_modal.vue'
import AvantiCertificateConfirmationCard from '@/components/certificate/avanti_certificate_confirmation_card.vue'
import type { AvantiCertificateConfirmationContent } from '@/types/avanti_certificate'

defineProps<{
  /** Окно открыто. Работает как `v-model:open`. */
  open: boolean
  content: AvantiCertificateConfirmationContent
}>()

const emit = defineEmits<{ 'update:open': [value: boolean] }>()
</script>
