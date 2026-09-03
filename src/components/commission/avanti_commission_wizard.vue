<!--
  Мастер оплаты комиссии: модальное окно, полоса из трёх шагов
  («1. IBAN / 2. COMMISSIONE / 3. COORDINATE», кадр Figma 1:352) и панель
  открытого шага.

  Сам мастер ничего не верстает: оболочку даёт `avanti_modal`, полосу шагов —
  `avanti_tabs`, содержимое — панели из `@/components/commission`. Здесь только
  связка: какой шаг открыт, какие шаги доступны и куда ведёт кнопка панели.

  Прогресс: шаг «3. COORDINATE» изначально недоступен и открывается после
  прохождения второго. Пройденные шаги остаются кликабельными — на них можно
  вернуться, как и кнопкой «Назад» в шапке окна.
-->
<template>
  <AvantiModal
    :open="open"
    :eyebrow="activeContent.eyebrow"
    :title="activeContent.title"
    size="md"
    :close-label="texts.closeLabel"
    @update:open="emit('update:open', $event)"
    @close="emit('close', $event)"
  >
    <template v-if="hasPrevious" #header-start>
      <AvantiModalCloseButton :label="texts.backLabel" @click="goBack">
        <AvantiIconArrowLeft />
      </AvantiModalCloseButton>
    </template>

    <AvantiTabs
      :model-value="currentStep"
      :items="tabItems"
      :label="texts.stepsLabel"
      @update:model-value="selectStep"
    />

    <AvantiCommissionIbanPanel
      v-if="currentStep === 'iban'"
      :content="ibanContent"
      :panel-id="AVANTI_COMMISSION_IBAN_PANEL_ID"
      @submit="goNext"
    />
    <AvantiCommissionFeePanel
      v-else-if="currentStep === 'commissione'"
      :content="feeContent"
      :panel-id="AVANTI_COMMISSION_FEE_PANEL_ID"
      @submit="goNext"
    />
    <AvantiCommissionCoordinatesPanel
      v-else
      :content="coordinatesContent"
      :variant="coordinatesVariant"
      :panel-id="AVANTI_COMMISSION_COORDINATES_PANEL_ID"
      @submit="goNext"
    />
  </AvantiModal>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import AvantiCommissionCoordinatesPanel from '@/components/commission/avanti_commission_coordinates_panel.vue'
import AvantiCommissionFeePanel from '@/components/commission/avanti_commission_fee_panel.vue'
import AvantiCommissionIbanPanel from '@/components/commission/avanti_commission_iban_panel.vue'
import AvantiIconArrowLeft from '@/components/icons/avanti_icon_arrow_left.vue'
import AvantiModal from '@/components/ui/avanti_modal.vue'
import AvantiModalCloseButton from '@/components/ui/avanti_modal_close_button.vue'
import AvantiTabs from '@/components/ui/avanti_tabs.vue'
import {
  AVANTI_COMMISSION_COORDINATES_CONTENT,
  AVANTI_COMMISSION_COORDINATES_PANEL_ID,
  AVANTI_COMMISSION_FEE_CONTENT,
  AVANTI_COMMISSION_FEE_PANEL_ID,
  AVANTI_COMMISSION_IBAN_CONTENT,
  AVANTI_COMMISSION_IBAN_PANEL_ID,
  AVANTI_COMMISSION_STEPS,
  AVANTI_COMMISSION_WIZARD_TEXTS,
} from '@/constants/avanti_commission_content'
import type {
  AvantiCommissionCoordinatesContent,
  AvantiCommissionCoordinatesVariant,
  AvantiCommissionFeeContent,
  AvantiCommissionIbanContent,
  AvantiCommissionStepId,
} from '@/types/avanti_commission'
import type { AvantiModalCloseReason } from '@/types/avanti_modal'
import type { AvantiTabItem, AvantiTabState } from '@/types/avanti_tabs'

