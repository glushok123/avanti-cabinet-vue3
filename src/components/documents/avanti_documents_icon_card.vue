<!--
  Карточка — иконка вариантов «Carta d’identità» и «Patente di guida»
  (кадр Figma 1:935, узел окна 246:5973): горизонтальная карта с полосой
  под верхним краем. В макете у обоих вариантов иконка одна и та же.

  ВРЕМЕННО ЖИВЁТ В КАТАЛОГЕ ДОКУМЕНТОВ: в общем `@/components/icons`
  такой иконки нет, а класть её туда параллельно с другими агентами нельзя.
  После сведения веток иконку нужно перенести в общий каталог.
  Цвет наследуется через currentColor, размер задаёт контейнер.
-->
<template>
  <svg
    viewBox="0 0 20 20"
    width="100%"
    height="100%"
    fill="none"
    aria-hidden="true"
    focusable="false"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="1.6"
      y="3.9"
      width="16.5"
      height="11.2"
      rx="2"
      stroke="currentColor"
      :stroke-width="strokeWidth"
    />
    <path d="M1.6 8H18.1" stroke="currentColor" :stroke-width="strokeWidth" />
  </svg>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ strokeWidth?: number | string }>(), {
  strokeWidth: 2,
})
</script>
