<!--
  Паспорт — иконка варианта «Passaporto» в списке типов документа
  (кадр Figma 1:935, узел окна 246:5973): вертикальная книжка с полосой
  под верхним краем.

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
      x="4.7"
      y="2.9"
      width="11.6"
      height="14.2"
      rx="2"
      stroke="currentColor"
      :stroke-width="strokeWidth"
    />
    <path d="M4.7 5.9H16.3" stroke="currentColor" :stroke-width="strokeWidth" />
  </svg>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ strokeWidth?: number | string }>(), {
  strokeWidth: 2,
})
</script>
