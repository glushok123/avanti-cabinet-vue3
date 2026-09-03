<!--
  Страница «Банк прогрузка» — ожидание ответа банков-партнёров.
  Десктоп: заголовок, блок проверки, сетка из 12 банков и кнопки шага.

  РАСХОЖДЕНИЕ МАКЕТА: мобильного фрейма этого экрана в Figma нет.
  Мобильная версия собрана по логике соседних экранов симуляции кредита:
  боковые отступы 20px, те же размеры шрифтов, сетка банков в две колонки.
  Требуется подтверждение заказчика.
-->
<template>
  <div class="avanti-bank-check-page">
    <AvantiSimulationHeader :menu-label="texts.menu" />
    <main class="avanti-bank-check-page__body">
      <div class="avanti-bank-check-page__content">
        <AvantiOnboardingSectionIntro
          :overline="texts.overline"
          :title="texts.title"
          :subtitle="texts.subtitle"
        />
        <AvantiOnboardingCheckCard
          class="avanti-bank-check-page__check"
          :rows="rows"
          :score="score"
          :done="done"
          :total="total"
          :hint="texts.progressHint"
          :progress-label="texts.progressLabel"
        />
        <AvantiOnboardingBankGrid
          class="avanti-bank-check-page__banks"
          :banks="banks"
          :status-labels="statusLabels"
          :label="texts.banksLabel"
        />
        <AvantiSimulationActions
          class="avanti-bank-check-page__actions"
          :back-label="texts.actionBack"
          :next-label="texts.actionNext"
        />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import AvantiSimulationHeader from '@/components/layout/avanti_simulation_header.vue'
import AvantiSimulationActions from '@/components/simulation/avanti_simulation_actions.vue'
import AvantiOnboardingSectionIntro from '@/components/onboarding/avanti_onboarding_section_intro.vue'
import AvantiOnboardingCheckCard from '@/components/onboarding/avanti_onboarding_check_card.vue'
import AvantiOnboardingBankGrid from '@/components/onboarding/avanti_onboarding_bank_grid.vue'
import {
  AVANTI_BANKS,
  AVANTI_BANK_CHECK_DONE,
  AVANTI_BANK_CHECK_ROWS,
  AVANTI_BANK_CHECK_SCORE,
  AVANTI_BANK_CHECK_TEXTS,
  AVANTI_BANK_CHECK_TOTAL,
  AVANTI_BANK_STATUS_LABELS,
} from '@/constants/avanti_onboarding_content'

const texts = AVANTI_BANK_CHECK_TEXTS
const rows = AVANTI_BANK_CHECK_ROWS
const banks = AVANTI_BANKS
const statusLabels = AVANTI_BANK_STATUS_LABELS
const score = AVANTI_BANK_CHECK_SCORE
const done = AVANTI_BANK_CHECK_DONE
const total = AVANTI_BANK_CHECK_TOTAL
</script>

<style lang="scss" scoped>
/*
 * Внутренние блоки экрана шире контентной колонки не становятся:
 * в макете они занимают 1176px из 1240px, прижатые к левому краю,
 * чтобы совпасть с логотипом в шапке.
 */
$content-width-bank-check: 1176px;

.avanti-bank-check-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: var(--avanti-color-page-mobile);

  &__body {
    padding: 24px 20px 32px;
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  @include desktop-up {
    background-color: var(--avanti-color-page);

    .avanti-bank-check-page__body {
      @include content-container($content-width-simulation);

      padding: 28px $content-gutter 60px;
    }

    .avanti-bank-check-page__content {
      max-width: $content-width-bank-check;
    }

    /* Промежутки между блоками в макете разные: 20 / 26 / 36. */
    .avanti-bank-check-page__banks {
      margin-top: 6px;
    }

    .avanti-bank-check-page__actions {
      margin-top: 16px;
    }
  }
}
</style>
