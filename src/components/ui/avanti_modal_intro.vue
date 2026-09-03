<!--
  Подпись брендового модального окна: заголовок прописными и пояснение
  под ним, обе строки по центру.

  Два размера из макета:
  * `sm` — окна авторизации (кадры 0:1235 и 0:1338): заголовок 18/26px,
    пояснение 11px на мобильной и 14px вторым шрифтом на десктопе;
  * `md` — окна настроек аккаунта (кадры 1:2773, 1:2997, 1:3226):
    заголовок 20/26px, пояснение 14/16px.

  Пояснение приходит массивом строк: в макете оно разбито переносами
  вручную, а не по ширине контейнера.
-->
<template>
  <div class="avanti-modal-intro" :class="sizeClass">
    <h2 class="avanti-modal-intro__title">{{ title }}</h2>
    <p v-if="lines.length > 0" class="avanti-modal-intro__description">
      <span v-for="line in lines" :key="line" class="avanti-modal-intro__line">{{ line }}</span>
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type ModalIntroSize = 'sm' | 'md'

const props = withDefaults(
  defineProps<{
    title: string
    /** Пояснение под заголовком: каждая строка — отдельный перенос из макета. */
    lines?: string[]
    size?: ModalIntroSize
  }>(),
  {
    lines: () => [],
    size: 'md',
  },
)

const sizeClass = computed(() => `avanti-modal-intro--${props.size}`)
</script>

<style lang="scss" scoped>
.avanti-modal-intro {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  text-align: center;

  &__title {
    font-weight: var(--avanti-font-weight-semibold);
    color: var(--avanti-color-text-heading-strong);
    text-transform: uppercase;
  }

  &__description {
    color: var(--avanti-color-text-secondary);
  }

  /* Строки пояснения разбиты так же, как в макете. */
  &__line {
    display: block;
  }

  /* --- Окна авторизации --- */
  &--sm {
    gap: 6px;
  }

  &--sm &__title {
    font-size: 18px;
    line-height: 22px;
    letter-spacing: -0.3px;
  }

  &--sm &__description {
    font-size: 11px;
    font-weight: var(--avanti-font-weight-medium);
    line-height: normal;
  }

  /* --- Окна настроек аккаунта --- */
  &--md {
    gap: 8px;
  }

  &--md &__title {
    font-size: 20px;
    line-height: 1.2;
    letter-spacing: -0.5px;
  }

  &--md &__description {
    font-size: 14px;
    font-weight: var(--avanti-font-weight-regular);
    line-height: 20px;
  }

  @include desktop-up {
    &--sm {
      gap: 8px;
    }

    &--sm &__title,
    &--md &__title {
      font-size: 26px;
      line-height: 1;
      letter-spacing: -0.6px;
    }

    &--sm &__description {
      font-family: var(--avanti-font-family-alt);
      font-size: 14px;
      font-weight: var(--avanti-font-weight-regular);
      line-height: 20px;
    }

    &--md &__description {
      font-size: 16px;
    }
  }
}
</style>
