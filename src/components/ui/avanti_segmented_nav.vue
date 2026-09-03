<!--
  Сегментированный переключатель экранов: две половины, склеенные в один
  сегмент. Скругления только у внешних углов, активная половина залита
  фирменным цветом (кадры 0:1235 и 0:1338 — «Crea account / Accedi»).

  Это навигация между экранами, а не вкладки внутри одного: активный
  элемент помечен aria-current="page", панели с содержимым у него нет.
  Полоса шагов мастера с ролью tablist — отдельный компонент `avanti_tabs`.
-->
<template>
  <div class="avanti-segmented-nav">
    <button
      v-for="item in items"
      :key="item.id"
      class="avanti-segmented-nav__item"
      :class="itemClass(item.id)"
      type="button"
      :aria-current="item.id === activeId ? 'page' : undefined"
      @click="handleSelect(item.id)"
    >
      {{ item.label }}
    </button>
  </div>
</template>

<script setup lang="ts">
import type { AvantiSegmentedNavItem } from '@/types/avanti_tabs'

const props = defineProps<{
  /** Половины переключателя: порядок в массиве задаёт порядок в макете. */
  items: AvantiSegmentedNavItem[]
  /** Идентификатор текущего экрана. */
  activeId: string
}>()

const emit = defineEmits<{ select: [id: string] }>()

function itemClass(id: string): string {
  return id === props.activeId ? 'avanti-segmented-nav__item--active' : 'avanti-segmented-nav__item--idle'
}

function handleSelect(id: string): void {
  emit('select', id)
}
</script>

<style lang="scss" scoped>
.avanti-segmented-nav {
  display: flex;
  align-items: stretch;
  width: 100%;

  &__item {
    @include button-reset;
    @include focus-ring(-2px);

    display: flex;
    flex: 1 0 0;
    gap: 8px;
    align-items: center;
    justify-content: center;
    min-width: 0;
    padding: 12px;
    font-size: 14px;
    font-weight: var(--avanti-font-weight-medium);
    line-height: normal;
    text-transform: uppercase;
    transition:
      background-color var(--avanti-transition-base),
      color var(--avanti-transition-base);

    &:first-child {
      border-top-left-radius: var(--avanti-radius-sm);
      border-bottom-left-radius: var(--avanti-radius-sm);
    }

    &:last-child {
      border-top-right-radius: var(--avanti-radius-sm);
      border-bottom-right-radius: var(--avanti-radius-sm);
    }
  }

  &__item--active {
    color: var(--avanti-color-text-on-primary);
    background-color: var(--avanti-color-primary);
  }

  &__item--idle {
    @include inner-border(var(--avanti-color-primary));

    color: var(--avanti-color-primary);
    background-color: var(--avanti-color-surface-muted);

    &:hover {
      background-color: var(--avanti-color-primary-soft);
    }
  }

  @include desktop-up {
    /* На десктопе половины фиксированной ширины 244px, а не тянутся. */
    width: auto;

    &__item {
      flex: 0 0 244px;
      height: 50px;
      padding: 8px 16px;
      font-size: 16px;
    }
  }
}
</style>
