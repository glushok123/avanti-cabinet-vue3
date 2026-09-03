<!--
  Общая оболочка экранов личного кабинета: скрытый заголовок, шапка
  (десктопная или мобильная), контентная область в две колонки и нижняя
  навигация на мобильной ширине.

  Каркас одинаков на главной, в профиле, на вводе IBAN, подтверждении почты
  и в договоре — различаются только ширина боковой колонки и отступы
  контентной области, поэтому они вынесены в пропы `sideWidth`
  и `contentPadding`. Содержимое колонок приходит слотами.

  Слоты:
    · main   — левая колонка (шкала шагов, карточки экрана)
    · side   — правая колонка (личные данные, чеклист верификации)
    · float  — виджеты поверх контентной области (консультант, чат);
               позиционируются стилями страницы относительно `<main>`
    · dialog — модальные окна поверх страницы
-->
<template>
  <div class="avanti-cabinet-layout" :class="layoutClasses">
    <!--
      В макете у страниц кабинета нет видимого заголовка, но без h1
      ломается иерархия для скринридеров, поэтому он скрыт визуально.
    -->
    <h1 class="avanti-cabinet-layout__title">{{ title }}</h1>
    <AvantiAppHeaderMobile
      v-if="isMobile"
      :user="user"
      :notifications="supportItem.notifications"
      :notifications-label="texts.notifications"
      :profile-label="texts.profile"
    />
    <AvantiAppHeader
      v-else
      :user="user"
      :nav-items="navItems"
      :support-item="supportItem"
      :breadcrumbs="breadcrumbs"
      :menu-label="texts.mainMenu"
      :breadcrumbs-label="texts.breadcrumbs"
    />

    <main class="avanti-cabinet-layout__content">
      <div class="avanti-cabinet-layout__column avanti-cabinet-layout__column--main">
        <slot name="main" />
      </div>

      <div class="avanti-cabinet-layout__column avanti-cabinet-layout__column--side">
        <slot name="side" />
      </div>

      <slot name="float" />
    </main>

    <AvantiBottomNav v-if="isMobile" :items="bottomNavItems" :menu-label="texts.mainMenu" />

    <slot name="dialog" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useIsMobile } from '@/composables/use_is_mobile'
import AvantiAppHeader from '@/components/layout/avanti_app_header.vue'
import AvantiAppHeaderMobile from '@/components/layout/avanti_app_header_mobile.vue'
import AvantiBottomNav from '@/components/layout/avanti_bottom_nav.vue'
import {
  AVANTI_BOTTOM_NAV_ITEMS,
  AVANTI_BREADCRUMBS,
  AVANTI_DASHBOARD_TEXTS as texts,
  AVANTI_HEADER_NAV_ITEMS,
  AVANTI_SUPPORT_NAV_ITEM as supportItem,
  AVANTI_USER as user,
} from '@/constants/avanti_dashboard_mock'
import type { AvantiBreadcrumb, AvantiNavItem } from '@/types/avanti_dashboard'

/**
 * Набор отступов контентной области. Это перечисление, а не число: каждое
 * значение снято с конкретного кадра Figma и проверено пиксельной сверкой.
 *  · default     — главная кабинета и ввод IBAN: 20/72/40, мобильная 16/16/20
 *  · flush       — профиль: контент начинается сразу под шапкой (0 сверху)
 *  · wide-mobile — как default, но мобильные боковые отступы 20px:
 *                  так собраны экраны, для которых мобильного кадра нет
 *  · document    — договор: 22px сверху, 42px снизу, мобильная 20px
 */
type AvantiCabinetPadding = 'default' | 'flush' | 'wide-mobile' | 'document'

