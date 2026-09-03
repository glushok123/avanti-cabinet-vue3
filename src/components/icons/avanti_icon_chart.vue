<!-- Столбчатая диаграмма — шаг «Simulazione completata». Цвет наследуется от родителя через currentColor, размер задаёт контейнер. -->
<template>
  <svg
    :viewBox="viewBox"
    width="100%"
    height="100%"
    fill="none"
    aria-hidden="true"
    focusable="false"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M4.07345 17.1112V12.2223M9.7778 17.1112V2.4445M15.4822 17.1112V7.33339" stroke="currentColor" :stroke-width="strokeWidth" stroke-linecap="round" />
  </svg>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ strokeWidth?: number | string }>(), {
  strokeWidth: 2.44444,
})

const viewBox = '0 0 19.5556 19.5556'
</script>
