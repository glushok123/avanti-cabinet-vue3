<!-- Галочка — завершённый шаг. Цвет наследуется от родителя через currentColor, размер задаёт контейнер. -->
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
    <path d="M13.3328 4L6.0002 11.3328L2.6672 7.99971" stroke="currentColor" :stroke-width="strokeWidth" stroke-linecap="round" />
  </svg>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ strokeWidth?: number | string }>(), {
  strokeWidth: 2,
})

const viewBox = '0 0 16 16'
</script>
