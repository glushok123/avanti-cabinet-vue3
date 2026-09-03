<!--
  Карточка «SBLOCCO DEI FONDI COMPLETATO» — она заменяет баннер с замком,
  когда все шаги пройдены и средства разблокированы.
  Кадры Figma: 258:14967 (десктоп 792×254), 232:14615 (мобильная 358×218).
-->
<template>
  <section class="avanti-dashboard-unlock-card">
    <div class="avanti-dashboard-unlock-card__head">
      <h2 class="avanti-dashboard-unlock-card__title">
        <span v-for="line in titleLines" :key="line">{{ line }}</span>
      </h2>
      <button class="avanti-dashboard-unlock-card__help" type="button">{{ helpLabel }}</button>
    </div>
    <div class="avanti-dashboard-unlock-card__flow">
      <template v-for="(step, index) in steps" :key="step.id">
        <span v-if="index > 0" class="avanti-dashboard-unlock-card__connector" aria-hidden="true" />
        <AvantiDashboardUnlockStep
          :icon="step.icon"
          :title="step.title"
          :note="step.note"
          :highlighted="step.highlighted"
        />
      </template>
    </div>
  </section>
</template>

<script setup lang="ts">
import AvantiDashboardUnlockStep from '@/components/dashboard/avanti_dashboard_unlock_step.vue'
import type { AvantiUnlockStep } from '@/types/avanti_dashboard'

/** titleLines — заголовок разбит на строки так же, как в макете. */
defineProps<{
  titleLines: string[]
  helpLabel: string
  steps: AvantiUnlockStep[]
}>()
</script>

<style lang="scss" scoped>
.avanti-dashboard-unlock-card {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  padding: 16px;
  background-color: var(--avanti-color-surface);

  /* В макете радиус 24px; ближайший существующий токен — 20px. */
  border-radius: var(--avanti-radius-3xl);

  /* Обводка внутрь: габариты карточки совпадают с кадром Figma. */
  @include inner-border(var(--avanti-color-primary-soft), 1px, var(--avanti-shadow-card-soft));

  &__head {
    display: flex;
    gap: 16px;
    align-items: center;
    justify-content: space-between;
  }

  &__title {
    display: flex;
    flex-direction: column;
    font-size: 20px;
    font-weight: var(--avanti-font-weight-bold);
    line-height: normal;
    color: var(--avanti-color-primary);
  }

  &__help {
    @include button-reset;
    @include focus-ring;

    flex-shrink: 0;
    padding: 6px 10px;
    font-size: 16px;
    font-weight: var(--avanti-font-weight-bold);
    line-height: normal;
    color: var(--avanti-color-primary);
    white-space: nowrap;
    background-color: var(--avanti-color-primary-soft);
    border-radius: var(--avanti-radius-pill);
  }

  &__flow {
    display: flex;
    align-items: flex-start;
    padding: 16px 8px;
    background-color: var(--avanti-color-surface-muted);
    border-radius: var(--avanti-radius-xl);

    @include inner-border(var(--avanti-color-primary-soft));
  }

  /* Соединительная линия между кругами: её середина совпадает с центром круга. */
  &__connector {
    flex: 0 0 16px;
    height: 2px;
    margin-top: 26px;
    background-color: var(--avanti-color-primary-soft-border);
  }

  @include mobile {
    &__title {
      font-size: 11px;
    }

    &__help {
      font-size: 11px;
    }

    &__connector {
      margin-top: 19px;
    }
  }
}
</style>
