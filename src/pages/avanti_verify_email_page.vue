<!--
  Страница «Verifica email» (кадр 1:3463) — раздел «Profilo» личного кабинета
  с блоком подтверждения почты внутри карточки «Sicurezza».

  Каркас страницы (шапка, шкала шагов, карточка личных данных правой колонки,
  чеклист верификации, нижняя навигация) переиспользован у главной страницы
  личного кабинета — общий компонент `avanti_cabinet_layout`.

  ВОПРОС ЗАКАЗЧИКУ: мобильного макета экрана в Figma нет. Мобильная раскладка
  собрана по логике проекта — одна колонка, боковые отступы 20px (вариант
  отступов `wide-mobile`), шкала шрифтов как в мобильных кадрах симуляции
  кредита; дублирующая карточка «Dati personali» правой колонки на мобильной
  скрыта, как и на главной.
-->
<template>
  <AvantiCabinetLayout
    class="avanti-verify-email-page"
    :title="texts.pageTitle"
    :nav-items="navItems"
    content-padding="wide-mobile"
  >
    <template #main>
      <AvantiDashboardStepper
        :title="stepper.title"
        :progress-label="stepper.progressLabel"
        :steps="stepper.steps"
      />
      <AvantiAuthProfileDataCard :content="profileData" />
      <AvantiProfileSecurityCard :title="securityTitle" :rows="securityRows">
        <AvantiAuthEmailVerification :content="verification" />
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
}
</style>
