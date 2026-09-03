<!--
  Кнопки действий панели документов (Figma 95:4950): основная кнопка
  «Carica il documento» на всю ширину и необязательная вторичная кнопка.
  Пока файл не выбран, основная кнопка в макете погашена до 50% прозрачности —
  это состояние `disabled`.
-->
<template>
  <div class="avanti-documents-actions">
    <button class="avanti-documents-actions__submit" type="button" :disabled="disabled" @click="handleSubmit">
      {{ actions.submitLabel }}
    </button>
    <button
      v-if="actions.secondaryLabel"
      class="avanti-documents-actions__secondary"
      type="button"
      @click="handleSecondary"
    >
      {{ actions.secondaryLabel }}
    </button>
  </div>
</template>

<script setup lang="ts">
import type { AvantiDocumentsActions } from '@/types/avanti_documents'

defineProps<{
  actions: AvantiDocumentsActions
  disabled?: boolean
}>()

const emit = defineEmits<{
  submit: []
  secondary: []
}>()

function handleSubmit(): void {
  emit('submit')
}

function handleSecondary(): void {
  emit('secondary')
}
</script>

<style lang="scss" scoped>
.avanti-documents-actions {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;

  &__submit,
  &__secondary {
    @include button-reset;
    @include focus-ring;

    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 48px;
    padding: 12px 16px;
    font-family: var(--avanti-font-family-alt);
    font-size: 15px;
    font-weight: var(--avanti-font-weight-semibold);
    line-height: normal;
    border-radius: var(--avanti-radius-sm);
    transition:
      background-color var(--avanti-transition-base),
      opacity var(--avanti-transition-base);
  }

  &__submit {
    color: var(--avanti-color-text-on-primary);
    background-color: var(--avanti-color-primary);
    box-shadow: var(--avanti-shadow-unlock-glow-mobile);

    &:hover:not(:disabled) {
      background-color: var(--avanti-color-primary-dark);
    }

    &:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }

  &__secondary {
    @include inner-border(var(--avanti-color-primary), 1.5px);

    color: var(--avanti-color-primary);
    background-color: var(--avanti-color-surface);

    &:hover {
      background-color: var(--avanti-color-primary-soft);
    }
  }
}
</style>
