<!--
  Слайдер диапазона. Внутри — нативный input[type="range"] (доступность,
  управление с клавиатуры, поддержка тач-жестов), поверх которого нарисованы
  трек, заливка и ползунок из макета.

  Единственная динамическая величина — доля заполнения — передаётся в CSS
  через кастомное свойство --avanti-slider-progress. Всё остальное оформление
  живёт в SCSS, инлайновых стилей нет.

  Размер ползунка выбирает проп thumbSize: он ставит модификатор класса,
  а тот кладёт размер во вторую кастомную переменную --avanti-slider-thumb.
  От неё считаются позиция ползунка, его габариты и подпись над ним, поэтому
  переопределять размер снаружи не нужно.
-->
<template>
  <div class="avanti-slider" :class="thumbClass" :style="progressStyle">
    <div class="avanti-slider__value">
      <slot name="value" />
    </div>
    <div class="avanti-slider__track">
      <div class="avanti-slider__fill" />
    </div>
    <span class="avanti-slider__thumb" aria-hidden="true" />
    <input
      class="avanti-slider__input"
      type="range"
      :min="min"
      :max="max"
      :step="step"
      :value="modelValue"
      :aria-label="ariaLabel"
      @input="handleInput"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

/**
 * Размер ползунка: `md` — 32px (симуляция кредита), `sm` — 22px
 * (форма вывода средств).
 */
type ThumbSize = 'md' | 'sm'

const props = withDefaults(
  defineProps<{
    modelValue: number
    min?: number
    max?: number
    step?: number
    ariaLabel?: string
    thumbSize?: ThumbSize
  }>(),
  {
    min: 0,
    max: 100,
    step: 1,
    ariaLabel: undefined,
    thumbSize: 'md',
  },
)

const emit = defineEmits<{ 'update:modelValue': [value: number] }>()

const progress = computed(() => {
  const span = props.max - props.min
  if (span <= 0) {
    return 0
  }
  return Math.min(1, Math.max(0, (props.modelValue - props.min) / span))
})

const progressStyle = computed(() => ({ '--avanti-slider-progress': String(progress.value) }))

const thumbClass = computed(() => `avanti-slider--thumb-${props.thumbSize}`)

function handleInput(event: Event): void {
  emit('update:modelValue', Number((event.target as HTMLInputElement).value))
}
</script>

<style lang="scss" scoped>
/* Размеры ползунка из макетов; в разметку они попадают через модификатор. */
$thumb-size-md: 32px;
$thumb-size-sm: 22px;

.avanti-slider {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: var(--avanti-slider-thumb);

  &--thumb-md {
    --avanti-slider-thumb: #{$thumb-size-md};
  }

  &--thumb-sm {
    --avanti-slider-thumb: #{$thumb-size-sm};
  }

  /*
   * Слот подписи над ползунком. Позиция считается из той же доли заполнения,
   * что и заливка, поэтому потребителю не нужно повторять расчёт у себя.
   */
  &__value {
    position: absolute;
    bottom: 100%;
    left: calc(var(--avanti-slider-progress) * (100% - var(--avanti-slider-thumb)));

    /* Сдвиг на полразмера ползунка ставит подпись ровно над его серединой. */
    transform: translateX(calc(var(--avanti-slider-thumb) * 0.5 - 50%));
  }

  &__track {
    width: 100%;
    height: 8px;
    overflow: hidden;
    background-color: var(--avanti-color-track);
    border-radius: var(--avanti-radius-pill);

    @include desktop-up {
      height: 12px;
    }
  }

  &__fill {
    width: calc(var(--avanti-slider-progress) * 100%);
    height: 100%;
    background-color: var(--avanti-color-primary);
    border-radius: var(--avanti-radius-pill);
  }

  &__thumb {
    position: absolute;
    top: 0;
    left: calc(var(--avanti-slider-progress) * (100% - var(--avanti-slider-thumb)));
    display: block;
    width: var(--avanti-slider-thumb);
    height: var(--avanti-slider-thumb);
    pointer-events: none;
    background-color: var(--avanti-color-surface);
    border: 1.333px solid var(--avanti-color-track);
    border-radius: var(--avanti-radius-round);

    /* Точка внутри ползунка — ровно половина его размера (16px при 32px). */
    &::after {
      position: absolute;
      top: 50%;
      left: 50%;
      width: calc(var(--avanti-slider-thumb) * 0.5);
      height: calc(var(--avanti-slider-thumb) * 0.5);
      content: '';
      background-color: var(--avanti-color-primary);
      border-radius: var(--avanti-radius-round);
      transform: translate(-50%, -50%);
    }
  }

  &__input {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    margin: 0;
    appearance: none;
    cursor: pointer;
    opacity: 0;

    &::-webkit-slider-thumb {
      width: var(--avanti-slider-thumb);
      height: var(--avanti-slider-thumb);
      appearance: none;
    }

    &::-moz-range-thumb {
      width: var(--avanti-slider-thumb);
      height: var(--avanti-slider-thumb);
      border: none;
    }

    &:focus-visible ~ .avanti-slider__thumb {
      outline: 2px solid var(--avanti-color-primary);
      outline-offset: 2px;
    }
  }
}
</style>
