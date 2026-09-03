<!--
  Мобильная нижняя навигация: белая полоса высотой 62px
  с верхней границей 2px фирменного цвета.
-->
<template>
  <nav class="avanti-bottom-nav" :aria-label="menuLabel">
    <AvantiBottomNavItem
      v-for="item in items"
      :key="item.id"
      :label="item.label"
      :to="item.to"
      :active="isActive(item)"
      :variant="resolveVariant(item)"
    >
      <template #icon>
        <component :is="resolveNavIcon(item.icon)" />
      </template>
    </AvantiBottomNavItem>
  </nav>
</template>

<script setup lang="ts">
import { useActiveNavSection } from '@/composables/use_nav_active'
import AvantiBottomNavItem from '@/components/layout/avanti_bottom_nav_item.vue'
import { resolveNavIcon } from '@/components/icons/avanti_nav_icons'
import type { AvantiNavItem } from '@/types/avanti_dashboard'

/** menuLabel — доступное имя навигации (в макете у неё нет заголовка). */
defineProps<{ items: AvantiNavItem[]; menuLabel: string }>()

/** Подсветка выводится из адреса — та же логика, что в десктопной шапке. */
const activeSection = useActiveNavSection()

function isActive(item: AvantiNavItem): boolean {
  return item.id === activeSection.value
}

function resolveVariant(item: AvantiNavItem): 'default' | 'accent' {
  return item.accent ? 'accent' : 'default'
}
</script>

<style lang="scss" scoped>
.avanti-bottom-nav {
  display: flex;
  flex-shrink: 0;

  /* В макете пункты выровнены по нижнему краю: их низ приходится на 10,5px
     от низа панели, поэтому кнопка «Assistenza» стоит выше обычных пунктов
     ровно на разницу их высот. Центрирование давало сдвиг на 1–1,5px. */
  align-items: flex-end;
  justify-content: space-between;
  width: 100%;
  height: 62px;
  padding: 0 20px 10.5px;
  background-color: var(--avanti-color-surface);
  border-top: 2px solid var(--avanti-color-primary);
}
</style>
