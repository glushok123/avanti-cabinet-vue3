<!--
  Карточка банка-партнёра в сетке проверки: логотип, название и состояние.

  Три состояния из макета: проверен (зелёная подпись, бирюзовая обводка),
  проверяется (серая подпись, бирюзовая обводка) и в очереди
  (приглушённый текст и бледная обводка).
  У карточки «проверяется» подпись пульсирует — экран ожидания живой;
  при prefers-reduced-motion пульсация отключается.
-->
<template>
  <li class="avanti-onboarding-bank-card" :class="statusClass">
    <span class="avanti-onboarding-bank-card__logo">
      <!-- Логотипы выгружены из Figma уже кадрированными, alt пустой:
           название банка стоит рядом текстом. -->
      <img class="avanti-onboarding-bank-card__image" :src="logo" alt="" />
    </span>
    <span class="avanti-onboarding-bank-card__info">
      <span class="avanti-onboarding-bank-card__name">{{ name }}</span>
      <span class="avanti-onboarding-bank-card__status">{{ statusLabel }}</span>
    </span>
  </li>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { AvantiBankStatus } from '@/types/avanti_onboarding'

const props = defineProps<{
  /** Название банка. */
  name: string
  /** Состояние проверки. */
  status: AvantiBankStatus
  /** URL логотипа. */
  logo: string
  /** Подпись состояния из справочника текстов. */
  statusLabel: string
}>()

const statusClass = computed(() => `avanti-onboarding-bank-card--${props.status}`)
</script>

<style lang="scss" scoped>
.avanti-onboarding-bank-card {
  display: flex;
  gap: 8px;
  align-items: center;
  min-height: 60px;
  padding: 6px 8px 6px 6px;
  overflow: hidden;
  background-color: var(--avanti-color-surface);
  border-radius: var(--avanti-radius-md);

  &__logo {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 34px;
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  &__info {
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
  }

  &__name {
    font-size: 12px;
    font-weight: var(--avanti-font-weight-medium);
    line-height: normal;
    color: var(--avanti-color-text-bank);
    text-transform: uppercase;
    letter-spacing: 0.48px;
  }

  &__status {
    font-size: 11px;
    font-weight: var(--avanti-font-weight-light);
    line-height: normal;
    color: var(--avanti-color-text-muted);
    letter-spacing: 0.44px;
  }

  /* --- Банк ответил --- */
  &--verified {
    @include inner-border(var(--avanti-color-primary));

    .avanti-onboarding-bank-card__status {
      color: var(--avanti-color-success-dark);
    }
  }

  /* --- Запрос в банк отправлен, ответа ещё нет --- */
  &--checking {
    @include inner-border(var(--avanti-color-primary));

    .avanti-onboarding-bank-card__status {
      animation: avanti-onboarding-bank-pulse 1.6s ease-in-out infinite;
    }
  }

  /* --- Банк ещё в очереди --- */
  &--pending {
    @include inner-border(var(--avanti-color-border-pending));

    .avanti-onboarding-bank-card__name,
    .avanti-onboarding-bank-card__status {
      opacity: 0.57;
    }
  }

  @include desktop-up {
    gap: 10px;
    min-height: 70px;
    padding: 0 8px 0 7px;

    .avanti-onboarding-bank-card__logo {
      width: 81px;
      height: 62px;
    }

    .avanti-onboarding-bank-card__name {
      font-size: 16px;
      letter-spacing: 0.64px;
    }

    .avanti-onboarding-bank-card__status {
      font-size: 14px;
      letter-spacing: 0.56px;
    }
  }
}

@keyframes avanti-onboarding-bank-pulse {
  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.45;
  }
}

/* Пользователь просил меньше движения — подпись остаётся статичной. */
@media (prefers-reduced-motion: reduce) {
  .avanti-onboarding-bank-card--checking .avanti-onboarding-bank-card__status {
    animation: none;
  }
}
</style>
