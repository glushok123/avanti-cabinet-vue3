<!--
  Статусная плашка внизу страницы (кадр Figma 22:5180): бирюзовый блок
  с подписью «Documento caricato», названием документа и галочкой.
-->
<template>
  <div class="avanti-contract-status-banner">
    <div class="avanti-contract-status-banner__text">
      <span class="avanti-contract-status-banner__caption">{{ banner.caption }}</span>
      <span class="avanti-contract-status-banner__title">{{ banner.title }}</span>
    </div>
    <span class="avanti-contract-status-banner__icon" role="img" :aria-label="banner.iconLabel">
      <AvantiIconCheck />
    </span>
  </div>
</template>

<script setup lang="ts">
import AvantiIconCheck from '@/components/icons/avanti_icon_check.vue'
import type { AvantiContractStatusBanner } from '@/types/avanti_contract'

defineProps<{ banner: AvantiContractStatusBanner }>()
</script>

<style lang="scss" scoped>
.avanti-contract-status-banner {
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 16px 20px;
  background-color: var(--avanti-color-primary-soft);
  border-radius: var(--avanti-radius-md);

  &__text {
    display: flex;
    flex: 1 1 0;
    flex-direction: column;
    gap: 4px;
    justify-content: center;
    min-width: 0;
    line-height: normal;
    color: var(--avanti-color-primary);
  }

  &__caption {
    font-size: 13px;
    font-weight: var(--avanti-font-weight-light);
  }

  &__title {
    font-size: 18px;
    font-weight: var(--avanti-font-weight-medium);
  }

  /* Круг совпадает по цвету с фоном плашки — видна только галочка. */
  &__icon {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    color: var(--avanti-color-primary);
    border-radius: var(--avanti-radius-lg);

    svg {
      width: 14px;
      height: 14px;
    }
  }

  @include mobile {
    &__title {
      font-size: 16px;
    }
  }
}
</style>
