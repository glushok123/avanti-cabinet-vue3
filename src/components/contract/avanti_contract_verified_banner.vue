<!--
  Баннер «документ проверен» над карточкой подписания (кадр Figma 22:4872):
  бирюзовая плашка с галочкой, пояснением и контурной кнопкой профиля.
-->
<template>
  <div class="avanti-contract-verified-banner">
    <div class="avanti-contract-verified-banner__content">
      <span class="avanti-contract-verified-banner__icon">
        <AvantiIconCheck />
      </span>
      <p class="avanti-contract-verified-banner__text">{{ banner.text }}</p>
    </div>
    <button class="avanti-contract-verified-banner__action" type="button">
      {{ banner.actionLabel }}
    </button>
  </div>
</template>

<script setup lang="ts">
import AvantiIconCheck from '@/components/icons/avanti_icon_check.vue'
import type { AvantiContractVerifiedBanner } from '@/types/avanti_contract'

defineProps<{ banner: AvantiContractVerifiedBanner }>()
</script>

<style lang="scss" scoped>
.avanti-contract-verified-banner {
  display: flex;
  gap: 16px;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 16px 20px;
  background-color: var(--avanti-color-primary-soft);
  border-radius: var(--avanti-radius-md);

  &__content {
    display: flex;
    flex: 1 1 0;
    gap: 10px;
    align-items: center;
    min-width: 0;
  }

  /* Круг под галочкой в макете совпадает по цвету с фоном баннера:
     видна только сама галочка, но размер круга задаёт отступ. */
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

  &__text {
    flex: 1 1 0;
    min-width: 0;
    margin: 0;
    font-size: 13px;
    font-weight: var(--avanti-font-weight-medium);
    line-height: normal;
    color: var(--avanti-color-primary);
  }

  &__action {
    @include button-reset;
    @include focus-ring;
    @include inner-border(var(--avanti-color-primary));

    flex-shrink: 0;
    padding: 8px 16px;
    font-size: 13px;
    font-weight: var(--avanti-font-weight-semibold);
    line-height: normal;
    color: var(--avanti-color-primary);
    white-space: nowrap;
    border-radius: var(--avanti-radius-sm);
    transition: background-color var(--avanti-transition-base);

    &:hover {
      background-color: var(--avanti-color-surface);
    }
  }

  @include mobile {
    flex-direction: column;
    gap: 12px;
    align-items: stretch;

    &__action {
      width: 100%;
    }
  }
}
</style>
