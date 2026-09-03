<!--
  Строка карточки итогов: подпись, крупное значение и единица измерения.
  Единица необязательна — в строке «Mesi» её в макете нет.
-->
<template>
  <div class="avanti-simulation-summary-row">
    <p class="avanti-simulation-summary-row__label">{{ label }}</p>
    <p class="avanti-simulation-summary-row__value">
      <span class="avanti-simulation-summary-row__number">{{ value }}</span>
      <span v-if="unit" class="avanti-simulation-summary-row__unit">{{ unit }}</span>
    </p>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    /** Подпись строки, например «Importo richiesto». */
    label: string
    /** Готовая строка значения. */
    value: string
    /** Единица измерения справа от значения. */
    unit?: string
  }>(),
  { unit: undefined },
)
</script>

<style lang="scss" scoped>
.avanti-simulation-summary-row {
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
  white-space: nowrap;

  &__label {
    font-size: 14px;
    font-weight: var(--avanti-font-weight-regular);
    line-height: normal;
    color: var(--avanti-color-text-on-primary-dim);
  }

  &__number {
    font-size: 24px;
    font-weight: var(--avanti-font-weight-bold);
    line-height: normal;
    color: var(--avanti-color-text-on-primary);
  }

  &__unit {
    margin-left: 0.25em;
    font-size: 18px;
    font-weight: var(--avanti-font-weight-medium);
    line-height: normal;
    color: var(--avanti-color-text-on-primary);
  }

  @include desktop-up {
    width: auto;

    .avanti-simulation-summary-row__label {
      font-size: 28px;
    }

    .avanti-simulation-summary-row__number {
      font-size: 40px;
      font-weight: var(--avanti-font-weight-semibold);
    }

    .avanti-simulation-summary-row__unit {
      font-size: 24px;
      font-weight: var(--avanti-font-weight-semibold);
    }
  }
}
</style>
