<!--
  Хлебные крошки нижней панели десктопной шапки.
  Разделитель «/» рисуется псевдоэлементом, чтобы не засорять разметку.
-->
<template>
  <nav class="avanti-breadcrumbs" :aria-label="label">
    <ol class="avanti-breadcrumbs__list">
      <li
        v-for="item in items"
        :key="item.id"
        class="avanti-breadcrumbs__item"
        :class="itemClass(item)"
        :aria-current="ariaCurrent(item)"
      >
        {{ item.label }}
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
import type { AvantiBreadcrumb } from '@/types/avanti_dashboard'

/** label — доступное имя блока хлебных крошек. */
defineProps<{ items: AvantiBreadcrumb[]; label: string }>()

function itemClass(item: AvantiBreadcrumb): string {
  return item.current ? 'avanti-breadcrumbs__item--current' : ''
}

function ariaCurrent(item: AvantiBreadcrumb): 'page' | undefined {
  return item.current ? 'page' : undefined
}
</script>

<style lang="scss" scoped>
.avanti-breadcrumbs {
  &__list {
    display: flex;
    gap: 8px;
    align-items: center;
  }

  &__item {
    display: flex;
    gap: 8px;
    align-items: center;
    font-size: 14px;
    font-weight: var(--avanti-font-weight-medium);
    line-height: normal;
    color: var(--avanti-color-text-secondary);
    white-space: nowrap;

    /* Разделитель перед каждым пунктом, кроме первого. */
    & + &::before {
      color: var(--avanti-color-text-tertiary);
      content: '/';
    }

    &--current {
      font-weight: var(--avanti-font-weight-semibold);
      color: var(--avanti-color-text-strong);
    }
  }
}
</style>
