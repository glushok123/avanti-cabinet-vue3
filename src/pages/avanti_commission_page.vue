<!--
  Страница-витрина мастера оплаты комиссии (роут /commission).

  В макете окно комиссии открыто поверх личного кабинета, поэтому фоном
  служит та же раскладка, что и на главной (`avanti_dashboard_view`), а
  сверху лежит мастер. Уровень прогресса взят базовый: комиссию платят
  до разблокировки средств.

  Витрина повторяет эталонный кадр 246:6880: открыт шаг «2. COMMISSIONE»,
  а поверх окна мастера лежит вложенное окно «DETTAGLI».

  НЕТ В МАКЕТЕ: кадра с активным шагом «1. IBAN» в Figma нет — содержимое
  этого шага не спроектировано, поэтому витрина на нём не открывается
  (вопрос к заказчику, см. README, раздел «Расхождения в макете»).

  Закрытие окна на этапе вёрстки никуда не ведёт — мастер просто открывается
  заново. Переходы появятся вместе с маршрутами сценария и API.
-->
<template>
  <div class="avanti-commission-page">
    <AvantiDashboardView :state="state" />
    <AvantiCommissionWizard
      v-model:open="isOpen"
      initial-step="commissione"
      initial-info-open
      @finish="handleFinish"
    />
    <p class="avanti-commission-page__status" role="status">{{ status }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useFlowNavigation } from '@/composables/use_flow_navigation'
import AvantiCommissionWizard from '@/components/commission/avanti_commission_wizard.vue'
import AvantiDashboardView from '@/components/dashboard/avanti_dashboard_view.vue'
import { AVANTI_DASHBOARD_STATE_BASE as state } from '@/constants/avanti_dashboard_states'

/** В макете окно открыто сразу — витрина повторяет это поведение. */
const isOpen = ref<boolean>(true)

/** Оплата подтверждена: реального запроса нет, витрине хватает признака. */
const isFinished = ref<boolean>(false)

const status = computed<string>(() => {
  if (isFinished.value) {
    return 'Pagamento confermato.'
  }
  return isOpen.value ? 'Procedura di pagamento aperta.' : 'Procedura di pagamento chiusa.'
})

function handleFinish(): void {
  isFinished.value = true
  isOpen.value = false
  goNext()
}

/** Комиссия — последний шаг: после оплаты возвращаемся в кабинет. */
const { goNext } = useFlowNavigation()
</script>

<style lang="scss" scoped>
.avanti-commission-page {
  min-height: 100vh;
  background-color: var(--avanti-color-page);

  /* Строка состояния нужна только витрине: в макете её нет. */
  &__status {
    @include visually-hidden;
  }
}
</style>
