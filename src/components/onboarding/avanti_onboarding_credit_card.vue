<!--
  Декоративная банковская карта из иллюстрации на экране одобрения.

  В Figma карта нарисована в размере 435.047×274.766 и наклонена
  трансформацией skewX(-20°) со сжатием scaleY(0.94) — то же преобразование
  применено к контейнеру карты, поэтому надписи наклоняются вместе с ней,
  а координаты внутри совпадают с исходным кадром.

  Данные на карте — часть иллюстрации, а не сведения пользователя.
-->
<template>
  <div class="avanti-onboarding-credit-card" :class="variantClass">
    <div class="avanti-onboarding-credit-card__plate">
      <img class="avanti-onboarding-credit-card__mark" :src="mark" alt="" />
      <img class="avanti-onboarding-credit-card__contactless" :src="contactless" alt="" />
      <span class="avanti-onboarding-credit-card__number-label">{{ mock.numberLabel }}</span>
      <span class="avanti-onboarding-credit-card__number">{{ mock.number }}</span>
      <span class="avanti-onboarding-credit-card__holder-label">{{ mock.holderLabel }}</span>
      <span class="avanti-onboarding-credit-card__expiry-label">{{ mock.expiryLabel }}</span>
      <span class="avanti-onboarding-credit-card__holder">{{ mock.holder }}</span>
      <span class="avanti-onboarding-credit-card__expiry">{{ mock.expiry }}</span>
      <img class="avanti-onboarding-credit-card__chip" :src="chip" alt="" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { AVANTI_CREDIT_CARD_MOCK } from '@/constants/avanti_onboarding_content'
import type { AvantiCreditCardVariant } from '@/types/avanti_onboarding'

const props = defineProps<{
  /** Оформление карты: чёрная, бирюзовая или стеклянная. */
  variant: AvantiCreditCardVariant
  /** Логотип платёжной системы под это оформление. */
  mark: string
  /** Значок бесконтактной оплаты под это оформление. */
  contactless: string
  /** Чип под это оформление. */
  chip: string
}>()

const mock = AVANTI_CREDIT_CARD_MOCK

const variantClass = computed(() => `avanti-onboarding-credit-card--${props.variant}`)
</script>

<style lang="scss" scoped>
/* Габариты кадра Figma: карта до наклона и её описанный прямоугольник после. */
$plate-width: 435.047px;
$plate-height: 274.766px;
$frame-width: 529.023px;
$frame-height: 258.196px;

.avanti-onboarding-credit-card {
  position: relative;
  width: $frame-width;
  height: $frame-height;

  &__plate {
    position: absolute;
    top: 50%;
    left: 50%;
    width: $plate-width;
    height: $plate-height;
    border-radius: 36.636px;
    transform: translate(-50%, -50%) skewX(-20deg) scaleY(0.94);
  }

  /* --- Постоянные позиции элементов внутри карты (координаты макета) --- */
  &__mark {
    position: absolute;
    top: 30px;
    left: 44px;
    width: 46.064px;
    height: 27.477px;
  }

  &__contactless {
    position: absolute;
    top: 30px;
    left: 379px;
    width: 27.119px;
    height: 36.636px;
    object-fit: contain;
  }

  &__chip {
    position: absolute;
    top: 209px;
    left: 362px;
    width: 46.11px;
    height: 36.636px;
  }

  &__number-label,
  &__holder-label,
  &__expiry-label {
    position: absolute;
    font-size: 16.028px;
    font-weight: var(--avanti-font-weight-semibold);
    line-height: normal;
  }

  &__number-label {
    top: 96px;
    left: 45px;
  }

  &__holder-label {
    top: 184px;
    left: 46px;
  }

  &__expiry-label {
    top: 184px;
    left: 187px;
  }

  &__number {
    position: absolute;
    top: 129px;
    left: 44px;
    font-family: 'M PLUS 1 Code', ui-monospace, menlo, monospace;
    font-size: 22.897px;
    font-weight: var(--avanti-font-weight-bold);
    line-height: 27.477px;
    white-space: pre;
  }

  &__holder,
  &__expiry {
    position: absolute;
    top: 216px;
    font-size: 13.738px;
    line-height: normal;
  }

  &__holder {
    left: 46px;
    font-weight: var(--avanti-font-weight-medium);
  }

  &__expiry {
    left: 188px;
    font-weight: var(--avanti-font-weight-semibold);
  }

  /* --- Чёрная карта (нижняя в стопке) --- */
  &--dark {
    .avanti-onboarding-credit-card__plate {
      @include inner-border(var(--avanti-color-surface), 2.29px);

      color: var(--avanti-color-text-on-primary);
      background-color: var(--avanti-color-text-black);
    }

    .avanti-onboarding-credit-card__number-label,
    .avanti-onboarding-credit-card__holder-label,
    .avanti-onboarding-credit-card__expiry-label {
      color: var(--avanti-color-text-card-caption);
    }
  }

  /* --- Бирюзовая карта (средняя) --- */
  &--primary {
    .avanti-onboarding-credit-card__plate {
      @include inner-border(var(--avanti-color-surface), 2.29px);

      color: var(--avanti-color-text-on-primary);
      background-color: var(--avanti-color-primary);
    }

    .avanti-onboarding-credit-card__number-label {
      color: var(--avanti-color-text-card-label);
    }

    .avanti-onboarding-credit-card__holder-label,
    .avanti-onboarding-credit-card__expiry-label {
      color: var(--avanti-color-track);
    }

    .avanti-onboarding-credit-card__number {
      color: var(--avanti-color-text-bank);
    }
  }

  /* --- Стеклянная карта (верхняя) --- */
  &--glass {
    .avanti-onboarding-credit-card__plate {
      @include inner-border(var(--avanti-color-primary), 2.29px);

      color: var(--avanti-color-text-black);
      background-color: var(--avanti-color-surface-glass);
      backdrop-filter: blur(6.838px);
    }

    .avanti-onboarding-credit-card__number-label,
    .avanti-onboarding-credit-card__holder-label,
    .avanti-onboarding-credit-card__expiry-label {
      color: var(--avanti-color-text-bank);
    }
  }
}
</style>
