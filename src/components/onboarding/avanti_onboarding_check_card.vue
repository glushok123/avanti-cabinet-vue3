<!--
  Блок проверки на экране ожидания: этапы отправки заявки, разделитель
  и строка прогресса (круг со скорингом плюс полоса ответивших банков).
-->
<template>
  <section class="avanti-onboarding-check-card">
    <div class="avanti-onboarding-check-card__inner">
      <div class="avanti-onboarding-check-card__rows">
        <AvantiOnboardingCheckRow
          v-for="row in rows"
          :key="row.id"
          :label="row.label"
          :value="row.value"
          :emphasized="row.emphasized"
        />
      </div>
      <span class="avanti-onboarding-check-card__divider" />
      <div class="avanti-onboarding-check-card__progress">
        <AvantiOnboardingProgressRing :value="score" />
        <AvantiOnboardingProgressBar :done="done" :total="total" :hint="hint" :label="progressLabel" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import AvantiOnboardingCheckRow from '@/components/onboarding/avanti_onboarding_check_row.vue'
import AvantiOnboardingProgressRing from '@/components/onboarding/avanti_onboarding_progress_ring.vue'
import AvantiOnboardingProgressBar from '@/components/onboarding/avanti_onboarding_progress_bar.vue'
import type { AvantiCheckRow } from '@/types/avanti_onboarding'

defineProps<{
  /** Этапы отправки заявки. */
  rows: AvantiCheckRow[]
  /** Число в круге прогресса. */
  score: number
  /** Сколько банков ответило. */
  done: number
  /** Сколько банков всего. */
  total: number
  /** Подпись под полосой загрузки. */
  hint: string
  /** Доступное имя полосы загрузки. */
  progressLabel: string
}>()
</script>

<style lang="scss" scoped>
.avanti-onboarding-check-card {
  /* Обводка рисуется внутрь: габариты совпадают с кадром Figma. */
  @include inner-border(var(--avanti-color-text-muted));

  width: 100%;
  background-color: var(--avanti-color-surface);
  border-radius: var(--avanti-radius-xl);

  &__inner {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 16px;
  }

  &__rows {
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
  }

  /* Разделитель: линия, растворяющаяся к обоим краям. */
  &__divider {
    width: 100%;
    height: 1px;
    background-image: linear-gradient(
      90deg,
      transparent 0%,
      var(--avanti-color-text-tertiary) 50%,
      transparent 100%
    );
  }

  &__progress {
    display: flex;
    gap: 16px;
    align-items: center;
    width: 100%;
  }

  @include desktop-up {
    /* Высота карточки задана макетом: 219px при контенте 1119px. */
    display: flex;
    align-items: center;
    height: 219px;

    .avanti-onboarding-check-card__inner {
      gap: 20px;
      width: 100%;
      padding: 0 28.5px;
    }

    .avanti-onboarding-check-card__rows {
      gap: 16px;
    }

    .avanti-onboarding-check-card__progress {
      gap: 78px;
    }
  }
}
</style>
