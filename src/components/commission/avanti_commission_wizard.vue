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

  Знак «?» в поясняющей плашке открывает вложенное окно «DETTAGLI»
  (кадр 246:6880): оно ложится поверх окна мастера и затемняет его.
-->
<template>
  <AvantiModal
    :open="open"
    :eyebrow="activeContent.eyebrow"
    :title="activeContent.title"
    size="md"
    :close-label="texts.closeLabel"
    :close-on-escape="!isInfoOpen"
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
      @info="openInfo"
    />
    <AvantiCommissionFeePanel
      v-else-if="currentStep === 'commissione'"
      :content="feeContent"
      :panel-id="AVANTI_COMMISSION_FEE_PANEL_ID"
      @submit="goNext"
      @info="openInfo"
    />
    <!--
      НЕТ В МАКЕТЕ: знак «?» у способа оплаты на шаге «3. COORDINATE»
      поясняет SEPA Instant, а кадра с таким окном в Figma нет. Событие
      `info` этой панели намеренно не подключено — придумывать текст нельзя
      (вопрос к заказчику, см. отчёт).
    -->
    <AvantiCommissionCoordinatesPanel
      v-else
      :content="coordinatesContent"
      :variant="coordinatesVariant"
      :panel-id="AVANTI_COMMISSION_COORDINATES_PANEL_ID"
      @submit="goNext"
    />

  </AvantiModal>

  <!--
    Окно «DETTAGLI» стоит рядом с окном мастера, а не внутри него: так оно
    монтируется позже и его обработчик клавиатуры оказывается в очереди
    последним — иначе ловушка фокуса внешнего окна перехватывала бы Tab.
  -->
  <AvantiCommissionInfoModal
    v-if="isInfoMounted"
    :open="isInfoOpen"
    :content="infoContent"
    @update:open="isInfoOpen = $event"
  />
</template>

<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import AvantiCommissionCoordinatesPanel from '@/components/commission/avanti_commission_coordinates_panel.vue'
import AvantiCommissionFeePanel from '@/components/commission/avanti_commission_fee_panel.vue'
import AvantiCommissionIbanPanel from '@/components/commission/avanti_commission_iban_panel.vue'
import AvantiCommissionInfoModal from '@/components/commission/avanti_commission_info_modal.vue'
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
  AVANTI_COMMISSION_INFO_CONTENT,
  AVANTI_COMMISSION_STEPS,
  AVANTI_COMMISSION_WIZARD_TEXTS,
} from '@/constants/avanti_commission_content'
import type {
  AvantiCommissionCoordinatesContent,
  AvantiCommissionCoordinatesVariant,
  AvantiCommissionFeeContent,
  AvantiCommissionIbanContent,
  AvantiCommissionInfoContent,
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
    /** Содержимое вложенного окна «DETTAGLI». */
    infoContent?: AvantiCommissionInfoContent
    /** С какого шага открывается мастер. Нужен витрине кадра 246:6880. */
    initialStep?: AvantiCommissionStepId
    /** Открыть окно «DETTAGLI» сразу. Нужен витрине кадра 246:6880. */
    initialInfoOpen?: boolean
  }>(),
  {
    ibanContent: () => AVANTI_COMMISSION_IBAN_CONTENT,
    feeContent: () => AVANTI_COMMISSION_FEE_CONTENT,
    coordinatesContent: () => AVANTI_COMMISSION_COORDINATES_CONTENT,
    coordinatesVariant: 'note-outside',
    infoContent: () => AVANTI_COMMISSION_INFO_CONTENT,
    initialStep: 'iban',
    initialInfoOpen: false,
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

/**
 * Класс блокировки прокрутки страницы из `use_modal_behavior`.
 * Композабл общий и правится другими агентами, поэтому здесь он не меняется:
 * закрытие вложенного окна снимает класс, а мастер возвращает его на место
 * (см. `watch` по `isInfoOpen` ниже).
 */
const SCROLL_LOCK_CLASS = 'avanti-scroll-locked'

const currentStep = ref<AvantiCommissionStepId>(props.initialStep)
const unlockedIndex = ref<number>(INITIAL_UNLOCKED_INDEX)

/**
 * Вложенное окно «DETTAGLI». Смонтировано отдельным признаком и после
 * открытия остаётся в дереве: так его обработчик клавиатуры регистрируется
 * позже обработчика окна мастера и ловушка фокуса внешнего окна не
 * перехватывает Tab у внутреннего.
 */
const isInfoMounted = ref<boolean>(props.initialInfoOpen)
const isInfoOpen = ref<boolean>(props.initialInfoOpen)

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

/** Знак «?» в поясняющей плашке: открывается окно «DETTAGLI». */
function openInfo(): void {
  isInfoMounted.value = true
  isInfoOpen.value = true
}

/* Повторное открытие окна начинает сценарий заново — с начального шага. */
watch(
  () => props.open,
  (isOpen) => {
    if (isOpen) {
      currentStep.value = props.initialStep
      unlockedIndex.value = INITIAL_UNLOCKED_INDEX
    }
  },
)

/*
 * Блокировка прокрутки в `use_modal_behavior` держится одним классом на body:
 * закрываясь, вложенное окно снимает его, хотя окно мастера ещё открыто.
 * Возвращаем класс на место — правка общего композабла тут не наш случай.
 */
watch(isInfoOpen, (isOpen) => {
  if (!isOpen && props.open) {
    void nextTick(() => {
      document.body.classList.add(SCROLL_LOCK_CLASS)
    })
  }
})
</script>
