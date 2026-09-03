<!--
  Зона загрузки файла с перетаскиванием. Отдельного кадра в Figma нет —
  блок собран из токенов панели документов (см. отчёт).
  Поле выбора файла скрыто визуально, но остаётся в потоке фокуса: клавиатурой
  зона открывается так же, как мышью, — Enter на поле вызывает диалог выбора.
-->
<template>
  <div
    class="avanti-documents-dropzone"
    :class="{ 'avanti-documents-dropzone--dragging': dragging }"
    @dragenter.prevent="handleDragEnter"
    @dragover.prevent
    @dragleave="handleDragLeave"
    @drop.prevent="handleDrop"
  >
    <input
      :id="inputId"
      class="avanti-documents-dropzone__input"
      type="file"
      :accept="dropzone.accept"
      :multiple="multiple"
      :disabled="disabled"
      @change="handleChange"
    />
    <label class="avanti-documents-dropzone__label" :for="inputId">
      <span class="avanti-documents-dropzone__icon">
        <AvantiIconUpload />
      </span>
      <span class="avanti-documents-dropzone__title">{{ title }}</span>
      <span class="avanti-documents-dropzone__hint">{{ dropzone.hint }}</span>
      <span class="avanti-documents-dropzone__link">{{ dropzone.linkLabel }}</span>
    </label>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, useId } from 'vue'
import AvantiIconUpload from '@/components/icons/avanti_icon_upload.vue'
import type { AvantiDocumentsDropzone } from '@/types/avanti_documents'

const props = withDefaults(
  defineProps<{
    dropzone: AvantiDocumentsDropzone
    multiple?: boolean
    disabled?: boolean
  }>(),
  {
    multiple: false,
    disabled: false,
  },
)

const emit = defineEmits<{ select: [files: File[]] }>()

const inputId = `${useId()}-file`

/**
 * Счётчик входов курсора: dragenter/dragleave приходят и от вложенных
 * элементов, поэтому подсветка снимается только когда счётчик обнулился.
 */
const dragDepth = ref(0)
const dragging = computed(() => dragDepth.value > 0)
const title = computed(() => (dragging.value ? props.dropzone.dragLabel : props.dropzone.title))

function emitFiles(list: FileList | null): void {
  const files = list ? Array.from(list) : []
  if (files.length > 0) {
    emit('select', files)
  }
}

function handleChange(event: Event): void {
  const input = event.target as HTMLInputElement
  emitFiles(input.files)
  /* Сброс значения: тот же файл можно выбрать повторно. */
  input.value = ''
}

function handleDragEnter(): void {
  if (!props.disabled) {
    dragDepth.value += 1
  }
}

function handleDragLeave(): void {
  dragDepth.value = Math.max(0, dragDepth.value - 1)
}

function handleDrop(event: DragEvent): void {
  dragDepth.value = 0
  if (!props.disabled) {
    emitFiles(event.dataTransfer?.files ?? null)
  }
}
</script>

<style lang="scss" scoped>
.avanti-documents-dropzone {
  width: 100%;
  background-color: var(--avanti-color-surface-muted);
  border: 1px dashed var(--avanti-color-primary-soft-border);
  border-radius: var(--avanti-radius-md);
  transition:
    background-color var(--avanti-transition-fast),
    border-color var(--avanti-transition-fast);

  &__input {
    @include visually-hidden;
  }

  &__label {
    display: flex;
    flex-direction: column;
    gap: 6px;
    align-items: center;
    justify-content: center;
    padding: 20px 16px;
    text-align: center;
    cursor: pointer;
  }

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    margin-bottom: 2px;
    color: var(--avanti-color-primary);
    background-color: var(--avanti-color-primary-soft);
    border-radius: var(--avanti-radius-round);

    svg {
      width: 20px;
      height: 20px;
    }
  }

  &__title {
    font-size: 13px;
    font-weight: var(--avanti-font-weight-semibold);
    line-height: normal;
    color: var(--avanti-color-text-strong);
  }

  &__hint {
    font-size: 11px;
    font-weight: var(--avanti-font-weight-regular);
    line-height: normal;
    color: var(--avanti-color-text-secondary);
  }

  &__link {
    font-size: 12px;
    font-weight: var(--avanti-font-weight-semibold);
    line-height: normal;
    color: var(--avanti-color-primary);
    text-decoration: underline;
  }

  /* Пока файл держат над зоной — подсветка фирменным цветом. */
  &--dragging {
    background-color: var(--avanti-color-primary-soft);
    border-color: var(--avanti-color-primary);
  }

  /* Фокус приходит на скрытое поле — рамку рисуем вокруг всей зоны. */
  &__input:focus-visible + &__label {
    border-radius: var(--avanti-radius-md);
    outline: 2px solid var(--avanti-color-primary);
    outline-offset: -2px;
  }

  &__input:disabled + &__label {
    cursor: not-allowed;
    opacity: 0.5;
  }

  @include desktop-up {
    &__title {
      font-size: 15px;
    }

    &__hint {
      font-size: 13px;
    }
  }
}
</style>
