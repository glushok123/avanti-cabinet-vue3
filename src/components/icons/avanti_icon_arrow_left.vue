<!-- Стрелка влево — кнопка «Назад» в шапке модалки. Зеркальная пара
     к avanti_icon_arrow_right: те же координаты, отражённые по горизонтали. -->
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
      d="M12.6672 8H3.3328M8 12.6672L3.3328 8L8 3.3328"
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
