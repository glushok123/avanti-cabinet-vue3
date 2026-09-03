<!--
  Демонстрационная страница загрузки документов (мобильные кадры Figma
  22:3657, 95:5965 «неудача», 95:6532 «удача»). Панель показана без модального
  окна: три состояния подряд, чтобы экран можно было посмотреть целиком.
  Роуты страницы не прописываются — подключение делает владелец роутера.
-->
<template>
  <div class="avanti-documents-page">
    <h1 class="avanti-documents-page__title">{{ texts.pageTitle }}</h1>

    <main class="avanti-documents-page__content">
      <section v-for="panel in panels" :key="panel.id" class="avanti-documents-page__section">
        <h2 class="avanti-documents-page__section-title">{{ panel.sectionTitle }}</h2>
        <div class="avanti-documents-page__card">
          <AvantiDocumentsPanel
            v-model:selected-option-id="selectedOptionId"
            :state="panel.id"
            :title="panel.title"
            :summary="panel.summary"
            :options-label="texts.optionsLabel"
            :options="options"
            :dropzone="dropzone"
            :files="files"
            :files-label="texts.filesLabel"
            :error-text="panel.errorText"
            :result="success"
            :actions="actions"
            :submit-disabled="submitDisabled"
            :note="texts.note"
            @select="handleSelect"
            @replace="handleReplace"
          />
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import AvantiDocumentsPanel from '@/components/documents/avanti_documents_panel.vue'
import {
  AVANTI_DOCUMENTS_ACTIONS as actions,
  AVANTI_DOCUMENTS_DROPZONE as dropzone,
  AVANTI_DOCUMENTS_ERROR,
  AVANTI_DOCUMENTS_FILES,
  AVANTI_DOCUMENTS_OPTIONS as options,
  AVANTI_DOCUMENTS_PAGE_SECTIONS,
  AVANTI_DOCUMENTS_SELECTED_OPTION,
  AVANTI_DOCUMENTS_SUCCESS as success,
  AVANTI_DOCUMENTS_SUMMARY,
  AVANTI_DOCUMENTS_SUMMARY_VERIFIED,
  AVANTI_DOCUMENTS_TEXTS as texts,
} from '@/constants/avanti_documents_content'
import type {
  AvantiDocumentFile,
  AvantiDocumentSummary,
  AvantiDocumentsState,
} from '@/types/avanti_documents'

/** Описание одного состояния панели на демонстрационной странице. */
interface DocumentsPagePanel {
  id: AvantiDocumentsState
  sectionTitle: string
  title: string
  summary: AvantiDocumentSummary
  errorText: string
}

const selectedOptionId = ref<string>(AVANTI_DOCUMENTS_SELECTED_OPTION)
const files = ref<AvantiDocumentFile[]>([...AVANTI_DOCUMENTS_FILES])

const submitDisabled = computed(() => files.value.length === 0)

/*
 * Три состояния из макета. В кадре «удача» шапки у окна нет, поэтому
 * заголовок пустой — панель показывает только тело.
 */
const panels: DocumentsPagePanel[] = [
  {
    id: 'upload',
    sectionTitle: AVANTI_DOCUMENTS_PAGE_SECTIONS[0].title,
    title: texts.panelTitle,
    summary: AVANTI_DOCUMENTS_SUMMARY,
    errorText: '',
  },
  {
    id: 'error',
    sectionTitle: AVANTI_DOCUMENTS_PAGE_SECTIONS[1].title,
    title: texts.panelTitle,
    summary: AVANTI_DOCUMENTS_SUMMARY,
    errorText: AVANTI_DOCUMENTS_ERROR,
  },
  {
    id: 'verified',
    sectionTitle: AVANTI_DOCUMENTS_PAGE_SECTIONS[2].title,
    title: '',
    summary: AVANTI_DOCUMENTS_SUMMARY_VERIFIED,
    errorText: '',
  },
]

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
}

/** Кнопка «Sostituisci» очищает строку — дальше пользователь выбирает файл заново. */
function handleReplace(id: string): void {
  files.value = files.value.filter((file) => file.id !== id)
}
</script>

<style lang="scss" scoped>
.avanti-documents-page {
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-height: 100vh;
  padding: 20px 16px 40px;
  background-color: var(--avanti-color-page-mobile);

  &__title {
    margin: 0;
    font-size: 20px;
    font-weight: var(--avanti-font-weight-bold);
    line-height: normal;
    color: var(--avanti-color-text-strong);
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: 28px;
    width: 100%;
  }

  &__section {
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
  }

  /* Подпись состояния нужна только демонстрационной странице. */
  &__section-title {
    margin: 0;
    font-size: 12px;
    font-weight: var(--avanti-font-weight-bold);
    line-height: normal;
    color: var(--avanti-color-text-tertiary);
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  /* Белая карточка вокруг панели: в проекте её даёт модальное окно. */
  &__card {
    width: 100%;
    padding: 20px 16px;
    background-color: var(--avanti-color-surface);
    border-radius: var(--avanti-radius-3xl);
    box-shadow: var(--avanti-shadow-form-card);
  }

  @include desktop-up {
    align-items: center;
    padding: 40px 24px;

    &__title,
    &__content {
      width: 100%;
      max-width: 650px;
    }
  }
}
</style>
