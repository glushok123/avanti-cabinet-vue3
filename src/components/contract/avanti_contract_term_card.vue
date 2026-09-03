<!--
  Карточка финансового условия (кадр Figma 22:4953): капительная подпись
  сверху и крупное значение снизу. Выделенная карточка «Rata Mensile»
  окрашена в фирменный цвет и обведена им же.
-->
<template>
  <div class="avanti-contract-term-card" :class="{ 'avanti-contract-term-card--accent': highlighted }">
    <span class="avanti-contract-term-card__label">{{ label }}</span>
    <span class="avanti-contract-term-card__value">{{ value }}</span>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ label: string; value: string; highlighted?: boolean }>(), {
  highlighted: false,
})
</script>

<style lang="scss" scoped>
.avanti-contract-term-card {
  @include inner-border(var(--avanti-color-border));

  display: flex;
  flex: 1 1 0;
  flex-direction: column;
  gap: 8px;
  align-items: flex-start;
  min-width: 0;
  padding: 16px 20px;
  font-weight: var(--avanti-font-weight-bold);
  line-height: normal;
  white-space: nowrap;
  background-color: var(--avanti-color-surface-muted);
  border-radius: var(--avanti-radius-md);

  &__label {
    font-size: 10px;
    color: var(--avanti-color-text-secondary);
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  &__value {
    font-size: 22px;
    color: var(--avanti-color-text-strong);
  }

  /* --- Выделенная карточка --- */
  &--accent {
    @include inner-border(var(--avanti-color-primary));

    background-color: var(--avanti-color-primary-soft);

    .avanti-contract-term-card__label,
    .avanti-contract-term-card__value {
      color: var(--avanti-color-primary);
    }
  }

  @include mobile {
    padding: 12px 14px;

    &__value {
      font-size: 18px;
    }
  }
}
</style>
