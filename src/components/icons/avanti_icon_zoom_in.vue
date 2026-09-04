<!--
  Лупа с плюсом — кнопка увеличения документа в просмотрщике сертификата
  (кадры 256:12241, 232:16433). Цвет наследуется через currentColor,
  размер задаёт контейнер.
-->
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
      d="M12.2502 12.2502L9.71273 9.71273M6.41667 4.66667V8.16667M4.66667 6.41667H8.16667M11.0833 6.41667C11.0833 8.994 8.994 11.0833 6.41667 11.0833C3.83934 11.0833 1.75 8.994 1.75 6.41667C1.75 3.83934 3.83934 1.75 6.41667 1.75C8.994 1.75 11.0833 3.83934 11.0833 6.41667Z"
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
