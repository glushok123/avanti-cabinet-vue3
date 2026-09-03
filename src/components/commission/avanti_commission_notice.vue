<!--
  Поясняющая плашка шага «2. COMMISSIONE» (кадр «Информационный блок»,
  Figma 246:7009 / 232:17741): круглый знак «?» и абзац с выделенным
  фрагментом «non è detraibile».

  Знак «?» — настоящая кнопка: в макете рядом с этим экраном нарисовано окно
  «Информация» (246:7151), поэтому нажатие уходит наружу событием `info`,
  а показывать окно решает мастер.
-->
<template>
  <div class="avanti-commission-notice">
    <button
      class="avanti-commission-notice__action"
      type="button"
      :aria-label="text.actionLabel"
      @click="emit('info')"
    >
      <span class="avanti-commission-notice__mark" aria-hidden="true">?</span>
    </button>
    <p class="avanti-commission-notice__text">
      {{ text.lead }}<strong class="avanti-commission-notice__accent">{{ text.accent }}</strong
      >{{ text.tail }}
    </p>
  </div>
</template>

<script setup lang="ts">
import type { AvantiCommissionNoticeText } from '@/types/avanti_commission'

defineProps<{
  /** Три части поясняющего абзаца и доступное имя кнопки «?». */
  text: AvantiCommissionNoticeText
}>()

const emit = defineEmits<{ info: [] }>()
</script>

<style lang="scss" scoped>
.avanti-commission-notice {
  @include inner-border(var(--avanti-color-primary));

  display: flex;
  gap: 10px;
  align-items: center;
  padding: 12px;
  background-color: var(--avanti-color-surface-neutral);
  border-radius: var(--avanti-radius-md);

  /* Круглая кнопка со знаком вопроса: обводка 1.5px из макета. */
  &__action {
    @include button-reset;
    @include focus-ring;
    @include inner-border(var(--avanti-color-primary), 1.5px);

    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    color: var(--avanti-color-primary);
    border-radius: var(--avanti-radius-pill);
    transition:
      color var(--avanti-transition-fast),
      background-color var(--avanti-transition-fast);

    &:hover {
      color: var(--avanti-color-text-on-primary);
      background-color: var(--avanti-color-primary);
    }
  }

  &__mark {
    font-size: 11px;
    font-weight: var(--avanti-font-weight-bold);
    line-height: 1;
  }

  &__text {
    font-size: 10px;
    font-weight: var(--avanti-font-weight-regular);
    line-height: normal;
    color: var(--avanti-color-text-secondary);
  }

  &__accent {
    font-weight: var(--avanti-font-weight-bold);
    color: var(--avanti-color-text-strong);
  }

  @include desktop-up {
    padding: 14px;

    &__text {
      font-size: 13px;
      line-height: 18px;
    }
  }
}
</style>
