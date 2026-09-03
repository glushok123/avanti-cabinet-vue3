<!--
  Подсказка по центру пустого поля подписи («Firma qui...», Figma 1:2571).
  Лежит поверх холста и не перехватывает указатель — иначе первый штрих
  начинался бы только со второго нажатия.
-->
<template>
  <p class="avanti-signature-hint" aria-hidden="true">{{ text }}</p>
</template>

<script setup lang="ts">
defineProps<{ text: string }>()
</script>

<style lang="scss" scoped>
.avanti-signature-hint {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: var(--avanti-font-weight-regular);
  line-height: normal;
  color: var(--avanti-color-text-secondary);
  text-align: center;

  /* Указатель проходит насквозь: подсказка — декорация над холстом. */
  pointer-events: none;
  user-select: none;

  @include mobile {
    font-size: 13px;
  }
}
</style>
