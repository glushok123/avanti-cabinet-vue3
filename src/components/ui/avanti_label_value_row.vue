<!--
  Строка «подпись — значение»: серая мелкая подпись и жирное значение.
  Один примитив на все места макета, где встречается эта пара; различия
  кадров сведены к вариантам пропа `size`, метрики каждого кадра сохранены
  один в один.

  `sm`  — карточка «Dati personali» на главной (кадр 464×131): подпись 12px,
          значение 13px, строка не переносится.
  `md`  — карточка личных данных профиля: подпись 13px (на десктопе 12px),
          значение 13px прижато вправо.
  `lg`  — построчная разбивка суммы комиссии (кадр «Строка — НДС»,
          Figma 246:7019 / 232:17732): обе половины 14px, цвет наследуется
          от карточки — на мобильной она бирюзовая с белым текстом,
          на десктопе светлая с тёмным.
  `inline` — строка назначения кредита в договоре (кадр Figma 22:4964):
          подпись и значение стоят рядом, переносятся вместе и несут
          отступы блока документа.

  Проп `tag` задаёт элемент строки: `div` в карточках, `li` внутри списка
  разбивки суммы, `p` в документе договора.
-->
<template>
  <component :is="tag" class="avanti-label-value-row" :class="sizeClass">
    <span class="avanti-label-value-row__label">{{ label }}</span>
    <span class="avanti-label-value-row__value">{{ value }}</span>
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'

/** Набор метрик строки: подобран под кадры, а не под абстрактную шкалу. */
type AvantiLabelValueRowSize = 'sm' | 'md' | 'lg' | 'inline'

/** Элемент строки: зависит от того, во что она вложена. */
type AvantiLabelValueRowTag = 'div' | 'li' | 'p'

const props = withDefaults(
  defineProps<{
    label: string
    value: string
    size?: AvantiLabelValueRowSize
    tag?: AvantiLabelValueRowTag
  }>(),
  {
    size: 'sm',
    tag: 'div',
  },
)

const sizeClass = computed<string>(() => `avanti-label-value-row--${props.size}`)
</script>

<style lang="scss" scoped>
.avanti-label-value-row {
  display: flex;
  align-items: center;
  line-height: normal;

  &__label {
    font-weight: var(--avanti-font-weight-regular);
  }

  &__value {
    font-weight: var(--avanti-font-weight-semibold);
  }

  /* --- sm: карточка «Dati personali» --- */
  &--sm {
    justify-content: space-between;
    width: 100%;
    white-space: nowrap;
  }

  &--sm &__label {
    font-size: 12px;
    color: var(--avanti-color-text-secondary);
  }

  &--sm &__value {
    font-size: 13px;
    color: var(--avanti-color-text-strong);
  }

  /* --- md: карточка личных данных профиля --- */
  &--md {
    gap: 12px;
    justify-content: space-between;
    width: 100%;
  }

  &--md &__label {
    flex-shrink: 0;
    font-size: 13px;
    color: var(--avanti-color-text-secondary);
  }

  &--md &__value {
    font-size: 13px;
    color: var(--avanti-color-text-strong);
    text-align: right;
  }

  /* --- lg: разбивка суммы комиссии; цвет наследуется от карточки --- */
  &--lg {
    gap: 12px;
    justify-content: space-between;
    font-size: 14px;
  }

  /* Сумма выровнена по правому краю и не переносится по разряду. */
  &--lg &__value {
    flex-shrink: 0;
    white-space: nowrap;
  }

  /* --- inline: строка назначения кредита в документе договора --- */
  &--inline {
    flex-wrap: wrap;
    gap: 6px;
    width: 100%;
    padding: 16px 32px 20px;
    margin: 0;
    font-size: 12px;
  }

  &--inline &__label {
    font-weight: var(--avanti-font-weight-semibold);
    color: var(--avanti-color-text-secondary);
  }

  &--inline &__value {
    font-weight: var(--avanti-font-weight-bold);
    color: var(--avanti-color-text-strong);
  }

  @include desktop-up {
    &--md &__label {
      font-size: 12px;
    }

    &--md &__value {
      white-space: nowrap;
    }
  }

  @include mobile {
    &--inline {
      padding: 12px 16px 16px;
    }
  }
}
</style>
