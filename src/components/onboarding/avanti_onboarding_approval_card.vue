<!--
  Карточка одобренной суммы: подпись, сумма крупным начертанием
  и условия кредита (платёж, срок, ставка).
-->
<template>
  <div class="avanti-onboarding-approval-card">
    <p class="avanti-onboarding-approval-card__label">{{ label }}</p>
    <p class="avanti-onboarding-approval-card__amount">{{ amount }}</p>
    <dl class="avanti-onboarding-approval-card__details">
      <div v-for="detail in details" :key="detail.id" class="avanti-onboarding-approval-card__row">
        <dt class="avanti-onboarding-approval-card__term">{{ detail.label }}</dt>
        <dd class="avanti-onboarding-approval-card__value">{{ detail.value }}</dd>
      </div>
    </dl>
  </div>
</template>

<script setup lang="ts">
import type { AvantiApprovalDetail } from '@/types/avanti_onboarding'

defineProps<{
  /** Подпись над суммой. */
  label: string
  /** Одобренная сумма с символом валюты. */
  amount: string
  /** Условия кредита строками «подпись — значение». */
  details: AvantiApprovalDetail[]
}>()
</script>

<style lang="scss" scoped>
.avanti-onboarding-approval-card {
  /* Обводка рисуется внутрь: габариты совпадают с кадром Figma. */
  @include inner-border(var(--avanti-color-primary), 1px, var(--avanti-shadow-amount-card));

  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
  padding: 24px;
  text-transform: uppercase;
  background-color: var(--avanti-color-primary-surface);
  border-radius: var(--avanti-radius-3xl);

  &__label {
    font-size: 14px;
    font-weight: var(--avanti-font-weight-light);
    line-height: normal;
    color: var(--avanti-color-primary);
  }

  &__amount {
    font-size: 48px;
    font-weight: var(--avanti-font-weight-bold);
    line-height: normal;
    color: var(--avanti-color-primary);
  }

  &__details {
    display: flex;
    flex-direction: column;
    font-size: 16px;
    line-height: 1.4;
    color: var(--avanti-color-text-terms);
  }

  /*
   * Строка условия — строчный контейнер: подпись и значение должны
   * переноситься как единый абзац, а не как две колонки списка.
   */
  &__row {
    display: block;
  }

  &__term {
    display: inline;
    font-weight: var(--avanti-font-weight-light);
  }

  &__value {
    display: inline;
    margin: 0 0 0 0.25em;
    font-weight: var(--avanti-font-weight-semibold);
  }

  @include desktop-up {
    gap: 16px;
    padding: 32px 40px;
    border-radius: var(--avanti-radius-4xl);

    .avanti-onboarding-approval-card__label {
      font-size: 22px;
    }

    .avanti-onboarding-approval-card__amount {
      font-size: 72px;
    }

    .avanti-onboarding-approval-card__details {
      font-size: 22px;
      line-height: normal;
    }

    .avanti-onboarding-approval-card__value {
      font-weight: var(--avanti-font-weight-medium);
    }
  }
}
</style>
