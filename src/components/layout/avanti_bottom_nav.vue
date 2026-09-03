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
      :active="item.active"
      :variant="resolveVariant(item)"
    >
      <template #icon>
        <component :is="resolveNavIcon(item.icon)" />
      </template>
    </AvantiBottomNavItem>
  </nav>
</template>

<script setup lang="ts">
import AvantiBottomNavItem from '@/components/layout/avanti_bottom_nav_item.vue'
import { resolveNavIcon } from '@/components/icons/avanti_nav_icons'
import type { AvantiNavItem } from '@/types/avanti_dashboard'

/** menuLabel — доступное имя навигации (в макете у неё нет заголовка). */
defineProps<{ items: AvantiNavItem[]; menuLabel: string }>()

function resolveVariant(item: AvantiNavItem): 'default' | 'accent' {
  return item.accent ? 'accent' : 'default'
}
</script>

<style lang="scss" scoped>
.avanti-bottom-nav {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 62px;
  padding: 0 20px;
  background-color: var(--avanti-color-surface);
  border-top: 2px solid var(--avanti-color-primary);
}
</style>
