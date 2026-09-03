<!--
  Кнопка «Preleva i fondi» внутри градиентной карточки.
  Светлая подложка, текст и стрелка залиты фирменным градиентом
  через background-clip: text.

  Состояние `locked` — базовое: шаги не пройдены, кнопка выключена и
  полупрозрачная. Состояние `ready` — средства разблокированы: кнопка
  активна, получает фирменную обводку и белое свечение.
-->
<template>
  <button class="avanti-dashboard-withdraw-button" :class="stateClass" type="button" :disabled="isLocked">
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
import { computed } from 'vue'
import AvantiIconBank from '@/components/icons/avanti_icon_bank.vue'
import type { AvantiWithdrawState } from '@/types/avanti_dashboard'

const props = withDefaults(
  defineProps<{
    label: string
    state?: AvantiWithdrawState
  }>(),
  { state: 'locked' },
)

const isLocked = computed(() => props.state === 'locked')
const stateClass = computed(() => `avanti-dashboard-withdraw-button--${props.state}`)
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

  /*
   * --- Средства разблокированы (кадры Figma 258:14783 / 258:16652 / 258:16821) ---
   * Кнопка становится активной: фирменная обводка рисуется внутрь, поэтому
   * габариты 728×64 совпадают с макетом, а вокруг ложится белое свечение.
   */
  &--ready {
    gap: 4px;
    min-height: 64px;
    padding: 12px 24px;

    /* Значение из Figma, отдельного токена нет. */
    border-radius: 9px;

    @include inner-border(var(--avanti-color-primary), 1px, var(--avanti-shadow-withdraw-glow));

    .avanti-dashboard-withdraw-button__icon {
      width: 20px;
      height: 20px;
    }

    .avanti-dashboard-withdraw-button__label {
      font-size: 16px;
      letter-spacing: 0.032px;
    }

    /* Мобильный кадр 232:14524 — та же кнопка высотой 46px. */
    @include mobile {
      min-height: 46px;
    }
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
