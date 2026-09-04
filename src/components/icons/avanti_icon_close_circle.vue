<!--
  Крестик в круге — кнопка закрытия просмотрщика сертификата (кадры 256:12235,
  232:16427) и модального предупреждения (кадр 258:17501).
  Цвет наследуется через currentColor, размер задаёт контейнер.
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
    <path
      d="M15.0002 8.99976L8.99976 15.0002M8.99976 8.99976L15.0002 15.0002M22.0008 12C22.0008 17.5233 17.5233 22.0008 12 22.0008C6.47671 22.0008 1.9992 17.5233 1.9992 12C1.9992 6.47671 6.47671 1.9992 12 1.9992C17.5233 1.9992 22.0008 6.47671 22.0008 12Z"
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
