<!--
  Заголовок анкеты: мелкая надпись «Dati personali» и заголовок «DICCI CHI SEI».
  Размеры отличаются от заголовков секций симуляции (там 12/20px), поэтому
  блок свой: 14/24px на мобильной и 18/32px на десктопе.
-->
<template>
  <header class="avanti-personal-data-heading">
    <p class="avanti-personal-data-heading__overline">{{ overline }}</p>
    <component :is="titleTag" class="avanti-personal-data-heading__title">{{ title }}</component>
  </header>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    /** Мелкая надпись над заголовком. */
    overline: string
    /** Заголовок анкеты; регистр приводится к прописным средствами CSS. */
    title: string
    /** Тег заголовка — задаётся страницей ради корректной иерархии. */
    titleTag?: string
  }>(),
  { titleTag: 'h1' },
)
</script>

<style lang="scss" scoped>
.avanti-personal-data-heading {
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;

  &__overline {
    font-size: 14px;
    font-weight: var(--avanti-font-weight-regular);
    line-height: normal;
    color: var(--avanti-color-text-muted);
    letter-spacing: 0.56px;
  }

  &__title {
    margin: 0;
    font-size: 24px;
    font-weight: var(--avanti-font-weight-semibold);
    line-height: normal;
    color: var(--avanti-color-text-heading-strong);
    text-transform: uppercase;
  }

  @include desktop-up {
    gap: 12px;

    .avanti-personal-data-heading__overline {
      font-size: 18px;
      letter-spacing: 0.72px;
    }

    .avanti-personal-data-heading__title {
      font-size: 32px;
    }
  }
}
</style>
