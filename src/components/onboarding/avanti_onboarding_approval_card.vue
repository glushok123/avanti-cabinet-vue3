<!--
  Карточка одобренной суммы: подпись, сумма крупным начертанием
  и условия кредита (платёж, срок, ставка).
-->
<template>
  <div class="avanti-onboarding-approval-card">
    <p class="avanti-onboarding-approval-card__label">{{ label }}</p>
    <p class="avanti-onboarding-approval-card__amount">{{ amount }}</p>
    <dl class="avanti-onboarding-approval-card__details" :class="detailsClass">
      <div v-for="detail in details" :key="detail.id" class="avanti-onboarding-approval-card__row">
        <dt class="avanti-onboarding-approval-card__term">{{ detail.label }}</dt>
        <dd class="avanti-onboarding-approval-card__value">{{ detail.value }}</dd>
      </div>
    </dl>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { AvantiApprovalDetail } from '@/types/avanti_onboarding'

const props = defineProps<{
  /** Подпись над суммой. */
  label: string
  /** Одобренная сумма с символом валюты. */
  amount: string
  /** Условия кредита строками «подпись — значение». */
  details: AvantiApprovalDetail[]
  /**
   * Условия идут одним абзацем через «·», а не отдельными строками.
   * Так они набраны в кадрах авторизации, где карточка на 27px ниже.
   */
  inlineDetails?: boolean
}>()

const detailsClass = computed<string | null>(() =>
  props.inlineDetails ? 'avanti-onboarding-approval-card__details--inline' : null,
)
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
   * Условия одним абзацем: строки перетекают друг в друга и разделяются
   * точкой по центру, как в кадрах авторизации.
   */
  &__details--inline {
    display: block;

    .avanti-onboarding-approval-card__row {
      display: inline;
    }

    .avanti-onboarding-approval-card__row + .avanti-onboarding-approval-card__row::before {
      content: ' · ';
    }
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
    /* Кадр карточки 633x293: отступы 33/41, шаг между блоками 16. */
    gap: 16px;
    padding: 33px 41px;
    border-radius: var(--avanti-radius-4xl);

    .avanti-onboarding-approval-card__label {
      /*
       * Строка подписи в макете 27px: `normal` даёт 26 и тянет сумму вверх.
       * Трекинг сводит ширину надписи к макетным 230px.
       */
      font-size: 22px;
      line-height: 27px;
      letter-spacing: -0.15px;
    }

    .avanti-onboarding-approval-card__amount {
      /*
       * Сумма набрана крупнее номинала макета: при 72px Chrome рисует
       * начертание Inter на 4% мельче кегля Figma, и высота цифр не сходится.
       * Кегль подобран по растру, строка при этом жёстко равна макетным 87px.
       */
      font-size: 75px;
      line-height: 87px;
    }

    .avanti-onboarding-approval-card__details {
      /* Три строки условий занимают в макете 81px — по 27px на строку. */
      font-size: 22px;
      line-height: 27px;
    }

    .avanti-onboarding-approval-card__value {
      font-weight: var(--avanti-font-weight-medium);
    }
  }
}
</style>
