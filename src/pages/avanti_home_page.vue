<!--
  Главная страница личного кабинета (роут /home).
  Десктоп 1440px: шапка, две колонки (792px + 464px).
  Мобильная 390px: компактная шапка, одна колонка, нижняя навигация
  и плавающий виджет чат-консультанта.
-->
<template>
  <div class="avanti-home">
    <!--
      В макете у страницы нет видимого заголовка, но без h1 ломается
      иерархия для скринридеров, поэтому заголовок скрыт визуально.
    -->
    <h1 class="avanti-home__title">{{ texts.pageTitle }}</h1>
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

    <main class="avanti-home__content">
      <div class="avanti-home__column avanti-home__column--main">
        <AvantiDashboardStepper
          v-if="stepper"
          :title="stepper.title"
          :progress-label="stepper.progressLabel"
          :steps="stepper.steps"
        />
        <AvantiDashboardBalanceCard
          :caption="balance.caption"
          :description="balance.description"
          :status-label="balance.statusLabel"
          :amount="balance.amount"
          :details="balance.details"
          :note="balance.note"
          :action-label="balance.actionLabel"
          :action-state="balance.actionState"
        />
        <AvantiDashboardLockBanner
          v-if="lockBanner"
          :title="lockBanner.title"
          :subtitle="lockBanner.subtitle"
          :counter-label="lockBanner.counterLabel"
          :counter-short-label="lockBanner.counterShortLabel"
          :options="lockBanner.options"
          :action-label="texts.lockBannerAction"
        />
        <AvantiDashboardUnlockCard
          v-if="unlock"
          :title-lines="unlock.titleLines"
          :help-label="unlock.helpLabel"
          :steps="unlock.steps"
        />
      </div>

      <div class="avanti-home__column avanti-home__column--side">
        <AvantiDashboardPersonalDataCard
          v-if="personalData"
          class="avanti-home__personal-data"
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
          :toggle-label="texts.checklistToggle"
          :progress-label="texts.checklistProgress"
        />
      </div>

      <!--
        Виджет консультанта позиционируется относительно контентной области,
        а не окна: по макету он стоит над нижней навигацией, а не поверх неё.
      -->
      <AvantiDashboardSupportBubble
        v-if="isMobile"
        class="avanti-home__support-bubble"
        :src="supportBubble.src"
        :alt="supportBubble.alt"
        :count="supportBubble.count"
      />
    </main>

    <AvantiBottomNav v-if="isMobile" :items="bottomNavItems" :menu-label="texts.mainMenu" />
  </div>
</template>

<script setup lang="ts">
import { useIsMobile } from '@/composables/use_is_mobile'
import AvantiAppHeader from '@/components/layout/avanti_app_header.vue'
import AvantiAppHeaderMobile from '@/components/layout/avanti_app_header_mobile.vue'
import AvantiBottomNav from '@/components/layout/avanti_bottom_nav.vue'
import AvantiDashboardStepper from '@/components/dashboard/avanti_dashboard_stepper.vue'
import AvantiDashboardBalanceCard from '@/components/dashboard/avanti_dashboard_balance_card.vue'
import AvantiDashboardLockBanner from '@/components/dashboard/avanti_dashboard_lock_banner.vue'
import AvantiDashboardUnlockCard from '@/components/dashboard/avanti_dashboard_unlock_card.vue'
import AvantiDashboardPersonalDataCard from '@/components/dashboard/avanti_dashboard_personal_data_card.vue'
import AvantiDashboardChecklistCard from '@/components/dashboard/avanti_dashboard_checklist_card.vue'
import AvantiDashboardSupportBubble from '@/components/dashboard/avanti_dashboard_support_bubble.vue'
import {
  AVANTI_BOTTOM_NAV_ITEMS as bottomNavItems,
  AVANTI_BREADCRUMBS as breadcrumbs,
  AVANTI_DASHBOARD_TEXTS as texts,
  AVANTI_HEADER_NAV_ITEMS as navItems,
  AVANTI_SUPPORT_BUBBLE as supportBubble,
  AVANTI_SUPPORT_NAV_ITEM as supportItem,
  AVANTI_USER as user,
} from '@/constants/avanti_dashboard_mock'
import { AVANTI_DASHBOARD_STATE_BASE } from '@/constants/avanti_dashboard_states'

/**
 * Уровень прогресса, который показывает страница. Разметка у всех уровней
 * одна: чтобы открыть другой, достаточно подставить сюда другое состояние
 * из avanti_dashboard_states — блоки, которых на уровне нет, равны null
 * и не выводятся.
 */
const { stepper, balance, lockBanner, unlock, personalData, checklist } = AVANTI_DASHBOARD_STATE_BASE

/** Отличается сама разметка шапки и навигации, поэтому нужен JS-признак. */
const isMobile = useIsMobile()
</script>

<style lang="scss" scoped>
.avanti-home {
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
 * Контентная область: ширина зафиксирована по макету (1296px = 1440 − 72×2).
 * На экранах шире макета контент не растягивается — растут боковые отступы.
 * Ограничение ставится с учётом собственных горизонтальных паддингов,
 * поэтому на 1440px отступы получаются ровно 72px, как в Figma.
 */
.avanti-home__content {
  display: flex;
  gap: 40px;
  align-items: flex-start;
  width: 100%;
  max-width: calc($content-width-dashboard + 144px);
  padding: 0 72px 40px;
  margin-inline: auto;
}

.avanti-home__column {
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

/*
 * Плавающий виджет консультанта: правый нижний угол контентной области.
 * По макету (кадр 390×1139) аватар занимает 924…981px, а нижняя навигация
 * начинается с 1077px — то есть нижний край виджета на 96px выше неё.
 * Отсчёт идёт от низа контентной области, а не от низа окна: иначе на
 * экранах выше макета виджет уезжает вниз и перекрывает навигацию.
 */
.avanti-home__support-bubble {
  position: absolute;
  right: 19px;
  bottom: 96px;
  z-index: 1;
}

@include mobile {
  .avanti-home {
    gap: 0;
  }

  .avanti-home__content {
    position: relative;
    flex-direction: column;
    gap: 20px;
    align-items: stretch;

    /* Нижний отступ 20px — тот же зазор, что между карточками: в макете
       нижняя навигация лежит внутри контентного контейнера. */
    padding: 16px 16px 20px;
  }

  /* Колонки на мобильной раскладке не нужны — карточки идут одним потоком. */
  .avanti-home__column {
    display: contents;
  }

  /* Карточка личных данных в мобильном макете отсутствует. */
  .avanti-home .avanti-home__personal-data {
    display: none;
  }
}
</style>
