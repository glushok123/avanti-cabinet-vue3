<!--
  Строка карточки личных данных на странице профиля: подпись слева,
  значение справа. На десктопе подпись мельче значения (12/13px),
  на мобильной обе строки набраны 13px, а длинное значение прижато вправо.
-->
<template>
  <div class="avanti-profile-data-row">
    <span class="avanti-profile-data-row__label">{{ label }}</span>
    <span class="avanti-profile-data-row__value">{{ value }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label: string
  value: string
}>()
</script>

<style lang="scss" scoped>
.avanti-profile-data-row {
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  line-height: normal;

  &__label {
    flex-shrink: 0;
    font-size: 13px;
    font-weight: var(--avanti-font-weight-regular);
    color: var(--avanti-color-text-secondary);
  }

  &__value {
    font-size: 13px;
    font-weight: var(--avanti-font-weight-semibold);
    color: var(--avanti-color-text-strong);
    text-align: right;
  }

  @include desktop-up {
    &__label {
      font-size: 12px;
    }

    &__value {
      white-space: nowrap;
    }
  }
}
</style>
