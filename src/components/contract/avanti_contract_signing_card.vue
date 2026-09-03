<!--
  Карточка подписания договора (кадр Figma 22:4880): слева иконка замка,
  название документа и кнопка «Apri PDF», справа бейдж IBAN и кнопка подписи.
  Под телом карточки проходит разделитель на всю ширину — как в макете.
-->
<template>
  <section class="avanti-contract-signing-card">
    <div class="avanti-contract-signing-card__body">
      <div class="avanti-contract-signing-card__main">
        <div class="avanti-contract-signing-card__heading">
          <span class="avanti-contract-signing-card__lock">
            <AvantiIconLock />
          </span>
          <span class="avanti-contract-signing-card__titles">
            <span class="avanti-contract-signing-card__eyebrow">{{ card.eyebrow }}</span>
            <span class="avanti-contract-signing-card__title">{{ card.title }}</span>
          </span>
        </div>
        <button class="avanti-contract-signing-card__pdf" type="button">
          <span class="avanti-contract-signing-card__pdf-icon">
            <AvantiIconDocuments />
          </span>
          {{ card.pdfLabel }}
        </button>
      </div>
      <div class="avanti-contract-signing-card__aside">
        <span class="avanti-contract-signing-card__badge">
          <span class="avanti-contract-signing-card__badge-icon">
            <AvantiIconLock />
          </span>
          {{ card.badgeLabel }}
        </span>
        <button class="avanti-contract-signing-card__action" type="button">
          {{ card.actionLabel }}
        </button>
      </div>
    </div>
    <span class="avanti-contract-signing-card__divider" />
  </section>
</template>

<script setup lang="ts">
import AvantiIconDocuments from '@/components/icons/avanti_icon_documents.vue'
import AvantiIconLock from '@/components/icons/avanti_icon_lock.vue'
import type { AvantiContractSigningCard } from '@/types/avanti_contract'

defineProps<{ card: AvantiContractSigningCard }>()
</script>

<style lang="scss" scoped>
.avanti-contract-signing-card {
  @include inner-border(var(--avanti-color-border));

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  overflow: hidden;
  background-color: var(--avanti-color-surface);
  border-radius: var(--avanti-radius-xl);

  &__body {
    display: flex;
    gap: 16px;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 24px;
  }

  &__main {
    display: flex;
    flex: 1 1 0;
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
    min-width: 0;
  }

  &__heading {
    display: flex;
    gap: 12px;
    align-items: center;
  }

  &__lock {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    color: var(--avanti-color-primary);
    background-color: var(--avanti-color-primary-soft);
    border-radius: var(--avanti-radius-round);

    svg {
      width: 20px;
      height: 20px;
    }
  }

  &__titles {
    display: flex;
    flex-direction: column;
    gap: 2px;
    align-items: flex-start;
    font-weight: var(--avanti-font-weight-bold);
    line-height: normal;
  }

  &__eyebrow {
    font-size: 10px;
    color: var(--avanti-color-primary);
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  &__title {
    font-size: 16px;
    color: var(--avanti-color-text-strong);
  }

  &__pdf {
    @include button-reset;
    @include focus-ring;
    @include inner-border(var(--avanti-color-border));

    display: inline-flex;
    gap: 8px;
    align-items: center;
    padding: 8px 16px;
    font-size: 13px;
    font-weight: var(--avanti-font-weight-regular);
    line-height: normal;
    color: var(--avanti-color-text-strong);
    background-color: var(--avanti-color-surface);
    border-radius: var(--avanti-radius-sm);
  }

  &__pdf-icon {
    display: flex;
    flex-shrink: 0;
    width: 16px;
    height: 16px;
  }

  &__aside {
    display: flex;
    flex-shrink: 0;
    flex-direction: column;
    gap: 12px;
    align-items: flex-end;
  }

  &__badge {
    display: inline-flex;
    gap: 6px;
    align-items: center;
    padding: 6px 12px;
    font-size: 12px;
    font-weight: var(--avanti-font-weight-semibold);
    line-height: normal;
    color: var(--avanti-color-primary);
    background-color: var(--avanti-color-primary-soft);
    border-radius: var(--avanti-radius-md);
  }

  &__badge-icon {
    display: flex;
    flex-shrink: 0;
    width: 12px;
    height: 12px;
  }

  &__action {
    @include button-reset;
    @include focus-ring;

    padding: 12px 24px;
    font-size: 14px;
    font-weight: var(--avanti-font-weight-bold);
    line-height: normal;
    color: var(--avanti-color-text-on-primary);
    background-color: var(--avanti-color-primary);
    border-radius: var(--avanti-radius-md);
    transition: background-color var(--avanti-transition-base);

    &:hover {
      background-color: var(--avanti-color-primary-dark);
    }
  }

  &__divider {
    width: 100%;
    height: 1px;
    background-color: var(--avanti-color-divider);
  }

  @include mobile {
    &__body {
      flex-direction: column;
      align-items: stretch;
      padding: 16px;
    }

    &__aside {
      align-items: stretch;
    }

    &__badge {
      align-self: flex-start;
    }

    &__action {
      width: 100%;
    }
  }
}
</style>
