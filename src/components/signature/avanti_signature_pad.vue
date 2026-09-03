<!--
  Поле подписи (Figma 1:2569): бирюзовая область 201px с подсказкой по центру.
  СВЕРХ МАКЕТА: в Figma это статичная заглушка. Здесь она сделана рабочей —
  подпись рисуется на <canvas> указателем (мышь, перо, палец) через Pointer
  Events, линия сглаживается квадратичными кривыми, буфер учитывает
  devicePixelRatio. Нужен ли реальный виджет — подтверждает заказчик.

  Само рисование живёт в `@/composables/use_signature_canvas`, кнопка
  очистки — в `avanti_signature_clear_button`: компонент отвечает
  за разметку и оформление поля.
-->
<template>
  <div class="avanti-signature-pad">
    <div ref="surfaceRef" class="avanti-signature-pad__surface">
      <canvas
        ref="canvasRef"
        class="avanti-signature-pad__canvas"
        role="img"
        :width="bitmapWidth"
        :height="bitmapHeight"
        :aria-label="texts.canvasLabel"
        @pointerdown="handlePointerDown"
        @pointermove="handlePointerMove"
        @pointerup="handlePointerUp"
        @pointercancel="handlePointerUp"
      />
      <AvantiSignatureHint v-if="isEmpty" :text="texts.placeholder" />
      <AvantiSignatureClearButton
        v-show="hasSignature"
        class="avanti-signature-pad__clear"
        :label="texts.clearLabel"
        @click="handleClear"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'
import AvantiSignatureHint from '@/components/signature/avanti_signature_hint.vue'
import AvantiSignatureClearButton from '@/components/signature/avanti_signature_clear_button.vue'
import { useSignatureCanvas } from '@/composables/use_signature_canvas'
import type {
  AvantiSignaturePadEmits,
  AvantiSignaturePadInstance,
  AvantiSignaturePadTexts,
} from '@/types/avanti_signature'

const props = withDefaults(
  defineProps<{
    texts: AvantiSignaturePadTexts
    /** Имя, введённое с клавиатуры: рисуется на холсте вместо росчерка. */
    typedName?: string
  }>(),
  { typedName: '' },
)

const emit = defineEmits<AvantiSignaturePadEmits>()

const {
  surfaceRef,
  canvasRef,
  bitmapWidth,
  bitmapHeight,
  isEmpty,
  handlePointerDown,
  handlePointerMove,
  handlePointerUp,
  clear,
  toDataUrl,
} = useSignatureCanvas(() => props.typedName)

/** Кнопка очистки появляется, только когда стирать есть что. */
const hasSignature = computed<boolean>(() => !isEmpty.value)

function handleClear(): void {
  clear()
  emit('clear')
}

watch(isEmpty, (value) => emit('change', value))

defineExpose<AvantiSignaturePadInstance>({ clear, toDataUrl, isEmpty: (): boolean => isEmpty.value })
</script>

<style lang="scss" scoped>
.avanti-signature-pad {
  width: 100%;

  &__surface {
    @include inner-border(var(--avanti-color-border), 1px, var(--avanti-shadow-field));

    position: relative;
    height: 201px;
    overflow: hidden;
    background-color: var(--avanti-color-primary-soft);
    border-radius: var(--avanti-radius-sm);
  }

  /* Цвет и начертание отсюда читает скрипт: color — цвет линии, шрифт —
     начертание подписи, набранной с клавиатуры. */
  &__canvas {
    display: block;
    width: 100%;
    height: 100%;
    font-family: var(--avanti-font-family-base);
    font-size: 44px;
    font-style: italic;
    font-weight: var(--avanti-font-weight-medium);
    color: var(--avanti-color-text-strong);
    touch-action: none; /* Жест по полю рисует, а не прокручивает страницу. */
    cursor: crosshair;
  }

  &__clear {
    position: absolute;
    top: 8px;
    right: 8px;
  }

  /* Мобильного макета нет: поле ниже, подпись мельче — по логике проекта. */
  @include mobile {
    &__surface {
      height: 160px;
    }

    &__canvas {
      font-size: 34px;
    }
  }
}
</style>
