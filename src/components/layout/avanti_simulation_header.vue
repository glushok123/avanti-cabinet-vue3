<!--
  Шапка экрана симуляции кредита.
  Десктоп: белая полоса 110px с логотипом размера xl и бирюзовой линией 2px снизу.
  Мобильная: та же полоса с логотипом md и кнопкой бургер-меню справа.

  Шапка владеет мобильным меню целиком: кнопка, состояние «открыто»
  и возврат фокуса на кнопку после закрытия живут в одном месте.
-->
<template>
  <header class="avanti-simulation-header">
    <div class="avanti-simulation-header__inner">
      <AvantiLogo class="avanti-simulation-header__logo" :size="logoSize" />
      <button
        v-if="isMobile"
        ref="menuButtonRef"
        class="avanti-simulation-header__menu"
        type="button"
        :aria-expanded="isMenuOpen"
        :aria-label="menuLabel"
        @click="openMenu"
      >
        <AvantiIconBurger />
      </button>
    </div>
    <AvantiMobileMenu
      :open="isMenuOpen"
      :items="menuItems"
      :title="menuTexts.title"
      :dialog-label="menuTexts.ariaLabel"
      :close-label="menuTexts.closeLabel"
      @close="closeMenu"
    />
  </header>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import AvantiLogo from '@/components/ui/avanti_logo.vue'
import AvantiIconBurger from '@/components/icons/avanti_icon_burger.vue'
import AvantiMobileMenu from '@/components/layout/avanti_mobile_menu.vue'
import { useIsMobile } from '@/composables/use_is_mobile'
import { AVANTI_MAIN_MENU_ITEMS, AVANTI_MENU_TEXTS } from '@/constants/avanti_navigation'

/** menuLabel — доступное имя кнопки меню (в макете кнопка без текста). */
defineProps<{ menuLabel: string }>()

const isMobile = useIsMobile()

const menuItems = AVANTI_MAIN_MENU_ITEMS
const menuTexts = AVANTI_MENU_TEXTS

const isMenuOpen = ref<boolean>(false)
const menuButtonRef = ref<HTMLButtonElement | null>(null)

const logoSize = computed(() => (isMobile.value ? 'md' : 'xl'))

function openMenu(): void {
  isMenuOpen.value = true
}

function closeMenu(): void {
  isMenuOpen.value = false
}

/* После закрытия фокус возвращается на кнопку, которая меню открыла. */
watch(isMenuOpen, (open) => {
  if (!open) {
    menuButtonRef.value?.focus()
  }
})

/* Меню — часть мобильного макета: при переходе на десктоп оно закрывается. */
watch(isMobile, (mobile) => {
  if (!mobile) {
    closeMenu()
  }
})
</script>

<style lang="scss" scoped>
.avanti-simulation-header {
  width: 100%;
  padding: 15px 20px;
  background-color: var(--avanti-color-surface);
  border-bottom: 1px solid var(--avanti-color-primary);

  &__inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  &__menu {
    @include button-reset;
    @include focus-ring;

    display: flex;
    flex-shrink: 0;
    width: 40px;
    height: 40px;
    color: var(--avanti-color-primary);
  }

  @include desktop-up {
    display: flex;
    align-items: center;
    height: 110px;
    padding: 0 $content-gutter;
    border-bottom-width: 2px;

    .avanti-simulation-header__inner {
      @include content-container($content-width-simulation);
    }
  }
}
</style>
