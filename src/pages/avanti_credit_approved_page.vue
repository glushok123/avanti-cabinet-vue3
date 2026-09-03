<!--
  Страница «Кредит апрув» — экран одобрения кредита.
  Десктоп: слева блок одобрения (заголовок, карточка суммы, примечание,
  кнопка), справа декоративная стопка банковских карт.
  Мобильная: те же блоки одной колонкой, иллюстрации в макете нет.
-->
<template>
  <div class="avanti-credit-approved-page">
    <AvantiSimulationHeader :menu-label="texts.menu" />
    <main class="avanti-credit-approved-page__body">
      <div class="avanti-credit-approved-page__content">
        <AvantiOnboardingApprovalHeading
          class="avanti-credit-approved-page__heading"
          :title="texts.title"
          :subtitle="texts.subtitle"
        />
        <div class="avanti-credit-approved-page__details">
          <AvantiOnboardingApprovalCard
            :label="texts.amountLabel"
            :amount="texts.amountValue"
            :details="details"
          />
          <AvantiOnboardingApprovalNote :badge="texts.noteBadge" :text="texts.note" />
        </div>
        <AvantiOnboardingCtaButton class="avanti-credit-approved-page__cta" :label="texts.cta" />
        <AvantiOnboardingCardStack class="avanti-credit-approved-page__cards" :cards="cards" />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import AvantiSimulationHeader from '@/components/layout/avanti_simulation_header.vue'
import AvantiOnboardingApprovalHeading from '@/components/onboarding/avanti_onboarding_approval_heading.vue'
import AvantiOnboardingApprovalCard from '@/components/onboarding/avanti_onboarding_approval_card.vue'
import AvantiOnboardingApprovalNote from '@/components/onboarding/avanti_onboarding_approval_note.vue'
import AvantiOnboardingCtaButton from '@/components/onboarding/avanti_onboarding_cta_button.vue'
import AvantiOnboardingCardStack from '@/components/onboarding/avanti_onboarding_card_stack.vue'
import {
  AVANTI_APPROVAL_CARDS,
  AVANTI_APPROVAL_DETAILS,
  AVANTI_CREDIT_APPROVED_TEXTS,
} from '@/constants/avanti_onboarding_content'

const texts = AVANTI_CREDIT_APPROVED_TEXTS
const details = AVANTI_APPROVAL_DETAILS
const cards = AVANTI_APPROVAL_CARDS
</script>

<style lang="scss" scoped>
/* Ширина блока одобрения и блока условий по макету. */
$approval-width: 1145px;
$details-width: 633px;

.avanti-credit-approved-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  /* Иллюстрация выходит за правый край контентной колонки — на широких
     экранах она остаётся в кадре, на узких лишнее просто обрезается. */
  overflow-x: hidden;
  background-color: var(--avanti-color-surface);

  &__body {
    display: flex;
    flex: 1 0 auto;
    padding: 24px 20px 32px;
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: 24px;
    justify-content: space-between;
    width: 100%;
  }

  @include desktop-up {
    .avanti-credit-approved-page__body {
      padding: 41px $content-gutter 60px;
    }

    .avanti-credit-approved-page__content {
      position: relative;
      gap: 48px;
      justify-content: flex-start;

      /* Боковые отступы даёт родительский __body, поэтому здесь ограничение
         ставится без их учёта — иначе контент уедет влево от макетных 100px. */
      @include content-container($content-width-simulation);

      /* Высота резервируется под абсолютно спозиционированную иллюстрацию. */
      min-height: 719px;
      margin-inline: auto;
    }

    /* Блок одобрения занимает 1145px из 1240px контентной колонки,
       прижатый к левому краю — чтобы совпасть с логотипом в шапке. */
    .avanti-credit-approved-page__heading {
      max-width: $approval-width;
    }

    .avanti-credit-approved-page__details {
      display: flex;
      flex-direction: column;
      gap: 22px;
      width: $details-width;
    }

    /* Кнопка отделена от содержимого на 64px, а не на общие 48px. */
    .avanti-credit-approved-page__cta {
      align-self: flex-start;
      margin-top: 16px;
    }

    .avanti-credit-approved-page__cards {
      position: absolute;
      top: 229px;
      left: 758.95px;
    }
  }
}
</style>
