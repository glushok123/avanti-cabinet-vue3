<!--
  Плашка с датой между группами сообщений («29 agosto»).
  Живёт внутри списка сообщений, поэтому корневой тег — li.
-->
<template>
  <li class="avanti-chat-date-divider">
    <span class="avanti-chat-date-divider__chip">{{ label }}</span>
  </li>
</template>

<script setup lang="ts">
defineProps<{
  /** Подпись даты. */
  label: string
}>()
</script>

<style lang="scss" scoped>
.avanti-chat-date-divider {
  display: flex;
  justify-content: center;
  width: 100%;

  /* Между плашкой и первым сообщением группы по макету 24px, а шаг списка —
     16px, поэтому недостающие 8px добавляет сама плашка. */
  margin-bottom: 8px;

  &__chip {
    display: block;
    padding: 4px 12px;
    font-size: 12px;
    font-weight: var(--avanti-font-weight-semibold);
    line-height: normal;
    color: var(--avanti-color-text-secondary);
    background-color: var(--avanti-color-border-soft);
    border-radius: var(--avanti-radius-md);
  }
}
</style>
