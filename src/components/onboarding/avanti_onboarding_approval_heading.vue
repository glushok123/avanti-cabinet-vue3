<!--
  Заголовок экрана одобрения: сообщение об одобрении и пояснение о банках.
  Десктоп выравнивает текст по левому краю, мобильная — по центру.
-->
<template>
  <div class="avanti-onboarding-approval-heading">
    <h1 class="avanti-onboarding-approval-heading__title">{{ title }}</h1>
    <p class="avanti-onboarding-approval-heading__subtitle">{{ subtitle }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  /** Основное сообщение об одобрении. */
  title: string
  /** Пояснение об условиях банков-партнёров. */
  subtitle: string
}>()
</script>

<style lang="scss" scoped>
.avanti-onboarding-approval-heading {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  text-align: center;
  text-transform: uppercase;

  &__title {
    font-size: 28px;
    font-weight: var(--avanti-font-weight-bold);
    line-height: normal;
    color: var(--avanti-color-text-heading-strong);
  }

  &__subtitle {
    font-size: 18px;
    font-weight: var(--avanti-font-weight-regular);
    line-height: 1.3;
    color: var(--avanti-color-primary);
  }

  @include desktop-up {
    gap: 16px;
    text-align: left;

    .avanti-onboarding-approval-heading__title {
      font-size: 52px;
      font-weight: var(--avanti-font-weight-semibold);
    }

    .avanti-onboarding-approval-heading__subtitle {
      /*
       * Chrome рисует Inter шире Figma: вторая строка выходит за макетные
       * 1145px на доли пикселя и заголовок ломается на три строки вместо
       * двух. Блок остаётся макетной ширины, а строке даётся запас 16px —
       * текст выровнен влево, поэтому визуально ничего не меняется, зато
       * перенос перестаёт зависеть от округления. Микро-трекинг 0,11px
       * доводит позиции слов внутри строки до макетных.
       */
      width: calc(100% + 16px);
      font-size: 42px;
      font-weight: var(--avanti-font-weight-semibold);
      line-height: normal;
      letter-spacing: -0.11px;
    }
  }
}
</style>
