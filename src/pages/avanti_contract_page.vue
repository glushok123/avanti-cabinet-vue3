<!--
  Страница договора (кадр Figma 22:4780, десктоп 1440×3541).
  Десктоп: шапка личного кабинета из общей оболочки `avanti_cabinet_layout`,
  две колонки — документ (900px) и сайдбар со статусом верификации (356px).
  Мобильного макета этого экрана в Figma нет: на 390px колонки
  выстраиваются в один поток, а таблица амортизации прокручивается вбок.
-->
<template>
  <AvantiCabinetLayout
    class="avanti-contract-page"
    :title="texts.pageTitle"
    :side-width="356"
    content-padding="document"
  >
    <template #main>
      <AvantiDashboardStepper
        :title="stepper.title"
        :progress-label="stepper.progressLabel"
        :steps="stepper.steps"
      />
      <section class="avanti-contract-page__documents">
        <h2 class="avanti-contract-page__documents-title">{{ texts.documentsTitle }}</h2>
        <AvantiContractVerifiedBanner :banner="verifiedBanner" />
        <AvantiContractSigningCard :card="signingCard" @sign="goNext" />
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
    </template>

    <template #side>
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
    </template>
  </AvantiCabinetLayout>
</template>

<script setup lang="ts">
import { useFlowNavigation } from '@/composables/use_flow_navigation'
import AvantiCabinetLayout from '@/components/layout/avanti_cabinet_layout.vue'
import AvantiDashboardStepper from '@/components/dashboard/avanti_dashboard_stepper.vue'
import AvantiDashboardPersonalDataCard from '@/components/dashboard/avanti_dashboard_personal_data_card.vue'
import AvantiDashboardChecklistCard from '@/components/dashboard/avanti_dashboard_checklist_card.vue'
import AvantiContractDocument from '@/components/contract/avanti_contract_document.vue'
import AvantiContractSigningCard from '@/components/contract/avanti_contract_signing_card.vue'
import AvantiContractStatusBanner from '@/components/contract/avanti_contract_status_banner.vue'
import AvantiContractVerifiedBanner from '@/components/contract/avanti_contract_verified_banner.vue'
import {
  AVANTI_DASHBOARD_TEXTS as dashboardTexts,
  AVANTI_PERSONAL_DATA as personalData,
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

/** «Firma il contratto» ведёт на экран подписи. */
const { goNext } = useFlowNavigation()
</script>

<style lang="scss" scoped>
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
