<!--
  Полоса загрузки экрана ожидания: счётчик ответивших банков,
  трек с заливкой и подпись «ещё несколько секунд».

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
    <p class="avanti-onboarding-progress-bar__hint">{{ hint }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  /** Сколько банков уже ответило. */
  done: number
  /** Сколько банков в проверке всего. */
  total: number
  /** Подпись под полосой. */
  hint: string
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
  gap: 8px;
  width: 100%;
  min-width: 0;

  &__counter {
    font-size: 14px;
    font-weight: var(--avanti-font-weight-semibold);
    line-height: normal;
    color: var(--avanti-color-text-black);
    text-transform: uppercase;
  }

  /* Обёртка нужна ради блика: он перекрывает трек целиком. */
  &__track {
    position: relative;
    width: 100%;
    height: 6px;
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
    letter-spacing: 0.52px;
  }

  @include desktop-up {
    gap: 10px;

    .avanti-onboarding-progress-bar__counter {
      font-size: 20px;
    }

    .avanti-onboarding-progress-bar__track {
      height: 8px;
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
