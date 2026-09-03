<!--
  Страница-витрина загрузки документов (кадры Figma 1:935 «всплывашка»,
  22:3657, 95:5965 «неудача», 95:6532 «удача»).

  Панель рассчитана на модальное окно: собственной подложки у неё нет, поэтому
  здесь она вложена в `avanti_modal`, а фоном служит раскладка кабинета —
  как в макете, где окно открыто поверх личного кабинета.

  Состояния макета показываются по ходу сценария, а не тремя копиями подряд:
  «загрузка» → первая отправка не проходит («неудача») → повторная отправка
  проходит («удача»). Отправки на сервер нет — сбой первой попытки нужен
  только витрине, чтобы показать кадр с ошибкой.
  В кадре «удача» шапки у окна нет, поэтому в этом состоянии заголовок окна
  пустой, а доступное имя диалога уходит в `label`.
-->
<template>
  <div class="avanti-documents-page">
    <AvantiDashboardView :state="dashboardState" :title="texts.pageTitle" />
    <AvantiModal v-model:open="isOpen" :title="isVerified ? '' : texts.panelTitle" :label="texts.panelTitle">
      <AvantiDocumentsPanel
        v-model:selected-option-id="selectedOptionId"
        :state="state"
        title=""
        :summary="summary"
        :options-label="texts.optionsLabel"
        :options="options"
        :dropzone="dropzone"
        :files="files"
        :files-label="texts.filesLabel"
        :error-text="errorText"
        :result="success"
        :actions="actions"
        :submit-disabled="submitDisabled"
        :note="texts.note"
        @select="handleSelect"
        @replace="handleReplace"
        @submit="handleSubmit"
      />
    </AvantiModal>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import AvantiDashboardView from '@/components/dashboard/avanti_dashboard_view.vue'
import AvantiDocumentsPanel from '@/components/documents/avanti_documents_panel.vue'
import AvantiModal from '@/components/ui/avanti_modal.vue'
import {
  AVANTI_DOCUMENTS_ACTIONS as actions,
  AVANTI_DOCUMENTS_DROPZONE as dropzone,
  AVANTI_DOCUMENTS_ERROR,
  AVANTI_DOCUMENTS_FILES,
  AVANTI_DOCUMENTS_OPTIONS as options,
  AVANTI_DOCUMENTS_SELECTED_OPTION,
  AVANTI_DOCUMENTS_SUCCESS as success,
  AVANTI_DOCUMENTS_SUMMARY,
  AVANTI_DOCUMENTS_SUMMARY_VERIFIED,
  AVANTI_DOCUMENTS_TEXTS as texts,
} from '@/constants/avanti_documents_content'
import { AVANTI_DASHBOARD_STATE_BASE as dashboardState } from '@/constants/avanti_dashboard_states'
import type { AvantiDocumentFile, AvantiDocumentsState } from '@/types/avanti_documents'

/** В макете окно открыто сразу — витрина повторяет это поведение. */
const isOpen = ref<boolean>(true)

const selectedOptionId = ref<string>(AVANTI_DOCUMENTS_SELECTED_OPTION)
const files = ref<AvantiDocumentFile[]>([...AVANTI_DOCUMENTS_FILES])
const state = ref<AvantiDocumentsState>('upload')

/** Первая отправка на витрине заканчивается кадром «неудача». */
const isFirstAttempt = ref<boolean>(true)

const submitDisabled = computed<boolean>(() => files.value.length === 0)

const isVerified = computed<boolean>(() => state.value === 'verified')

/** В кадре «удача» подпись над названием документа убрана. */
const summary = computed(() =>
  isVerified.value ? AVANTI_DOCUMENTS_SUMMARY_VERIFIED : AVANTI_DOCUMENTS_SUMMARY,
)

const errorText = computed<string>(() => (state.value === 'error' ? AVANTI_DOCUMENTS_ERROR : ''))

/** Килобайты и мегабайты — как их показывает проводник. */
function formatSize(bytes: number): string {
  const megabytes = bytes / 1024 / 1024
  if (megabytes >= 1) {
    return `${megabytes.toFixed(1).replace('.', ',')} MB`
  }
  return `${Math.max(1, Math.round(bytes / 1024))} KB`
}

/** Отправки на сервер нет: выбранные файлы просто попадают в список. */
function handleSelect(selected: File[]): void {
  files.value = selected.map((file, index) => ({
    id: `${file.name}-${index}`,
    name: file.name,
    size: formatSize(file.size),
    status: 'uploaded',
    statusLabel: AVANTI_DOCUMENTS_FILES[0].statusLabel,
    actionLabel: AVANTI_DOCUMENTS_FILES[0].actionLabel,
  }))
  state.value = 'upload'
}

/** Кнопка «Sostituisci» очищает строку — дальше пользователь выбирает файл заново. */
function handleReplace(id: string): void {
  files.value = files.value.filter((file) => file.id !== id)
  state.value = 'upload'
}

/** «Carica il documento»: первая попытка показывает ошибку, вторая — успех. */
function handleSubmit(): void {
  if (isFirstAttempt.value) {
    isFirstAttempt.value = false
    state.value = 'error'
    return
  }
  state.value = 'verified'
}
</script>

<style lang="scss" scoped>
.avanti-documents-page {
  min-height: 100vh;
  background-color: var(--avanti-color-page);
}
</style>
