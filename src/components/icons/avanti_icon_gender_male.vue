<!--
  Знак Марса (♂) — вариант «Uomo» переключателя пола.
  В макете это текстовый символ Unicode, а не векторный слой (Figma не отдаёт
  для него SVG), поэтому иконка выводит сам глиф: цвет наследуется через
  currentColor, размер задаёт font-size родителя.
-->
<template>
  <span class="avanti-icon-gender-male" aria-hidden="true">♂</span>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.avanti-icon-gender-male {
  display: block;
  font-weight: var(--avanti-font-weight-regular);
  line-height: 1;
}
</style>
