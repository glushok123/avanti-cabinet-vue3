<!--
  Две наложенные карточки — копирование реквизита (кадр «Иконка копии»,
  Figma 241:23646 / 232:18064). Глиф lucide copy, тот же набор, что и у
  остальных иконок макета. Цвет наследуется через currentColor,
  размер задаёт контейнер.
-->
<template>
  <svg
    viewBox="0 0 24 24"
    width="100%"
    height="100%"
    fill="none"
    aria-hidden="true"
    focusable="false"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="8"
      y="8"
      width="14"
      height="14"
      rx="2"
      stroke="currentColor"
      :stroke-width="strokeWidth"
      stroke-linecap="round"
    />
    <path
      d="M4 16C2.89543 16 2 15.1046 2 14V4C2 2.89543 2.89543 2 4 2H14C15.1046 2 16 2.89543 16 4"
      stroke="currentColor"
      :stroke-width="strokeWidth"
      stroke-linecap="round"
    />
  </svg>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ strokeWidth?: number | string }>(), {
  strokeWidth: 2,
})
</script>
