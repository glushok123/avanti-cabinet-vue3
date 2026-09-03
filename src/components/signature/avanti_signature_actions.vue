<!--
  Кнопки панели подписания (Figma 1:2572): контурная «Cancella» слева и
  залитая «Conferma Firma» справа, обе 220×50 с зазором между колонками.
  Собственные стили, а не `avanti_button`: у базовой кнопки другие
  десктопные габариты (60px и 24px текста) — в этом окне они не подходят.
-->
<template>
  <div class="avanti-signature-actions">
    <button
      class="avanti-signature-actions__button avanti-signature-actions__button--cancel"
      type="button"
      @click="handleCancel"
    >
      {{ texts.cancelLabel }}
    </button>
    <button
      class="avanti-signature-actions__button avanti-signature-actions__button--confirm"
      type="button"
      :disabled="confirmDisabled"
      @click="handleConfirm"
    >
      {{ texts.confirmLabel }}
      <span class="avanti-signature-actions__accent">{{ texts.confirmAccent }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import type { AvantiSignatureActionsTexts } from '@/types/avanti_signature'

withDefaults(
  defineProps<{
    texts: AvantiSignatureActionsTexts
    /** Подтверждение заблокировано, пока подпись не поставлена. */
    confirmDisabled?: boolean
  }>(),
  { confirmDisabled: false },
)

const emit = defineEmits<{ cancel: []; confirm: [] }>()

function handleCancel(): void {
  emit('cancel')
}

function handleConfirm(): void {
  emit('confirm')
}
</script>

<style lang="scss" scoped>
.avanti-signature-actions {
  display: flex;
  gap: 36px;
  align-items: stretch;
  justify-content: space-between;
  width: 100%;

  &__button {
    @include button-reset;
    @include focus-ring;

    display: inline-flex;
    flex: 1 1 0;
    gap: 6px;
    align-items: center;
    justify-content: center;
    height: 50px;
    padding: 8px 16px;
    font-size: 16px;
    font-weight: var(--avanti-font-weight-medium);
    line-height: 20px;
    text-align: center;
    text-transform: uppercase;
    border-radius: var(--avanti-radius-sm);
    transition:
      background-color var(--avanti-transition-base),
      color var(--avanti-transition-base),
      opacity var(--avanti-transition-base);

    &:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }

  /* Контурная: обводка рисуется внутрь, чтобы высота осталась ровно 50px. */
  &__button--cancel {
    @include inner-border(var(--avanti-color-primary), 1px, var(--avanti-shadow-field));

    color: var(--avanti-color-primary);
    background-color: var(--avanti-color-surface-zebra);

    &:hover {
      background-color: var(--avanti-color-primary-soft);
    }
  }

  &__button--confirm {
    color: var(--avanti-color-text-on-primary);
    background-color: var(--avanti-color-primary);
    box-shadow: var(--avanti-shadow-field);

    &:hover:not(:disabled) {
      background-color: var(--avanti-color-primary-dark);
    }
  }

  /* Второе слово в макете набрано жирным начертанием. */
  &__accent {
    font-weight: var(--avanti-font-weight-bold);
  }

  /* Мобильного макета нет: кнопки становятся в столбец на всю ширину. */
  @include mobile {
    flex-direction: column;
    gap: 12px;

    &__button {
      flex: 0 0 auto;
      width: 100%;
      font-size: 15px;
    }
  }
}
</style>
