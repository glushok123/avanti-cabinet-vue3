<!--
  Градиентная карточка одобренной суммы на странице ввода IBAN
  (кадры Figma 31:6409 — десктоп 792px, 33:6803 — мобильная 358px).

  От карточки баланса на главной отличается составом: статусного бейджа
  и сноски здесь нет, кнопка вывода средств уже активна, а под ней в
  слоте лежит форма ввода реквизитов.
-->
<template>
  <section class="avanti-iban-amount-card">
    <div class="avanti-iban-amount-card__head">
      <span class="avanti-iban-amount-card__caption">{{ content.caption }}</span>
      <div class="avanti-iban-amount-card__sum">
        <span class="avanti-iban-amount-card__amount">{{ content.amount }}</span>
        <span class="avanti-iban-amount-card__details">{{ content.details }}</span>
      </div>
    </div>
    <AvantiDashboardWithdrawButton :label="content.actionLabel" state="ready" />
    <slot />
  </section>
</template>

<script setup lang="ts">
import AvantiDashboardWithdrawButton from '@/components/dashboard/avanti_dashboard_withdraw_button.vue'
import type { AvantiIbanAmountContent } from '@/types/avanti_iban'

defineProps<{ content: AvantiIbanAmountContent }>()
</script>

<style lang="scss" scoped>
.avanti-iban-amount-card {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  padding: 32px;
  background-image: var(--avanti-gradient-primary);
  border-radius: var(--avanti-radius-3xl);
  box-shadow: var(--avanti-shadow-balance);

  &__head {
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
  }

  &__caption {
    font-size: 16px;
    font-weight: var(--avanti-font-weight-semibold);

    /* В макете строка ровно 19px: `normal` даёт 20 и опускает всё,
       что идёт ниже по карточке, на пиксель. */
    line-height: 19px;
    color: var(--avanti-color-text-on-primary-soft);
    text-transform: uppercase;
    letter-spacing: 0.16px;
  }

  &__sum {
    display: flex;
    flex-direction: column;
    gap: 4px;
    align-items: flex-start;
    line-height: normal;
    white-space: nowrap;
  }

  &__amount {
    font-size: 52px;
    font-weight: var(--avanti-font-weight-bold);
    color: var(--avanti-color-text-on-primary);
    letter-spacing: -0.78px;
  }

  &__details {
    font-size: 14px;
    font-weight: var(--avanti-font-weight-regular);
    color: var(--avanti-color-text-on-primary-soft);
  }

  @include mobile {
    padding: 12px;

    /* Кегль суммы и подписи макет на мобильной не меняет — только отступы. */
    &__head {
      gap: 6px;
    }
  }
}
</style>
