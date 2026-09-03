<!--
  Один шаг горизонтальной шкалы: круг с иконкой и подпись под ним.
  Десктоп — круг 36px и подпись 11px, мобильная — 20px и 10px.
-->
<template>
  <div class="avanti-dashboard-stepper-item" :class="statusClass">
    <span class="avanti-dashboard-stepper-item__circle">
      <AvantiIconCheck v-if="isCompleted" />
      <AvantiIconUpload v-else-if="isCurrent" />
      <AvantiIconPen v-else />
    </span>
    <span class="avanti-dashboard-stepper-item__label">{{ label }}</span>
    <span class="avanti-dashboard-stepper-item__status">{{ statusLabel }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import AvantiIconCheck from '@/components/icons/avanti_icon_check.vue'
import AvantiIconUpload from '@/components/icons/avanti_icon_upload.vue'
import AvantiIconPen from '@/components/icons/avanti_icon_pen.vue'
import { AVANTI_STEP_STATUS_LABELS } from '@/constants/avanti_dashboard_status_labels'
import type { AvantiStepStatus } from '@/types/avanti_dashboard'

const props = defineProps<{
  label: string
  status: AvantiStepStatus
}>()

const isCompleted = computed(() => props.status === 'completed')
const isCurrent = computed(() => props.status === 'current')

/**
 * Статус шага словами: иконка внутри круга декоративная, и без этой строки
 * пройденный, текущий и ожидающий шаги звучали бы одинаково.
 */
const statusLabel = computed(() => AVANTI_STEP_STATUS_LABELS[props.status])
const statusClass = computed(() => `avanti-dashboard-stepper-item--${props.status}`)
</script>

<style lang="scss" scoped>
.avanti-dashboard-stepper-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;

  &__circle {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: var(--avanti-radius-round);

    svg {
      width: 16px;
      height: 16px;
    }
  }

  &__label {
    font-size: 11px;
    line-height: normal;
    text-align: center;
    white-space: nowrap;
  }

  /* Статус словами: его читает скринридер, на экране его нет. Строка выведена
     из потока абсолютным позиционированием, поэтому зазор колонки не растёт. */
  &__status {
    @include visually-hidden;
  }

  /* --- Завершённый шаг --- */
  &--completed {
    .avanti-dashboard-stepper-item__circle {
      color: var(--avanti-color-text-on-primary);
      background-color: var(--avanti-color-primary);
    }

    .avanti-dashboard-stepper-item__label {
      font-weight: var(--avanti-font-weight-semibold);
      color: var(--avanti-color-primary);
    }
  }

  /* --- Текущий шаг --- */
  &--current {
    .avanti-dashboard-stepper-item__circle {
      color: var(--avanti-color-primary);
      background-color: var(--avanti-color-primary-soft);
      border: 2px solid var(--avanti-color-primary);
    }

    .avanti-dashboard-stepper-item__label {
      font-weight: var(--avanti-font-weight-bold);
      color: var(--avanti-color-primary);
    }
  }

  /* --- Ожидающий шаг --- */
  &--pending {
    .avanti-dashboard-stepper-item__circle {
      color: var(--avanti-color-text-tertiary);
      background-color: var(--avanti-color-surface-neutral);
      border: 1.5px solid var(--avanti-color-border-neutral);
    }

    .avanti-dashboard-stepper-item__label {
      font-weight: var(--avanti-font-weight-medium);
      color: var(--avanti-color-text-tertiary);
    }
  }

  @include mobile {
    gap: 4px;

    &__circle {
      width: 20px;
      height: 20px;

      svg {
        width: 10px;
        height: 10px;
      }
    }

    &__label {
      font-size: 10px;
    }
  }
}
</style>
