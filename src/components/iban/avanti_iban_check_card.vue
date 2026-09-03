<!--
  Плашка проверки номера: светлая фирменная подложка, надпись
  «Controlla il numero» и введённый IBAN под ней
  (кадры Figma 1:1549 — десктоп, 106:8587 — мобильная).

  Это статичный блок: на шаге проверки номер только показывается,
  редактирование возвращает пользователя на шаг ввода.
-->
<template>
  <div class="avanti-iban-check-card">
    <p class="avanti-iban-check-card__title">{{ title }}</p>
    <p class="avanti-iban-check-card__value">{{ value }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  /** Надпись над номером. */
  title: string
  /** Отформатированный по группам номер счёта. */
  value: string
}>()
</script>

<style lang="scss" scoped>
.avanti-iban-check-card {
  /* Обводка внутрь: в макете плашка ровно 90px высотой. */
  @include inner-border(var(--avanti-color-border), 1px, var(--avanti-shadow-card));

  display: flex;
  flex-direction: column;
  gap: 16px;
  justify-content: center;
  width: 100%;
  min-height: 90px;
  padding: 8px 12px;
  overflow: hidden;
  background-color: var(--avanti-color-primary-soft);
  border-radius: var(--avanti-radius-sm);
}

.avanti-iban-check-card__title {
  font-size: 18px;
  font-weight: var(--avanti-font-weight-regular);
  line-height: normal;
  color: var(--avanti-color-primary);
  text-transform: uppercase;
}

.avanti-iban-check-card__value {
  font-size: 18px;
  font-weight: var(--avanti-font-weight-regular);
  line-height: normal;
  color: var(--avanti-color-text-black);
  word-break: break-all;
}

@include mobile {
  .avanti-iban-check-card__title {
    font-size: 16px;
  }

  .avanti-iban-check-card__value {
    font-size: 14px;
  }
}
</style>
