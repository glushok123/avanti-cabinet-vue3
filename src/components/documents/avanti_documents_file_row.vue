<!--
  Строка загруженного файла (Figma 95:4941): иконка с галочкой, имя файла,
  размер со статусом и кнопка замены справа.
-->
<template>
  <div class="avanti-documents-file-row" :class="statusClass">
    <span class="avanti-documents-file-row__lead">
      <span class="avanti-documents-file-row__icon">
        <AvantiIconCheck v-if="verified" />
        <AvantiDocumentsIconError v-else-if="failed" />
        <AvantiIconDocuments v-else />
      </span>
      <span class="avanti-documents-file-row__text">
        <span class="avanti-documents-file-row__name">{{ file.name }}</span>
        <span class="avanti-documents-file-row__meta">
          <span class="avanti-documents-file-row__size">{{ file.size }}</span>
          <span class="avanti-documents-file-row__separator">·</span>
          <span class="avanti-documents-file-row__status">{{ file.statusLabel }}</span>
        </span>
      </span>
    </span>
    <button class="avanti-documents-file-row__action" type="button" @click="handleReplace">
      {{ file.actionLabel }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import AvantiDocumentsIconError from '@/components/documents/avanti_documents_icon_error.vue'
import AvantiIconCheck from '@/components/icons/avanti_icon_check.vue'
import AvantiIconDocuments from '@/components/icons/avanti_icon_documents.vue'
import type { AvantiDocumentFile } from '@/types/avanti_documents'

const props = defineProps<{ file: AvantiDocumentFile }>()

const emit = defineEmits<{ replace: [id: string] }>()

const statusClass = computed(() => `avanti-documents-file-row--${props.file.status}`)
const verified = computed(() => props.file.status === 'verified' || props.file.status === 'uploaded')
const failed = computed(() => props.file.status === 'failed')

function handleReplace(): void {
  emit('replace', props.file.id)
}
</script>

<style lang="scss" scoped>
/* Радиус подложки иконки — 10px, токена под это значение нет. */
$icon-radius: 10px;

.avanti-documents-file-row {
  @include inner-border(var(--avanti-color-primary));

  display: flex;
  gap: 14px;
  align-items: center;
  width: 100%;
  padding: 14px 12px;
  background-color: var(--avanti-color-surface);
  border-radius: var(--avanti-radius-md);

  &__lead {
    display: flex;
    flex-shrink: 0;
    gap: 12px;
    align-items: center;
    min-width: 0;
  }

  &__icon {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    color: var(--avanti-color-primary);
    background-color: var(--avanti-color-primary-soft);
    border-radius: $icon-radius;

    svg {
      width: 20px;
      height: 20px;
    }
  }

  &__text {
    display: flex;
    flex-direction: column;
    gap: 2px;
    align-items: flex-start;
    min-width: 0;
    line-height: normal;
  }

  &__name {
    max-width: 100%;
    overflow: hidden;
    font-size: 13px;
    font-weight: var(--avanti-font-weight-semibold);
    color: var(--avanti-color-text-strong);
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__meta {
    display: flex;
    gap: 4px;
    align-items: center;
    font-size: 11px;
    font-weight: var(--avanti-font-weight-regular);
    color: var(--avanti-color-text-secondary);
  }

  /* Кнопка замены тянется на остаток строки — как в макете. */
  &__action {
    @include button-reset;
    @include focus-ring;
    @include inner-border(var(--avanti-color-primary), 1.5px);

    display: flex;
    flex: 1 1 0;
    align-items: center;
    justify-content: center;
    min-width: 0;
    height: 36px;
    padding: 8px 16px;
    font-size: 12px;
    font-weight: var(--avanti-font-weight-semibold);
    line-height: normal;
    color: var(--avanti-color-primary);
    white-space: nowrap;
    border-radius: var(--avanti-radius-sm);
    transition: background-color var(--avanti-transition-fast);

    &:hover {
      background-color: var(--avanti-color-primary-soft);
    }
  }

  /* --- Неудачная загрузка: строка и кнопка краснеют --- */
  &--failed {
    @include inner-border(var(--avanti-color-danger-dark));

    .avanti-documents-file-row__icon {
      color: var(--avanti-color-danger-dark);
      background-color: var(--avanti-color-surface-muted);
    }

    .avanti-documents-file-row__action {
      @include inner-border(var(--avanti-color-danger-dark), 1.5px);

      color: var(--avanti-color-danger-dark);

      &:hover {
        background-color: var(--avanti-color-surface-muted);
      }
    }
  }

  @include desktop-up {
    &__name {
      font-size: 15px;
    }

    &__meta {
      font-size: 13px;
    }
  }
}
</style>
