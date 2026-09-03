<!--
  Общая раскладка четырёх экранов профиля (кадры 1:2583, 1:2773, 1:2997,
  1:3226 и мобильные 19:1228, 17:2626, 22:2953, 22:3181).

  Все четыре экрана — одна и та же страница профиля; отличается только
  модальное окно поверх неё, поэтому оно приходит слотом `dialog`.

  Десктоп 1440px: шапка, две колонки (остаток + 464px).
  Мобильная 390px: компактная шапка, одна колонка, нижняя навигация.
-->
<template>
  <div class="avanti-profile-layout">
    <!-- В макете видимого заголовка нет, но без h1 ломается иерархия для скринридеров. -->
    <h1 class="avanti-profile-layout__title">{{ texts.pageTitle }}</h1>
    <AvantiAppHeaderMobile
      v-if="isMobile"
      :user="user"
      :notifications="supportItem.notifications"
      :notifications-label="dashboardTexts.notifications"
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

    <main class="avanti-profile-layout__content">
      <div class="avanti-profile-layout__column avanti-profile-layout__column--main">
        <AvantiDashboardStepper
          :title="stepper.title"
          :progress-label="stepper.progressLabel"
          :steps="stepper.steps"
        />
        <AvantiProfileDataCard :content="dataCard" @edit="handleEditName" />
        <AvantiProfileSecurityCard :content="security" @action="handleSecurityAction" />
      </div>

      <div class="avanti-profile-layout__column avanti-profile-layout__column--side">
        <AvantiDashboardPersonalDataCard
          class="avanti-profile-layout__personal-data"
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

      <AvantiProfileConsultantWidget
        v-if="consultant && !isMobile"
        class="avanti-profile-layout__consultant"
        :content="consultant"
      />
    </main>

    <AvantiBottomNav v-if="isMobile" :items="bottomNavItems" :menu-label="dashboardTexts.mainMenu" />

    <slot name="dialog" />
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
import AvantiProfileDataCard from '@/components/profile/avanti_profile_data_card.vue'
import AvantiProfileSecurityCard from '@/components/profile/avanti_profile_security_card.vue'
import AvantiProfileConsultantWidget from '@/components/profile/avanti_profile_consultant_widget.vue'
import {
  AVANTI_CHECKLIST as checklist,
  AVANTI_DASHBOARD_TEXTS as dashboardTexts,
  AVANTI_PERSONAL_DATA as personalData,
  AVANTI_STEPPER as stepper,
  AVANTI_SUPPORT_NAV_ITEM as supportItem,
  AVANTI_USER as user,
} from '@/constants/avanti_dashboard_mock'
import {
  AVANTI_PROFILE_BOTTOM_NAV_ITEMS as bottomNavItems,
  AVANTI_PROFILE_BREADCRUMBS as breadcrumbs,
  AVANTI_PROFILE_NAV_ITEMS as navItems,
  AVANTI_PROFILE_TEXTS as texts,
} from '@/constants/avanti_profile_content'
import type {
  AvantiProfileConsultantContent,
  AvantiProfileDataCardContent,
  AvantiProfileSecurityContent,
} from '@/types/avanti_profile'

defineProps<{
  dataCard: AvantiProfileDataCardContent
  security: AvantiProfileSecurityContent
  /** Всплывашка консультанта: есть только на кадре профиля без модального окна. */
  consultant?: AvantiProfileConsultantContent
}>()

/** Наружу уходит идентификатор формы, которую нужно открыть. */
const emit = defineEmits<{ open: [id: string] }>()

/** Отличается сама разметка шапки и навигации, поэтому нужен JS-признак. */
const isMobile = useIsMobile()

function handleEditName(): void {
  emit('open', 'name')
}

function handleSecurityAction(id: string): void {
  emit('open', id)
}
</script>

<style lang="scss" scoped>
.avanti-profile-layout {
  position: relative;
  display: flex;
  flex-direction: column;

  /*
   * Зазора между шапкой и контентом в макете нет: панель навигации ровно
   * 171px, и контентная область начинается сразу под ней (кадр 1:2817).
   */
  gap: 0;
  min-height: 100vh;
  background-color: var(--avanti-color-page);

  /* Заголовок нужен только для доступности — в макете его нет. */
  &__title {
    @include visually-hidden;
  }

  /*
   * Контентная область повторяет сетку главной страницы кабинета:
   * ширина 1296px = 1440 − 72×2, на экранах шире макета контент
   * не растягивается — растут боковые отступы.
   */
  &__content {
    position: relative;
    display: flex;
    gap: 40px;
    align-items: flex-start;
    width: 100%;
    max-width: calc($content-width-dashboard + 144px);
    padding: 0 72px 40px;
    margin-inline: auto;
  }

  /*
   * Всплывашка не входит в поток колонок: в кадре она лежит поверх страницы
   * и привязана к правому краю сетки (72px от края макета) и к низу
   * контентной области — низ плашки на 98px выше её нижней границы.
   */
  &__consultant {
    position: absolute;
    right: 72px;
    bottom: 98px;
  }

  &__column {
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
}

@include mobile {
  .avanti-profile-layout__content {
    flex-direction: column;
    gap: 20px;
    align-items: stretch;
    padding: 16px 16px 20px;
  }

  /* Колонки на мобильной раскладке не нужны — карточки идут одним потоком. */
  .avanti-profile-layout__column {
    display: contents;
  }

  /* Узкая карточка личных данных в мобильном макете отсутствует. */
  .avanti-profile-layout .avanti-profile-layout__personal-data {
    display: none;
  }
}
</style>
