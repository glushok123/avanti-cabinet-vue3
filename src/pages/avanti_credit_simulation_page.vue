<!--
  Страница «Симуляция кредита» — первый шаг мастера оформления.
  Десктоп: две колонки (параметры слева, итоги справа) и блок навигации внизу.
  Мобильная: те же блоки одной колонкой; порядок совпадает с порядком в DOM,
  поэтому колонки на мобильной раскрываются через display: contents.
-->
<template>
  <div class="avanti-simulation-page">
    <AvantiSimulationHeader :menu-label="texts.menu" />
    <main class="avanti-simulation-page__body">
      <div class="avanti-simulation-page__content">
        <div class="avanti-simulation-page__column avanti-simulation-page__column--params">
          <AvantiSimulationAmountSection
            v-model="amount"
            :overline="texts.amountOverline"
            :title="texts.amountTitle"
            title-tag="h1"
            :currency="currency"
            :field-label="texts.amountFieldLabel"
            :max="amountMax"
            :min-label="amountMinLabel"
            :max-label="amountMaxLabel"
          />
          <AvantiSimulationDurationSection
            v-model="months"
            :overline="texts.durationOverline"
            :title="texts.durationTitle"
            :min="monthsMin"
            :max="monthsMax"
            :step="monthsStep"
            :unit="monthsUnit"
            :slider-label="texts.durationSliderLabel"
            :min-label="monthsMinLabel"
            :max-label="monthsMaxLabel"
          />
        </div>
        <div class="avanti-simulation-page__column avanti-simulation-page__column--summary">
          <AvantiSimulationSummaryCard :rows="summaryRows" />
          <AvantiSimulationDisclaimer
            :badge="texts.disclaimerBadge"
            :text="texts.disclaimerSoft"
            :strong-text="texts.disclaimerStrong"
          />
        </div>
      </div>
      <AvantiSimulationActions
        class="avanti-simulation-page__actions"
        :back-label="texts.actionBack"
        :next-label="texts.actionNext"
        @back="goBack"
        @next="goNext"
      />
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import AvantiSimulationHeader from '@/components/layout/avanti_simulation_header.vue'
import AvantiSimulationAmountSection from '@/components/simulation/avanti_simulation_amount_section.vue'
import AvantiSimulationDurationSection from '@/components/simulation/avanti_simulation_duration_section.vue'
import AvantiSimulationSummaryCard from '@/components/simulation/avanti_simulation_summary_card.vue'
import AvantiSimulationDisclaimer from '@/components/simulation/avanti_simulation_disclaimer.vue'
import AvantiSimulationActions from '@/components/simulation/avanti_simulation_actions.vue'
import { useFlowNavigation } from '@/composables/use_flow_navigation'
import { useIsMobile } from '@/composables/use_is_mobile'
import { formatAmount, formatAmountSpaced, useCreditSimulation } from '@/composables/use_credit_simulation'
import {
  AVANTI_AMOUNT_MAX_DESKTOP,
  AVANTI_AMOUNT_MAX_MOBILE,
  AVANTI_AMOUNT_MIN,
  AVANTI_MONTHS_MAX,
  AVANTI_MONTHS_MIN,
  AVANTI_MONTHS_MIN_LABEL_DESKTOP,
  AVANTI_MONTHS_MIN_LABEL_MOBILE,
  AVANTI_MONTHS_STEP,
  AVANTI_SIMULATION_TEXTS,
  AVANTI_UNIT_CURRENCY,
  AVANTI_UNIT_MONTHS,
  AVANTI_UNIT_PER_MONTH,
} from '@/constants/avanti_simulation_config'

const texts = AVANTI_SIMULATION_TEXTS
const currency = AVANTI_UNIT_CURRENCY
const monthsMin = AVANTI_MONTHS_MIN
const monthsMax = AVANTI_MONTHS_MAX
const monthsStep = AVANTI_MONTHS_STEP
const monthsUnit = AVANTI_UNIT_MONTHS

const isMobile = useIsMobile()
const { amount, months, monthlyPayment } = useCreditSimulation()

/** Верхняя граница суммы отличается в макетах десктопа и мобильной. */
const amountMax = computed(() => (isMobile.value ? AVANTI_AMOUNT_MAX_MOBILE : AVANTI_AMOUNT_MAX_DESKTOP))

const amountMaxLabel = computed(() => `${formatAmount(amountMax.value)} ${currency}`)

const amountMinLabel = computed(() => `${formatAmount(AVANTI_AMOUNT_MIN)} ${currency}`)

const monthsMinLabel = computed(() =>
  isMobile.value ? AVANTI_MONTHS_MIN_LABEL_MOBILE : AVANTI_MONTHS_MIN_LABEL_DESKTOP,
)

const monthsMaxLabel = computed(() => `${AVANTI_MONTHS_MAX} ${monthsUnit}`)

/** В карточке итогов десктоп разделяет разряды пробелом, мобильная — точкой. */
const summaryAmountText = computed(() =>
  isMobile.value ? formatAmount(amount.value) : formatAmountSpaced(amount.value),
)

const summaryRows = computed(() => [
  {
    label: isMobile.value ? texts.summaryAmountMobile : texts.summaryAmountDesktop,
    value: summaryAmountText.value,
    unit: currency,
  },
  {
    label: isMobile.value ? texts.summaryPaymentMobile : texts.summaryPaymentDesktop,
    value: formatAmount(monthlyPayment.value),
    unit: AVANTI_UNIT_PER_MONTH,
  },
  {
    label: isMobile.value ? texts.summaryMonthsMobile : texts.summaryMonthsDesktop,
    value: String(months.value),
    unit: isMobile.value ? monthsUnit : undefined,
  },
])

/** Переходы мастера: порядок шагов задан в `avanti_flow`. */
const { goBack, goNext } = useFlowNavigation()
</script>

<style lang="scss" scoped>
.avanti-simulation-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: var(--avanti-color-page-mobile);

  &__body {
    display: flex;
    flex-direction: column;
    gap: 28px;
    padding: 24px 20px 32px;
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: 28px;
  }

  /* На мобильной колонки не образуют собственный бокс: порядок задаёт DOM. */
  &__column {
    display: contents;
  }

  @include desktop-up {
    background-color: var(--avanti-color-page);

    .avanti-simulation-page__body {
      gap: 123px;
      padding: 51px $content-gutter 70px;
    }

    /* Высота задана по макету: контент занимает 161…667px, кнопки начинаются с 790px. */
    .avanti-simulation-page__content {
      @include content-container($content-width-simulation);

      flex-direction: row;
      gap: 125px;
      align-items: center;
      height: 506px;
    }

    .avanti-simulation-page__column {
      display: flex;
      flex-direction: column;
    }

    .avanti-simulation-page__column--params {
      flex-shrink: 0;
      justify-content: space-between;
      width: 610px;
      height: 100%;
    }

    .avanti-simulation-page__column--summary {
      flex-shrink: 0;
      gap: 42px;
      width: 505px;
    }

    .avanti-simulation-page__body .avanti-simulation-page__actions {
      @include content-container($content-width-simulation);
    }
  }
}
</style>
