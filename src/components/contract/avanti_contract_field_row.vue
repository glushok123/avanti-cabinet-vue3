<!--
  Строка реквизита договора «подпись — значение» (кадр Figma 22:4924).
  Подпись прижата влево и занимает 220px, значение — вправо;
  под строкой проходит разделитель на всю ширину.
  Рендерится группой <div> внутри <dl> — так требует спецификация HTML.
-->
<template>
  <div class="avanti-contract-field-row">
    <dt class="avanti-contract-field-row__label">{{ label }}</dt>
    <dd class="avanti-contract-field-row__value">{{ value }}</dd>
  </div>
</template>

<script setup lang="ts">
defineProps<{ label: string; value: string }>()
</script>

<style lang="scss" scoped>
.avanti-contract-field-row {
  display: flex;
  flex-wrap: wrap;
  gap: 4px 16px;
  align-items: baseline;
  justify-content: space-between;
  width: 100%;
  padding: 10px 0;
  line-height: normal;

  /* Разделитель — псевдоэлемент на всю ширину: в макете это отдельный
     прямоугольник высотой 1px под парой «подпись — значение». */
  &::after {
    flex: 0 0 100%;
    height: 1px;
    content: '';
    background-color: var(--avanti-color-border);
  }

  &__label {
    flex-shrink: 0;
    width: 220px;
    font-size: 11px;
    font-weight: var(--avanti-font-weight-regular);
    color: var(--avanti-color-text-secondary);
  }

  &__value {
    margin: 0;
    font-size: 13px;
    font-weight: var(--avanti-font-weight-semibold);
    color: var(--avanti-color-text-strong);
    text-align: right;
  }

  @include mobile {
    /* На 390px подпись в 220px и значение не помещаются в одну строку,
       поэтому подпись сжимается по содержимому и пара переносится. */
    &__label {
      width: auto;
      min-width: 0;
    }
  }
}
</style>
