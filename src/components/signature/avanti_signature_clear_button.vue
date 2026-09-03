<!--
  Круглая кнопка очистки поля подписи: белый кружок 28px с крестиком
  в правом верхнем углу поля. Появляется, только когда стирать есть что.

  Собственного события нет: корневой элемент — <button>, поэтому слушатель
  `@click` родителя навешивается на него напрямую через fallthrough-атрибуты.
-->
<template>
  <button class="avanti-signature-clear-button" type="button" :aria-label="label">
    <AvantiIconClose />
  </button>
</template>

<script setup lang="ts">
import AvantiIconClose from '@/components/icons/avanti_icon_close.vue'

defineProps<{
  /** Доступное имя кнопки: у иконки нет текста, читает только скринридер. */
  label: string
}>()
</script>

<style lang="scss" scoped>
.avanti-signature-clear-button {
  @include button-reset;
  @include focus-ring;

  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  color: var(--avanti-color-text-secondary);
  background-color: var(--avanti-color-surface);
  border-radius: var(--avanti-radius-round);
  box-shadow: var(--avanti-shadow-card);

  &:hover {
    color: var(--avanti-color-primary);
  }

  svg {
    width: 14px;
    height: 14px;
  }
}
</style>
