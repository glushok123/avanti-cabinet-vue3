<!--
  Содержимое четырёх экранов профиля (кадры 1:2583, 1:2773, 1:2997,
  1:3226 и мобильные 19:1228, 17:2626, 22:2953, 22:3181).

  Все четыре экрана — одна и та же страница профиля; отличается только
  модальное окно поверх неё, поэтому оно приходит слотом `dialog`.

  Оболочка (шапка, контентная сетка, нижняя навигация) — общий компонент
  `avanti_cabinet_layout`. Профиль передаёт ему свои пункты меню, крошки
  и вариант отступов `flush`: панель навигации ровно 171px, и контентная
  область начинается сразу под ней, без зазора (кадр 1:2817).
-->
<template>
  <AvantiCabinetLayout
    class="avanti-profile-layout"
    :title="texts.pageTitle"
    :nav-items="navItems"
    :breadcrumbs="breadcrumbs"
    :bottom-nav-items="bottomNavItems"
    content-padding="flush"
  >
    <template #main>
      <AvantiDashboardStepper
        :title="stepper.title"
        :progress-label="stepper.progressLabel"
        :steps="stepper.steps"
      />
      <AvantiProfileDataCard :content="dataCard" @edit="handleEditName" />
      <AvantiProfileSecurityCard
        :title="security.title"
        :rows="security.rows"
        variant="compact"
        @action="handleSecurityAction"
      >
        <AvantiProfileVerificationBlock :content="security.verification" />
      </AvantiProfileSecurityCard>
    </template>

    <template #side>
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
        :counter="checklistCounter"
        :toggle-label="dashboardTexts.checklistToggle"
        :progress-label="dashboardTexts.checklistProgress"
      />
    </template>

    <template #float>
      <AvantiProfileConsultantWidget
        v-if="consultant && !isMobile"
        class="avanti-profile-layout__consultant"
        :content="consultant"
      />
    </template>

    <template #dialog>
      <slot name="dialog" />
    </template>
  </AvantiCabinetLayout>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useIsMobile } from '@/composables/use_is_mobile'
import AvantiCabinetLayout from '@/components/layout/avanti_cabinet_layout.vue'
import AvantiDashboardStepper from '@/components/dashboard/avanti_dashboard_stepper.vue'
import AvantiDashboardPersonalDataCard from '@/components/dashboard/avanti_dashboard_personal_data_card.vue'
import AvantiDashboardChecklistCard from '@/components/dashboard/avanti_dashboard_checklist_card.vue'
import AvantiProfileDataCard from '@/components/profile/avanti_profile_data_card.vue'
import AvantiProfileSecurityCard from '@/components/profile/avanti_profile_security_card.vue'
import AvantiProfileVerificationBlock from '@/components/profile/avanti_profile_verification_block.vue'
import AvantiProfileConsultantWidget from '@/components/profile/avanti_profile_consultant_widget.vue'
import {
  AVANTI_DASHBOARD_TEXTS as dashboardTexts,
  AVANTI_PERSONAL_DATA as personalData,
  AVANTI_STEPPER as stepper,
} from '@/constants/avanti_dashboard_mock'
import {
  AVANTI_PROFILE_BOTTOM_NAV_ITEMS as bottomNavItems,
  AVANTI_PROFILE_CHECKLIST as checklist,
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

/** Часть блоков отличается на мобильной ширине, поэтому нужен JS-признак. */
const isMobile = useIsMobile()

/*
 * Бейдж со счётчиком и просторная раскладка чеклиста есть только в
 * десктопных кадрах профиля: мобильные (19:1228) показывают компактную
 * карточку, как на главной.
 */
const checklistCounter = computed<string>(() => (isMobile.value ? '' : (checklist.counter ?? '')))

function handleEditName(): void {
  emit('open', 'name')
}

function handleSecurityAction(id: string): void {
  emit('open', id)
}
</script>

<style lang="scss" scoped>
/*
 * Всплывашка не входит в поток колонок: в кадре она лежит поверх страницы
 * и привязана к правому краю сетки (72px от края макета) и к низу
 * контентной области — низ плашки на 98px выше её нижней границы.
 */
.avanti-profile-layout__consultant {
  position: absolute;
  right: 72px;
  bottom: 98px;
}

@include mobile {
  /* Узкая карточка личных данных в мобильном макете отсутствует. */
  .avanti-profile-layout .avanti-profile-layout__personal-data {
    display: none;
  }
}
</style>
