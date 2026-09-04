<!--
  Карточка банка-партнёра в сетке проверки: логотип, название и состояние.
  На десктопе (кадр 0:1117) логотип стоит слева от подписей, на мобильной
  (кадр 1:4701) — над ними, карточка ровно 175×80.

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

  /* Кадр 1:4701: карточка 80px высотой, логотип сверху, подписи снизу. */
  flex-direction: column;
  gap: 6px;
  align-items: stretch;
  justify-content: space-between;
  height: 80px;
  padding: 10px;
  overflow: hidden;
  background-color: var(--avanti-color-surface);
  border-radius: var(--avanti-radius-md);

  &__logo {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    width: 100%;

    /* Кадр 1:4702: полоса логотипа 28px во всю ширину карточки. */
    height: 28px;
    overflow: hidden;
  }

  /*
   * В мобильном кадре логотип нарисован крупнее своей полосы: изображение
   * выше рамки в 1,385 раза (28 → 38,8px), верх и низ подрезаны. Логотипы
   * выгружены под десктопную рамку 81×62, поэтому масштаб задаётся высотой.
   */
  &__image {
    width: auto;
    max-width: 100%;
    height: 138.5%;
    object-fit: contain;
  }

  &__info {
    display: flex;
    flex: 0 0 auto;
    flex-direction: column;
    gap: 1px;
    min-width: 0;

    /* Кадр 1:4703: блок подписей 26px — вторая строка чуть выходит
       в нижний отступ карточки, как и нарисовано. */
    height: 26px;
  }

  /* Кадр 1:4704: 13px SemiBold без разрядки. */
  &__name {
    font-size: 13px;
    font-weight: var(--avanti-font-weight-semibold);
    line-height: normal;
    color: var(--avanti-color-text-bank);
    text-transform: uppercase;
  }

  /* Кадр 1:4705: 11px Regular. */
  &__status {
    font-size: 11px;
    font-weight: var(--avanti-font-weight-regular);
    line-height: normal;
    color: var(--avanti-color-text-muted);
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

  /* Десктопный кадр 0:1117: логотип слева, карточка 285×70. */
  @include desktop-up {
    flex-direction: row;
    gap: 10px;
    align-items: center;
    justify-content: flex-start;
    height: auto;
    min-height: 70px;
    padding: 0 8px 0 7px;

    .avanti-onboarding-bank-card__logo {
      width: 81px;
      height: 62px;
    }

    .avanti-onboarding-bank-card__image {
      width: 100%;
      height: 100%;
    }

    .avanti-onboarding-bank-card__info {
      flex: 1 1 auto;
      gap: 2px;
      height: auto;
    }

    .avanti-onboarding-bank-card__name {
      font-size: 16px;
      font-weight: var(--avanti-font-weight-medium);
      letter-spacing: 0.64px;
    }

    .avanti-onboarding-bank-card__status {
      font-size: 14px;
      font-weight: var(--avanti-font-weight-light);
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
