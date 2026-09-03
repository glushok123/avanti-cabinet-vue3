<!--
  Строка карточки «Sicurezza»: пояснение слева, контурная кнопка справа
  (смена пароля, смена почты).
-->
<template>
  <div class="avanti-auth-security-row">
    <p class="avanti-auth-security-row__description">{{ description }}</p>
    <AvantiButton class="avanti-auth-security-row__action" variant="outline" @click="handleClick">
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

const emit = defineEmits<{ action: [] }>()

function handleClick(): void {
  emit('action')
}
</script>

<style lang="scss" scoped>
.avanti-auth-security-row {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: flex-start;
  width: 100%;
  padding: 16px 0;

  &__description {
    font-size: 13px;
    font-weight: var(--avanti-font-weight-regular);
    line-height: normal;
    color: var(--avanti-color-text-secondary);
  }

  & &__action {
    width: 100%;
    height: 36px;
    padding: 8px 16px;
    font-size: 13px;
    font-weight: var(--avanti-font-weight-semibold);
    border-width: 1.5px;
    border-radius: var(--avanti-radius-sm);
  }

  @include desktop-up {
    flex-direction: row;
    gap: 16px;
    align-items: center;
    justify-content: space-between;

    &__description {
      max-width: 400px;
    }

    & &__action {
      flex-shrink: 0;
      width: 148px;
    }
  }
}
</style>
