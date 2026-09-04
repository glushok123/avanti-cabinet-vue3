<!--
  Карточка подтверждения просмотра сертификата (кадры 256:12458 — десктоп
  573×310, 232:16494 — мобильная 350×335): щит с заголовком, пояснение,
  бирюзовая плашка с чекбоксом и кнопка подтверждения.

  Чекбокс — общий `avanti_checkbox`: в кадре он крупнее и подан «мягко»
  (бирюзовая заливка, галочка фирменного цвета, подпись в две строки),
  поэтому его оформление правится отсюда через `:deep` — заводить ради
  одного экрана вариант в общем компоненте не потребовалось.
-->
<template>
  <section class="avanti-certificate-confirmation-card">
    <div class="avanti-certificate-confirmation-card__header">
      <span class="avanti-certificate-confirmation-card__icon">
        <!-- Обводка глифа в кадре 2px при размере 30px: щит нарисован
             в системе координат 19.5556, отсюда 2 × 19.5556 / 30. -->
        <AvantiIconShield :stroke-width="1.3037" />
      </span>
      <div class="avanti-certificate-confirmation-card__titles">
        <p class="avanti-certificate-confirmation-card__label">{{ label }}</p>
        <h2 class="avanti-certificate-confirmation-card__title">{{ title }}</h2>
      </div>
    </div>

    <p class="avanti-certificate-confirmation-card__description">{{ description }}</p>

    <div class="avanti-certificate-confirmation-card__checkbox">
      <AvantiCheckbox v-model="confirmed">{{ checkboxLabel }}</AvantiCheckbox>
    </div>

    <AvantiButton
      class="avanti-certificate-confirmation-card__action"
      size="md"
      :disabled="!confirmed"
      @click="emit('confirm')"
    >
      {{ actionLabel }}
    </AvantiButton>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AvantiButton from '@/components/ui/avanti_button.vue'
import AvantiCheckbox from '@/components/ui/avanti_checkbox.vue'
import AvantiIconShield from '@/components/icons/avanti_icon_shield.vue'
import type { AvantiCertificateConfirmationContent } from '@/types/avanti_certificate'

defineProps<AvantiCertificateConfirmationContent>()

const emit = defineEmits<{
  /** Нажата кнопка подтверждения. */
  confirm: []
}>()

/** В кадрах чекбокс уже отмечен, поэтому исходное состояние — «отмечен». */
const confirmed = ref(true)
</script>

<style lang="scss" scoped>
.avanti-certificate-confirmation-card {
  display: flex;
  flex-direction: column;
  gap: 20px;

  /* Габариты кадра 232:16494: поля 28/20, скругление 24px. */

  /* Ширина задаётся здесь: оболочка окна в варианте `bare` её не держит.
     `width: 100%` обязателен — при `margin-inline: auto` флекс-контейнер
     окна перестаёт растягивать карточку, и она сжимается по содержимому. */
  width: 100%;
  max-width: 350px;
  padding: 28px 20px;
  margin-inline: auto;
  background-color: var(--avanti-color-surface);
  border-radius: var(--avanti-radius-4xl);
  box-shadow: var(--avanti-shadow-confirmation-card);

  &__header {
    display: flex;
    gap: 12px;
    align-items: flex-start;
  }

  &__icon {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    color: var(--avanti-color-primary);
  }

  &__icon :deep(svg) {
    width: 30px;
    height: 30px;
  }

  &__titles {
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    gap: 4px;
    min-width: 0;
  }

  &__label {
    font-size: 11px;
    font-weight: var(--avanti-font-weight-bold);
    line-height: normal;
    color: var(--avanti-color-text-confirm-label);
    text-transform: uppercase;
  }

  &__title {
    font-size: 19px;
    font-weight: var(--avanti-font-weight-extrabold);
    line-height: 1.2;
    color: var(--avanti-color-text-confirm-title);
  }

  &__description {
    font-size: 14px;
    font-weight: var(--avanti-font-weight-regular);
    line-height: 1.45;
    color: var(--avanti-color-text-terms);
  }

  /* Плашка вокруг чекбокса: заливка и обводка одного цвета (кадр 232:16503). */
  &__checkbox {
    @include inner-border(var(--avanti-color-primary-soft));

    padding: 16px;
    background-color: var(--avanti-color-primary-soft);
    border-radius: var(--avanti-radius-md);
  }

  /* --- Оформление общего чекбокса под кадр 232:16504 --- */
  &__checkbox :deep(.avanti-checkbox) {
    gap: 12px;
    width: 100%;
  }

  &__checkbox :deep(.avanti-checkbox__box) {
    width: 20px;
    height: 20px;
    color: var(--avanti-color-primary);
    background-color: var(--avanti-color-primary-soft);
    border-width: 2px;
    border-radius: 5px;
  }

  /* Отмеченный чекбокс в кадре остаётся бирюзовым, галочка — фирменного цвета. */
  &__checkbox :deep(.avanti-checkbox__input:checked + .avanti-checkbox__box) {
    background-color: var(--avanti-color-primary-soft);
  }

  &__checkbox :deep(.avanti-checkbox__box svg) {
    width: 12px;
    height: 12px;
  }

  &__checkbox :deep(.avanti-checkbox__label) {
    font-family: var(--avanti-font-family-base);
    font-size: 13.5px;
    font-weight: var(--avanti-font-weight-bold);
    line-height: 1.3;
    color: var(--avanti-color-text-confirm-title);
    white-space: normal;
  }

  /* Кнопка в кадре во всю ширину, 48px, скругление 10px, надпись жирная. */
  & &__action {
    height: 48px;
    font-size: 15px;
    font-weight: var(--avanti-font-weight-bold);

    /* Скругление 10px встречается только здесь, отдельного токена под него нет. */
    border-radius: 10px;
  }

  @include desktop-up {
    /* Кадр 256:12458: карточка 573px, шрифты крупнее. */
    max-width: 573px;

    &__header {
      align-items: center;
    }

    &__label {
      font-size: 14px;
    }

    &__title {
      font-size: 22px;

      /* Кадр 256:12465: строка заголовка 26px. */
      line-height: 26px;
    }

    &__description {
      font-size: 18px;

      /* Две строки 18px занимают в кадре 44px — по 22px на строку. */
      line-height: 22px;
    }

    &__checkbox :deep(.avanti-checkbox__label) {
      font-size: 18px;
    }

    & &__action {
      font-size: 20px;
    }
  }
}
</style>
