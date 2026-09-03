<!--
  Карточка со шкалой шагов «Passo 4 di 5».
  Шаги и соединительные линии чередуются в одном ряду: на десктопе линия
  занимает промежуток 51px и выступает под соседние шаги, на мобильной —
  растягивается по остатку ширины.
-->
<template>
  <AvantiCard class="avanti-dashboard-stepper" padding="none" shadow="card">
    <div class="avanti-dashboard-stepper__inner">
      <div class="avanti-dashboard-stepper__head">
        <span class="avanti-dashboard-stepper__title">{{ title }}</span>
        <span class="avanti-dashboard-stepper__progress">{{ progressLabel }}</span>
      </div>
      <div class="avanti-dashboard-stepper__track">
        <template v-for="(step, index) in steps" :key="step.id">
          <div class="avanti-dashboard-stepper__step">
            <AvantiDashboardStepperItem :label="step.label" :status="step.status" />
          </div>
          <span
            v-if="index < lastIndex"
            class="avanti-dashboard-stepper__line"
            :class="lineClass(step)"
            aria-hidden="true"
          />
        </template>
      </div>
    </div>
  </AvantiCard>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import AvantiCard from '@/components/ui/avanti_card.vue'
import AvantiDashboardStepperItem from '@/components/dashboard/avanti_dashboard_stepper_item.vue'
import type { AvantiStepperStep } from '@/types/avanti_dashboard'

const props = defineProps<{
  title: string
  progressLabel: string
  steps: AvantiStepperStep[]
}>()

/** Индекс последнего шага: после него соединительная линия не нужна. */
const lastIndex = computed(() => props.steps.length - 1)

/** Линия после шага окрашена фирменным цветом, если шаг уже завершён. */
function lineClass(step: AvantiStepperStep): string {
  return step.status === 'completed'
    ? 'avanti-dashboard-stepper__line--done'
    : 'avanti-dashboard-stepper__line--pending'
}
</script>

<style lang="scss" scoped>
.avanti-dashboard-stepper {
  width: 100%;

  &__inner {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 20px 24px;
  }

  &__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 13px;
    line-height: normal;
    white-space: nowrap;
  }

  &__title {
    font-weight: var(--avanti-font-weight-bold);
    color: var(--avanti-color-text-strong);
  }

  &__progress {
    font-weight: var(--avanti-font-weight-medium);
    color: var(--avanti-color-text-secondary);
  }

  &__track {
    display: flex;
    align-items: flex-start;
    min-height: 58px;
  }

  &__step {
    flex: 1 1 0;
    min-width: 0;
  }

  /* Линия между кругами: сама занимает промежуток, а видимая часть
     выступает под соседние шаги до края кругов. */
  &__line {
    position: relative;
    flex: 0 0 51px;
    height: 2px;
    margin-top: 17px;

    &::after {
      position: absolute;
      top: 0;
      right: -36px;
      left: -36px;
      height: 2px;
      content: '';
      background-color: currentcolor;
    }

    &--done {
      color: var(--avanti-color-primary);
    }

    &--pending {
      color: var(--avanti-color-border-neutral);
    }
  }

  @include mobile {
    &__inner {
      gap: 12px;
      padding: 16px;
    }

    &__head {
      font-size: 10px;
    }

    &__track {
      min-height: 0;
    }

    &__step {
      flex: 0 0 auto;
    }

    &__line {
      flex: 1 1 0;
      margin-top: 9px;

      &::after {
        right: 0;
        left: 0;
      }
    }
  }
}
</style>
