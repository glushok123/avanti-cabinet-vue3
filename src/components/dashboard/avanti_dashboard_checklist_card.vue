<!--
  Карточка чеклиста верификации: заголовок с кнопкой сворачивания,
  список шагов с разделителями и сегментированный индикатор прогресса.

  Вариант `default` — базовое состояние (надзаголовок + заголовок).
  Вариант `ready` — «фонды готовы к выводу»: надзаголовка нет, заголовок
  становится крупным фирменным, а на мобильной шапка встаёт на фирменную
  подложку с круглой галочкой слева.

  Проп `counter` включает просторную версию 464×516 из кадров пошагового
  флоу (1:268, 31:6467): бейдж в шапке, поля 24px и толстые полосы прогресса
  без разделителя над ними. Без него карточка компактная, как на главной.
-->
<template>
  <AvantiCard
    :class="[
      'avanti-dashboard-checklist-card',
      variantClass,
      { 'avanti-dashboard-checklist-card--counter': counter },
    ]"
    padding="none"
    shadow="soft"
    tag="section"
    :aria-labelledby="titleId"
  >
    <div class="avanti-dashboard-checklist-card__head">
      <AvantiIconCircle
        v-if="isReady"
        class="avanti-dashboard-checklist-card__head-check"
        :size="22"
        icon-size="xs"
        tone="primary"
      >
        <AvantiIconCheck />
      </AvantiIconCircle>
      <div class="avanti-dashboard-checklist-card__head-text">
        <span v-if="eyebrow" class="avanti-dashboard-checklist-card__eyebrow">{{ eyebrow }}</span>
        <h2 :id="titleId" class="avanti-dashboard-checklist-card__title">{{ title }}</h2>
      </div>
      <div class="avanti-dashboard-checklist-card__aside">
        <AvantiBadge v-if="counter" tone="soft">{{ counter }}</AvantiBadge>
        <button
          class="avanti-dashboard-checklist-card__toggle"
          type="button"
          :aria-expanded="expanded"
          :aria-controls="listId"
          :aria-label="toggleLabel"
          @click="toggle"
        >
          <AvantiIconChevronUp v-if="expanded" />
          <AvantiIconChevronRight v-else />
        </button>
      </div>
    </div>
    <span class="avanti-dashboard-checklist-card__divider" aria-hidden="true" />
    <div v-if="expanded" :id="listId" class="avanti-dashboard-checklist-card__list">
      <template v-for="(item, index) in items" :key="item.id">
        <span v-if="index > 0" class="avanti-dashboard-checklist-card__divider" aria-hidden="true" />
        <AvantiDashboardChecklistItem
          :title="item.title"
          :note="item.note"
          :status="item.status"
          :icon="item.icon"
          :icon-status="item.iconStatus"
          :marker-status="item.markerStatus"
          :spacious="Boolean(counter)"
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
import { computed, ref, useId } from 'vue'
import AvantiBadge from '@/components/ui/avanti_badge.vue'
import AvantiCard from '@/components/ui/avanti_card.vue'
import AvantiIconCircle from '@/components/ui/avanti_icon_circle.vue'
import AvantiProgressSegments from '@/components/ui/avanti_progress_segments.vue'
import AvantiDashboardChecklistItem from '@/components/dashboard/avanti_dashboard_checklist_item.vue'
import AvantiIconChevronUp from '@/components/icons/avanti_icon_chevron_up.vue'
import AvantiIconChevronRight from '@/components/icons/avanti_icon_chevron_right.vue'
import AvantiIconCheck from '@/components/icons/avanti_icon_check.vue'
import type { AvantiChecklistItem, AvantiChecklistVariant } from '@/types/avanti_dashboard'

/**
 * toggleLabel — доступное имя кнопки со шевроном,
 * progressLabel — доступное имя индикатора прогресса (оба без видимого текста).
 */
const props = withDefaults(
  defineProps<{
    eyebrow: string
    title: string
    items: AvantiChecklistItem[]
    total: number
    completed: number
    toggleLabel: string
    progressLabel: string
    variant?: AvantiChecklistVariant
    /** Подпись бейджа-счётчика; включает просторную версию карточки. */
    counter?: string
  }>(),
  { variant: 'default', counter: '' },
)

const isReady = computed(() => props.variant === 'ready')
const variantClass = computed(() => `avanti-dashboard-checklist-card--${props.variant}`)

/** Заголовок связан с секцией через aria-labelledby, поэтому нужен id. */
const titleId = useId()

/** Связывает кнопку сворачивания со списком шагов для скринридеров. */
const listId = useId()

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

    /* Строка надзаголовка в макете ровно 13px: `normal` даёт 14, из-за
       чего шапка становилась на пиксель выше (66 вместо 65 на десктопе,
       66 вместо 65 на мобильной) и утягивала вниз всё, что под ней. */
    line-height: 13px;
    color: var(--avanti-color-primary);
    text-transform: uppercase;
    letter-spacing: 0.55px;
  }

  &__title {
    font-size: 13px;
    font-weight: var(--avanti-font-weight-semibold);
    color: var(--avanti-color-text-strong);
  }

  &__aside {
    display: flex;
    flex-shrink: 0;
    gap: 10px;
    align-items: center;
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

  /* --- Просторная карточка со счётчиком (1:268, 241:23384, 31:6467) --- */
  &--counter {
    .avanti-dashboard-checklist-card__head {
      gap: 0;
      padding: 20px 24px;
    }

    /* Разделителя между списком и прогрессом в этих кадрах нет. */
    .avanti-dashboard-checklist-card__list + .avanti-dashboard-checklist-card__divider {
      display: none;
    }

    .avanti-dashboard-checklist-card__progress {
      padding: 16px 24px 20px;
    }

    :deep(.avanti-progress-segments__item) {
      height: 6px;
    }
  }

  /*
   * --- Состояние «фонды готовы к выводу» ---
   * Кадры Figma: 241:25321, 258:14783, 258:16652, 258:16821 (десктоп),
   * 107:8830, 232:17490 (мобильная).
   */
  &--ready {
    /* Круглая галочка есть только в мобильных кадрах. */
    .avanti-dashboard-checklist-card__head-check {
      display: none;
    }

    .avanti-dashboard-checklist-card__title {
      font-size: 15px;
      font-weight: var(--avanti-font-weight-bold);
      color: var(--avanti-color-primary);
      text-transform: uppercase;
      letter-spacing: 0.75px;
    }

    @include mobile {
      .avanti-dashboard-checklist-card__head {
        background-color: var(--avanti-color-primary-soft);
      }

      .avanti-dashboard-checklist-card__head-check {
        display: flex;
      }

      /* На мобильной заголовок остаётся тёмным 13px, как в базовом кадре. */
      .avanti-dashboard-checklist-card__title {
        font-size: 13px;
        font-weight: var(--avanti-font-weight-semibold);
        color: var(--avanti-color-text-strong);
        text-transform: none;
        letter-spacing: normal;
      }
    }
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
