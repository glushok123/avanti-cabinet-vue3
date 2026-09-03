<!--
  Пункт мобильного выезжающего меню: иконка и подпись в одной строке.
  Пункт со ссылкой — RouterLink, пункт без готового экрана — неактивная
  строка с пояснением; вариант «accent» повторяет кнопку «Assistenza».
-->
<template>
  <li class="avanti-mobile-menu-item">
    <RouterLink
      v-if="isLink"
      class="avanti-mobile-menu-item__body avanti-mobile-menu-item__body--link"
      :class="accentClass"
      active-class="avanti-mobile-menu-item__body--active"
      :to="target"
      @click="handleSelect"
    >
      <span class="avanti-mobile-menu-item__icon">
        <slot name="icon" />
      </span>
      <span class="avanti-mobile-menu-item__label">{{ label }}</span>
    </RouterLink>
    <span
      v-else
      class="avanti-mobile-menu-item__body avanti-mobile-menu-item__body--disabled"
      aria-disabled="true"
    >
      <span class="avanti-mobile-menu-item__icon">
        <slot name="icon" />
      </span>
      <span class="avanti-mobile-menu-item__label">{{ label }}</span>
      <span v-if="hint" class="avanti-mobile-menu-item__hint">{{ hint }}</span>
    </span>
  </li>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

const props = withDefaults(
  defineProps<{
    label: string
    /** Маршрут пункта; без него пункт неактивен. */
    to?: string
    /** Экран ещё не готов. */
    disabled?: boolean
    /** Пояснение к недоступному пункту. */
    hint?: string
    /** Фирменная заливка («Assistenza»). */
    accent?: boolean
  }>(),
  {
    to: undefined,
    disabled: false,
    hint: undefined,
    accent: false,
  },
)

const emit = defineEmits<{ select: [] }>()

/** Ссылкой пункт становится, только если у него есть маршрут и он не отключён. */
const isLink = computed<boolean>(() => Boolean(props.to) && !props.disabled)

/** RouterLink требует непустой маршрут даже в неиспользуемой ветке шаблона. */
const target = computed<string>(() => props.to ?? '/')

const accentClass = computed<string>(() => (props.accent ? 'avanti-mobile-menu-item__body--accent' : ''))

function handleSelect(): void {
  emit('select')
}
</script>

<style lang="scss" scoped>
.avanti-mobile-menu-item {
  &__body {
    @include focus-ring;

    display: flex;
    gap: 12px;
    align-items: center;
    width: 100%;
    padding: 12px 14px;
    font-size: 16px;
    font-weight: var(--avanti-font-weight-medium);
    line-height: normal;
    color: var(--avanti-color-text-strong);
    border-radius: var(--avanti-radius-md);
    transition:
      color var(--avanti-transition-fast),
      background-color var(--avanti-transition-fast);
  }

  &__icon {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
  }

  &__label {
    flex-grow: 1;
  }

  &__hint {
    flex-shrink: 0;
    font-size: 12px;
    font-weight: var(--avanti-font-weight-regular);
    color: var(--avanti-color-text-tertiary);
  }

  /* --- Активная ссылка --- */
  &__body--link:hover {
    color: var(--avanti-color-primary);
    background-color: var(--avanti-color-primary-soft);
  }

  &__body--active {
    font-weight: var(--avanti-font-weight-semibold);
    color: var(--avanti-color-primary);
    background-color: var(--avanti-color-primary-soft);
  }

  /* --- Кнопка «Assistenza» --- */
  &__body--accent {
    color: var(--avanti-color-text-on-primary);
    background-color: var(--avanti-color-primary);

    &:hover {
      color: var(--avanti-color-text-on-primary);
      background-color: var(--avanti-color-primary-dark);
    }
  }

  /* --- Экран ещё не готов --- */
  &__body--disabled {
    color: var(--avanti-color-text-tertiary);
    cursor: not-allowed;
  }
}
</style>
