<!--
  Вариант требуемого документа (Figma 95:3879 / 95:4917): иконка, название
  с пояснением и отметка выбора. Нативный radio скрыт визуально, но остаётся
  доступным с клавиатуры — отметку рисует span.
-->
<template>
  <label class="avanti-documents-option" :class="{ 'avanti-documents-option--selected': selected }">
    <input
      class="avanti-documents-option__input"
      type="radio"
      :name="name"
      :value="option.id"
      :checked="selected"
      :disabled="disabled"
      @change="handleChange"
    />
    <span class="avanti-documents-option__icon">
      <component :is="iconComponent" />
    </span>
    <span class="avanti-documents-option__text">
      <span class="avanti-documents-option__title">{{ option.title }}</span>
      <span class="avanti-documents-option__hint">{{ option.hint }}</span>
    </span>
    <span class="avanti-documents-option__mark" />
  </label>
</template>

<script setup lang="ts">
import { computed, type Component } from 'vue'
import AvantiDocumentsIconCard from '@/components/documents/avanti_documents_icon_card.vue'
import AvantiDocumentsIconPassport from '@/components/documents/avanti_documents_icon_passport.vue'
import AvantiIconDocuments from '@/components/icons/avanti_icon_documents.vue'
import type { AvantiDocumentOption, AvantiDocumentOptionIcon } from '@/types/avanti_documents'

const props = defineProps<{
  option: AvantiDocumentOption
  /** Общее имя группы переключателей. */
  name: string
  selected?: boolean
  disabled?: boolean
}>()

const emit = defineEmits<{ select: [id: string] }>()

/** Соответствие имени иконки из данных и компонента, который её рисует. */
const ICONS: Record<AvantiDocumentOptionIcon, Component> = {
  passport: AvantiDocumentsIconPassport,
  card: AvantiDocumentsIconCard,
  file: AvantiIconDocuments,
}

const iconComponent = computed<Component>(() => ICONS[props.option.icon ?? 'file'])

function handleChange(event: Event): void {
  emit('select', (event.target as HTMLInputElement).value)
}
</script>

<style lang="scss" scoped>
/* Радиус подложки иконки и отметки — 10px, токена под это значение нет. */
$icon-radius: 10px;

.avanti-documents-option {
  @include inner-border(var(--avanti-color-primary-soft-border));

  display: flex;
  gap: 12px;
  align-items: center;
  width: 100%;
  padding: 12px;
  cursor: pointer;
  background-color: var(--avanti-color-surface);
  border-radius: var(--avanti-radius-md);
  transition:
    background-color var(--avanti-transition-fast),
    box-shadow var(--avanti-transition-fast);

  &__input {
    @include visually-hidden;
  }

  &__icon {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    color: var(--avanti-color-primary);
    background-color: var(--avanti-color-primary-soft);
    border-radius: $icon-radius;

    svg {
      width: 20px;
      height: 20px;
    }
  }

  &__text {
    display: flex;
    flex: 1 1 0;
    flex-direction: column;
    gap: 2px;
    align-items: flex-start;
    min-width: 0;
    line-height: normal;
  }

  &__title {
    font-size: 13px;
    font-weight: var(--avanti-font-weight-semibold);
    color: var(--avanti-color-text-strong);
  }

  &__hint {
    font-size: 11px;
    font-weight: var(--avanti-font-weight-regular);
    color: var(--avanti-color-text-secondary);
  }

  /* Отметка выбора: пустой кружок с обводкой, у выбранного — заливка. */
  &__mark {
    @include inner-border(var(--avanti-color-border-neutral), 2px);

    flex-shrink: 0;
    width: 20px;
    height: 20px;
    background-color: var(--avanti-color-surface);
    border-radius: $icon-radius;
  }

  /* --- Выбранный вариант --- */
  &--selected {
    @include inner-border(var(--avanti-color-primary), 1px, var(--avanti-shadow-unlock-glow-mobile));

    background-color: var(--avanti-color-primary-soft);

    .avanti-documents-option__icon {
      color: var(--avanti-color-text-on-primary);
      background-color: var(--avanti-color-primary);
    }

    .avanti-documents-option__mark {
      @include inner-border(var(--avanti-color-surface), 2px);

      background-color: var(--avanti-color-primary);
    }
  }

  /* Фокус приходит на скрытый input — рамку рисуем на всей строке. */
  &:has(&__input:focus-visible) {
    outline: 2px solid var(--avanti-color-primary);
    outline-offset: 2px;
  }

  &:has(&__input:disabled) {
    cursor: not-allowed;
    opacity: 0.5;
  }

  @include desktop-up {
    &__title {
      font-size: 15px;
    }

    &__hint {
      font-size: 13px;
    }
  }
}
</style>
