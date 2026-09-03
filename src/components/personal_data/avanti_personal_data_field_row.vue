<!--
  Строка анкеты из двух равных по ширине полей («Cognome» и «Nome»).
  На десктопе поля стоят в ряд с зазором 37px, на мобильной — одно под другим
  с зазором 20px. Сетка задаёт колонки сама, поэтому вложенным полям не нужны
  ни собственная ширина, ни flex-правила.
-->
<template>
  <div class="avanti-personal-data-field-row">
    <slot />
  </div>
</template>

<script setup lang="ts">
/* Блок раскладки: собственного состояния и пропов у него нет. */
</script>

<style lang="scss" scoped>
.avanti-personal-data-field-row {
  display: grid;
  gap: 20px;
  align-items: start;
  width: 100%;

  @include desktop-up {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 37px;
  }
}
</style>
