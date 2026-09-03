<!--
  Строка карточки безопасности: пояснение и контурная кнопка перехода
  к нужной форме (смена пароля, смена почты).
  На десктопе они стоят в ряд (описание слева, кнопка 148×36 справа),
  на мобильной — друг под другом, кнопка во всю ширину.

  Один примитив на обе карточки макета; отступы и габариты кнопки на
  мобильной в кадрах разные, поэтому они разведены пропом `variant`:
  `default` — карточка «Sicurezza» экрана подтверждения почты
             (поля 16px сверху и снизу, зазор 12px, кнопка ровно 36px),
  `compact` — карточка безопасности страницы профиля
             (без полей на мобильной, зазор 10px, кнопка по содержимому).
-->
<template>
  <div class="avanti-security-row" :class="variantClass">
    <p class="avanti-security-row__description">{{ description }}</p>
    <AvantiButton class="avanti-security-row__action" variant="outline" @click="handleClick">
      {{ actionLabel }}
    </AvantiButton>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import AvantiButton from '@/components/ui/avanti_button.vue'

/** Набор отступов строки: подобран под кадры, а не под абстрактную шкалу. */
type AvantiSecurityRowVariant = 'default' | 'compact'

const props = withDefaults(
  defineProps<{
    description: string
    actionLabel: string
    variant?: AvantiSecurityRowVariant
  }>(),
  {
    variant: 'default',
  },
)

/** Нажатие кнопки: маршрут подключается на этапе интеграции. */
const emit = defineEmits<{ action: [] }>()

const variantClass = computed<string>(() => `avanti-security-row--${props.variant}`)

function handleClick(): void {
  emit('action')
}
</script>

<style lang="scss" scoped>
.avanti-security-row {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;

  &__description {
    font-size: 13px;
    font-weight: var(--avanti-font-weight-regular);
    line-height: normal;
    color: var(--avanti-color-text-secondary);
  }

  /* --- default: карточка «Sicurezza» экрана подтверждения почты --- */
  &--default {
    gap: 12px;
    padding: 16px 0;
  }

  &--default &__action {
    width: 100%;
    height: 36px;
    padding: 8px 16px;
    font-size: 13px;
    font-weight: var(--avanti-font-weight-semibold);
    border-width: 1.5px;
    border-radius: var(--avanti-radius-sm);
  }

  /* --- compact: карточка безопасности страницы профиля --- */
  &--compact {
    gap: 10px;
  }

  /* Подпись кнопки в макете мельче базовой, обводка та же (1.5px). */
  &--compact &__action.avanti-button {
    height: auto;
    padding: 12px 16px;
    font-size: 13px;
    font-weight: var(--avanti-font-weight-semibold);
    background-color: var(--avanti-color-surface);
  }

  @include desktop-up {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    &--default {
      gap: 16px;
    }

    &--default &__description {
      max-width: 400px;
    }

    &--default &__action {
      flex-shrink: 0;
      width: 148px;
    }

    &--compact {
      gap: 24px;
      padding: 16px 0;
    }

    /* Ширина колонки описания зафиксирована кадром Figma. */
    &--compact &__description {
      width: 400px;
    }

    /* Габариты кнопки зафиксированы кадром Figma (148×36). */
    &--compact &__action.avanti-button {
      flex-shrink: 0;
      width: 148px;
      height: 36px;
      padding: 8px 16px;
      border-width: 1.5px;
    }
  }
}
</style>
