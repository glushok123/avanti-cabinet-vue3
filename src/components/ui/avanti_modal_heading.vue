<!--
  Заголовок модального окна: малая бирюзовая надпись над крупным заголовком
  (кадр «Модальное окно — Комиссия», Figma 1:342).

  Содержимое блока заголовка по умолчанию: `avanti_modal` подставляет его
  сам, когда слот `header` не занят. Отдельным компонентом он полезен и
  внутри слота — когда к штатному заголовку нужно добавить что-то своё.
-->
<template>
  <div class="avanti-modal-heading">
    <p v-if="eyebrow" class="avanti-modal-heading__eyebrow">{{ eyebrow }}</p>
    <h2 :id="titleId" class="avanti-modal-heading__title">{{ title }}</h2>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    title: string
    /** Малая надпись над заголовком («Sotto-etichetta» в макете). */
    eyebrow?: string
    /** id заголовка: по нему окно ссылается на него через aria-labelledby. */
    titleId?: string
  }>(),
  {
    eyebrow: '',
    titleId: undefined,
  },
)
</script>

<style lang="scss" scoped>
.avanti-modal-heading {
  display: flex;
  flex-direction: column;
  gap: 4px;

  &__eyebrow {
    font-size: 12px;
    font-weight: var(--avanti-font-weight-bold);
    line-height: normal;
    color: var(--avanti-color-primary);
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  &__title {
    font-size: 26px;
    font-weight: var(--avanti-font-weight-semibold);
    line-height: normal;
    color: var(--avanti-color-text-strong);
  }
}
</style>