const props = withDefaults(
  defineProps<{
    /** Окно мастера открыто. Работает и как `v-model:open`. */
    open: boolean
    /** Содержимое шага «1. IBAN»; по умолчанию — тексты из макета. */
    ibanContent?: AvantiCommissionIbanContent
    /** Содержимое шага «2. COMMISSIONE». */
    feeContent?: AvantiCommissionFeeContent
    /** Содержимое шага «3. COORDINATE». */
    coordinatesContent?: AvantiCommissionCoordinatesContent
    /** Где показать приписку про поле «Causale» на третьем шаге. */
    coordinatesVariant?: AvantiCommissionCoordinatesVariant
  }>(),
  {
    ibanContent: () => AVANTI_COMMISSION_IBAN_CONTENT,
    feeContent: () => AVANTI_COMMISSION_FEE_CONTENT,
    coordinatesContent: () => AVANTI_COMMISSION_COORDINATES_CONTENT,
    coordinatesVariant: 'note-outside',
  },
)

const emit = defineEmits<{
  /** Половина `v-model:open`: окно просит себя закрыть. */
  'update:open': [value: boolean]
  /** Окно закрыто — с причиной от оболочки. */
  close: [reason: AvantiModalCloseReason]
  /** Пройден последний шаг: нажата кнопка «Conferma pagamento». */
  finish: []
}>()

const texts = AVANTI_COMMISSION_WIZARD_TEXTS
const steps = AVANTI_COMMISSION_STEPS

/**
 * Индекс последнего доступного шага. Стартовое значение 1: первые два шага
 * открыты сразу, «3. COORDINATE» до прохождения второго заблокирован.
 */
const INITIAL_UNLOCKED_INDEX = 1

/** Часть содержимого шага, которую показывает шапка окна. */
type AvantiCommissionHead = Pick<AvantiCommissionFeeContent, 'eyebrow' | 'title'>

const currentStep = ref<AvantiCommissionStepId>(steps[0].id)
const unlockedIndex = ref<number>(INITIAL_UNLOCKED_INDEX)

const currentIndex = computed(() => steps.findIndex((step) => step.id === currentStep.value))

const hasPrevious = computed(() => currentIndex.value > 0)

/** Заголовок и надзаголовок окна берутся у открытого шага. */
const activeContent = computed<AvantiCommissionHead>(() => {
  switch (currentStep.value) {
    case 'commissione':
      return props.feeContent
    case 'coordinate':
      return props.coordinatesContent
    default:
      return props.ibanContent
  }
})

/** Переключение шага кликом по вкладке: недоступные полоса не отдаёт. */
function selectStep(value: string): void {
  const step = steps.find((item) => item.id === value)
  if (step) {
    currentStep.value = step.id
  }
}

/** Пройденные шаги помечаются `done`, ещё не открытые — `locked`. */
function stepState(index: number): AvantiTabState {
  if (index > unlockedIndex.value) {
    return 'locked'
  }
  return index < currentIndex.value ? 'done' : 'available'
}

const tabItems = computed<AvantiTabItem[]>(() =>
  steps.map((step, index) => ({
    id: step.id,
    label: step.label,
    panelId: step.panelId,
    state: stepState(index),
  })),
)

/** Кнопка панели: следующий шаг открывается и становится доступным. */
function goNext(): void {
  const next = currentIndex.value + 1
  if (next >= steps.length) {
    emit('finish')
    return
  }
  unlockedIndex.value = Math.max(unlockedIndex.value, next)
  currentStep.value = steps[next].id
}

/** Кнопка «Назад» в шапке окна: возврат на предыдущий шаг. */
function goBack(): void {
  if (hasPrevious.value) {
    currentStep.value = steps[currentIndex.value - 1].id
  }
}

/* Повторное открытие окна начинает сценарий заново — с первого шага. */
watch(
  () => props.open,
  (isOpen) => {
    if (isOpen) {
      currentStep.value = steps[0].id
      unlockedIndex.value = INITIAL_UNLOCKED_INDEX
    }
  },
)
</script>
