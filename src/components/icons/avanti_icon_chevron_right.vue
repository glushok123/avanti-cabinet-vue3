<!-- Шеврон вправо — навигация «Continua» / «Indietro» (через поворот). Цвет наследуется от родителя через currentColor, размер задаёт контейнер. -->
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
    <path d="M6 12L10 8L6 4" stroke="currentColor" :stroke-width="strokeWidth" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ strokeWidth?: number | string }>(), {
  strokeWidth: 1.33,
})

const viewBox = '0 0 16 16'
</script>
