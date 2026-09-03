<!--
  Строка типа документа в начале тела панели (Figma 95:3867 / 95:7160):
  иконка файла, подпись с названием документа и бейдж статуса справа.
-->
<template>
  <div class="avanti-documents-type-row">
    <span class="avanti-documents-type-row__icon">
      <AvantiIconDocuments />
    </span>
    <span class="avanti-documents-type-row__text">
      <span v-if="summary.label" class="avanti-documents-type-row__label">{{ summary.label }}</span>
      <span class="avanti-documents-type-row__name">{{ summary.name }}</span>
    </span>
    <span class="avanti-documents-type-row__badge" :class="badgeClass">
      {{ summary.statusLabel }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import AvantiIconDocuments from '@/components/icons/avanti_icon_documents.vue'
import type { AvantiDocumentSummary } from '@/types/avanti_documents'

const props = defineProps<{ summary: AvantiDocumentSummary }>()

/** Неудачная проверка красит бейдж в красный, остальные статусы — бирюзовый. */
const badgeClass = computed(() => `avanti-documents-type-row__badge--${props.summary.status}`)
</script>

<style lang="scss" scoped>
/* Радиус подложки иконки — 10px, в палитре токена под это значение нет. */
$icon-radius: 10px;

.avanti-documents-type-row {
  @include inner-border(var(--avanti-color-border-soft));

  display: flex;
  gap: 12px;
  align-items: center;
  width: 100%;
  padding: 12px;
  background-color: var(--avanti-color-surface-muted);
  border-radius: var(--avanti-radius-md);

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
    flex: 1 1 0;
    flex-direction: column;
    gap: 2px;
    align-items: flex-start;
    min-width: 0;
    line-height: normal;
  }

  &__label {
    font-size: 11px;
    font-weight: var(--avanti-font-weight-medium);
    color: var(--avanti-color-text-secondary);
  }

  &__name {
    font-size: 13px;
    font-weight: var(--avanti-font-weight-semibold);
    color: var(--avanti-color-text-strong);
  }

  &__badge {
    @include inner-border(var(--avanti-color-primary));

    flex-shrink: 0;
    padding: 4px 8px;
    font-size: 10px;
    font-weight: var(--avanti-font-weight-bold);
    line-height: normal;
    color: var(--avanti-color-primary);
    white-space: nowrap;
    background-color: var(--avanti-color-surface);
    border-radius: var(--avanti-radius-pill);

    &--failed {
      @include inner-border(var(--avanti-color-danger-dark));

      color: var(--avanti-color-danger-dark);
    }
  }

  /* Десктопное окно шире мобильного, подписи в макете на два пункта крупнее. */
  @include desktop-up {
    &__label {
      font-size: 13px;
    }

    &__name {
      font-size: 15px;
    }
  }
}
</style>
