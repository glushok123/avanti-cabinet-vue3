<!--
  Один шаг карточки «SBLOCCO DEI FONDI COMPLETATO»: круг с иконкой,
  заголовок и пояснение под ним. Последний шаг («Prelievo disponibile»)
  выделен фирменным свечением вокруг круга.
-->
<template>
  <div class="avanti-dashboard-unlock-step">
    <span class="avanti-dashboard-unlock-step__circle" :class="highlightClass">
      <component :is="resolveIcon(icon)" />
    </span>
    <span class="avanti-dashboard-unlock-step__text">
      <span class="avanti-dashboard-unlock-step__title">{{ title }}</span>
      <span class="avanti-dashboard-unlock-step__note">{{ note }}</span>
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed, type Component } from 'vue'
import AvantiIconShield from '@/components/icons/avanti_icon_shield.vue'
import AvantiIconLock from '@/components/icons/avanti_icon_lock.vue'
import AvantiIconBank from '@/components/icons/avanti_icon_bank.vue'
import type { AvantiUnlockIcon } from '@/types/avanti_dashboard'

const props = defineProps<{
  icon: AvantiUnlockIcon
  title: string
  note: string
  highlighted?: boolean
}>()

/*
 * ВРЕМЕННОЕ СООТВЕТСТВИЕ ИКОНОК.
 * В макете у шагов свои иконки — database, открытый замок и кошелёк, —
 * но в проекте их пока нет. Здесь подставлены ближайшие существующие;
 * после добавления нужных компонентов достаточно поменять эту таблицу.
 */
const iconByName: Record<AvantiUnlockIcon, Component> = {
  database: AvantiIconShield,
  'lock-open': AvantiIconLock,
  wallet: AvantiIconBank,
}

function resolveIcon(name: AvantiUnlockIcon): Component {
  return iconByName[name]
}

const highlightClass = computed(() =>
  props.highlighted ? 'avanti-dashboard-unlock-step__circle--highlighted' : undefined,
)
</script>

<style lang="scss" scoped>
.avanti-dashboard-unlock-step {
  display: flex;
  flex: 1 1 0;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  min-width: 0;
  text-align: center;

  &__circle {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    width: 54px;
    height: 54px;
    color: var(--avanti-color-primary);
    background-color: var(--avanti-color-primary-soft);
    border-radius: var(--avanti-radius-round);

    /* Обводка рисуется внутрь — диаметр круга совпадает с макетом. */
    @include inner-border(var(--avanti-color-primary), 2px);

    svg {
      width: 24px;
      height: 24px;
    }

    /* Акцент на последнем шаге: фирменное свечение вокруг круга. */
    &--highlighted {
      @include inner-border(var(--avanti-color-primary), 2px, var(--avanti-shadow-unlock-glow));
    }
  }

  &__text {
    display: flex;
    flex-direction: column;
    gap: 2px;
    align-items: center;
    width: 100%;
    line-height: normal;
  }

  &__title {
    font-size: 20px;
    font-weight: var(--avanti-font-weight-bold);
    color: var(--avanti-color-text-strong);
  }

  &__note {
    font-size: 16px;
    font-weight: var(--avanti-font-weight-regular);
    color: var(--avanti-color-text-secondary);
  }

  @include mobile {
    &__circle {
      width: 40px;
      height: 40px;

      @include inner-border(var(--avanti-color-primary), 1.5px);

      svg {
        width: 18px;
        height: 18px;
      }

      &--highlighted {
        @include inner-border(var(--avanti-color-primary), 1.5px, var(--avanti-shadow-unlock-glow-mobile));
      }
    }

    &__title {
      font-size: 11px;
    }

    &__note {
      font-size: 9px;
      line-height: 12px;
    }
  }
}
</style>
