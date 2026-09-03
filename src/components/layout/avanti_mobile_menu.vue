<!--
  Мобильное меню: панель выезжает справа поверх затемнённой страницы.
  Закрывается по клику на затемнение, по Escape и по выбору пункта;
  пока открыто — держит фокус внутри себя и блокирует прокрутку страницы.
  Поведение слоя живёт в `@/composables/use_modal_behavior`.
-->
<template>
  <Teleport to="body">
    <Transition name="avanti-menu">
      <div v-if="open" class="avanti-mobile-menu">
        <div class="avanti-mobile-menu__backdrop" @click="handleClose" />
        <div
          ref="panelRef"
          class="avanti-mobile-menu__panel"
          role="dialog"
          aria-modal="true"
          :aria-label="dialogLabel"
        >
          <div class="avanti-mobile-menu__head">
            <p class="avanti-mobile-menu__title">{{ title }}</p>
            <button
              class="avanti-mobile-menu__close"
              type="button"
              :aria-label="closeLabel"
              @click="handleClose"
            >
              <AvantiIconClose />
            </button>
          </div>
          <nav class="avanti-mobile-menu__nav" :aria-label="dialogLabel">
            <ul class="avanti-mobile-menu__list">
              <AvantiMobileMenuItem
                v-for="item in items"
                :key="item.id"
                :label="item.label"
                :to="item.to"
                :disabled="item.disabled"
                :hint="item.hint"
                :accent="item.accent"
                @select="handleClose"
              >
                <template #icon>
                  <component :is="resolveNavIcon(item.icon)" />
                </template>
              </AvantiMobileMenuItem>
            </ul>
          </nav>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import AvantiMobileMenuItem from '@/components/layout/avanti_mobile_menu_item.vue'
import AvantiIconClose from '@/components/icons/avanti_icon_close.vue'
import { resolveNavIcon } from '@/components/icons/avanti_nav_icons'
import { useModalBehavior } from '@/composables/use_modal_behavior'
import type { AvantiNavigationItem } from '@/types/avanti_navigation'

const props = defineProps<{
  /** Меню открыто. */
  open: boolean
  items: AvantiNavigationItem[]
  /** Заголовок панели. */
  title: string
  /** Доступное имя диалога и списка навигации. */
  dialogLabel: string
  /** Доступное имя кнопки закрытия. */
  closeLabel: string
}>()

const emit = defineEmits<{ close: [] }>()

function handleClose(): void {
  emit('close')
}

/*
 * Ловушка фокуса, Escape и блокировка прокрутки — общая композиция модального
 * слоя. Фокус при открытии уходит на первый элемент панели (кнопку закрытия),
 * а возврат фокуса на бургер остаётся заботой шапки, которая меню открыла.
 */
const panelRef = useModalBehavior({
  isOpen: () => props.open,
  closeOnEscape: () => true,
  onEscape: handleClose,
  initialFocus: 'first',
  restoreFocus: false,
})
</script>

<style lang="scss" scoped>
$menu-layer: 100;
$panel-width: 300px;

.avanti-mobile-menu {
  position: fixed;
  inset: 0;
  z-index: $menu-layer;
  display: flex;
  justify-content: flex-end;

  &__backdrop {
    position: absolute;
    inset: 0;
    cursor: pointer;
    background-color: var(--avanti-color-overlay);
  }

  &__panel {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 24px;
    width: min(82%, #{$panel-width});
    height: 100%;
    padding: 18px 16px 28px;
    overflow-y: auto;
    background-color: var(--avanti-color-surface);
    border-left: 2px solid var(--avanti-color-primary);
    box-shadow: var(--avanti-shadow-drawer);
  }

  &__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__title {
    font-size: 18px;
    font-weight: var(--avanti-font-weight-semibold);
    line-height: normal;
    color: var(--avanti-color-primary);
    text-transform: uppercase;
  }

  &__close {
    @include button-reset;
    @include focus-ring;

    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    color: var(--avanti-color-primary);
    border-radius: var(--avanti-radius-sm);

    svg {
      width: 18px;
      height: 18px;
    }
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  /* Меню — часть мобильного макета: на десктопе навигация живёт в шапке. */
  @include desktop-up {
    display: none;
  }
}

/* --- Анимация: панель выезжает справа, затемнение проявляется --- */
.avanti-menu-enter-active,
.avanti-menu-leave-active {
  .avanti-mobile-menu__backdrop {
    transition: opacity var(--avanti-transition-base);
  }

  .avanti-mobile-menu__panel {
    transition: transform var(--avanti-transition-base);
  }
}

.avanti-menu-enter-from,
.avanti-menu-leave-to {
  .avanti-mobile-menu__backdrop {
    opacity: 0;
  }

  .avanti-mobile-menu__panel {
    transform: translateX(100%);
  }
}
</style>

<style lang="scss">
/* Глобальный класс модального слоя: страница под открытым меню не прокручивается. */
body.avanti-scroll-locked {
  overflow: hidden;
}
</style>
