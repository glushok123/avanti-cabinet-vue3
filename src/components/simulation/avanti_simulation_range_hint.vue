<!--
  Подписи нижней и верхней границы диапазона под полем суммы и под слайдером.
  Обе подписи приходят готовыми строками — компонент не форматирует числа.
-->
<template>
  <div class="avanti-simulation-range-hint">
    <span class="avanti-simulation-range-hint__bound">{{ min }}</span>
    <span class="avanti-simulation-range-hint__bound">{{ max }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  /** Подпись нижней границы, например «1.000 €». */
  min: string
  /** Подпись верхней границы, например «33.000 €». */
  max: string
}>()
</script>

<style lang="scss" scoped>
.avanti-simulation-range-hint {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  font-size: 13px;
  font-weight: var(--avanti-font-weight-regular);
  line-height: normal;
  color: var(--avanti-color-text-muted);

  &__bound {
    white-space: nowrap;
  }

  @include desktop-up {
    font-size: 16px;
    letter-spacing: 0.64px;
  }
}
</style>
