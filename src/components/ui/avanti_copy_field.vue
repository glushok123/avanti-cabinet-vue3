<!--
  Поле только для чтения с кнопкой копирования: подпись, серая плашка
  со значением и глиф копирования справа. В макете так показан IBAN
  в карточке «Dati personali» (кадры 1:3510 и 1:2583).

  Это не поле ввода, а строка с действием, поэтому примитив
  `avanti_text_field` здесь не участвует.

  Размеры из макета: `sm` — карточка экрана «Verifica email» (подпись 12px,
  плашка с полями 12px, длинное значение переносится), `md` — карточка
  страницы профиля (подпись 13px на мобильной, плашка 10px, значение
  обрезается многоточием).

  Обводка плашки рисуется внутрь через inner-border: обычный border прибавил бы
  к высоте 2px и плашка перестала бы совпадать с макетом.
-->
<template>
  <div class="avanti-copy-field" :class="sizeClass">
    <span :id="labelId" class="avanti-copy-field__label">{{ label }}</span>
    <div class="avanti-copy-field__control">
      <span class="avanti-copy-field__value" :aria-labelledby="labelId">{{ value }}</span>
      <button class="avanti-copy-field__copy" type="button" :aria-label="copyLabel" @click="handleCopy">
        <AvantiIconCopy />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, useId } from 'vue'
import AvantiIconCopy from '@/components/icons/avanti_icon_copy.vue'

type CopyFieldSize = 'sm' | 'md'

/** copyLabel — доступное имя кнопки: видимого текста у неё в макете нет. */
const props = withDefaults(
  defineProps<{
    label: string
    value: string
    copyLabel: string
    size?: CopyFieldSize
  }>(),
  {
    size: 'md',
  },
)

const emit = defineEmits<{ copy: [] }>()

const uid = useId()
const labelId = computed(() => `${uid}-label`)
const sizeClass = computed(() => `avanti-copy-field--${props.size}`)

/* Само копирование появится вместе с данными — вёрстка отдаёт событие. */
function handleCopy(): void {
  emit('copy')
}
</script>

<style lang="scss" scoped>
.avanti-copy-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-items: flex-start;
  width: 100%;

  &__label {
    font-weight: var(--avanti-font-weight-regular);
    line-height: normal;
    color: var(--avanti-color-text-secondary);
  }

  &__control {
    @include inner-border(var(--avanti-color-border));

    display: flex;
    gap: 12px;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    background-color: var(--avanti-color-surface-muted);
    border-radius: var(--avanti-radius-sm);
  }

  &__value {
    font-size: 13px;
    font-weight: var(--avanti-font-weight-semibold);
    line-height: normal;
    color: var(--avanti-color-text-strong);
  }

  &__copy {
    @include button-reset;
    @include focus-ring;

    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    color: var(--avanti-color-primary);
    border-radius: var(--avanti-radius-xs);
  }

  /* --- Карточка экрана «Verifica email» --- */
  &--sm &__label {
    font-size: 12px;
  }

  &--sm &__control {
    padding: 12px;
  }

  /* Длинный IBAN переносится, чтобы плашка не выходила за карточку. */
  &--sm &__value {
    word-break: break-all;
  }

  &--sm &__copy {
    width: 14px;
    height: 14px;
  }

  /* --- Карточка страницы профиля --- */
  &--md &__label {
    font-size: 13px;
  }

  &--md &__control {
    padding: 10px;
  }

  &--md &__value {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  /* Глиф в макете 14px внутри области 16px. */
  &--md &__copy {
    width: 16px;
    height: 16px;

    svg {
      width: 14px;
      height: 14px;
    }
  }

  @include desktop-up {
    &--md &__label {
      font-size: 12px;
    }

    &--md &__control {
      padding: 12px;
    }
  }
}
</style>
