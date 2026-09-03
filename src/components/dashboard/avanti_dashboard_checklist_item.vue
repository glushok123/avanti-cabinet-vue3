<!--
  Строка чеклиста верификации: круглая иконка шага, заголовок с подписью
  и маркер состояния справа (галочка для завершённых, стрелка для остальных).

  Оформление текста задаётся пропом `status`, левого кружка — `iconStatus`,
  правого маркера — `markerStatus`. Обычно все три совпадают; расходятся в
  состоянии «фонды разблокированы» (залиты все кружки, начертание подписей
  прежнее) и в просторной карточке пошагового флоу (кружки залиты, но у
  незавершённых шагов справа стрелка, а не галочка).

  Проп `spacious` включает раскладку карточки со счётчиком: поля 24px,
  зазор 16px и маркер-стрелка 32px (кадры 31:6513, 31:6524).
-->
<template>
  <div
    class="avanti-dashboard-checklist-item"
    :class="[statusClass, { 'avanti-dashboard-checklist-item--spacious': spacious }]"
  >
    <AvantiIconCircle :size="44" icon-size="xl" :mobile-size="36" mobile-icon-size="lg" :tone="iconTone">
      <component :is="resolveIcon(icon)" />
    </AvantiIconCircle>
    <div class="avanti-dashboard-checklist-item__text">
      <span class="avanti-dashboard-checklist-item__title">{{ title }}</span>
      <span class="avanti-dashboard-checklist-item__note">{{ note }}</span>
    </div>
    <AvantiIconCircle
      v-if="isCompleted"
      :size="28"
      icon-size="sm"
      :mobile-size="22"
      mobile-icon-size="xs"
      tone="primary"
    >
      <AvantiIconCheck />
    </AvantiIconCircle>
    <AvantiIconCircle v-else :size="arrowSize" :icon-size="arrowIconSize" :tone="statusTone">
      <AvantiIconArrowRight />
    </AvantiIconCircle>
  </div>
</template>

<script setup lang="ts">
import { computed, type Component } from 'vue'
import AvantiIconCircle from '@/components/ui/avanti_icon_circle.vue'
import AvantiIconCheck from '@/components/icons/avanti_icon_check.vue'
import AvantiIconArrowRight from '@/components/icons/avanti_icon_arrow_right.vue'
import AvantiIconChart from '@/components/icons/avanti_icon_chart.vue'
import AvantiIconShield from '@/components/icons/avanti_icon_shield.vue'
import AvantiIconUserCheck from '@/components/icons/avanti_icon_user_check.vue'
import AvantiIconUpload from '@/components/icons/avanti_icon_upload.vue'
import AvantiIconSignature from '@/components/icons/avanti_icon_signature.vue'
import type { AvantiChecklistIcon, AvantiStepStatus } from '@/types/avanti_dashboard'

const props = withDefaults(
  defineProps<{
    title: string
    note: string
    status: AvantiStepStatus
    icon: AvantiChecklistIcon
    iconStatus?: AvantiStepStatus
    markerStatus?: AvantiStepStatus
    /** Просторная раскладка карточки со счётчиком шагов. */
    spacious?: boolean
  }>(),
  { iconStatus: undefined, markerStatus: undefined, spacious: false },
)

/** Сопоставление имени иконки из данных с компонентом. */
const iconByName: Record<AvantiChecklistIcon, Component> = {
  chart: AvantiIconChart,
  shield: AvantiIconShield,
  'user-check': AvantiIconUserCheck,
  upload: AvantiIconUpload,
  signature: AvantiIconSignature,
}

function resolveIcon(name: AvantiChecklistIcon): Component {
  return iconByName[name]
}

/** Статус левого кружка: собственный, если задан, иначе общий статус шага. */
const circleStatus = computed(() => props.iconStatus ?? props.status)

/** Статус правого маркера: по умолчанию повторяет левый кружок. */
const markerState = computed(() => props.markerStatus ?? circleStatus.value)

const isCompleted = computed(() => markerState.value === 'completed')
const statusClass = computed(() => `avanti-dashboard-checklist-item--${props.status}`)

/* В просторной карточке кружок-стрелка крупнее: 32px с иконкой 16px. */
const arrowSize = computed<28 | 32>(() => (props.spacious ? 32 : 28))
const arrowIconSize = computed<'md' | 'lg'>(() => (props.spacious ? 'lg' : 'md'))

/** Тон круга слева: заливка, обводка или нейтральный фон. */
const iconTone = computed(() => {
  if (circleStatus.value === 'completed') {
    return 'primary'
  }
  return circleStatus.value === 'current' ? 'outline' : 'neutral'
})

/** Тон круга-маркера справа. */
const statusTone = computed(() => (markerState.value === 'current' ? 'primary' : 'neutral'))
</script>

<style lang="scss" scoped>
.avanti-dashboard-checklist-item {
  display: flex;
  gap: 12px;
  align-items: center;
  width: 100%;
  padding: 16px;

  /* Просторная версия строки: поля 24px и зазор 16px (кадр 31:6480). */
  &--spacious {
    gap: 16px;
    padding: 16px 24px;
  }

  &__text {
    display: flex;
    flex: 1 1 0;
    flex-direction: column;
    gap: 2px;
    align-items: flex-start;
    min-width: 0;
    line-height: normal;
  }

  &__title {
    font-size: 14px;
    font-weight: var(--avanti-font-weight-semibold);
    color: var(--avanti-color-text-strong);
  }

  &__note {
    font-size: 11px;
    font-weight: var(--avanti-font-weight-medium);
    color: var(--avanti-color-primary);
  }

  /* --- Текущий шаг: усиленное начертание --- */
  &--current {
    .avanti-dashboard-checklist-item__title {
      font-weight: var(--avanti-font-weight-bold);
    }

    .avanti-dashboard-checklist-item__note {
      font-weight: var(--avanti-font-weight-semibold);
    }
  }

  /* --- Ожидающий шаг: приглушённые цвета --- */
  &--pending {
    .avanti-dashboard-checklist-item__title {
      font-weight: var(--avanti-font-weight-medium);
      color: var(--avanti-color-text-secondary);
    }

    .avanti-dashboard-checklist-item__note {
      font-weight: var(--avanti-font-weight-regular);
      color: var(--avanti-color-text-tertiary);
    }
  }

  @include mobile {
    /* Размеры кругов на мобильной задаются пропами mobile-* самого
       avanti_icon_circle, поэтому здесь остаются только текст и фон. */
    &__title {
      font-size: 13px;
    }

    &--current {
      background-color: var(--avanti-color-primary-soft);
    }
  }
}
</style>
