<!--
  Бирюзовый заголовок раздела внутри документа: 13px, bold, капитель.
  Один и тот же стиль в макете у «Tra i sottoscritti», «Condizioni Finanziarie»,
  «Piano di Ammortamento» и у нумерованных разделов условий.
-->
<template>
  <component :is="tag" class="avanti-contract-section-title">{{ text }}</component>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ text: string; tag?: string }>(), { tag: 'h3' })
</script>

<style lang="scss" scoped>
.avanti-contract-section-title {
  margin: 0;
  font-size: 13px;
  font-weight: var(--avanti-font-weight-bold);
  line-height: normal;
  color: var(--avanti-color-primary);
  text-transform: uppercase;
  letter-spacing: 0.65px;
}
</style>
