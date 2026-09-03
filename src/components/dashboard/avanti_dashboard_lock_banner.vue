<!--
  Баннер «средства заблокированы до завершения шагов».
  Разметка одна, раскладка задаётся grid-областями: на десктопе баннер
  горизонтальный (бейдж справа от заголовка, круглая кнопка-стрелка справа),
  на мобильной — вертикальный (бейдж внизу справа, кнопки-стрелки нет).
-->
<template>
  <section class="avanti-dashboard-lock-banner">
    <AvantiIconCircle
      class="avanti-dashboard-lock-banner__icon"
      :size="44"
      icon-size="xl"
      :mobile-size="32"
      mobile-icon-size="ml"
      tone="primary"
      shadow="icon"
      mobile-shadow="none"
    >
      <AvantiIconLock />
    </AvantiIconCircle>
    <p class="avanti-dashboard-lock-banner__title">{{ title }}</p>
    <p class="avanti-dashboard-lock-banner__subtitle">{{ subtitle }}</p>
    <AvantiBadge class="avanti-dashboard-lock-banner__badge" tone="primary" uppercase>
      <span class="avanti-dashboard-lock-banner__counter">{{ counterLabel }}</span>
      <span class="avanti-dashboard-lock-banner__counter-short">{{ counterShortLabel }}</span>
    </AvantiBadge>
    <div class="avanti-dashboard-lock-banner__options">
      <AvantiCheckbox
        v-for="option in options"
        :key="option"
        :model-value="isChecked(option)"
        @update:model-value="toggleOption(option, $event)"
      >
        {{ option }}
      </AvantiCheckbox>
    </div>
    <AvantiIconCircle
      class="avanti-dashboard-lock-banner__action"
      tag="button"
      :size="36"
      icon-size="lg"
      tone="primary"
      shadow="action"
      :label="actionLabel"
    >
      <AvantiIconArrowRight />
    </AvantiIconCircle>
  </section>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import AvantiIconCircle from '@/components/ui/avanti_icon_circle.vue'
import AvantiBadge from '@/components/ui/avanti_badge.vue'
import AvantiCheckbox from '@/components/ui/avanti_checkbox.vue'
import AvantiIconLock from '@/components/icons/avanti_icon_lock.vue'
import AvantiIconArrowRight from '@/components/icons/avanti_icon_arrow_right.vue'

/** actionLabel — доступное имя круглой кнопки-стрелки (в макете она без текста). */
const props = defineProps<{
  title: string
  subtitle: string
  counterLabel: string
  counterShortLabel: string
  options: string[]
  actionLabel: string
}>()

/**
 * Отмеченные пункты хранятся множеством значений, а не массивом по индексу:
 * при замене списка (переход на API) состояние не разъезжается.
 * По макету изначально не отмечен ни один пункт.
 */
const checkedOptions = ref(new Set<string>())

/** Список поменялся — снимаем отметки с исчезнувших пунктов. */
watch(
  () => props.options,
  (options) => {
    checkedOptions.value = new Set([...checkedOptions.value].filter((option) => options.includes(option)))
  },
)

function isChecked(option: string): boolean {
  return checkedOptions.value.has(option)
}

function toggleOption(option: string, checked: boolean): void {
  const next = new Set(checkedOptions.value)
  if (checked) {
    next.add(option)
  } else {
    next.delete(option)
  }
  checkedOptions.value = next
}
</script>

<style lang="scss" scoped>
.avanti-dashboard-lock-banner {
  display: grid;
  grid-template-areas:
    'icon title  badge  action'
    'icon sub    sub    action'
    'icon options options action';
  grid-template-columns: 44px minmax(0, 1fr) auto 36px;
  gap: 6px 16px;
  align-items: center;
  width: 100%;
  padding: 16px 20px;
  background-color: var(--avanti-color-primary-soft);
  border-radius: var(--avanti-radius-xl);

  /* Обводка внутрь — габариты баннера совпадают с кадром Figma (792×124). */
  @include inner-border(var(--avanti-color-primary-soft-border));

  &__icon {
    grid-area: icon;
    align-self: start;
  }

  &__action {
    grid-area: action;
  }

  &__title {
    grid-area: title;
    font-family: var(--avanti-font-family-alt);
    font-size: 13px;
    font-weight: var(--avanti-font-weight-semibold);
    line-height: normal;
    color: var(--avanti-color-text-strong);
    word-break: break-word;
  }

  &__subtitle {
    grid-area: sub;
    font-family: var(--avanti-font-family-alt);
    font-size: 12px;
    font-weight: var(--avanti-font-weight-medium);
    line-height: normal;
    color: var(--avanti-color-text-secondary);
  }

  &__badge {
    grid-area: badge;
    justify-self: end;

    /* Колонка бейджа отделена от заголовка на 10px, а не на общие 16px. */
    margin-left: -6px;
  }

  /* Короткая подпись счётчика нужна только на мобильной. */
  &__counter-short {
    display: none;
  }

  &__options {
    display: flex;
    flex-direction: column;
    grid-area: options;
    gap: 6px;
    align-items: flex-start;
  }

  @include mobile {
    grid-template-areas:
      'icon    title   title'
      'icon    sub     sub'
      'options options badge';
    grid-template-columns: 32px minmax(0, 1fr) auto;
    gap: 2px 12px;
    padding: 16px;

    /* На мобильной обводка баннера ярче — тоже рисуется внутрь. */
    @include inner-border(var(--avanti-color-primary));

    &__subtitle {
      font-size: 11px;
    }

    &__badge {
      align-self: end;
      margin-left: 0;
    }

    &__counter {
      display: none;
    }

    &__counter-short {
      display: inline;
    }

    &__options {
      gap: 8px;
      margin-top: 10px;
    }

    &__action {
      display: none;
    }
  }
}
</style>
