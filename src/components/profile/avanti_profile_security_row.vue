<!--
  Строка карточки безопасности: пояснение и кнопка перехода к нужной форме.
  На десктопе они стоят в ряд (описание слева, кнопка 148px справа),
  на мобильной — друг под другом, кнопка во всю ширину.
-->
<template>
  <div class="avanti-profile-security-row">
    <p class="avanti-profile-security-row__description">{{ description }}</p>
    <AvantiButton class="avanti-profile-security-row__action" variant="outline" @click="handleClick">
      {{ actionLabel }}
    </AvantiButton>
  </div>
</template>

<script setup lang="ts">
import AvantiButton from '@/components/ui/avanti_button.vue'

defineProps<{
  description: string
  actionLabel: string
}>()

/** Нажатие кнопки: маршрут подключается на этапе интеграции. */
const emit = defineEmits<{ action: [] }>()

function handleClick(): void {
  emit('action')
}
</script>

<style lang="scss" scoped>
.avanti-profile-security-row {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-start;
  width: 100%;

  &__description {
    font-size: 13px;
    font-weight: var(--avanti-font-weight-regular);
    line-height: normal;
    color: var(--avanti-color-text-secondary);
  }

  /* Подпись кнопки в макете мельче базовой, обводка та же (1.5px). */
  &__action.avanti-button {
    height: auto;
    padding: 12px 16px;
    font-size: 13px;
    font-weight: var(--avanti-font-weight-semibold);
    background-color: var(--avanti-color-surface);
  }

  @include desktop-up {
    flex-direction: row;
    gap: 24px;
    align-items: center;
    justify-content: space-between;
    padding: 16px 0;

    /* Ширина колонки описания зафиксирована кадром Figma. */
    &__description {
      width: 400px;
    }

    /* Габариты кнопки зафиксированы кадром Figma (148×36). */
    &__action.avanti-button {
      flex-shrink: 0;
      width: 148px;
      height: 36px;
      padding: 8px 16px;
      border-width: 1.5px;
    }
  }
}
</style>
