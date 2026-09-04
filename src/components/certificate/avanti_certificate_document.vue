<!--
  Область документа просмотрщика сертификата (кадры 256:12237 — десктоп
  793×500, 232:16429 — мобильная 390×673): строка управления со счётчиком
  страниц и кнопкой масштаба, ниже страница документа в белой рамке.

  Масштаб — только вёрстка: страница-заглушка одна, PDF не читается, поэтому
  кнопка переключает увеличение превью, а счётчик страниц статичен.
  Увеличенная страница прокручивается внутри своей области.
-->
<template>
  <div class="avanti-certificate-document">
    <div class="avanti-certificate-document__controls">
      <p class="avanti-certificate-document__pages">{{ pageLabel }}</p>
      <button
        class="avanti-certificate-document__zoom"
        type="button"
        :aria-pressed="zoomed"
        @click="toggleZoom"
      >
        <span class="avanti-certificate-document__zoom-icon">
          <AvantiIconZoomIn />
        </span>
        <span class="avanti-certificate-document__zoom-label">{{ zoomLabel }}</span>
      </button>
    </div>

    <div class="avanti-certificate-document__frame">
      <div
        class="avanti-certificate-document__page"
        :class="{ 'avanti-certificate-document__page--zoomed': zoomed }"
      >
        <img class="avanti-certificate-document__image" :src="src" :alt="alt" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import AvantiIconZoomIn from '@/components/icons/avanti_icon_zoom_in.vue'

const props = defineProps<{
  pageLabel: string
  zoomInLabel: string
  zoomOutLabel: string
  src: string
  alt: string
}>()

/** Кадры показывают только исходный масштаб, увеличение — состояние вёрстки. */
const zoomed = ref(false)

const zoomLabel = computed(() => (zoomed.value ? props.zoomOutLabel : props.zoomInLabel))

function toggleZoom(): void {
  zoomed.value = !zoomed.value
}
</script>

<style lang="scss" scoped>
.avanti-certificate-document {
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  gap: 12px;
  min-height: 0;
  padding: 16px;
  background-color: var(--avanti-color-surface-viewer);

  &__controls {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: space-between;

    /* Высота строки в кадре 32px — её задаёт кнопка масштаба. */
    min-height: 32px;
  }

  &__pages {
    font-size: 13px;
    font-weight: var(--avanti-font-weight-semibold);
    line-height: normal;
    color: var(--avanti-color-text-slate);
  }

  /* Кнопка масштаба: 118×32, поля 8/14, скругление 20px (кадр 256:12240). */
  &__zoom {
    @include button-reset;
    @include focus-ring;
    @include inner-border(var(--avanti-color-border-slate));

    display: flex;
    gap: 6px;
    align-items: center;
    padding: 8px 14px;
    background-color: var(--avanti-color-surface);
    border-radius: var(--avanti-radius-3xl);
  }

  &__zoom-icon {
    display: flex;
    flex-shrink: 0;
    width: 14px;
    height: 14px;
    color: var(--avanti-color-text-slate-strong);
  }

  &__zoom-label {
    font-size: 13px;
    font-weight: var(--avanti-font-weight-semibold);
    line-height: normal;
    color: var(--avanti-color-text-slate-strong);
    white-space: nowrap;
  }

  /* Белая рамка 8px вокруг страницы с мягкой тенью (кадр 256:12244). */
  &__frame {
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    min-height: 0;
    padding: 8px;
    background-color: var(--avanti-color-surface);
    border-radius: var(--avanti-radius-xs);
    box-shadow: var(--avanti-shadow-certificate-document);
  }

  &__page {
    flex: 1 1 auto;
    min-height: 0;
    overflow: hidden;
    border-radius: var(--avanti-radius-xs);
  }

  /* Увеличенная страница прокручивается внутри рамки. */
  &__page--zoomed {
    overflow: auto;
  }

  /*
   * Страница в кадре обрезана: видна только верхняя часть документа
   * (высота изображения 243,43% от рамки, выравнивание по верхнему краю).
   */
  &__image {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top center;
  }

  /* Увеличение вёрстки: кадра с увеличенной страницей в макете нет,
     1,8× подобрано так, чтобы текст документа читался на десктопе. */
  &__page--zoomed &__image {
    width: 180%;
    max-width: none;
    height: auto;
  }
}
</style>
