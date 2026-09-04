<!--
  Страница «Verifica email» — раздел «Profilo» личного кабинета с блоком
  подтверждения почты внутри карточки «Sicurezza».
  Десктоп — кадр 1:3463, мобильная — кадр 22:3408 (390×1687, в макете он
  назван «profilo-mobile», но внутри стоит именно блок верификации почты).

  Каркас страницы (шапка, шкала шагов, карточка личных данных правой колонки,
  чеклист верификации, нижняя навигация) переиспользован у главной страницы
  личного кабинета — общий компонент `avanti_cabinet_layout`.

  Дублирующая карточка «Dati personali» правой колонки на мобильной скрыта,
  как и на главной: те же «Cognome» и «Nome» уже есть в основной карточке.
-->
<template>
  <AvantiCabinetLayout class="avanti-verify-email-page" :title="texts.pageTitle" :nav-items="navItems">
    <template #main>
      <AvantiDashboardStepper
        :title="stepper.title"
        :progress-label="stepper.progressLabel"
        :steps="stepper.steps"
      />
      <AvantiAuthProfileDataCard :content="profileData" />
      <AvantiProfileSecurityCard :title="securityTitle" :rows="securityRows">
        <AvantiAuthEmailVerification :content="verification" @confirm="goNext" />
      </AvantiProfileSecurityCard>
    </template>

    <template #side>
      <AvantiDashboardPersonalDataCard
        class="avanti-verify-email-page__personal-data"
        :title="personalData.title"
        :rows="personalData.rows"
      />
      <AvantiDashboardChecklistCard
        :eyebrow="checklist.eyebrow"
        :title="checklist.title"
        :items="checklist.items"
        :total="checklist.total"
        :completed="checklist.completed"
        :variant="checklist.variant"
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
import AvantiAuthProfileDataCard from '@/components/auth/avanti_auth_profile_data_card.vue'
import AvantiProfileSecurityCard from '@/components/profile/avanti_profile_security_card.vue'
import AvantiAuthEmailVerification from '@/components/auth/avanti_auth_email_verification.vue'
import {
  AVANTI_CHECKLIST as checklist,
  AVANTI_DASHBOARD_TEXTS as dashboardTexts,
  AVANTI_PERSONAL_DATA as personalData,
  AVANTI_STEPPER as stepper,
} from '@/constants/avanti_dashboard_mock'
import {
  AVANTI_EMAIL_VERIFICATION as verification,
  AVANTI_VERIFY_EMAIL_TEXTS as texts,
  AVANTI_VERIFY_NAV_ITEMS as navItems,
  AVANTI_VERIFY_PROFILE_DATA as profileData,
  AVANTI_VERIFY_SECURITY_ROWS as securityRows,
  AVANTI_VERIFY_SECURITY_TITLE as securityTitle,
} from '@/constants/avanti_auth_content'

/** Подтверждение кода открывает кабинет. */
const { goNext } = useFlowNavigation()
</script>

<style lang="scss" scoped>
@include mobile {
  /*
   * Правая колонка дублирует «Cognome» и «Nome» из основной карточки
   * личных данных, поэтому на мобильной она скрыта — как на главной.
   */
  .avanti-verify-email-page .avanti-verify-email-page__personal-data {
    display: none;
  }

  /* Кадр 22:3408: контент начинается вплотную под шапкой,
     снизу до конца кадра остаётся 40px. */
  .avanti-verify-email-page :deep(.avanti-cabinet-layout__content) {
    padding-top: 0;
    padding-bottom: 40px;
  }
}
</style>
