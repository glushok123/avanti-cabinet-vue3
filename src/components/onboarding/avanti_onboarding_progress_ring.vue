<!--
  Круг прогресса скоринга: серое кольцо и бирюзовая дуга с числом в центре.

  Дуга задаётся SVG-атрибутами stroke-dasharray / stroke-dashoffset —
  это презентационные атрибуты, а не inline-стили, поэтому значение
  может быть динамическим без нарушения правила о запрете :style.
  При появлении на экране дуга «дорисовывается» через CSS-переход;
  режим prefers-reduced-motion отключает его глобально в base.scss.
-->
<template>
  <div class="avanti-onboarding-progress-ring">
    <svg
      class="avanti-onboarding-progress-ring__svg"
      viewBox="0 0 66 66"
      fill="none"
      aria-hidden="true"
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        class="avanti-onboarding-progress-ring__track"
        cx="33"
        cy="33"
        :r="RADIUS"
        :stroke-width="STROKE_WIDTH"
      />
      <circle
        class="avanti-onboarding-progress-ring__arc"
        cx="33"
        cy="33"
        :r="RADIUS"
        :stroke-width="STROKE_WIDTH"
        stroke-linecap="round"
        :stroke-dasharray="CIRCUMFERENCE"
        :stroke-dashoffset="dashOffset"
      />
    </svg>
    <span class="avanti-onboarding-progress-ring__value">{{ value }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

const props = withDefaults(
  defineProps<{
    /** Число в центре круга (в макете — 50). */
    value: number
    /** Верхняя граница шкалы. */
    max?: number
  }>(),
  { max: 100 },
)

/* Геометрия снята из макета: круг 66px, толщина обводки 4.125px. */
const STROKE_WIDTH = 4.125
const RADIUS = 33 - STROKE_WIDTH / 2
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

/** Доля заполнения кольца в пределах 0…1. */
const fraction = computed<number>(() => Math.min(Math.max(props.value / props.max, 0), 1))

/*
 * До монтирования дуга свёрнута: это стартовая точка CSS-перехода,
 * благодаря которому кольцо заполняется при появлении экрана.
 */
const isDrawn = ref<boolean>(false)

const dashOffset = computed<number>(() =>
  isDrawn.value ? CIRCUMFERENCE * (1 - fraction.value) : CIRCUMFERENCE,
)

onMounted(() => {
  isDrawn.value = true
})
</script>

<style lang="scss" scoped>
.avanti-onboarding-progress-ring {
  position: relative;
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;

  /* Кадр 1:4691: круг прогресса на мобильной — 48px. */
  width: 48px;
  height: 48px;

  &__svg {
    width: 100%;
    height: 100%;

    /* Дуга в макете начинается в верхней точке круга. */
    transform: rotate(-90deg);
  }

  &__track {
    stroke: var(--avanti-color-track);
  }

  &__arc {
    stroke: var(--avanti-color-primary);
    transition: stroke-dashoffset 1s ease-out;
  }

  /* Кадр 1:4694: 16px Bold #333 в центре круга. */
  &__value {
    position: absolute;
    font-size: 16px;
    font-weight: var(--avanti-font-weight-bold);
    line-height: normal;
    color: var(--avanti-color-text-dark);
    text-transform: uppercase;
  }

  @include desktop-up {
    width: 66px;
    height: 66px;

    /* Десктопный кадр 0:1109: 26px SemiBold чёрным. */
    .avanti-onboarding-progress-ring__value {
      font-size: 26px;
      font-weight: var(--avanti-font-weight-semibold);
      color: var(--avanti-color-text-black);
    }
  }
}
</style>
