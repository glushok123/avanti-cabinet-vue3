<!--
  Строка «этап — состояние» в блоке проверки экрана ожидания.
  Завершённый этап (проп emphasized) выделен более крупной и тёмной подписью —
  в макете это единственное отличие первой строки от второй.
-->
<template>
  <div class="avanti-onboarding-check-row">
    <span
      class="avanti-onboarding-check-row__label"
      :class="{ 'avanti-onboarding-check-row__label--emphasized': emphasized }"
      >{{ label }}</span
    >
    <span class="avanti-onboarding-check-row__value">{{ value }}</span>
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

  &__label {
    font-size: 13px;
    font-weight: var(--avanti-font-weight-regular);
    line-height: normal;
    color: var(--avanti-color-text-muted);
    letter-spacing: 0.52px;

    &--emphasized {
      font-size: 14px;
      font-weight: var(--avanti-font-weight-medium);

      /* Точный цвет макета #393939; ближайший токен — text-label (#464646). */
      color: var(--avanti-color-text-label);
      letter-spacing: 0.56px;
    }
  }

  &__value {
    flex-shrink: 0;
    font-size: 12px;
    font-weight: var(--avanti-font-weight-regular);
    line-height: normal;
    color: var(--avanti-color-text-muted);
    text-transform: uppercase;
    letter-spacing: 0.48px;
  }

  @include desktop-up {
    .avanti-onboarding-check-row__label {
      font-size: 20px;
      letter-spacing: 0.8px;

      &--emphasized {
        font-size: 22px;
        letter-spacing: 0.88px;
      }
    }

    .avanti-onboarding-check-row__value {
      font-size: 20px;
      letter-spacing: 0.8px;
    }
  }
}
</style>
