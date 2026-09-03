<!--
  Шапка документа: логотип Avanti по центру, название договора
  и ссылка на закон под ним (кадр Figma 22:4903).
-->
<template>
  <div class="avanti-contract-document-header">
    <AvantiLogo size="lg" tone="black" />
    <div class="avanti-contract-document-header__heading">
      <h2 class="avanti-contract-document-header__title">{{ title }}</h2>
      <p class="avanti-contract-document-header__subtitle">{{ subtitle }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import AvantiLogo from '@/components/ui/avanti_logo.vue'

defineProps<{ title: string; subtitle: string }>()
</script>

<style lang="scss" scoped>
.avanti-contract-document-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding-top: 22px;

  &__heading {
    display: flex;
    flex-direction: column;
    gap: 6px;
    align-items: center;
    width: 100%;
    padding: 28px 32px 24px;
    line-height: normal;
    text-align: center;
    background-color: var(--avanti-color-surface);
  }

  &__title {
    margin: 0;
    font-size: 16px;
    font-weight: var(--avanti-font-weight-bold);
    color: var(--avanti-color-text-strong);
  }

  &__subtitle {
    margin: 0;
    font-size: 12px;
    font-weight: var(--avanti-font-weight-regular);
    color: var(--avanti-color-text-secondary);
  }

  @include mobile {
    padding-top: 20px;

    &__heading {
      padding: 20px 16px;
    }

    &__title {
      font-size: 14px;
    }

    &__subtitle {
      font-size: 11px;
    }
  }
}
</style>
