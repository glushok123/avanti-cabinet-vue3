<!--
  Слайдер диапазона. Внутри — нативный input[type="range"] (доступность,
  управление с клавиатуры, поддержка тач-жестов), поверх которого нарисованы
  трек, заливка и ползунок из макета.

  Единственная динамическая величина — доля заполнения — передаётся в CSS
  через кастомное свойство --avanti-slider-progress. Всё остальное оформление
  живёт в SCSS, инлайновых стилей нет.
-->
<template>
  <div class="avanti-slider" :style="progressStyle">
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

const props = withDefaults(
  defineProps<{
    modelValue: number
    min?: number
    max?: number
    step?: number
    ariaLabel?: string
  }>(),
  {
    min: 0,
    max: 100,
    step: 1,
    ariaLabel: undefined,
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

function handleInput(event: Event): void {
  emit('update:modelValue', Number((event.target as HTMLInputElement).value))
}
</script>

<style lang="scss" scoped>
$thumb-size: 32px;

.avanti-slider {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: $thumb-size;

  &__track {
    width: 100%;
    height: 8px;
    overflow: hidden;
    background-color: var(--avanti-color-track);
    border-radius: 100px;

    @include desktop-up {
      height: 12px;
    }
  }

  &__fill {
    width: calc(var(--avanti-slider-progress) * 100%);
    height: 100%;
    background-color: var(--avanti-color-primary);
    border-radius: 100px;
  }

  &__thumb {
    position: absolute;
    top: 0;
    left: calc(var(--avanti-slider-progress) * (100% - #{$thumb-size}));
    display: block;
    width: $thumb-size;
    height: $thumb-size;
    pointer-events: none;
    background-color: var(--avanti-color-surface);
    border: 1.333px solid var(--avanti-color-track);
    border-radius: var(--avanti-radius-round);

    &::after {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 16px;
      height: 16px;
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
    cursor: pointer;
    opacity: 0;
    appearance: none;

    &::-webkit-slider-thumb {
      width: $thumb-size;
      height: $thumb-size;
      appearance: none;
    }

    &::-moz-range-thumb {
      width: $thumb-size;
      height: $thumb-size;
      border: none;
    }

    &:focus-visible ~ .avanti-slider__thumb {
      outline: 2px solid var(--avanti-color-primary);
      outline-offset: 2px;
    }
  }
}
</style>
