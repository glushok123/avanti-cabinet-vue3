<!--
  Блок подтверждения почты внутри карточки безопасности: бирюзовая подложка,
  круглая подсказка «?», статусный бейдж и кнопка отправки кода.

  Бейдж набран белым по фирменному цвету, поэтому базовый avanti_badge
  (заливка фирменным или полупрозрачным белым) здесь не подходит.
-->
<template>
  <div class="avanti-profile-verification-block">
    <div class="avanti-profile-verification-block__head">
      <div class="avanti-profile-verification-block__label">
        <span class="avanti-profile-verification-block__hint" :title="content.hintLabel">
          <span class="avanti-profile-verification-block__hint-mark" aria-hidden="true">?</span>
          <span class="avanti-profile-verification-block__hint-text">{{ content.hintLabel }}</span>
        </span>
        <h3 class="avanti-profile-verification-block__title">{{ content.title }}</h3>
      </div>
      <span class="avanti-profile-verification-block__status">{{ content.statusLabel }}</span>
    </div>
    <div class="avanti-profile-verification-block__body">
      <p class="avanti-profile-verification-block__description">{{ content.description }}</p>
      <AvantiButton class="avanti-profile-verification-block__action" @click="handleClick">
        {{ content.actionLabel }}
      </AvantiButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import AvantiButton from '@/components/ui/avanti_button.vue'
import type { AvantiProfileVerificationContent } from '@/types/avanti_profile'

defineProps<{ content: AvantiProfileVerificationContent }>()

/** Отправка кода подтверждения: обработчик подключается на этапе интеграции. */
const emit = defineEmits<{ verify: [] }>()

function handleClick(): void {
  emit('verify')
}
</script>

<style lang="scss" scoped>
.avanti-profile-verification-block {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: flex-start;
  width: 100%;
  padding: 14px;
  background-color: var(--avanti-color-primary-soft);

  /* Значение из макета, отдельного токена радиуса на 10px нет. */
  border-radius: 10px;

  &__head {
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  &__label {
    display: flex;
    gap: 6px;
    align-items: center;
  }

  &__hint {
    @include inner-border(var(--avanti-color-primary));

    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    background-color: var(--avanti-color-surface);
    border-radius: var(--avanti-radius-round);
  }

  &__hint-mark {
    font-size: 11px;
    font-weight: var(--avanti-font-weight-bold);
    line-height: normal;
    color: var(--avanti-color-primary);
  }

  /* Подпись подсказки видна только скринридерам: в макете стоит один знак «?». */
  &__hint-text {
    @include visually-hidden;
  }

  &__title {
    font-size: 13px;
    font-weight: var(--avanti-font-weight-semibold);
    line-height: normal;
    color: var(--avanti-color-text-strong);
  }

  &__status {
    flex-shrink: 0;
    padding: 3px 10px;
    font-size: 11px;
    font-weight: var(--avanti-font-weight-semibold);
    line-height: normal;
    color: var(--avanti-color-primary);
    white-space: nowrap;
    background-color: var(--avanti-color-surface);
    border-radius: var(--avanti-radius-md);
  }

  &__body {
    display: flex;
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
    width: 100%;
  }

  &__description {
    font-size: 13px;
    font-weight: var(--avanti-font-weight-regular);
    line-height: normal;
    color: var(--avanti-color-text-secondary);
  }

  &__action.avanti-button {
    height: auto;
    padding: 10px 20px;
    font-size: 13px;
    font-weight: var(--avanti-font-weight-semibold);
  }

  @include desktop-up {
    gap: 10px;
    padding: 16px;

    /* На десктопе бейдж стоит сразу за подписью, а не у правого края. */
    &__head {
      justify-content: flex-start;
    }

    &__hint {
      box-shadow: none;
    }

    &__body {
      flex-direction: row;
      gap: 24px;
      align-items: center;
      justify-content: space-between;
    }

    /* Ширины колонки и кнопки зафиксированы кадром Figma (400 и 132×36). */
    &__description {
      width: 400px;
    }

    &__action.avanti-button {
      flex-shrink: 0;
      width: 132px;
      height: 36px;
      padding: 8px 20px;
    }
  }
}
</style>
