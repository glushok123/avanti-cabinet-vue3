<!--
  Пара «надзаголовок + заголовок» над секцией суммы и секцией срока.
  Размеры и начертания на десктопе и мобильной отличаются только оформлением,
  поэтому разметка одна, а различия вынесены в миксины.
-->
<template>
  <div class="avanti-simulation-section-heading">
    <p class="avanti-simulation-section-heading__overline">{{ overline }}</p>
    <component :is="titleTag" class="avanti-simulation-section-heading__title">{{ title }}</component>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    /** Мелкая надпись над заголовком. */
    overline: string
    /** Заголовок секции. */
    title: string
    /** Тег заголовка — задаётся страницей ради корректной иерархии. */
    titleTag?: string
  }>(),
  { titleTag: 'h2' },
)
</script>

<style lang="scss" scoped>
.avanti-simulation-section-heading {
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;

  &__overline {
    font-size: 12px;
    font-weight: var(--avanti-font-weight-semibold);
    line-height: normal;
    color: var(--avanti-color-text-muted);
    text-transform: uppercase;
    letter-spacing: 0.48px;
  }

  &__title {
    font-size: 20px;
    font-weight: var(--avanti-font-weight-bold);
    line-height: normal;
    color: var(--avanti-color-text-heading);
  }

  @include desktop-up {
    gap: 12px;

    .avanti-simulation-section-heading__overline {
      font-size: 18px;
      font-weight: var(--avanti-font-weight-regular);
      letter-spacing: 0.72px;
    }

    .avanti-simulation-section-heading__title {
      font-size: 32px;
      font-weight: var(--avanti-font-weight-semibold);
      color: var(--avanti-color-text-black);
      text-transform: uppercase;
    }
  }
}
</style>
