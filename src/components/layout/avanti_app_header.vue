<!--
  Десктопная шапка личного кабинета.
  Верхняя панель: логотип, горизонтальное меню и кнопка «Assistenza».
  Нижняя панель: карточка пользователя и хлебные крошки.
-->
<template>
  <header class="avanti-app-header">
    <div class="avanti-app-header__top">
      <div class="avanti-app-header__row">
        <div class="avanti-app-header__brand">
          <AvantiLogo size="lg" tone="black" />
          <nav class="avanti-app-header__menu" :aria-label="menuLabel">
            <AvantiNavItem
              v-for="item in navItems"
              :key="item.id"
              class="avanti-app-header__menu-item"
              :label="item.label"
              :to="item.to"
              :active="isActive(item)"
            >
              <template #icon>
                <component :is="resolveNavIcon(item.icon)" />
              </template>
            </AvantiNavItem>
          </nav>
        </div>
        <AvantiNavItem
          :label="supportItem.label"
          :to="supportItem.to"
          :active="isActive(supportItem)"
          variant="accent"
          :notifications="supportItem.notifications"
        >
          <template #icon>
            <component :is="resolveNavIcon(supportItem.icon)" />
          </template>
        </AvantiNavItem>
      </div>
    </div>
    <div class="avanti-app-header__bottom">
      <AvantiUserCard :name="user.name" :email="user.email" :avatar="user.avatarDesktop" />
      <AvantiBreadcrumbs :items="breadcrumbs" :label="breadcrumbsLabel" />
    </div>
  </header>
</template>

<script setup lang="ts">
import { useActiveNavSection } from '@/composables/use_nav_active'
import AvantiLogo from '@/components/ui/avanti_logo.vue'
import AvantiNavItem from '@/components/layout/avanti_nav_item.vue'
import AvantiUserCard from '@/components/layout/avanti_user_card.vue'
import AvantiBreadcrumbs from '@/components/layout/avanti_breadcrumbs.vue'
import { resolveNavIcon } from '@/components/icons/avanti_nav_icons'
import type { AvantiBreadcrumb, AvantiNavItem as NavItem, AvantiUser } from '@/types/avanti_dashboard'

/**
 * menuLabel и breadcrumbsLabel — доступные имена навигационных областей
 * (в макете у них нет видимого заголовка).
 */
defineProps<{
  user: AvantiUser
  navItems: NavItem[]
  supportItem: NavItem
  breadcrumbs: AvantiBreadcrumb[]
  menuLabel: string
  breadcrumbsLabel: string
}>()

/**
 * Подсветка пункта выводится из адреса, а не хранится в данных: иначе при
 * переходе подсвеченными оказались бы сразу два пункта — заданный в моке
 * и соответствующий текущему маршруту.
 */
const activeSection = useActiveNavSection()

function isActive(item: NavItem): boolean {
  return item.id === activeSection.value
}
</script>

<style lang="scss" scoped>
.avanti-app-header {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;

  &__top {
    width: 100%;
    padding: 16px 32px;
    background-color: var(--avanti-color-surface);
    border-bottom: 1px solid var(--avanti-color-border);
  }

  /*
   * Верхний и нижний ряды шапки центрируются по той же контентной сетке,
   * что и содержимое страницы: на экранах шире макета растут только отступы.
   * В max-width учтены собственные паддинги ряда, поэтому на 1440px
   * логотип встаёт ровно на 72px от края, как в Figma.
   */
  &__row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: calc($content-width-dashboard + 80px);
    padding: 0 40px;
    margin-inline: auto;
  }

  &__brand {
    display: flex;
    gap: 52px;
    align-items: center;
    padding: 20px 0;
  }

  &__menu {
    display: flex;
    gap: 12px;
    width: 660px;
  }

  &__menu-item {
    flex: 1 1 0;
    min-width: 0;
  }

  &__bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    max-width: calc($content-width-dashboard + 144px);
    padding: 10px 72px;
    margin-inline: auto;
  }
}
</style>
