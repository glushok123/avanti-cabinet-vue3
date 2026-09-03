<!-- Крестик — закрытие мобильного меню. Цвет наследуется через currentColor, размер задаёт контейнер. -->
<template>
  <svg
    viewBox="0 0 16 16"
    width="100%"
    height="100%"
    fill="none"
    aria-hidden="true"
    focusable="false"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12.5 3.5L3.5 12.5M3.5 3.5L12.5 12.5"
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
