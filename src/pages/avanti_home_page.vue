<!--
  Главная страница личного кабинета (роут /home).
  Десктоп 1440px: шапка, две колонки (792px + 464px).
  Мобильная 390px: компактная шапка, одна колонка, нижняя навигация
  и плавающий виджет чат-консультанта.

  Сама раскладка живёт в `avanti_dashboard_view` — её переиспользуют экраны,
  где поверх кабинета открыто модальное окно. Страница выбирает уровень
  прогресса по query-параметру `state` (например `/home?state=level-4`):
  так все состояния из `avanti_dashboard_states` можно посмотреть без
  переключения кода. Неизвестное или отсутствующее значение — базовый
  уровень, тот же, что показывает роут `/home` без параметров.
-->
<template>
  <AvantiDashboardView :state="state" @lock-banner-action="goNext" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useFlowNavigation } from '@/composables/use_flow_navigation'
import AvantiDashboardView from '@/components/dashboard/avanti_dashboard_view.vue'
import {
  AVANTI_DASHBOARD_STATE_BASE,
  AVANTI_DASHBOARD_STATE_LEVEL_4,
  AVANTI_DASHBOARD_STATE_LEVEL_5,
  AVANTI_DASHBOARD_STATE_LEVEL_6,
  AVANTI_DASHBOARD_STATE_STEPS_READY,
} from '@/constants/avanti_dashboard_states'
import {
  AVANTI_DASHBOARD_STATE_CERTIFICATE,
  AVANTI_DASHBOARD_STATE_CERTIFICATE_CONFIRM,
  AVANTI_DASHBOARD_STATE_CERTIFICATE_PENDING,
  AVANTI_DASHBOARD_STATE_CERTIFICATE_VIEWER,
  AVANTI_DASHBOARD_STATE_WARNING,
} from '@/constants/avanti_dashboard_certificate_states'
import type { AvantiDashboardState } from '@/types/avanti_dashboard'

/** Состояния, доступные через query-параметр `state`, по их `id`. */
const DASHBOARD_STATES_BY_QUERY: Record<string, AvantiDashboardState> = {
  base: AVANTI_DASHBOARD_STATE_BASE,
  'steps-ready': AVANTI_DASHBOARD_STATE_STEPS_READY,
  'level-4': AVANTI_DASHBOARD_STATE_LEVEL_4,
  'level-5': AVANTI_DASHBOARD_STATE_LEVEL_5,
  'level-6': AVANTI_DASHBOARD_STATE_LEVEL_6,
  certificate: AVANTI_DASHBOARD_STATE_CERTIFICATE,
  'certificate-pending': AVANTI_DASHBOARD_STATE_CERTIFICATE_PENDING,
  'certificate-viewer': AVANTI_DASHBOARD_STATE_CERTIFICATE_VIEWER,
  'certificate-confirm': AVANTI_DASHBOARD_STATE_CERTIFICATE_CONFIRM,
  warning: AVANTI_DASHBOARD_STATE_WARNING,
}

const route = useRoute()

/** Неизвестный, повторённый в URL или отсутствующий параметр — базовый уровень. */
function resolveDashboardState(query: string | null | undefined): AvantiDashboardState {
  if (!query) {
    return AVANTI_DASHBOARD_STATE_BASE
  }
  return DASHBOARD_STATES_BY_QUERY[query] ?? AVANTI_DASHBOARD_STATE_BASE
}

const state = computed<AvantiDashboardState>(() => {
  const queryValue = route.query.state
  return resolveDashboardState(Array.isArray(queryValue) ? queryValue[0] : queryValue)
})

/** Кнопка баннера ведёт к следующему шагу сценария — загрузке документов. */
const { goNext } = useFlowNavigation()
</script>
