<!--
  Модальное предупреждение кабинета (кадры 258:17494 — десктоп 702×312,
  232:15652 — мобильная 320×350): треугольник с восклицательным знаком,
  бейдж, заголовок, плашка с сообщением и кнопка действия.

  Оболочка — общее модальное окно в варианте `bare`: подложку, скругление,
  поля и тень рисует сама карточка, крестик у неё свой.
  Разметка кадров совпадает целиком, отличается только ширина окна.
-->
<template>
  <AvantiModal
    :open="open"
    variant="bare"
    :closable="false"
    :label="title"
    @update:open="emit('update:open', $event)"
  >
    <section class="avanti-dashboard-warning-modal">
      <div class="avanti-dashboard-warning-modal__header">
        <span class="avanti-dashboard-warning-modal__icon">
          <AvantiIconAlertTriangle />
        </span>
        <AvantiModalCloseButton :label="closeLabel" @click="close">
          <AvantiIconCloseCircle />
        </AvantiModalCloseButton>
      </div>

      <div class="avanti-dashboard-warning-modal__titles">
        <AvantiBadge class="avanti-dashboard-warning-modal__badge" tone="soft" uppercase>
          {{ badge }}
        </AvantiBadge>
        <h2 class="avanti-dashboard-warning-modal__title">{{ title }}</h2>
      </div>

      <p class="avanti-dashboard-warning-modal__message">{{ message }}</p>

      <AvantiButton class="avanti-dashboard-warning-modal__action" size="md" @click="close">
        {{ actionLabel }}
      </AvantiButton>
    </section>
  </AvantiModal>
</template>

<script setup lang="ts">
import AvantiModal from '@/components/ui/avanti_modal.vue'
import AvantiModalCloseButton from '@/components/ui/avanti_modal_close_button.vue'
import AvantiBadge from '@/components/ui/avanti_badge.vue'
import AvantiButton from '@/components/ui/avanti_button.vue'
import AvantiIconAlertTriangle from '@/components/icons/avanti_icon_alert_triangle.vue'
import AvantiIconCloseCircle from '@/components/icons/avanti_icon_close_circle.vue'
import type { AvantiDashboardWarningContent } from '@/types/avanti_dashboard'

interface Props extends AvantiDashboardWarningContent {
  /** Окно открыто. Работает как `v-model:open`. */
  open: boolean
}

defineProps<Props>()

const emit = defineEmits<{ 'update:open': [value: boolean] }>()

function close(): void {
  emit('update:open', false)
}
</script>

<style lang="scss" scoped>
.avanti-dashboard-warning-modal {
  display: flex;
  flex-direction: column;
  gap: 20px;

  /* Габариты кадра 232:15652: 320px, поля 24px, скругление 24px. */

  /* Ширина задаётся здесь: оболочка окна в варианте `bare` её не держит.
     `width: 100%` обязателен — при `margin-inline: auto` флекс-контейнер
     окна перестаёт растягивать карточку, и она сжимается по содержимому. */
  width: 100%;
  max-width: 320px;
  padding: 24px;
  margin-inline: auto;
  background-color: var(--avanti-color-surface);
  border-radius: var(--avanti-radius-4xl);
  box-shadow: var(--avanti-shadow-notice-modal);

  &__header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }

  /* Красная плашка 48×48 со скруглением 14px и глифом 22×20. */
  &__icon {
    @include inner-border(var(--avanti-color-border-notice));

    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    color: var(--avanti-color-danger-dark);
    background-color: var(--avanti-color-surface-danger-soft);
    border-radius: var(--avanti-radius-lg);
  }

  &__icon :deep(svg) {
    width: 22px;
    height: 20px;
  }

  &__titles {
    display: flex;
    flex-direction: column;
    gap: 8px;
    align-items: flex-start;
  }

  /*
   * Бейдж в кадре не «пилюля», а прямоугольник со скруглением 6px и полями
   * 4/10; кегль и цвет совпадают с тоном `soft` общего бейджа.
   */
  & &__badge {
    padding: 4px 10px;
    font-family: var(--avanti-font-family-base);
    font-size: 11px;
    font-weight: var(--avanti-font-weight-bold);

    /* Высота бейджа в кадре 21px: 4 + 13 + 4. */
    line-height: 13px;
    letter-spacing: normal;
    border-radius: 6px;
  }

  &__title {
    font-size: 24px;
    font-weight: var(--avanti-font-weight-extrabold);
    line-height: 28px;
    color: var(--avanti-color-primary);
  }

  /* Плашка сообщения: заливка primary-soft, обводка на тон светлее. */
  &__message {
    @include inner-border(var(--avanti-color-border-info));

    padding: 16px;
    font-size: 13px;
    font-weight: var(--avanti-font-weight-medium);
    line-height: 19px;
    color: var(--avanti-color-text-notice);
    background-color: var(--avanti-color-primary-soft);
    border-radius: var(--avanti-radius-xl);
  }

  /* Кнопка в кадре с градиентной заливкой, 48px, надпись 15px жирная. */
  & &__action {
    height: 48px;
    font-size: 15px;
    font-weight: var(--avanti-font-weight-bold);
    background-image: var(--avanti-gradient-primary);
    border-radius: var(--avanti-radius-sm);
  }

  @include desktop-up {
    /* Ширина окна на десктопе — 702px из кадра 258:17494. */
    max-width: 702px;
  }
}
</style>
