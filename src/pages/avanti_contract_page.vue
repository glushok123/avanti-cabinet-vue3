<!--
  Страница договора (кадр Figma 22:4780, десктоп 1440×3541).
  Десктоп: шапка личного кабинета, две колонки — документ (900px)
  и сайдбар со статусом верификации (356px).
  Мобильного макета этого экрана в Figma нет: на 390px колонки
  выстраиваются в один поток, а таблица амортизации прокручивается вбок.
-->
<template>
  <div class="avanti-contract-page">
    <h1 class="avanti-contract-page__title">{{ texts.pageTitle }}</h1>
    <AvantiAppHeaderMobile
      v-if="isMobile"
      :user="user"
      :notifications="supportItem.notifications"
      :notifications-label="dashboardTexts.notifications"
      :profile-label="dashboardTexts.profile"
    />
    <AvantiAppHeader
      v-else
      :user="user"
      :nav-items="navItems"
      :support-item="supportItem"
      :breadcrumbs="breadcrumbs"
      :menu-label="dashboardTexts.mainMenu"
      :breadcrumbs-label="dashboardTexts.breadcrumbs"
    />

    <main class="avanti-contract-page__content">
      <div class="avanti-contract-page__column avanti-contract-page__column--main">
        <AvantiDashboardStepper
          :title="stepper.title"
          :progress-label="stepper.progressLabel"
          :steps="stepper.steps"
        />
        <section class="avanti-contract-page__documents">
          <h2 class="avanti-contract-page__documents-title">{{ texts.documentsTitle }}</h2>
          <AvantiContractVerifiedBanner :banner="verifiedBanner" />
          <AvantiContractSigningCard :card="signingCard" />
          <AvantiContractDocument
            :label="texts.documentLabel"
            title-tag="h3"
            :heading="heading"
            :meta="meta"
            :parties="parties"
            :fields="fields"
            :terms="terms"
            :purpose="purpose"
            :schedule="schedule"
            :sections="sections"
            :signatures="signatures"
          />
          <AvantiContractStatusBanner :banner="statusBanner" />
        </section>
      </div>

      <div class="avanti-contract-page__column avanti-contract-page__column--side">
        <AvantiDashboardPersonalDataCard
          class="avanti-contract-page__personal-data"
          :title="personalData.title"
          :rows="personalData.rows"
        />
        <AvantiDashboardChecklistCard
          :eyebrow="checklist.eyebrow"
          :title="checklist.title"
          :items="checklist.items"
          :total="checklist.total"
          :completed="checklist.completed"
          :toggle-label="dashboardTexts.checklistToggle"
          :progress-label="dashboardTexts.checklistProgress"
        />
      </div>
    </main>

    <AvantiBottomNav v-if="isMobile" :items="bottomNavItems" :menu-label="dashboardTexts.mainMenu" />
  </div>
</template>

<script setup lang="ts">
import { useIsMobile } from '@/composables/use_is_mobile'
import AvantiAppHeader from '@/components/layout/avanti_app_header.vue'
import AvantiAppHeaderMobile from '@/components/layout/avanti_app_header_mobile.vue'
import AvantiBottomNav from '@/components/layout/avanti_bottom_nav.vue'
import AvantiDashboardStepper from '@/components/dashboard/avanti_dashboard_stepper.vue'
import AvantiDashboardPersonalDataCard from '@/components/dashboard/avanti_dashboard_personal_data_card.vue'
import AvantiDashboardChecklistCard from '@/components/dashboard/avanti_dashboard_checklist_card.vue'
import AvantiContractDocument from '@/components/contract/avanti_contract_document.vue'
import AvantiContractSigningCard from '@/components/contract/avanti_contract_signing_card.vue'
import AvantiContractStatusBanner from '@/components/contract/avanti_contract_status_banner.vue'
import AvantiContractVerifiedBanner from '@/components/contract/avanti_contract_verified_banner.vue'
import {
  AVANTI_BOTTOM_NAV_ITEMS as bottomNavItems,
  AVANTI_BREADCRUMBS as breadcrumbs,
  AVANTI_DASHBOARD_TEXTS as dashboardTexts,
  AVANTI_HEADER_NAV_ITEMS as navItems,
  AVANTI_PERSONAL_DATA as personalData,
  AVANTI_SUPPORT_NAV_ITEM as supportItem,
  AVANTI_USER as user,
} from '@/constants/avanti_dashboard_mock'
import {
  AVANTI_CONTRACT_CHECKLIST as checklist,
  AVANTI_CONTRACT_FIELDS as fields,
  AVANTI_CONTRACT_HEADING as heading,
  AVANTI_CONTRACT_META as meta,
  AVANTI_CONTRACT_PARTIES as parties,
  AVANTI_CONTRACT_PURPOSE as purpose,
  AVANTI_CONTRACT_SCHEDULE as schedule,
  AVANTI_CONTRACT_SECTIONS as sections,
  AVANTI_CONTRACT_SIGNATURES as signatures,
  AVANTI_CONTRACT_SIGNING_CARD as signingCard,
  AVANTI_CONTRACT_STATUS_BANNER as statusBanner,
  AVANTI_CONTRACT_STEPPER as stepper,
  AVANTI_CONTRACT_TERMS as terms,
  AVANTI_CONTRACT_TEXTS as texts,
  AVANTI_CONTRACT_VERIFIED_BANNER as verifiedBanner,
} from '@/constants/avanti_contract_content'

/** Отличается сама разметка шапки и навигации, поэтому нужен JS-признак. */
const isMobile = useIsMobile()
</script>

<style lang="scss" scoped>
.avanti-contract-page {
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-height: 100vh;
  background-color: var(--avanti-color-page);

  /* Заголовок нужен только для доступности — в макете его нет. */
  &__title {
    @include visually-hidden;
  }
}

/*
 * Контентная область: ширина зафиксирована по макету (1296px = 1440 − 72×2).
 * На экранах шире макета контент не растягивается — растут боковые отступы.
 */
.avanti-contract-page__content {
  display: flex;
  gap: 40px;
  align-items: flex-start;
  width: 100%;
  max-width: calc($content-width-dashboard + 144px);
  padding: 2px 72px 42px;
  margin-inline: auto;
}

.avanti-contract-page__column {
  display: flex;
  flex-direction: column;
  gap: 32px;
  align-items: flex-start;

  /* Документ занимает 900px из 1296px контентной области. */
  &--main {
    flex: 1 1 0;
    min-width: 0;
  }

  &--side {
    flex: 0 0 356px;
    width: 356px;
  }
}

/* Секция документов: заголовок, баннеры, карточка подписания и договор. */
.avanti-contract-page__documents {
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: flex-start;
  width: 100%;
}

.avanti-contract-page__documents-title {
  margin: 0;
  font-size: 22px;
  font-weight: var(--avanti-font-weight-bold);
  line-height: normal;
  color: var(--avanti-color-text-strong);
}

@include mobile {
  .avanti-contract-page {
    gap: 0;
  }

  .avanti-contract-page__content {
    flex-direction: column;
    gap: 20px;
    align-items: stretch;
    padding: 20px;
  }

  /* Колонки на мобильной раскладке не нужны — блоки идут одним потоком. */
  .avanti-contract-page__column {
    display: contents;
  }

  .avanti-contract-page__documents {
    gap: 16px;
  }

  .avanti-contract-page__documents-title {
    font-size: 18px;
  }

  /* Карточка личных данных скрыта, как и на мобильной главной. */
  .avanti-contract-page .avanti-contract-page__personal-data {
    display: none;
  }
}
</style>
