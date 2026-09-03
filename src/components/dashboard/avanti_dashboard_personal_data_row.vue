<!-- Строка карточки личных данных: подпись слева, значение справа. -->
<template>
  <div class="avanti-dashboard-personal-data-row">
    <span class="avanti-dashboard-personal-data-row__label">{{ label }}</span>
    <span class="avanti-dashboard-personal-data-row__value">{{ value }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label: string
  value: string
}>()
</script>

<style lang="scss" scoped>
.avanti-dashboard-personal-data-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  line-height: normal;
  white-space: nowrap;

  &__label {
    font-size: 12px;
    font-weight: var(--avanti-font-weight-regular);
    color: var(--avanti-color-text-secondary);
  }

  &__value {
    font-size: 13px;
    font-weight: var(--avanti-font-weight-semibold);
    color: var(--avanti-color-text-strong);
  }
}
</style>
