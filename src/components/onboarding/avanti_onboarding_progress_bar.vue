<!--
  Полоса загрузки экрана ожидания: счётчик ответивших банков,
  трек с заливкой и подпись «ещё несколько секунд».

  Подпись выводится только когда её передали: в десктопном кадре 0:1110 она
  лежит в колонке полосы, а в мобильном 1:4699 — во всю ширину карточки,
  поэтому там её рисует сам блок проверки.

  Заливка выведена нативным <progress>: доля задаётся атрибутами value/max,
  поэтому динамическая ширина не требует inline-стилей и полоса
  сразу озвучивается скринридером.
  Поверх трека проходит блик — единственная анимация экрана;
  при prefers-reduced-motion он отключается.
-->
<template>
  <div class="avanti-onboarding-progress-bar">
    <p class="avanti-onboarding-progress-bar__counter">{{ counter }}</p>
    <div class="avanti-onboarding-progress-bar__track">
      <progress
        class="avanti-onboarding-progress-bar__value"
        :value="done"
        :max="total"
        :aria-label="label"
      />
    </div>
    <p v-if="hint" class="avanti-onboarding-progress-bar__hint">{{ hint }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  /** Сколько банков уже ответило. */
  done: number
  /** Сколько банков в проверке всего. */
  total: number
  /** Подпись под полосой: на мобильной её рисует блок проверки. */
  hint?: string
  /** Доступное имя полосы: видимого заголовка у неё нет. */
  label: string
}>()

/** Счётчик над полосой в формате «6/12». */
const counter = computed<string>(() => `${props.done}/${props.total}`)
</script>

<style lang="scss" scoped>
.avanti-onboarding-progress-bar {
  display: flex;
  flex-direction: column;

  /* Кадр 1:4695: между счётчиком и треком 6px. */
  gap: 6px;
  width: 100%;
  min-width: 0;

  /* Кадр 1:4696: 14px Bold #333. */
  &__counter {
    font-size: 14px;
    font-weight: var(--avanti-font-weight-bold);
    line-height: normal;
    color: var(--avanti-color-text-dark);
    text-transform: uppercase;
  }

  /* Обёртка нужна ради блика: он перекрывает трек целиком. */
  &__track {
    position: relative;
    width: 100%;

    /* Кадр 1:4697: трек 8px в обеих ширинах макета. */
    height: 8px;
    overflow: hidden;
    border-radius: var(--avanti-radius-pill);
  }

  &__value {
    display: block;
    width: 100%;
    height: 100%;
    appearance: none;
    background-color: var(--avanti-color-track);
    border: none;
    border-radius: var(--avanti-radius-pill);
  }

  /* Заливка трека: у нативного <progress> она оформляется псевдоэлементами. */
  &__value::-moz-progress-bar {
    background-color: var(--avanti-color-primary);
    border-radius: var(--avanti-radius-pill);
  }

  &__value::-webkit-progress-bar {
    background-color: var(--avanti-color-track);
    border-radius: var(--avanti-radius-pill);
  }

  &__value::-webkit-progress-value {
    background-color: var(--avanti-color-primary);
    border-radius: var(--avanti-radius-pill);
  }

  /* Блик, пробегающий по треку слева направо. */
  &__track::after {
    position: absolute;
    inset: 0;
    content: '';
    background-image: linear-gradient(
      90deg,
      transparent 0%,
      var(--avanti-color-surface-translucent) 50%,
      transparent 100%
    );
    animation: avanti-onboarding-progress-sweep 1.8s ease-in-out infinite;
  }

  &__hint {
    font-size: 13px;
    font-weight: var(--avanti-font-weight-regular);
    line-height: normal;
    color: var(--avanti-color-text-muted);
  }

  @include desktop-up {
    gap: 10px;

    /* Десктопный кадр 0:1112: 20px SemiBold чёрным. */
    .avanti-onboarding-progress-bar__counter {
      font-size: 20px;
      font-weight: var(--avanti-font-weight-semibold);
      color: var(--avanti-color-text-black);
    }

    .avanti-onboarding-progress-bar__track {
      margin-bottom: 8px;
    }

    .avanti-onboarding-progress-bar__hint {
      font-size: 20px;
      letter-spacing: 0.8px;
    }
  }
}

@keyframes avanti-onboarding-progress-sweep {
  from {
    transform: translateX(-100%);
  }

  to {
    transform: translateX(100%);
  }
}

/* Пользователь просил меньше движения — блик не запускаем вовсе. */
@media (prefers-reduced-motion: reduce) {
  .avanti-onboarding-progress-bar__track::after {
    animation: none;
  }
}
</style>
