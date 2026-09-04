<!--
  Содержимое личного кабинета: две колонки карточек внутри общей оболочки
  `avanti_cabinet_layout` (шапка, контентная сетка, нижняя навигация).

  Вынесено из страницы `avanti_home_page`, чтобы тот же набор карточек могли
  переиспользовать экраны, где поверх кабинета открыто модальное окно
  (мастер комиссии, окно IBAN). Уровень прогресса приходит пропом `state`
  из `@/constants/avanti_dashboard_states`: блоки, которых на уровне нет,
  равны null и не выводятся.
-->
<template>
  <AvantiCabinetLayout class="avanti-dashboard-view" :title="title">
    <template #main>
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
        @action="emit('lock-banner-action')"
      />
      <AvantiDashboardUnlockCard
        v-if="unlock"
        :title-lines="unlock.titleLines"
        :help-label="unlock.helpLabel"
        :steps="unlock.steps"
      />
      <!-- Карточка сертификата CPI встаёт последней в левой колонке
           (кадры 256:11723, 232:16385). -->
      <AvantiCertificateCard
        v-if="certificate"
        :overline="certificate.card.overline"
        :title="certificate.card.title"
        :description="certificate.card.description"
        :metadata="certificate.card.metadata"
        :action-label="certificate.card.actionLabel"
        :state="certificate.card.state"
        @action="viewerOpen = true"
      />
    </template>

    <template #side>
      <!--
        Форма вывода средств: в разблокированном состоянии она стоит первой
        в правой колонке (кадр 241:25321). На уровнях, где её нет,
        `withdrawal` равен null и блок не выводится.
      -->
      <AvantiWithdrawalForm
        v-if="withdrawal"
        :available-amount="withdrawal.availableAmount"
        :details="withdrawal.details"
      />
      <AvantiDashboardPersonalDataCard
        v-if="personalData"
        class="avanti-dashboard-view__personal-data"
        :title="personalData.title"
        :rows="personalData.rows"
      />
      <AvantiDashboardChecklistCard
        :eyebrow="checklist.eyebrow"
        :title="checklist.title"
        :items="checklist.items"
        :total="checklist.total"
        :completed="checklist.completed"
        :counter="checklist.counter"
        :variant="checklist.variant"
        :toggle-label="texts.checklistToggle"
        :progress-label="texts.checklistProgress"
      />
    </template>

    <template #dialog>
      <!--
        Окна блока сертификата: просмотрщик документа и карточка
        подтверждения поверх него (кадры 256:11916, 256:12255). Открыты ли
        они сразу, говорит уровень — так собран каждый кадр.
      -->
      <template v-if="certificate">
        <AvantiCertificateViewer v-model:open="viewerOpen" :content="certificate.viewer" />
        <AvantiCertificateConfirmationModal
          v-model:open="confirmationOpen"
          :content="certificate.confirmation"
        />
      </template>
      <AvantiDashboardWarningModal
        v-if="warning"
        v-model:open="warningOpen"
        :badge="warning.badge"
        :title="warning.title"
        :message="warning.message"
        :action-label="warning.actionLabel"
        :close-label="warning.closeLabel"
      />
    </template>

    <template #float>
      <!--
        Виджет консультанта позиционируется относительно контентной области,
        а не окна: по макету он стоит над нижней навигацией, а не поверх неё.
      -->
      <AvantiDashboardSupportBubble
        v-if="isMobile"
        class="avanti-dashboard-view__support-bubble"
        :src="supportBubble.src"
        :alt="supportBubble.alt"
        :count="supportBubble.count"
      />
    </template>
  </AvantiCabinetLayout>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useIsMobile } from '@/composables/use_is_mobile'
