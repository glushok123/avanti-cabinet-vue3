<!--
  Страница «Банк прогрузка» — ожидание ответа банков-партнёров.
  Десктоп (кадр 0:1077): заголовок, блок проверки, сетка из 12 банков
  и кнопки шага.
  Мобильная (кадр 1:4669, 390×1136): те же блоки в один поток, боковые
  отступы 16px, сетка банков в две колонки по 175px, кнопки шага столбиком.
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
          @back="goBack"
          @next="goNext"
        />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useFlowNavigation } from '@/composables/use_flow_navigation'
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

/** Переходы мастера: порядок шагов задан в `avanti_flow`. */
const { goBack, goNext } = useFlowNavigation()
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

  /* Кадр 1:4669: контент 358px внутри 390px, сверху 20px, снизу 32px. */
  &__body {
    padding: 20px 16px 32px;
  }

  &__content {
    display: flex;
    flex-direction: column;

    /* Промежутки между всеми четырьмя блоками мобильного кадра — 24px. */
    gap: 24px;
  }

  @include desktop-up {
    background-color: var(--avanti-color-page);

    .avanti-bank-check-page__body {
      /* Ширину ограничиваем с учётом собственных боковых отступов:
         иначе они добавляются к центрированию и контент уезжает вправо. */
      width: 100%;
      max-width: calc($content-width-simulation + $content-gutter * 2);
      padding: 28px $content-gutter 60px;
      margin-inline: auto;
    }

    .avanti-bank-check-page__content {
      /* На десктопе блоки стоят теснее, чем в мобильном кадре. */
      gap: 20px;
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

/*
 * Кнопки шага в мобильном кадре (1:4761) стоят столбиком во всю ширину:
 * основная «Avvia la verifica» сверху, «Indietro» под ней, высота 48px
 * и шеврон 24px. Общий блок мастера остаётся строкой на других экранах,
 * поэтому раскладка переопределяется здесь, а не в самом компоненте.
 */
@include mobile {
  .avanti-bank-check-page .avanti-bank-check-page__actions {
    flex-direction: column-reverse;
    align-items: stretch;
  }

  .avanti-bank-check-page__actions :deep(.avanti-simulation-actions__slot) {
    flex: 0 0 auto;
  }

  .avanti-bank-check-page__actions :deep(.avanti-button) {
    height: 48px;
  }

  .avanti-bank-check-page__actions :deep(.avanti-button__icon) {
    width: 24px;
    height: 24px;
  }
}
</style>
