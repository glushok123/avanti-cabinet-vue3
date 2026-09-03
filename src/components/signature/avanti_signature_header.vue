<!--
  Шапка панели подписания (Figma 1:2557): логотип Avanti, малая надпись
  «Firma elettronica», заголовок прописными и пояснение под ним.
  Кнопки закрытия здесь нет — её рисует оболочка модального окна.
-->
<template>
  <header class="avanti-signature-header">
    <AvantiLogo class="avanti-signature-header__logo" size="lg" />
    <div class="avanti-signature-header__texts">
      <p class="avanti-signature-header__eyebrow">{{ content.eyebrow }}</p>
      <h2 :id="titleId" class="avanti-signature-header__title">{{ content.title }}</h2>
      <p class="avanti-signature-header__description">{{ content.description }}</p>
    </div>
  </header>
</template>

<script setup lang="ts">
import AvantiLogo from '@/components/ui/avanti_logo.vue'
import type { AvantiSignatureHeaderContent } from '@/types/avanti_signature'

defineProps<{
  content: AvantiSignatureHeaderContent
  /** Идентификатор заголовка: оболочка ссылается на него через aria-labelledby. */
  titleId?: string
}>()
</script>

<style lang="scss" scoped>
.avanti-signature-header {
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: center;
  width: 100%;

  &__logo {
    flex-shrink: 0;
  }

  &__texts {
    display: flex;
    flex-direction: column;
    gap: 8px;
    align-items: center;
    width: 100%;
  }

  /* Надпись и пояснение набраны альтернативной гарнитурой макета (Geist). */
  &__eyebrow,
  &__description {
    font-family: var(--avanti-font-family-alt);
    font-size: 14px;
    font-weight: var(--avanti-font-weight-regular);
    line-height: 20px;
    color: var(--avanti-color-text-secondary);
    text-align: center;
  }

  &__title {
    font-size: 26px;
    font-weight: var(--avanti-font-weight-semibold);
    line-height: 1;
    color: var(--avanti-color-text-heading-strong);
    text-align: center;
    text-transform: uppercase;
    letter-spacing: -0.6px;
  }

  /* Мобильного макета этого экрана в Figma нет: шкала взята из мобильной
     симуляции кредита — заголовок 20px, вспомогательный текст 13px. */
  @include mobile {
    gap: 16px;

    &__eyebrow,
    &__description {
      font-size: 13px;
      line-height: 18px;
    }

    &__title {
      font-size: 20px;
      letter-spacing: -0.4px;
    }
  }
}
</style>