import AvantiCabinetLayout from '@/components/layout/avanti_cabinet_layout.vue'
import AvantiDashboardStepper from '@/components/dashboard/avanti_dashboard_stepper.vue'
import AvantiDashboardBalanceCard from '@/components/dashboard/avanti_dashboard_balance_card.vue'
import AvantiDashboardLockBanner from '@/components/dashboard/avanti_dashboard_lock_banner.vue'
import AvantiDashboardUnlockCard from '@/components/dashboard/avanti_dashboard_unlock_card.vue'
import AvantiDashboardPersonalDataCard from '@/components/dashboard/avanti_dashboard_personal_data_card.vue'
import AvantiDashboardChecklistCard from '@/components/dashboard/avanti_dashboard_checklist_card.vue'
import AvantiDashboardSupportBubble from '@/components/dashboard/avanti_dashboard_support_bubble.vue'
import AvantiDashboardWarningModal from '@/components/dashboard/avanti_dashboard_warning_modal.vue'
import AvantiWithdrawalForm from '@/components/withdrawal/avanti_withdrawal_form.vue'
import AvantiCertificateCard from '@/components/certificate/avanti_certificate_card.vue'
import AvantiCertificateViewer from '@/components/certificate/avanti_certificate_viewer.vue'
import AvantiCertificateConfirmationModal from '@/components/certificate/avanti_certificate_confirmation_modal.vue'
import {
  AVANTI_DASHBOARD_TEXTS as texts,
  AVANTI_SUPPORT_BUBBLE as supportBubble,
} from '@/constants/avanti_dashboard_mock'
import type { AvantiDashboardState } from '@/types/avanti_dashboard'

const props = withDefaults(
  defineProps<{
    /** Уровень прогресса кабинета: набор данных всех блоков страницы. */
    state: AvantiDashboardState
    /** Заголовок страницы для скринридеров: в макете его не видно. */
    title?: string
  }>(),
  { title: texts.pageTitle },
)

/*
 * Разметка у всех уровней одна: меняется только набор данных. Блоки,
 * которых на уровне нет, равны null и не попадают в DOM.
 */
/**
 * Кнопка-стрелка баннера «средства заблокированы» ведёт к незавершённым
 * шагам. Раскладка не знает маршрута — о переходе решает страница.
 */
const emit = defineEmits<{ 'lock-banner-action': [] }>()

const stepper = computed(() => props.state.stepper)
const balance = computed(() => props.state.balance)
const lockBanner = computed(() => props.state.lockBanner)
const unlock = computed(() => props.state.unlock)
const personalData = computed(() => props.state.personalData)
const checklist = computed(() => props.state.checklist)
const withdrawal = computed(() => props.state.withdrawal)
const certificate = computed(() => props.state.certificate ?? null)
const warning = computed(() => props.state.warning ?? null)

/*
 * Окна блока сертификата и предупреждение открываются в том виде, в каком
 * их показывает кадр уровня, но остаются закрываемыми: признак уровня
 * задаёт только исходное состояние, дальше окном управляет пользователь.
 */
const viewerOpen = ref(false)
const confirmationOpen = ref(false)
const warningOpen = ref(false)

watch(
  () => props.state,
  (state) => {
    viewerOpen.value = Boolean(state.certificate?.viewerOpen)
    confirmationOpen.value = Boolean(state.certificate?.confirmationOpen)
    warningOpen.value = Boolean(state.warning)
  },
  { immediate: true },
)

/** Виджет консультанта есть только в мобильном кадре, поэтому нужен JS-признак. */
const isMobile = useIsMobile()
</script>

<style lang="scss" scoped>
/*
 * Плавающий виджет консультанта: правый нижний угол контентной области.
 * По макету (кадр 390×1139) аватар занимает 924…981px, а нижняя навигация
 * начинается с 1077px — то есть нижний край виджета на 96px выше неё.
 * Отсчёт идёт от низа контентной области, а не от низа окна: иначе на
 * экранах выше макета виджет уезжает вниз и перекрывает навигацию.
 */
.avanti-dashboard-view__support-bubble {
  position: absolute;
  right: 19px;
  bottom: 34px;
  z-index: 1;
}

@include mobile {
  /* Карточка личных данных в мобильном макете отсутствует. */
  .avanti-dashboard-view .avanti-dashboard-view__personal-data {
    display: none;
  }
}
</style>
