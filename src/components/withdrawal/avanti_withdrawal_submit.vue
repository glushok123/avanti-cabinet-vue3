<!--
  Кнопка «Avvia il trasferimento» — итоговое действие формы.

  Разметку, состояния и фокус даёт базовая кнопка avanti_button; здесь
  только оформление из кадров вывода средств: заливка фирменным градиентом
  вместо плоской, меньший радиус и одинаковый размер на обеих ширинах макета
  (базовая кнопка на десктопе вырастает до 60px и 24px текста).
-->
<template>
  <AvantiButton class="avanti-withdrawal-submit" type="submit" :disabled="disabled">
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
/*
 * Оформление кнопки из макета. Размеры одинаковы на обеих ширинах, а базовая
 * кнопка на десктопе меняет высоту, отступы и шрифт, поэтому набор применяется
 * дважды — в базовых стилях и внутри desktop-up, где он гасит её правила.
 */
@mixin submit-appearance {
  gap: 8px;
  height: auto;
  padding: 16px;
  font-size: 16px;
  font-weight: var(--avanti-font-weight-bold);
  background-image: var(--avanti-gradient-primary);
  border: none;
  border-radius: var(--avanti-radius-sm);
  box-shadow: none;

  /* Градиент перекрывает background-color, поэтому наведение гасит его. */
  &:hover:not(:disabled) {
    background-color: var(--avanti-color-primary-dark);
    background-image: none;
  }

  :deep(.avanti-button__icon) {
    width: auto;
    height: auto;
  }
}

.avanti-withdrawal-submit {
  @include submit-appearance;

  &__arrow {
    font-size: 16px;
    font-weight: var(--avanti-font-weight-bold);
    line-height: normal;
  }

  @include desktop-up {
    @include submit-appearance;
  }
}
</style>
