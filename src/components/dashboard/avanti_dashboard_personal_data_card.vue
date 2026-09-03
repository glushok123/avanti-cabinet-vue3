<!-- Карточка «Dati personali» правой колонки десктопной раскладки. -->
<template>
  <AvantiCard class="avanti-dashboard-personal-data-card" padding="lg" shadow="none" tag="section">
    <h2 class="avanti-dashboard-personal-data-card__title">{{ title }}</h2>
    <div class="avanti-dashboard-personal-data-card__list">
      <AvantiDashboardPersonalDataRow
        v-for="row in rows"
        :key="row.id"
        :label="row.label"
        :value="row.value"
      />
    </div>
  </AvantiCard>
</template>

<script setup lang="ts">
import AvantiCard from '@/components/ui/avanti_card.vue'
import AvantiDashboardPersonalDataRow from '@/components/dashboard/avanti_dashboard_personal_data_row.vue'
import type { AvantiPersonalDataRow } from '@/types/avanti_dashboard'

defineProps<{
  title: string
  rows: AvantiPersonalDataRow[]
}>()
</script>

<style lang="scss" scoped>
.avanti-dashboard-personal-data-card {
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: flex-start;
  width: 100%;

  /* Высота задана кадром Figma (464×131): в макете она зафиксирована,
     а не выведена из содержимого. */
  @include desktop-up {
    height: 131px;
  }

  &__title {
    font-size: 15px;
    font-weight: var(--avanti-font-weight-semibold);
    line-height: normal;
    color: var(--avanti-color-text-strong);
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
    width: 100%;
  }
}
</style>
