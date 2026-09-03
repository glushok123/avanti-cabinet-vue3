<!--
  Примечание под карточкой одобрения: бейдж «i» и срок брони предложения.
  Десктоп центрирует пару по ширине блока, мобильная прижимает к левому краю.
-->
<template>
  <p class="avanti-onboarding-approval-note">
    <span class="avanti-onboarding-approval-note__badge" aria-hidden="true">{{ badge }}</span>
    <span class="avanti-onboarding-approval-note__text">{{ text }}</span>
  </p>
</template>

<script setup lang="ts">
defineProps<{
  /** Символ внутри бейджа (в макете — латинская «i»). */
  badge: string
  /** Текст примечания. */
  text: string
}>()
</script>

<style lang="scss" scoped>
.avanti-onboarding-approval-note {
  display: flex;
  gap: 12px;
  align-items: center;
  width: 100%;

  &__badge {
    @include inner-border(var(--avanti-color-primary));

    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    font-size: 16px;
    font-weight: var(--avanti-font-weight-bold);
    line-height: normal;
    color: var(--avanti-color-primary);
    background-color: var(--avanti-color-primary-surface-soft);
    border-radius: var(--avanti-radius-lg);
  }

  &__text {
    font-size: 14px;
    font-weight: var(--avanti-font-weight-regular);
    line-height: 1.3;
    color: var(--avanti-color-text-note);
  }

  @include desktop-up {
    justify-content: center;

    .avanti-onboarding-approval-note__badge {
      width: 32px;
      height: 32px;
      font-size: 25.6px;
      font-weight: var(--avanti-font-weight-semibold);
      border-radius: var(--avanti-radius-round);
    }

    .avanti-onboarding-approval-note__text {
      font-size: 18px;
      font-weight: var(--avanti-font-weight-light);
      line-height: normal;

      /* Трекинг доводит строку до макетных 585px: Chrome набирает её уже. */
      letter-spacing: 0.77px;
    }
  }
}
</style>
