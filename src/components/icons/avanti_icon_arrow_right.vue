<!-- Стрелка вправо — переход к следующему действию. Цвет наследуется от родителя через currentColor, размер задаёт контейнер. -->
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
    <path d="M3.3328 8H12.6672M8 12.6672L12.6672 8L8 3.3328" stroke="currentColor" :stroke-width="strokeWidth" stroke-linecap="round" />
  </svg>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ strokeWidth?: number | string }>(), {
  strokeWidth: 2,
})

const viewBox = '0 0 16 16'
</script>
