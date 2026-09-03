<!--
  Значение только для чтения с кнопкой копирования. Один компонент на два кадра
  макета, различие вынесено в проп `variant`:
  - `field` — подпись, серая плашка со значением и глиф справа: так показан IBAN
    в карточке «Dati personali» (кадры 1:3510 и 1:2583). Размеры берёт `size`:
    `sm` — карточка «Verifica email» (подпись 12px, поля 12px, значение
    переносится), `md` — карточка профиля (13px на мобильной, поля 10px, конец
    значения обрезается многоточием);
  - `row` — строка реквизита карточки шага «3. COORDINATE» (кадр «Строка — IBAN»,
    Figma 241:23649 / 232:18067): подпись и значение слева, кнопка справа, плашки
    вокруг значения нет; размеры у кадра свои, поэтому `size` на него не влияет.

  Это не поле ввода, а строка с действием, поэтому примитив `avanti_text_field`
  здесь не участвует. Копирование настоящее: значение уходит в буфер через общую
  композицию `@/composables/use_clipboard_copy`, и пока держится состояние
  «скопировано», глиф меняется на галочку. Событие `copy` остаётся для родителя,
  но копирование от него не зависит. Обводка плашки рисуется внутрь через
  inner-border: обычный border прибавил бы к её высоте 2px.
  РАСХОЖДЕНИЕ МАКЕТА: состояний «скопировано» и «не удалось» в кадрах нет —
  галочка и красный глиф собраны из токенов палитры.
-->
<template>
  <component :is="tag" class="avanti-copy-field" :class="[variantClass, sizeClass]">
    <span v-if="isRow" class="avanti-copy-field__data">
      <span class="avanti-copy-field__label">{{ label }}</span>
      <span class="avanti-copy-field__value">{{ value }}</span>
    </span>
    <span v-else class="avanti-copy-field__label">{{ label }}</span>
    <div class="avanti-copy-field__control">
      <span v-if="!isRow" class="avanti-copy-field__value">{{ value }}</span>
      <button
        class="avanti-copy-field__copy"
        :class="copyClass"
        type="button"
        :aria-label="copyLabel"
        @click="handleCopy"
      >
        <AvantiIconCheck v-if="isCopied" />
        <AvantiIconCopy v-else :stroke-width="iconStrokeWidth" />
      </button>
    </div>
    <span class="avanti-copy-field__status" role="status" aria-live="polite">{{ statusMessage }}</span>
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import AvantiIconCheck from '@/components/icons/avanti_icon_check.vue'
import AvantiIconCopy from '@/components/icons/avanti_icon_copy.vue'
import { useClipboardCopy } from '@/composables/use_clipboard_copy'

type CopyFieldVariant = 'field' | 'row'
type CopyFieldSize = 'sm' | 'md'
/**
 * copyLabel — доступное имя кнопки: видимого текста у неё в макете нет.
 * copiedLabel и failedLabel — тексты для `aria-live`; пока экран их не
 * передаёт, область объявления остаётся пустой.
 */
const props = withDefaults(
  defineProps<{
    label: string
    value: string
    copyLabel: string
    variant?: CopyFieldVariant
    size?: CopyFieldSize
    /** Корневой тег: `li`, когда поле стоит строкой внутри списка. */
    tag?: 'div' | 'li'
    /** Значение для буфера, если оно не равно видимому: IBAN без пробелов. */
    copyValue?: string
    copiedLabel?: string
    failedLabel?: string
  }>(),
  {
    variant: 'field',
    size: 'md',
    tag: 'div',
    copyValue: undefined,
    copiedLabel: '',
    failedLabel: '',
  },
)

const emit = defineEmits<{ copy: [] }>()

const isRow = computed<boolean>(() => props.variant === 'row')
const variantClass = computed(() => `avanti-copy-field--${props.variant}`)
/**
 * Штрих глифа копии: 2 — как размечен кадр 1:3539 варианта `field`. В кадре
 * варианта `row` (Figma 241:23646) тот же глиф размечен сеткой 24×24, а общая
 * иконка `avanti_icon_copy` — сеткой 14×14; у lucide толщина задана в
 * координатах viewBox, поэтому её пересчитываем в сетку иконки, иначе штрих
 * стал бы видимо толще в 24/14 раза.
 */
const FIELD_ICON_STROKE = 2
const ROW_ICON_STROKE = FIELD_ICON_STROKE * (14 / 24)

const iconStrokeWidth = computed<number>(() => (isRow.value ? ROW_ICON_STROKE : FIELD_ICON_STROKE))

/** Размеры описаны только у варианта с плашкой, у строки они свои. */
const sizeClass = computed(() => (isRow.value ? undefined : `avanti-copy-field--${props.size}`))

const { status, isCopied, copy } = useClipboardCopy()
const copyClass = computed(() => `avanti-copy-field__copy--${status.value}`)

/** Текст для `aria-live`; в спокойном состоянии область пуста. */
const statusMessage = computed<string>(() => {
  if (status.value === 'copied') {
    return props.copiedLabel
  }
  return status.value === 'failed' ? props.failedLabel : ''
})

async function handleCopy(): Promise<void> {
  const copied = await copy(props.copyValue ?? props.value)
  if (copied) {
    emit('copy')
  }
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

    /* Буфер недоступен: глиф краснеет, размеры кнопки не меняются. */
    &--failed {
      color: var(--avanti-color-danger);
    }
  }

  /* Область объявления результата: её читает скринридер, на экране её нет. */
  &__status {
    @include visually-hidden;
  }

  /* --- Вариант `field`, карточка экрана «Verifica email» --- */
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

  /* --- Вариант `field`, карточка страницы профиля --- */
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

  /* --- Вариант `row`, строка реквизита шага «3. COORDINATE» --- */
  &--row {
    flex-direction: row;
    gap: 12px;
    align-items: center;
    justify-content: space-between;
  }

  /* Плашки в кадре нет: обёртка выпадает из потока, кнопка становится
     прямым ребёнком строки. */
  &--row &__control {
    display: contents;
  }

  &--row &__data {
    display: flex;
    flex-direction: column;
    gap: 4px;
    min-width: 0;
  }

  &--row &__label {
    font-size: 11px;
    font-weight: var(--avanti-font-weight-bold);
    letter-spacing: 0.8px;
  }

  /* Длинный IBAN переносится по символам, а не выходит за карточку. */
  &--row &__value {
    font-size: 16px;
    overflow-wrap: anywhere;
  }

  /* Кнопка 20×20 из макета: сам глиф занимает 16×16 (отступ 10%). */
  &--row &__copy {
    width: 20px;
    height: 20px;
    padding: 2px;
    color: var(--avanti-color-text-secondary);
    transition: color var(--avanti-transition-fast);

    &:hover,
    &--copied {
      color: var(--avanti-color-primary);
    }

    /* Специфичность выше базового `__copy--failed`, поэтому повторяем. */
    &--failed {
      color: var(--avanti-color-danger);
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

  /* Мобильная карточка уже десктопной, поэтому обе надписи мельче. */
  @include mobile {
    &--row {
      gap: 8px;
    }

    &--row &__label {
      font-size: 10px;
    }

    &--row &__value {
      font-size: 12px;
    }
  }
}
</style>
