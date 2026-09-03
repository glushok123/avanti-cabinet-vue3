<!--
  Плашка результата проверки документа (Figma 95:7170 «Документы удача»):
  крупная иконка, заголовок, два абзаца пояснения и выделенная подпись.
  Тон `error` повторяет тот же блок в красной гамме.
-->
<template>
  <div class="avanti-documents-result" :class="toneClass">
    <span class="avanti-documents-result__icon">
      <AvantiIconCheck v-if="success" :stroke-width="2.4" />
      <AvantiDocumentsIconError v-else :stroke-width="1.4" />
    </span>
    <p class="avanti-documents-result__title">{{ result.title }}</p>
    <p class="avanti-documents-result__description">{{ result.description }}</p>
    <p v-if="result.hint" class="avanti-documents-result__hint">{{ result.hint }}</p>
    <p v-if="result.bannerText" class="avanti-documents-result__banner">{{ result.bannerText }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import AvantiDocumentsIconError from '@/components/documents/avanti_documents_icon_error.vue'
import AvantiIconCheck from '@/components/icons/avanti_icon_check.vue'
import type { AvantiDocumentsResult } from '@/types/avanti_documents'

const props = defineProps<{ result: AvantiDocumentsResult }>()

const toneClass = computed(() => `avanti-documents-result--${props.result.tone}`)
const success = computed(() => props.result.tone === 'success')
</script>

<style lang="scss" scoped>
/* Радиус выделенной подписи — 10px, токена под это значение нет. */
$banner-radius: 10px;

.avanti-documents-result {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
  width: 100%;
  padding-inline: 16px;
  text-align: center;

  &__icon {
    @include inner-border(var(--avanti-color-primary), 2px);

    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    width: 64px;
    height: 64px;
    color: var(--avanti-color-primary);
    background-color: var(--avanti-color-primary-soft);
    border-radius: var(--avanti-radius-xl);

    svg {
      width: 32px;
      height: 32px;
    }
  }

  &__title {
    margin: 0;
    font-size: 18px;
    font-weight: var(--avanti-font-weight-bold);
    line-height: normal;
    color: var(--avanti-color-text-strong);
  }

  /* Ширина абзаца в макете ограничена 286px — перенос совпадает с Figma. */
  &__description {
    max-width: 286px;
    margin: 0;
    font-size: 13px;
    font-weight: var(--avanti-font-weight-regular);
    line-height: normal;
    color: var(--avanti-color-text-note);
  }

  &__hint {
    margin: 0;
    font-size: 13px;
    font-weight: var(--avanti-font-weight-regular);
    line-height: normal;
    color: var(--avanti-color-text-note);
  }

  &__banner {
    @include inner-border(var(--avanti-color-primary));

    width: 100%;
    padding: 12px 16px;
    margin: 0;
    font-size: 13px;
    font-weight: var(--avanti-font-weight-semibold);
    line-height: normal;
    color: var(--avanti-color-primary);
    background-color: var(--avanti-color-primary-soft);
    border-radius: $banner-radius;
  }

  /* --- Красный тон: тот же блок для неудачной загрузки --- */
  &--error {
    .avanti-documents-result__icon {
      @include inner-border(var(--avanti-color-danger-dark), 2px);

      color: var(--avanti-color-danger-dark);
      background-color: var(--avanti-color-surface-muted);
    }

    .avanti-documents-result__banner {
      @include inner-border(var(--avanti-color-danger-dark));

      color: var(--avanti-color-danger-dark);
      background-color: var(--avanti-color-surface-muted);
    }
  }
}
</style>
