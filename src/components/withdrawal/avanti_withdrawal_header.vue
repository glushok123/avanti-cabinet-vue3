<!--
  Шапка формы вывода средств: заголовок и поясняющая подпись.
  Тексты приходят пропами, поэтому блок не знает, на какой странице стоит.
-->
<template>
  <header class="avanti-withdrawal-header">
    <h2 class="avanti-withdrawal-header__title">{{ title }}</h2>
    <p class="avanti-withdrawal-header__subtitle">{{ subtitle }}</p>
  </header>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  subtitle: string
}>()
</script>

<style lang="scss" scoped>
.avanti-withdrawal-header {
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;

  &__title {
    font-size: 20px;
    font-weight: var(--avanti-font-weight-bold);
    line-height: normal;
    color: var(--avanti-color-text-strong);
  }

  &__subtitle {
    font-size: 13px;
    font-weight: var(--avanti-font-weight-medium);
    line-height: normal;
    color: var(--avanti-color-text-secondary);
  }
}
</style>
