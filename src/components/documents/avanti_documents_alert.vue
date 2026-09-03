<!--
  Узкая плашка ошибки под списком файлов (Figma 95:5423):
  круглая иконка с восклицательным знаком и пояснение красным.
  РАСХОЖДЕНИЕ: фон плашки в макете #fff6f6, такого токена в палитре нет —
  используется белая поверхность (см. README, раздел «Расхождения в макете»).
-->
<template>
  <p class="avanti-documents-alert" role="alert">
    <span class="avanti-documents-alert__icon">
      <AvantiDocumentsIconError />
    </span>
    <span class="avanti-documents-alert__text">{{ text }}</span>
  </p>
</template>

<script setup lang="ts">
import AvantiDocumentsIconError from '@/components/documents/avanti_documents_icon_error.vue'

defineProps<{ text: string }>()
</script>

<style lang="scss" scoped>
.avanti-documents-alert {
  @include inner-border(var(--avanti-color-danger-dark));

  display: flex;
  gap: 14px;
  align-items: center;
  width: 100%;
  padding: 14px 16px;
  margin: 0;
  background-color: var(--avanti-color-surface);
  border-radius: var(--avanti-radius-md);

  &__icon {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    color: var(--avanti-color-danger-dark);
  }

  &__text {
    flex: 1 1 0;
    min-width: 0;
    font-size: 13px;
    font-weight: var(--avanti-font-weight-regular);
    line-height: normal;
    color: var(--avanti-color-danger-dark);
  }
}
</style>
