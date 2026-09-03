<!--
  Содержимое экрана загрузки документов (Figma 1:935 «Документы всплывашка»,
  95:5965 «Документы неудача», 95:6532 «Документы удача»).

  Компонент не знает, во что он вложен: собственного затемнения, скругления
  и тени у него нет — оболочку даёт модальное окно или карточка страницы.
  Все данные приходят пропами, наружу уходят только события.
-->
<template>
  <section class="avanti-documents-panel">
    <header v-if="title" class="avanti-documents-panel__header">
      <h2 class="avanti-documents-panel__title">{{ title }}</h2>
    </header>

    <div class="avanti-documents-panel__body">
      <AvantiDocumentsTypeRow :summary="summary" />
      <span class="avanti-documents-panel__divider" />

      <AvantiDocumentsResult v-if="showResult" :result="result" />

      <template v-else>
        <AvantiDocumentsRequirements
          :label="optionsLabel"
          :options="options"
          :name="groupName"
          :selected-id="selectedOptionId"
          @select="handleOptionSelect"
        />

        <!--
          НЕТ В МАКЕТЕ: зоны перетаскивания файла нет ни в одном кадре Figma,
          её тексты придуманы. Блок сделан по ошибочному заданию, поэтому
          выключен по умолчанию и включается только пропом `showDropzone` —
          в поставке заказчику он не показывается. Оставлять ли его вообще —
          открытый вопрос к заказчику.
        -->
        <AvantiDocumentsDropzone
          v-if="showDropzone && dropzone"
          :dropzone="dropzone"
          :multiple="multiple"
          @select="handleFilesSelect"
        />

        <div v-if="hasUploads" class="avanti-documents-panel__uploads">
          <ul v-if="files.length > 0" class="avanti-documents-panel__files" :aria-label="filesLabel">
            <li v-for="file in files" :key="file.id" class="avanti-documents-panel__file">
              <AvantiDocumentsFileRow :file="file" @replace="handleReplace" />
            </li>
          </ul>

          <AvantiDocumentsAlert v-if="errorText" :text="errorText" />
        </div>

        <AvantiDocumentsActions
          v-if="actions"
          :actions="actions"
          :disabled="submitDisabled"
          @submit="handleSubmit"
          @secondary="handleSecondary"
        />

        <p v-if="note" class="avanti-documents-panel__note">{{ note }}</p>
      </template>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, useId } from 'vue'
import AvantiDocumentsActions from '@/components/documents/avanti_documents_actions.vue'
import AvantiDocumentsAlert from '@/components/documents/avanti_documents_alert.vue'
import AvantiDocumentsDropzone from '@/components/documents/avanti_documents_dropzone.vue'
import AvantiDocumentsFileRow from '@/components/documents/avanti_documents_file_row.vue'
import AvantiDocumentsRequirements from '@/components/documents/avanti_documents_requirements.vue'
import AvantiDocumentsResult from '@/components/documents/avanti_documents_result.vue'
import AvantiDocumentsTypeRow from '@/components/documents/avanti_documents_type_row.vue'
import type {
  AvantiDocumentFile,
  AvantiDocumentOption,
  AvantiDocumentSummary,
  AvantiDocumentsActions as AvantiDocumentsActionsContent,
  AvantiDocumentsDropzone as AvantiDocumentsDropzoneContent,
  AvantiDocumentsResult as AvantiDocumentsResultContent,
  AvantiDocumentsState,
} from '@/types/avanti_documents'