const props = withDefaults(
  defineProps<{
    /** Заголовок страницы для скринридеров: в макете его не видно. */
    title: string
    /** Пункты десктопного меню: у профиля и подтверждения почты свои. */
    navItems?: AvantiNavItem[]
    /** Хлебные крошки нижней панели шапки. */
    breadcrumbs?: AvantiBreadcrumb[]
    /** Пункты мобильной нижней навигации. */
    bottomNavItems?: AvantiNavItem[]
    /** Ширина правой колонки: 464px в кабинете, 356px в договоре. */
    sideWidth?: 464 | 356
    contentPadding?: AvantiCabinetPadding
  }>(),
  {
    navItems: () => AVANTI_HEADER_NAV_ITEMS,
    breadcrumbs: () => AVANTI_BREADCRUMBS,
    bottomNavItems: () => AVANTI_BOTTOM_NAV_ITEMS,
    sideWidth: 464,
    contentPadding: 'default',
  },
)

/** Отличается сама разметка шапки и навигации, поэтому нужен JS-признак. */
const isMobile = useIsMobile()

/** Узкая боковая колонка договора против обычной колонки кабинета. */
const SIDE_WIDTH_NARROW = 356

const layoutClasses = computed<string[]>(() => {
  const classes = [`avanti-cabinet-layout--${props.contentPadding}`]

  if (props.sideWidth === SIDE_WIDTH_NARROW) {
    classes.push('avanti-cabinet-layout--side-narrow')
  }

  return classes
})
</script>

<style lang="scss" scoped>
.avanti-cabinet-layout {
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: var(--avanti-color-page);

  /* Заголовок нужен только для доступности — в макете его нет. */
  &__title {
    @include visually-hidden;
  }

  /*
   * Контентная область: ширина зафиксирована по макету (1296px = 1440 − 72×2).
   * На экранах шире макета контент не растягивается — растут боковые отступы.
   * Ограничение ставится с учётом собственных горизонтальных паддингов,
   * поэтому на 1440px отступы получаются ровно 72px, как в Figma.
   * Паддинг обязан оставаться на этом же элементе: max-width посчитан
   * вместе с ним, и перенос паддинга на соседний элемент сдвинет контент.
   */
  &__content {
    position: relative;
    display: flex;
    gap: 40px;
    align-items: flex-start;
    width: 100%;
    max-width: calc($content-width-dashboard + 144px);
    margin-inline: auto;
  }

  &__column {
    display: flex;
    flex-direction: column;
    gap: 32px;
    align-items: flex-start;

    &--main {
      flex: 1 1 0;
      min-width: 0;
    }

    &--side {
      flex: 0 0 464px;
      width: 464px;
    }
  }

  /*
   * Отступы контентной области. Каждый вариант объявляет и десктопное,
   * и мобильное значение в одном месте: так у всех вариантов одинаковая
   * специфичность и мобильная ветка не проигрывает десктопной.
   * Верхний отступ заменяет зазор между шапкой и контентом.
   */
  &--default &__content {
    padding: 20px 72px 40px;

    @include mobile {
      /* Нижний отступ 20px — тот же зазор, что между карточками: в макете
         нижняя навигация лежит внутри контентного контейнера. */
      padding: 16px 16px 20px;
    }
  }

  /* Профиль: панель навигации ровно 171px, контент идёт сразу под ней. */
  &--flush &__content {
    padding: 0 72px 40px;

    @include mobile {
      padding: 16px 16px 20px;
    }
  }

  /* Экран без мобильного кадра в Figma: боковые отступы 20px по логике проекта. */
  &--wide-mobile &__content {
    padding: 20px 72px 40px;

    @include mobile {
      padding: 16px 20px 20px;
    }
  }

  /* Договор (кадр 22:4780): контент на 2px ниже и на 2px глубже снизу. */
  &--document &__content {
    padding: 22px 72px 42px;

    @include mobile {
      padding: 20px;
    }
  }

  /* Договор: сайдбар со статусом верификации уже — 356px из 1296px. */
  &--side-narrow &__column--side {
    flex-basis: 356px;
    width: 356px;
  }
}

@include mobile {
  .avanti-cabinet-layout__content {
    flex-direction: column;
    gap: 20px;
    align-items: stretch;
  }

  /* Колонок на мобильной раскладке нет — карточки идут одним потоком. */
  .avanti-cabinet-layout__column {
    display: contents;
  }
}
</style>
