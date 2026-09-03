<!--
  Иконка ошибки для плашки неудачной загрузки (bx:error в макете).
  Цвет наследуется от родителя через currentColor, размер задаёт контейнер.
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
    <circle cx="12" cy="12" r="9" stroke="currentColor" :stroke-width="strokeWidth" />
    <path d="M12 7.5V13" stroke="currentColor" :stroke-width="strokeWidth" stroke-linecap="round" />
    <circle cx="12" cy="16.25" r="1" fill="currentColor" />
  </svg>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ strokeWidth?: number | string }>(), {
  strokeWidth: 1.6,
})
</script>
