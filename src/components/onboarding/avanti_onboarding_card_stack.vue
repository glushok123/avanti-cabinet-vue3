<!--
  Декоративная стопка из трёх банковских карт справа на экране одобрения.
  Порядок в разметке совпадает с порядком отрисовки макета: чёрная карта
  внизу, бирюзовая посередине, стеклянная сверху.

  Иллюстрация есть только в десктопном макете, в мобильном её нет,
  поэтому до 1024px блок не выводится.
-->
<template>
  <div class="avanti-onboarding-card-stack" aria-hidden="true">
    <AvantiOnboardingCreditCard
      v-for="card in cards"
      :key="card.id"
      class="avanti-onboarding-card-stack__item"
      :class="itemClass(card.variant)"
      :variant="card.variant"
      :mark="card.mark"
      :contactless="card.contactless"
      :chip="card.chip"
    />
  </div>
</template>

<script setup lang="ts">
import AvantiOnboardingCreditCard from '@/components/onboarding/avanti_onboarding_credit_card.vue'
import type { AvantiCreditCardArt, AvantiCreditCardVariant } from '@/types/avanti_onboarding'

defineProps<{
  /** Карты снизу вверх: порядок в массиве задаёт порядок наложения. */
  cards: AvantiCreditCardArt[]
}>()

/** Смещение карты в стопке задаётся модификатором по её оформлению. */
function itemClass(variant: AvantiCreditCardVariant): string {
  return `avanti-onboarding-card-stack__item--${variant}`
}
</script>

<style lang="scss" scoped>
.avanti-onboarding-card-stack {
  display: none;

  @include desktop-up {
    /* Габариты и смещения карт сняты из макета (кадр 534.15×489.83). */
    position: relative;
    display: block;
    width: 534.15px;
    height: 489.83px;

    .avanti-onboarding-card-stack__item {
      position: absolute;
    }

    .avanti-onboarding-card-stack__item--dark {
      top: 231.63px;
      left: 5.13px;
    }

    .avanti-onboarding-card-stack__item--primary {
      top: 107.69px;
      left: 5.13px;
    }

    .avanti-onboarding-card-stack__item--glass {
      top: 0;
      left: 0;
    }
  }
}
</style>
