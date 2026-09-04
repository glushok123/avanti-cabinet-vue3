<!--
  Строка «этап — состояние» в блоке проверки экрана ожидания.
  Завершённый этап (проп emphasized) выделен более крупной и тёмной подписью,
  а на мобильной (кадр 1:4683) ещё и зелёным словом «Verificata»;
  на десктопе (кадр 0:1097) состояние обеих строк набрано одинаково серым.
-->
<template>
  <div class="avanti-onboarding-check-row">
    <span
      class="avanti-onboarding-check-row__label"
      :class="{ 'avanti-onboarding-check-row__label--emphasized': emphasized }"
      >{{ label }}</span
    >
    <span
      class="avanti-onboarding-check-row__value"
      :class="{ 'avanti-onboarding-check-row__value--emphasized': emphasized }"
      >{{ value }}</span
    >
  </div>
</template>

<script setup lang="ts">
defineProps<{
  /** Название этапа. */
  label: string
  /** Состояние этапа, выводится капслоком. */
  value: string
  /** Этап уже пройден — подпись крупнее и темнее. */
  emphasized: boolean
}>()
</script>

<style lang="scss" scoped>
.avanti-onboarding-check-row {
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  /* Кадры 1:4684 и 1:4687: 14px, разрядки в мобильном кадре нет. */
  &__label {
    font-size: 14px;
    font-weight: var(--avanti-font-weight-regular);
    line-height: normal;
    color: var(--avanti-color-text-muted);

    &--emphasized {
      font-weight: var(--avanti-font-weight-medium);
      color: var(--avanti-color-text-dark);
    }
  }

  /* Кадры 1:4685 и 1:4688: 13px SemiBold капслоком. */
  &__value {
    flex-shrink: 0;
    font-size: 13px;
    font-weight: var(--avanti-font-weight-semibold);
    line-height: normal;
    color: var(--avanti-color-text-muted);
    text-transform: uppercase;

    &--emphasized {
      color: var(--avanti-color-success-dark);
    }
  }

  @include desktop-up {
    .avanti-onboarding-check-row__label {
      font-size: 20px;
      letter-spacing: 0.8px;

      /* Десктопный кадр 0:1098: подпись темнее мобильной и крупнее. */
      &--emphasized {
        font-size: 22px;
        color: var(--avanti-color-text-step-done);
        letter-spacing: 0.88px;
      }
    }

    /* Десктопный кадр 0:1099: состояние набрано обычным серым. */
    .avanti-onboarding-check-row__value {
      font-size: 20px;
      font-weight: var(--avanti-font-weight-regular);
      letter-spacing: 0.8px;

      &--emphasized {
        color: var(--avanti-color-text-muted);
      }
    }
  }
}
</style>
