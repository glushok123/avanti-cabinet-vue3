<!--
  Страница «Verifica email» (кадр 1:3463) — раздел «Profilo» личного кабинета
  с блоком подтверждения почты внутри карточки «Sicurezza».

  Каркас страницы (шапка, шкала шагов, карточка личных данных правой колонки,
  чеклист верификации, нижняя навигация) переиспользован у главной страницы
  личного кабинета: в макете эти блоки совпадают до пикселя.

  ВОПРОС ЗАКАЗЧИКУ: мобильного макета экрана в Figma нет. Мобильная раскладка
  собрана по логике проекта — одна колонка, боковые отступы 20px, шкала
  шрифтов как в мобильных кадрах симуляции кредита; дублирующая карточка
  «Dati personali» правой колонки на мобильной скрыта, как и на главной.
-->
<template>
  <div class="avanti-verify-email-page">
    <h1 class="avanti-verify-email-page__title">{{ texts.pageTitle }}</h1>
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

    <main class="avanti-verify-email-page__content">
      <div class="avanti-verify-email-page__column avanti-verify-email-page__column--main">
        <AvantiDashboardStepper
          :title="stepper.title"
          :progress-label="stepper.progressLabel"
          :steps="stepper.steps"
        />
        <AvantiAuthProfileDataCard :content="profileData" />
        <AvantiAuthSecurityCard :title="securityTitle" :rows="securityRows" :verification="verification" />
      </div>

      <div class="avanti-verify-email-page__column avanti-verify-email-page__column--side">
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
import AvantiAuthProfileDataCard from '@/components/auth/avanti_auth_profile_data_card.vue'
import AvantiAuthSecurityCard from '@/components/auth/avanti_auth_security_card.vue'
import {
  AVANTI_BOTTOM_NAV_ITEMS as bottomNavItems,
  AVANTI_BREADCRUMBS as breadcrumbs,
  AVANTI_CHECKLIST as checklist,
  AVANTI_DASHBOARD_TEXTS as dashboardTexts,
  AVANTI_PERSONAL_DATA as personalData,
  AVANTI_STEPPER as stepper,
  AVANTI_SUPPORT_NAV_ITEM as supportItem,
  AVANTI_USER as user,
} from '@/constants/avanti_dashboard_mock'
import {
  AVANTI_EMAIL_VERIFICATION as verification,
  AVANTI_VERIFY_EMAIL_TEXTS as texts,
  AVANTI_VERIFY_NAV_ITEMS as navItems,
  AVANTI_VERIFY_PROFILE_DATA as profileData,
  AVANTI_VERIFY_SECURITY_ROWS as securityRows,
  AVANTI_VERIFY_SECURITY_TITLE as securityTitle,
} from '@/constants/avanti_auth_content'

/** Отличается сама разметка шапки и навигации, поэтому нужен JS-признак. */
const isMobile = useIsMobile()
</script>

<style lang="scss" scoped>
.avanti-verify-email-page {
  position: relative;
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
 * Контентная область повторяет главную страницу: ширина 1296px = 1440 − 72×2,
 * на экранах шире макета растут только боковые отступы.
 */
.avanti-verify-email-page__content {
  display: flex;
  gap: 40px;
  align-items: flex-start;
  width: 100%;
  max-width: calc($content-width-dashboard + 144px);
  padding: 0 72px 40px;
  margin-inline: auto;
}

.avanti-verify-email-page__column {
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
  .avanti-verify-email-page {
    gap: 0;
  }

  .avanti-verify-email-page__content {
    flex-direction: column;
    gap: 20px;
    align-items: stretch;
    padding: 16px 20px 20px;
  }

  /* Колонок на мобильной раскладке нет — карточки идут одним потоком. */
  .avanti-verify-email-page__column {
    display: contents;
  }

  /*
   * Правая колонка дублирует «Cognome» и «Nome» из основной карточки
   * личных данных, поэтому на мобильной она скрыта — как на главной.
   */
  .avanti-verify-email-page .avanti-verify-email-page__personal-data {
    display: none;
  }
}
</style>
