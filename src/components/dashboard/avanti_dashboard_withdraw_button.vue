<!--
  Кнопка «Preleva i fondi» внутри градиентной карточки.
  Светлая подложка, текст и стрелка залиты фирменным градиентом
  через background-clip: text. По макету кнопка неактивна.
-->
<template>
  <button class="avanti-dashboard-withdraw-button" type="button" :disabled="disabled">
    <span class="avanti-dashboard-withdraw-button__content">
      <span class="avanti-dashboard-withdraw-button__icon">
        <AvantiIconBank />
      </span>
      <span class="avanti-dashboard-withdraw-button__label">{{ label }}</span>
    </span>
    <span class="avanti-dashboard-withdraw-button__arrow" aria-hidden="true">&rarr;</span>
  </button>
</template>

<script setup lang="ts">
import AvantiIconBank from '@/components/icons/avanti_icon_bank.vue'

withDefaults(
  defineProps<{
    label: string
    disabled?: boolean
  }>(),
  { disabled: true },
)
</script>

<style lang="scss" scoped>
.avanti-dashboard-withdraw-button {
  @include button-reset;
  @include focus-ring;

  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 18px 24px;
  background-color: var(--avanti-color-surface-muted);
  border-radius: var(--avanti-radius-lg);

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &__content {
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: center;
  }

  &__icon {
    display: flex;
    flex-shrink: 0;
    width: 28px;
    height: 28px;
  }

  /* Текст залит фирменным градиентом. */
  &__label,
  &__arrow {
    line-height: normal;
    color: transparent;
    white-space: nowrap;
    background-image: var(--avanti-gradient-primary);
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  &__label {
    font-size: 18px;
    font-weight: var(--avanti-font-weight-semibold);
    letter-spacing: 0.036px;
  }

  &__arrow {
    font-size: 18px;
    font-weight: var(--avanti-font-weight-medium);
    opacity: 0.85;
  }

  @include mobile {
    gap: 4px;
    padding: 12px 24px;

    /* Значение из Figma, отдельного токена нет. */
    border-radius: 9px;

    &__content {
      gap: 12px;
    }

    &__icon {
      width: 20px;
      height: 20px;
    }

    &__label {
      font-size: 16px;
      letter-spacing: 0.032px;
    }
  }
}
</style>
