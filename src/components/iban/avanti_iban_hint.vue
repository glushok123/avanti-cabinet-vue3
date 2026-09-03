<!--
  Подсказка под полем: круглый маркер «i» и один-два абзаца пояснения
  (кадры Figma 1:1398, 1:1553, 104:8474).

  Маркер собран стилями, а не иконкой: в макете это окружность 16px
  с фирменной обводкой и буквой внутри.
-->
<template>
  <div class="avanti-iban-hint">
    <span class="avanti-iban-hint__marker" aria-hidden="true">i</span>
    <div class="avanti-iban-hint__text">
      <p class="avanti-iban-hint__lead" :class="leadClass">{{ lead }}</p>
      <p v-if="note" class="avanti-iban-hint__note">{{ note }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    /** Первый абзац подсказки. */
    lead: string
    /** Второй абзац; в макете отделён от первого пустой строкой. */
    note?: string
    /**
     * Первый абзац выделен тёмным начертанием.
     * В макете так набран счётчик оставшихся символов.
     */
    leadStrong?: boolean
  }>(),
  { note: '', leadStrong: false },
)

const leadClass = computed(() => (props.leadStrong ? 'avanti-iban-hint__lead--strong' : ''))
</script>

<style lang="scss" scoped>
.avanti-iban-hint {
  display: flex;
  gap: 8px;
  align-items: flex-start;
  width: 100%;

  /* Окружность рисуется обводкой внутрь — диаметр остаётся ровно 16px. */
  &__marker {
    @include inner-border(var(--avanti-color-primary));

    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    font-size: 12.8px;
    font-weight: var(--avanti-font-weight-semibold);
    line-height: 1;
    color: var(--avanti-color-primary);
    border-radius: var(--avanti-radius-round);
  }

  &__text {
    flex: 1 1 0;
    min-width: 0;
    font-size: 14px;
    font-weight: var(--avanti-font-weight-light);
    line-height: normal;
    color: var(--avanti-color-text-muted);
    letter-spacing: 0.56px;
  }

  &__lead--strong {
    color: var(--avanti-color-text-black);
  }

  /* Пустая строка между абзацами — так они разделены в макете. */
  &__note {
    margin-top: 1.2em;
  }

  @include mobile {
    &__marker {
      font-size: 11px;
    }

    &__text {
      font-size: 12px;
      line-height: 16px;
      letter-spacing: normal;
    }
  }
}
</style>
