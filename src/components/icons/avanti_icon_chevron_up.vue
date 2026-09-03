<!-- Шеврон вверх — сворачивание карточки чеклиста. Цвет наследуется от родителя через currentColor, размер задаёт контейнер. -->
<template>
  <svg
    viewBox="0 0 14 14"
    width="100%"
    height="100%"
    fill="none"
    aria-hidden="true"
    focusable="false"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10.5 8.75L7 5.25L3.5 8.75"
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
