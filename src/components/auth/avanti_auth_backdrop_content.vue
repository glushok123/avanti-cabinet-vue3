<!--
  Фон экранов авторизации: под модальным окном в макете лежит уже свёрстанный
  экран одобрения кредита. Блоки берутся из тех же компонентов онбординга,
  что и страница «Кредит апрув», — своя копия разметки не заводится.

  Разметка повторяет страницу одобрения: боковые отступы даёт внешняя
  обёртка, а центрирование контентной колонки — внутренняя. Если совместить
  их на одном элементе, padding войдёт в max-width и контент уедет вправо
  от макетных 100px.

  Содержимое декоративное и перекрыто затемнением, поэтому оно спрятано
  от скринридеров и не участвует в порядке фокуса.
-->
<template>
  <div class="avanti-auth-backdrop-content" aria-hidden="true" inert>
    <div class="avanti-auth-backdrop-content__inner">
      <AvantiOnboardingApprovalHeading
        class="avanti-auth-backdrop-content__heading"
        :title="texts.title"
        :subtitle="texts.subtitle"
      />
      <div class="avanti-auth-backdrop-content__details">
        <AvantiOnboardingApprovalCard
          :label="texts.amountLabel"
          :amount="texts.amountValue"
          :details="details"
        />
        <AvantiOnboardingApprovalNote :badge="texts.noteBadge" :text="texts.note" />
      </div>
      <AvantiOnboardingCtaButton class="avanti-auth-backdrop-content__cta" :label="texts.cta" />
      <AvantiOnboardingCardStack class="avanti-auth-backdrop-content__cards" :cards="cards" />
    </div>
  </div>
</template>

<script setup lang="ts">
import AvantiOnboardingApprovalHeading from '@/components/onboarding/avanti_onboarding_approval_heading.vue'
import AvantiOnboardingApprovalCard from '@/components/onboarding/avanti_onboarding_approval_card.vue'
import AvantiOnboardingApprovalNote from '@/components/onboarding/avanti_onboarding_approval_note.vue'
import AvantiOnboardingCtaButton from '@/components/onboarding/avanti_onboarding_cta_button.vue'
import AvantiOnboardingCardStack from '@/components/onboarding/avanti_onboarding_card_stack.vue'
import {
  AVANTI_APPROVAL_CARDS as cards,
  AVANTI_APPROVAL_DETAILS as details,
  AVANTI_CREDIT_APPROVED_TEXTS as texts,
} from '@/constants/avanti_onboarding_content'
</script>

<style lang="scss" scoped>
/* Ширины блоков совпадают с экраном одобрения кредита. */
$approval-width: 1145px;
$details-width: 633px;

.avanti-auth-backdrop-content {
  display: flex;
  width: 100%;
  padding: 24px 16px 32px;

  &__inner {
    display: flex;
    flex-direction: column;
    gap: 24px;
    width: 100%;
  }

  &__details {
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
  }

  /* На мобильной кнопка и стопка карт в кадрах авторизации не показаны. */
  &__cta,
  &__cards {
    display: none;
  }

  @include desktop-up {
    padding: 41px $content-gutter 60px;

    .avanti-auth-backdrop-content__inner {
      @include content-container($content-width-simulation);

      position: relative;
      gap: 48px;

      /* Высота резервируется под абсолютно спозиционированную иллюстрацию. */
      min-height: 719px;
    }

    /* Блок одобрения занимает 1145px из 1240px контентной колонки,
       прижатый к левому краю — чтобы совпасть с логотипом в шапке. */
    .avanti-auth-backdrop-content__heading {
      max-width: $approval-width;
    }

    .avanti-auth-backdrop-content__details {
      gap: 22px;
      width: $details-width;
    }

    /* Кнопка отделена от содержимого на 64px, а не на общие 48px. */
    .avanti-auth-backdrop-content__cta {
      display: flex;
      align-self: flex-start;
      margin-top: 16px;
    }

    .avanti-auth-backdrop-content__cards {
      position: absolute;
      top: 229px;
      left: 758.95px;
      display: block;
    }
  }
}
</style>