const props = withDefaults(
  defineProps<{
    /** Состояние панели: загрузка, ошибка или пройденная проверка. */
    state?: AvantiDocumentsState
    /** Заголовок шапки. Пустой — шапки нет (её даёт модальное окно). */
    title?: string
    /** Строка типа документа над разделителем. */
    summary: AvantiDocumentSummary
    /** Надпись над списком требуемых документов. */
    optionsLabel: string
    options: AvantiDocumentOption[]
    /** Выбранный тип документа. Работает как `v-model:selected-option-id`. */
    selectedOptionId?: string
    /** Тексты зоны перетаскивания. Нужны только вместе с `showDropzone`. */
    dropzone?: AvantiDocumentsDropzoneContent
    /**
     * Показать зону перетаскивания файла. По умолчанию выключена — НЕТ
     * В МАКЕТЕ: этого блока нет ни в одном кадре, он сделан сверх задания
     * и ждёт согласования с заказчиком.
     */
    showDropzone?: boolean
    files?: AvantiDocumentFile[]
    /** Доступное имя списка файлов. */
    filesLabel?: string
    /** Текст узкой плашки ошибки под списком файлов. */
    errorText?: string
    /** Плашка результата: показывается в состоянии `verified`. */
    result?: AvantiDocumentsResultContent
    /** Кнопки действий. Не заданы — блок кнопок не выводится. */
    actions?: AvantiDocumentsActionsContent
    submitDisabled?: boolean
    /** Сноска о форматах и размере файлов. */
    note?: string
    /** Разрешить выбор нескольких файлов сразу. */
    multiple?: boolean
  }>(),
  {
    state: 'upload',
    title: '',
    selectedOptionId: undefined,
    dropzone: undefined,
    showDropzone: false,
    files: () => [],
    filesLabel: undefined,
    errorText: '',
    result: undefined,
    actions: undefined,
    submitDisabled: false,
    note: '',
    multiple: false,
  },
)

const emit = defineEmits<{
  /** Пользователь выбрал или перетащил файлы. Реальной отправки нет. */
  select: [files: File[]]
  /** Половина `v-model:selected-option-id`. */
  'update:selectedOptionId': [id: string]
  /** Нажата кнопка «Sostituisci» у строки файла. */
  replace: [id: string]
  /** Нажата основная кнопка. */
  submit: []
  /** Нажата вторичная кнопка. */
  secondary: []
}>()

/** Общее имя группы переключателей: у каждой панели на странице своё. */
const groupName = `${useId()}-document-type`

/** Плашка результата заменяет собой список и кнопки. */
const showResult = computed(() => props.state === 'verified' && props.result !== undefined)

/** Блок под списком вариантов: строки файлов и плашка ошибки идут с шагом 8px. */
const hasUploads = computed(() => props.files.length > 0 || Boolean(props.errorText))

function handleOptionSelect(id: string): void {
  emit('update:selectedOptionId', id)
}

function handleFilesSelect(files: File[]): void {
  emit('select', files)
}

function handleReplace(id: string): void {
  emit('replace', id)
}

function handleSubmit(): void {
  emit('submit')
}

function handleSecondary(): void {
  emit('secondary')
}
</script>

<style lang="scss" scoped>
.avanti-documents-panel {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 100%;

  /*
   * Шапка отделена линией во всю ширину окна: панель раздвигает её на поля
   * оболочки. Ширину полей даёт `--avanti-modal-pad` от `avanti_modal`;
   * вне окна переменной нет и запасной ноль оставляет линию по ширине панели.
   */
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: var(--avanti-modal-pad, 0);
    padding-bottom: 16px;
    padding-left: var(--avanti-modal-pad, 0);
    margin-right: calc(-1 * var(--avanti-modal-pad, 0px));
    margin-left: calc(-1 * var(--avanti-modal-pad, 0px));
    border-bottom: 1px solid var(--avanti-color-divider);
  }

  &__title {
    margin: 0;
    font-size: 16px;
    font-weight: var(--avanti-font-weight-bold);
    line-height: normal;
    color: var(--avanti-color-text-strong);
  }

  &__body {
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
    width: 100%;
  }

  /* Отступ появляется только когда над телом есть шапка. */
  &__header + &__body {
    padding-top: 20px;
  }

  &__divider {
    width: 100%;
    height: 1px;
    background-color: var(--avanti-color-border);
  }

  /* Строки файлов и плашка ошибки — часть списка вариантов, шаг 8px. */
  &__uploads {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
    margin-top: -8px;
  }

  &__files {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
    padding: 0;
    margin: 0;
    list-style: none;
  }

  &__note {
    width: 100%;
    margin: 0;
    font-size: 10px;
    font-weight: var(--avanti-font-weight-regular);
    line-height: 1.4;
    color: var(--avanti-color-text-tertiary);
  }

  @include desktop-up {
    &__title {
      font-size: 18px;
    }
  }
}
</style>
