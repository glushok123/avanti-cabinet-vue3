<!--
  Карточка чеклиста верификации: заголовок с кнопкой сворачивания,
  список шагов с разделителями и сегментированный индикатор прогресса.
-->
<template>
  <AvantiCard
    class="avanti-dashboard-checklist-card"
    padding="none"
    shadow="soft"
    tag="section"
    :aria-labelledby="titleId"
  >
    <div class="avanti-dashboard-checklist-card__head">
      <div class="avanti-dashboard-checklist-card__head-text">
        <span class="avanti-dashboard-checklist-card__eyebrow">{{ eyebrow }}</span>
        <h2 :id="titleId" class="avanti-dashboard-checklist-card__title">{{ title }}</h2>
      </div>
      <button
        class="avanti-dashboard-checklist-card__toggle"
        type="button"
        :aria-expanded="expanded"
        :aria-label="toggleLabel"
        @click="toggle"
      >
        <AvantiIconChevronUp v-if="expanded" />
        <AvantiIconChevronRight v-else />
      </button>
    </div>
    <span class="avanti-dashboard-checklist-card__divider" aria-hidden="true" />
    <div v-if="expanded" class="avanti-dashboard-checklist-card__list">
      <template v-for="(item, index) in items" :key="item.id">
        <span v-if="index > 0" class="avanti-dashboard-checklist-card__divider" aria-hidden="true" />
        <AvantiDashboardChecklistItem
          :title="item.title"
          :note="item.note"
          :status="item.status"
          :icon="item.icon"
        />
      </template>
    </div>
    <span v-if="expanded" class="avanti-dashboard-checklist-card__divider" aria-hidden="true" />
    <div class="avanti-dashboard-checklist-card__progress">
      <AvantiProgressSegments :total="total" :completed="completed" :label="progressLabel" />
    </div>
  </AvantiCard>
</template>

<script setup lang="ts">
import { ref, useId } from 'vue'
import AvantiCard from '@/components/ui/avanti_card.vue'
import AvantiProgressSegments from '@/components/ui/avanti_progress_segments.vue'
import AvantiDashboardChecklistItem from '@/components/dashboard/avanti_dashboard_checklist_item.vue'
import AvantiIconChevronUp from '@/components/icons/avanti_icon_chevron_up.vue'
import AvantiIconChevronRight from '@/components/icons/avanti_icon_chevron_right.vue'
import type { AvantiChecklistItem } from '@/types/avanti_dashboard'

/**
 * toggleLabel — доступное имя кнопки со шевроном,
 * progressLabel — доступное имя индикатора прогресса (оба без видимого текста).
 */
defineProps<{
  eyebrow: string
  title: string
  items: AvantiChecklistItem[]
  total: number
  completed: number
  toggleLabel: string
  progressLabel: string
}>()

/** Заголовок связан с секцией через aria-labelledby, поэтому нужен id. */
const titleId = useId()

/** По макету карточка развёрнута; кнопка со шевроном сворачивает список. */
const expanded = ref(true)

function toggle(): void {
  expanded.value = !expanded.value
}
</script>

<style lang="scss" scoped>
.avanti-dashboard-checklist-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;

  &__head {
    display: flex;
    gap: 12px;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 16px;
  }

  &__head-text {
    display: flex;
    flex: 1 1 0;
    flex-direction: column;
    gap: 4px;
    align-items: flex-start;
    min-width: 0;
    line-height: normal;
  }

  &__eyebrow {
    font-size: 11px;
    font-weight: var(--avanti-font-weight-bold);
    color: var(--avanti-color-primary);
    text-transform: uppercase;
    letter-spacing: 0.55px;
  }

  &__title {
    font-size: 13px;
    font-weight: var(--avanti-font-weight-semibold);
    color: var(--avanti-color-text-strong);
  }

  &__toggle {
    @include button-reset;
    @include focus-ring;

    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    color: var(--avanti-color-text-strong);
    background-color: var(--avanti-color-surface-muted);
    border: 1px solid var(--avanti-color-border);
    border-radius: var(--avanti-radius-sm);

    svg {
      width: 14px;
      height: 14px;
    }
  }

  &__divider {
    width: 100%;
    height: 1px;
    background-color: var(--avanti-color-divider);
  }

  &__list {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
  }

  &__progress {
    width: 100%;
    padding: 12px 16px 16px;
  }

  @include mobile {
    &__toggle {
      width: 20px;
      height: 20px;
      border-width: 0.625px;

      /* Значение из Figma, отдельного токена нет. */
      border-radius: 5px;

      svg {
        width: 8.75px;
        height: 8.75px;
      }
    }
  }
}
</style>
