<!--
  Страница «Ввод айбана после шагов» (Figma 31:6355 — десктоп 1440×1204,
  33:6582 — мобильная 390×1620).

  Раскладка повторяет главную страницу кабинета: общая оболочка
  `avanti_cabinet_layout`, слева шкала шагов и карточка одобренной суммы,
  справа личные данные и чеклист верификации. Отличие в том, что внутри
  карточки суммы открыта форма ввода реквизитов — без неё пользователь
  не может получить деньги.
-->
<template>
  <AvantiCabinetLayout :title="pageTitle">
    <template #main>
      <AvantiDashboardStepper
        :title="stepper.title"
        :progress-label="stepper.progressLabel"
        :steps="stepper.steps"
      />
      <AvantiIbanAmountCard :content="amount">
        <AvantiIbanTransferForm
          :content="transfer"
          :iban="iban"
          :owner="owner"
          @update:iban="setIban"
          @update:owner="setOwner"
        />
      </AvantiIbanAmountCard>
    </template>

    <template #side>
      <AvantiDashboardPersonalDataCard :title="personalData.title" :rows="personalData.rows" />
      <AvantiDashboardChecklistCard
        :eyebrow="checklist.eyebrow"
        :title="checklist.title"
        :items="checklist.items"
        :total="checklist.total"
        :completed="checklist.completed"
        :counter="checklistCounter"
        :toggle-label="texts.checklistToggle"
        :progress-label="texts.checklistProgress"
      />
    </template>
  </AvantiCabinetLayout>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useIsMobile } from '@/composables/use_is_mobile'
import AvantiCabinetLayout from '@/components/layout/avanti_cabinet_layout.vue'
import AvantiDashboardStepper from '@/components/dashboard/avanti_dashboard_stepper.vue'
import AvantiDashboardPersonalDataCard from '@/components/dashboard/avanti_dashboard_personal_data_card.vue'
import AvantiDashboardChecklistCard from '@/components/dashboard/avanti_dashboard_checklist_card.vue'
import AvantiIbanAmountCard from '@/components/iban/avanti_iban_amount_card.vue'
import AvantiIbanTransferForm from '@/components/iban/avanti_iban_transfer_form.vue'
import {
  AVANTI_DASHBOARD_TEXTS as texts,
  AVANTI_PERSONAL_DATA as personalData,
  AVANTI_STEPPER as stepper,
} from '@/constants/avanti_dashboard_mock'
import {
  AVANTI_IBAN_AMOUNT_CONTENT as amount,
  AVANTI_IBAN_CHECKLIST as checklist,
  AVANTI_IBAN_MOCK,
  AVANTI_IBAN_PAGE_TITLE as pageTitle,
  AVANTI_IBAN_TRANSFER_CONTENT as transfer,
} from '@/constants/avanti_iban_content'

/** Раскладка чеклиста отличается на мобильной ширине, поэтому нужен JS-признак. */
const isMobile = useIsMobile()

/*
 * Бейдж со счётчиком и просторная раскладка чеклиста есть только в
 * десктопном кадре: мобильный (33:6665) показывает компактную карточку.
 */
const checklistCounter = computed<string>(() => (isMobile.value ? '' : (checklist.counter ?? '')))

/* В макете поле номера пустое, а владелец счёта уже подставлен из профиля. */
const iban = ref<string>('')
const owner = ref<string>(AVANTI_IBAN_MOCK.owner)

function setIban(value: string): void {
  iban.value = value
}

function setOwner(value: string): void {
  owner.value = value
}
</script>
