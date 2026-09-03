<!--
  Страница «Ввод айбана после шагов» (Figma 31:6355 — десктоп 1440×1204,
  33:6582 — мобильная 390×1620).

  Раскладка повторяет главную страницу кабинета: слева шкала шагов и
  карточка одобренной суммы, справа личные данные и чеклист верификации.
  Отличие в том, что внутри карточки суммы открыта форма ввода реквизитов —
  без неё пользователь не может получить деньги.
-->
<template>
  <div class="avanti-iban-page">
    <!-- В макете видимого заголовка страницы нет, но он нужен скринридерам. -->
    <h1 class="avanti-iban-page__title">{{ pageTitle }}</h1>
    <AvantiAppHeaderMobile
      v-if="isMobile"
      :user="user"
      :notifications="supportItem.notifications"
      :notifications-label="texts.notifications"
    />
    <AvantiAppHeader
      v-else
      :user="user"
      :nav-items="navItems"
      :support-item="supportItem"
      :breadcrumbs="breadcrumbs"
      :menu-label="texts.mainMenu"
      :breadcrumbs-label="texts.breadcrumbs"
    />

    <main class="avanti-iban-page__content">
      <div class="avanti-iban-page__column avanti-iban-page__column--main">
        <AvantiDashboardStepper
          :title="stepper.title"
          :progress-label="stepper.progressLabel"
          :steps="stepper.steps"
        />
        <AvantiIbanAmountCard :content="amount">
          <AvantiIbanTransferForm
            :content="transfer"
            :iban="iban"
            :owner="owner"
            @update:iban="setIban"
            @update:owner="setOwner"
          />
        </AvantiIbanAmountCard>
      </div>

      <div class="avanti-iban-page__column avanti-iban-page__column--side">
        <AvantiDashboardPersonalDataCard :title="personalData.title" :rows="personalData.rows" />
        <AvantiDashboardChecklistCard
          :eyebrow="checklist.eyebrow"
          :title="checklist.title"
          :items="checklist.items"
          :total="checklist.total"
          :completed="checklist.completed"
          :toggle-label="texts.checklistToggle"
          :progress-label="texts.checklistProgress"
        />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useIsMobile } from '@/composables/use_is_mobile'
import AvantiAppHeader from '@/components/layout/avanti_app_header.vue'
import AvantiAppHeaderMobile from '@/components/layout/avanti_app_header_mobile.vue'
import AvantiDashboardStepper from '@/components/dashboard/avanti_dashboard_stepper.vue'
import AvantiDashboardPersonalDataCard from '@/components/dashboard/avanti_dashboard_personal_data_card.vue'
import AvantiDashboardChecklistCard from '@/components/dashboard/avanti_dashboard_checklist_card.vue'
import AvantiIbanAmountCard from '@/components/iban/avanti_iban_amount_card.vue'
import AvantiIbanTransferForm from '@/components/iban/avanti_iban_transfer_form.vue'
import {
  AVANTI_BREADCRUMBS as breadcrumbs,
  AVANTI_CHECKLIST as checklist,
  AVANTI_DASHBOARD_TEXTS as texts,
  AVANTI_HEADER_NAV_ITEMS as navItems,
  AVANTI_PERSONAL_DATA as personalData,
  AVANTI_STEPPER as stepper,
  AVANTI_SUPPORT_NAV_ITEM as supportItem,
  AVANTI_USER as user,
} from '@/constants/avanti_dashboard_mock'
import {
  AVANTI_IBAN_AMOUNT_CONTENT as amount,
  AVANTI_IBAN_MOCK,
  AVANTI_IBAN_PAGE_TITLE as pageTitle,
  AVANTI_IBAN_TRANSFER_CONTENT as transfer,
} from '@/constants/avanti_iban_content'

/** Отличается сама разметка шапки, поэтому нужен JS-признак. */
const isMobile = useIsMobile()

/* В макете поле номера пустое, а владелец счёта уже подставлен из профиля. */
const iban = ref<string>('')
const owner = ref<string>(AVANTI_IBAN_MOCK.owner)

function setIban(value: string): void {
  iban.value = value
}

function setOwner(value: string): void {
  owner.value = value
}
</script>

<style lang="scss" scoped>
.avanti-iban-page {
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-height: 100vh;
  background-color: var(--avanti-color-page);

  &__title {
    @include visually-hidden;
  }
}

/*
 * Контентная область по макету: 1296px = 1440 − 72×2. На экранах шире
 * макета растут только боковые отступы, сам контент не растягивается.
 */
.avanti-iban-page__content {
  display: flex;
  gap: 40px;
  align-items: flex-start;
  width: 100%;
  max-width: calc($content-width-dashboard + 144px);
  padding: 0 72px 40px;
  margin-inline: auto;
}

.avanti-iban-page__column {
  display: flex;
  flex-direction: column;
  gap: 32px;
  align-items: flex-start;

  &--main {
    flex: 1 1 0;
    min-width: 0;
  }

  &--side {
    flex: 0 0 464px;
    width: 464px;
  }
}

@include mobile {
  .avanti-iban-page {
    gap: 0;
  }

  .avanti-iban-page__content {
    flex-direction: column;
    gap: 20px;
    align-items: stretch;
    padding: 16px 16px 20px;
  }

  /* Колонок на мобильной раскладке нет — карточки идут одним потоком. */
  .avanti-iban-page__column {
    display: contents;
  }
}
</style>
