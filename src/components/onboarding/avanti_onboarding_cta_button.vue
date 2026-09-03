<!--
  Финальная кнопка экрана одобрения.

  От базовой `avanti_button` отличается всеми ключевыми размерами макета:
  высота 64 вместо 60, радиус 16 вместо 12, внутренние отступы 16/32,
  полужирная подпись и двойная тень. Поэтому это отдельный компонент,
  а не ещё один вариант базовой кнопки (её файл правит соседний агент).
-->
<template>
  <button class="avanti-onboarding-cta-button" type="button" @click="handleClick">
    <span class="avanti-onboarding-cta-button__label">{{ label }}</span>
    <span class="avanti-onboarding-cta-button__icon">
      <AvantiIconChevronRight />
    </span>
  </button>
</template>

<script setup lang="ts">
import AvantiIconChevronRight from '@/components/icons/avanti_icon_chevron_right.vue'

defineProps<{
  /** Подпись кнопки. */
  label: string
}>()

/*
 * Переход к следующему шагу появится на этапе интеграции с API:
 * во вёрстке страница на событие намеренно не подписана.
 */
const emit = defineEmits<{ click: [] }>()

function handleClick(): void {
  emit('click')
}
</script>

<style lang="scss" scoped>
.avanti-onboarding-cta-button {
  @include button-reset;
  @include focus-ring;

  /* Обводка рисуется внутрь: иначе кнопка шире макетных 375px на 2px. */
  @include inner-border(var(--avanti-color-surface), 1px, var(--avanti-shadow-cta));

  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 60px;
  padding: 16px 24px;
  overflow: hidden;
  color: var(--avanti-color-text-on-primary);
  background-color: var(--avanti-color-primary);
  border-radius: var(--avanti-radius-xl);
  transition: background-color var(--avanti-transition-base);

  &:hover {
    background-color: var(--avanti-color-primary-dark);
  }

  &__label {
    font-size: 18px;
    font-weight: var(--avanti-font-weight-semibold);
    line-height: normal;
    white-space: nowrap;
  }

  &__icon {
    display: flex;
    flex-shrink: 0;
    width: 24px;
    height: 24px;
  }

  @include desktop-up {
    width: auto;
    height: 64px;
    padding: 16px 32px;

    .avanti-onboarding-cta-button__label {
      font-size: 24px;
    }

    .avanti-onboarding-cta-button__icon {
      width: 16px;
      height: 16px;
    }
  }
}
</style>
