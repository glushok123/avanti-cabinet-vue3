<!--
  Страница-витрина панели подписания договора (кадры Figma 1:2060 «Подпись»
  и 1:2552 «Модальное окно — Подпись»).

  В макете панель показана поверх страницы договора в модальном окне, поэтому
  здесь она вложена в `avanti_modal`: собственной подложки, скругления и кнопки
  закрытия у панели нет. Фоном служит страница договора — тот же экран, с
  которого окно открывается в макете.

  Ширина окна в кадре — 524px. У пропа `size` такого значения нет (480/681/880),
  зато ровно эту ширину и поля (12px сверху, 24px по бокам, 36px снизу) даёт
  оформление `variant="brand"` — то же, что у окон авторизации. Поэтому взято
  оно, а не `size="sm"`: иначе выверенная ширина окна уехала бы на 480px.
  Свой заголовок панель рисует сама, поэтому у окна его нет — доступное имя
  диалога уходит в `label`.

  Мобильного макета этого экрана в Figma нет: на 390px окно занимает ширину
  брендового кадра (350px). Решение согласовывается с заказчиком.
-->
<template>
  <div class="avanti-signature-page">
    <AvantiContractPage />
    <AvantiModal v-model:open="isOpen" variant="brand" :label="pageTitle">
      <AvantiSignaturePanel
        :content="content"
        @cancel="handleCancel"
        @confirm="handleConfirm"
        @change="handleChange"
      />
    </AvantiModal>
    <p class="avanti-signature-page__status" role="status">{{ status }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import AvantiSignaturePanel from '@/components/signature/avanti_signature_panel.vue'
import AvantiModal from '@/components/ui/avanti_modal.vue'
import AvantiContractPage from '@/pages/avanti_contract_page.vue'
import { AVANTI_SIGNATURE_CONTENT as content } from '@/constants/avanti_signature_content'
import type { AvantiSignatureResult } from '@/types/avanti_signature'

/** Доступное имя диалога: видимого заголовка у окна нет — его рисует панель. */
const pageTitle = 'Firma del contratto'

/** В макете окно открыто сразу — витрина повторяет это поведение. */
const isOpen = ref<boolean>(true)

/** Состояние подписи — витрине хватает текстовой строки вместо реального API. */
const isEmpty = ref<boolean>(true)
const result = ref<AvantiSignatureResult | null>(null)
const cancelled = ref<boolean>(false)

const status = computed<string>(() => {
  if (cancelled.value) {
    return 'Firma annullata.'
  }
  if (result.value) {
    return `Firma confermata (${result.value.image.length} byte).`
  }
  return isEmpty.value ? 'Nessuna firma.' : 'Firma pronta.'
})

function handleChange(value: boolean): void {
  isEmpty.value = value
  cancelled.value = false
}

/** «Cancella» закрывает окно: в макете это возврат к странице договора. */
function handleCancel(): void {
  cancelled.value = true
  result.value = null
  isOpen.value = false
}

/** «Conferma Firma» тоже закрывает окно — подпись поставлена. */
function handleConfirm(value: AvantiSignatureResult): void {
  result.value = value
  cancelled.value = false
  isOpen.value = false
}
</script>

<style lang="scss" scoped>
.avanti-signature-page {
  min-height: 100vh;
  background-color: var(--avanti-color-page);

  /* Строка состояния нужна только витрине: в макете её нет. */
  &__status {
    @include visually-hidden;
  }
}
</style>
