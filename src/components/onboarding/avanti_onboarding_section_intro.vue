<!--
  Вводный блок экрана ожидания: надзаголовок, заголовок и пояснение.

  От `avanti_simulation_section_heading` отличается третьей строкой
  и другими размерами (20/32/20 против 18/32), поэтому это отдельный блок,
  а не проп существующего заголовка.
-->
<template>
  <div class="avanti-onboarding-section-intro">
    <p class="avanti-onboarding-section-intro__overline">{{ overline }}</p>
    <component :is="titleTag" class="avanti-onboarding-section-intro__title">{{ title }}</component>
    <p class="avanti-onboarding-section-intro__subtitle">{{ subtitle }}</p>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    /** Мелкая надпись над заголовком. */
    overline: string
    /** Заголовок экрана. */
    title: string
    /** Пояснение под заголовком. */
    subtitle: string
    /** Тег заголовка — задаётся страницей ради корректной иерархии. */
    titleTag?: string
  }>(),
  { titleTag: 'h1' },
)
</script>

<style lang="scss" scoped>
.avanti-onboarding-section-intro {
  display: flex;
  flex-direction: column;
  gap: 8px;
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
    text-transform: uppercase;
  }

  &__subtitle {
    font-size: 13px;
    font-weight: var(--avanti-font-weight-regular);
    line-height: 18px;
    color: var(--avanti-color-text-muted);
    letter-spacing: 0.52px;
  }

  @include desktop-up {
    gap: 12px;

    /* Ширина блока по макету: 682px внутри контентной колонки 1176px. */
    max-width: 682px;

    .avanti-onboarding-section-intro__overline {
      font-size: 20px;
      font-weight: var(--avanti-font-weight-regular);
      letter-spacing: 0.8px;
    }

    .avanti-onboarding-section-intro__title {
      font-size: 32px;
      font-weight: var(--avanti-font-weight-semibold);
      color: var(--avanti-color-text-black);
    }

    .avanti-onboarding-section-intro__subtitle {
      font-size: 20px;
      line-height: normal;
      letter-spacing: 0.8px;
    }
  }
}
</style>
