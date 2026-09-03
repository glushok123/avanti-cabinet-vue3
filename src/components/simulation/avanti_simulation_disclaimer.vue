<!--
  Примечание под карточкой итогов: круглый бейдж «i» и текст в два начертания —
  светлое для оговорки и полужирное для условия принятия оферты.
-->
<template>
  <div class="avanti-simulation-disclaimer">
    <span class="avanti-simulation-disclaimer__badge" aria-hidden="true">{{ badge }}</span>
    <!--
      Пробел между частями задаётся явно: перенос строки между тегами
      Vue схлопывает при компиляции шаблона, и предложения слипаются.
    -->
    <p class="avanti-simulation-disclaimer__text">
      <span class="avanti-simulation-disclaimer__soft">{{ text }}</span>
      {{ ' ' }}
      <span class="avanti-simulation-disclaimer__strong">{{ strongText }}</span>
    </p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  /** Символ внутри бейджа (в макете — латинская «i»). */
  badge: string
  /** Основная часть примечания, светлое начертание. */
  text: string
  /** Акцентная часть примечания, полужирное начертание. */
  strongText: string
}>()
</script>

<style lang="scss" scoped>
.avanti-simulation-disclaimer {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  width: 100%;

  &__badge {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    font-size: 16px;
    font-weight: var(--avanti-font-weight-bold);
    line-height: normal;
    color: var(--avanti-color-primary);
    border: 1.5px solid var(--avanti-color-primary);
    border-radius: var(--avanti-radius-xl);
  }

  &__text {
    flex: 1 0 0;
    min-width: 0;
    font-size: 13px;
    line-height: 18px;
    color: var(--avanti-color-text-muted);
  }

  &__soft {
    font-weight: var(--avanti-font-weight-light);
  }

  &__strong {
    font-weight: var(--avanti-font-weight-semibold);
  }

  @include desktop-up {
    gap: 8px;
    align-items: center;
    justify-content: center;

    .avanti-simulation-disclaimer__badge {
      width: 40px;
      height: 40px;
      font-size: 32px;
      font-weight: var(--avanti-font-weight-semibold);
      border-radius: var(--avanti-radius-round);
    }

    .avanti-simulation-disclaimer__text {
      font-size: 18px;
      line-height: normal;
      letter-spacing: 0.72px;
    }
  }
}
</style>
