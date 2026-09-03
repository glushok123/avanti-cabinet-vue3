<!--
  Строка статуса консультанта под именем: «Online · Risponde in ~30 sec».
  Точка-разделитель декоративная, поэтому рисуется псевдоэлементом.
-->
<template>
  <p class="avanti-chat-status-line">
    <span class="avanti-chat-status-line__state">{{ statusLabel }}</span>
    <span class="avanti-chat-status-line__reply">{{ replyTimeLabel }}</span>
  </p>
</template>

<script setup lang="ts">
defineProps<{
  /** Подпись состояния, «Online». */
  statusLabel: string
  /** Ориентир по времени ответа. */
  replyTimeLabel: string
}>()
</script>

<style lang="scss" scoped>
.avanti-chat-status-line {
  display: flex;
  gap: 6px;
  align-items: center;
  font-size: 12px;
  font-weight: var(--avanti-font-weight-medium);
  line-height: normal;

  /* Зелёный «на связи»: в токенах проекта зелёного пока нет,
     поэтому до его появления используется фирменный бирюзовый. */
  &__state {
    color: var(--avanti-color-success, var(--avanti-color-primary));
  }

  &__reply {
    display: flex;
    gap: 6px;
    align-items: center;
    color: var(--avanti-color-text-tertiary);

    /* Точка-разделитель 3px между подписями. */
    &::before {
      display: block;
      width: 3px;
      height: 3px;
      content: '';
      background-color: var(--avanti-color-text-tertiary);
      border-radius: var(--avanti-radius-round);
    }
  }
}
</style>
