<!-- Пользователь — шаг «Account creato». Цвет наследуется от родителя через currentColor, размер задаёт контейнер. -->
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
    <path d="M15.4822 17.1112V15.4815C15.4822 14.6171 15.1387 13.7881 14.5274 13.1769C13.9161 12.5657 13.087 12.2223 12.2225 12.2223H7.33308C6.46857 12.2223 5.63947 12.5657 5.02817 13.1769C4.41687 13.7881 4.07345 14.6171 4.07345 15.4815V17.1112M13.0374 5.70376C13.0374 7.5038 11.578 8.96302 9.7778 8.96302C7.97756 8.96302 6.51817 7.5038 6.51817 5.70376C6.51817 3.90372 7.97756 2.4445 9.7778 2.4445C11.578 2.4445 13.0374 3.90372 13.0374 5.70376Z" stroke="currentColor" :stroke-width="strokeWidth" stroke-linecap="round" />
  </svg>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ strokeWidth?: number | string }>(), {
  strokeWidth: 2.44444,
})

const viewBox = '0 0 19.5556 19.5556'
</script>
