<!--
  Кнопка «Avvia il trasferimento» — итоговое действие формы.

  Разметку, состояния, размер и фокус даёт базовая кнопка avanti_button:
  размер `md` держит её одинаковой на обеих ширинах макета и даёт скругление
  8px. Здесь остаётся только то, чем кадры вывода средств отличаются от кнопки
  шага, — заливка фирменным градиентом и высота по содержимому.
-->
<template>
  <AvantiButton class="avanti-withdrawal-submit" size="md" type="submit" :disabled="disabled">
    {{ label }}
    <template #icon-after>
      <span class="avanti-withdrawal-submit__arrow" aria-hidden="true">&rarr;</span>
    </template>
  </AvantiButton>
</template>

<script setup lang="ts">
import AvantiButton from '@/components/ui/avanti_button.vue'

withDefaults(
  defineProps<{
    label: string
    disabled?: boolean
  }>(),
  { disabled: false },
)
</script>

<style lang="scss" scoped>
.avanti-withdrawal-submit {
  /* В кадре кнопка выше кнопки шага: высота набирается отступами 16px. */
  height: auto;
  padding: 16px;
  font-weight: var(--avanti-font-weight-bold);
  background-image: var(--avanti-gradient-primary);

  /* Кнопка лежит на светлой подложке формы и тени в кадре не отбрасывает. */
  box-shadow: none;

  /* Градиент перекрывает background-color, поэтому наведение гасит его. */
  &:hover:not(:disabled) {
    background-color: var(--avanti-color-primary-dark);
    background-image: none;
  }

  &__arrow {
    font-size: 16px;
    font-weight: var(--avanti-font-weight-bold);
    line-height: normal;
  }

  /* Стрелка в кадре — глиф, а не иконка: квадрат 16×16 ей мал. */
  :deep(.avanti-button__icon) {
    width: auto;
    height: auto;
  }
}
</style>
