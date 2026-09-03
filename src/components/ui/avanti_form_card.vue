<!--
  Белая карточка-контейнер анкеты: скругление, мягкая тень и вертикальный ритм
  между секциями формы (28px на мобильной, 40px на десктопе — из макета).

  Ширина карточки в макете 1117px и она центрирована: на широких экранах растут
  только боковые отступы, сама карточка не растягивается.
-->
<template>
  <component :is="tag" class="avanti-form-card">
    <slot />
  </component>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    /** Тег контейнера: для настоящей формы удобно передать 'form'. */
    tag?: string
  }>(),
  {
    tag: 'div',
  },
)
</script>

<style lang="scss" scoped>
.avanti-form-card {
  display: flex;
  flex-direction: column;
  gap: 28px;
  align-items: stretch;
  width: 100%;
  padding: 20px;
  background-color: var(--avanti-color-surface);
  border-radius: var(--avanti-radius-4xl);
  box-shadow: var(--avanti-shadow-form-card);

  @include desktop-up {
    @include content-container(1117px);

    gap: 40px;
    padding: 60px;
    border-radius: var(--avanti-radius-5xl);
  }
}
</style>
