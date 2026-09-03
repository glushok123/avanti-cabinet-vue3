<!--
  Плашка способа оплаты шага «3. COORDINATE» (кадры «Выбор метода оплаты»,
  Figma 241:23635 и 270:7745): подпись по центру и круглый знак рядом.

  В кадрах она встречается дважды и различается заливкой, знаком и его местом:
  «Seleziona il metodo SEPA Instant» — светло-бирюзовая, знак «?» справа,
  нажимается и открывает пояснение; «Se necessario…» — белая, знак «!» слева,
  это просто напоминание. Поэтому вид собирается пропами, а корневой тег
  выбирается по `interactive`: кнопка только там, где есть что нажимать.
-->
<template>
  <component
    :is="tag"
    class="avanti-commission-method-note"
    :class="modifierClasses"
    :type="buttonType"
    :aria-label="ariaLabel"
    @click="handleClick"
  >
    <span class="avanti-commission-method-note__mark" aria-hidden="true">{{ glyph }}</span>
    <span class="avanti-commission-method-note__text">{{ text }}</span>
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'

/** Заливка плашки: светло-бирюзовая или белая. */
type NoteTone = 'soft' | 'plain'

/** Сторона, с которой стоит круглый знак. */
type NoteMarkSide = 'start' | 'end'

const props = withDefaults(
  defineProps<{
    /** Подпись плашки. */
    text: string
    /** Символ внутри круга: «?» у способа оплаты, «!» у напоминания. */
    glyph?: string
    /** Где стоит круг относительно подписи. */
    markSide?: NoteMarkSide
    /** Заливка плашки. */
    tone?: NoteTone
    /** Плашка нажимается и сообщает об этом наружу событием `activate`. */
    interactive?: boolean
    /** Доступное имя кнопки; нужно только нажимаемой плашке. */
    actionLabel?: string
  }>(),
  {
    glyph: '?',
    markSide: 'end',
    tone: 'soft',
    interactive: false,
    actionLabel: undefined,
  },
)

const emit = defineEmits<{ activate: [] }>()

const tag = computed<string>(() => (props.interactive ? 'button' : 'p'))

/** У кнопки обязателен явный `type`, у абзаца атрибута быть не должно. */
const buttonType = computed<string | undefined>(() => (props.interactive ? 'button' : undefined))

/** Доступное имя нужно только кнопке: у абзаца имя — его собственный текст. */
const ariaLabel = computed<string | undefined>(() => (props.interactive ? props.actionLabel : undefined))

const modifierClasses = computed<string[]>(() => [
  `avanti-commission-method-note--${props.tone}`,
  `avanti-commission-method-note--mark-${props.markSide}`,
  ...(props.interactive ? ['avanti-commission-method-note--interactive'] : []),
])

function handleClick(): void {
  if (props.interactive) {
    emit('activate')
  }
}
</script>

<style lang="scss" scoped>
.avanti-commission-method-note {
  @include button-reset;
  @include focus-ring;
  @include inner-border(var(--avanti-color-primary));

  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 12px 16px;
  font-size: 15px;
  font-weight: var(--avanti-font-weight-semibold);
  line-height: normal;
  color: var(--avanti-color-primary);
  text-align: center;
  border-radius: var(--avanti-radius-md);
  transition: background-color var(--avanti-transition-fast);

  /* Круглый знак 20×20 с обводкой 1.5px из макета. */
  &__mark {
    @include inner-border(var(--avanti-color-primary), 1.5px);

    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    font-size: 11px;
    font-weight: var(--avanti-font-weight-regular);
    line-height: 1;
    border-radius: var(--avanti-radius-pill);
  }

  /* Знак справа от подписи: порядок меняется, разметка остаётся прежней. */
  &--mark-end &__mark {
    order: 1;
  }

  &--soft {
    background-color: var(--avanti-color-primary-soft);
  }

  &--plain {
    background-color: var(--avanti-color-surface);
  }

  /* Подсветка наведения нужна только нажимаемой плашке. */
  &--interactive {
    &.avanti-commission-method-note--soft:hover {
      background-color: var(--avanti-color-primary-surface-soft);
    }

    &.avanti-commission-method-note--plain:hover {
      background-color: var(--avanti-color-primary-soft);
    }
  }

  @include mobile {
    padding: 12px;
    font-size: 13px;
  }
}
</style>
