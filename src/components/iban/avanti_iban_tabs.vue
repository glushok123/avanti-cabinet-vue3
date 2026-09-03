<!--
  Переключатель панели IBAN: два сегмента одинаковой ширины, сросшихся
  боками (кадры Figma 31:6433 «Переключатель способа», 1:1380 и 104:8462
  «Переключатель вкладок»).

  В каждом сегменте две строки: верхняя — номер шага или способ,
  нижняя — его название. Активный сегмент залит фирменным цветом,
  неактивный остаётся светлым с фирменной обводкой.
-->
<template>
  <div class="avanti-iban-tabs" role="group" :aria-label="label">
    <button
      v-for="tab in tabs"
      :key="tab.id"
      class="avanti-iban-tabs__tab"
      :class="tabClass(tab.id)"
      type="button"
      :aria-pressed="isActive(tab.id)"
      @click="select(tab.id)"
    >
      <span class="avanti-iban-tabs__caption">{{ tab.caption }}</span>
      <span class="avanti-iban-tabs__label">{{ tab.label }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import type { AvantiIbanTab } from '@/types/avanti_iban'

const props = defineProps<{
  tabs: AvantiIbanTab[]
  /** Идентификатор выбранного сегмента. */
  activeId: string
  /** Доступное имя группы: видимой подписи у переключателя в макете нет. */
  label: string
}>()

const emit = defineEmits<{ select: [id: string] }>()

function isActive(id: string): boolean {
  return id === props.activeId
}

function tabClass(id: string): string {
  return isActive(id) ? 'avanti-iban-tabs__tab--active' : 'avanti-iban-tabs__tab--idle'
}

function select(id: string): void {
  if (!isActive(id)) {
    emit('select', id)
  }
}
</script>

<style lang="scss" scoped>
.avanti-iban-tabs {
  display: flex;
  width: 100%;

  &__tab {
    @include button-reset;
    @include focus-ring(-2px);

    display: flex;
    flex: 1 1 0;
    flex-direction: column;
    gap: 0;
    align-items: center;
    justify-content: center;
    min-width: 0;
    height: 50px;
    padding: 8px 16px;
    font-size: 16px;
    font-weight: var(--avanti-font-weight-medium);
    line-height: 20px;
    text-align: center;
    text-transform: uppercase;
    transition:
      background-color var(--avanti-transition-fast),
      color var(--avanti-transition-fast);

    /* Сегменты сомкнуты: скругляются только внешние углы группы. */
    &:first-child {
      border-radius: var(--avanti-radius-sm) 0 0 var(--avanti-radius-sm);
    }

    &:last-child {
      border-radius: 0 var(--avanti-radius-sm) var(--avanti-radius-sm) 0;
    }

    /* Активный сегмент — фирменная заливка со светлым текстом. */
    &--active {
      color: var(--avanti-color-text-on-primary);
      background-color: var(--avanti-color-primary);
    }

    /* Неактивный — светлая подложка и обводка внутрь, чтобы высота
       осталась ровно 50px, как в макете. */
    &--idle {
      @include inner-border(var(--avanti-color-primary));

      color: var(--avanti-color-primary);
      background-color: var(--avanti-color-surface-muted);

      &:hover {
        background-color: var(--avanti-color-primary-soft);
      }
    }
  }

  &__caption,
  &__label {
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  @include mobile {
    &__tab {
      font-size: 14px;
      line-height: 16px;
    }
  }
}
</style>
