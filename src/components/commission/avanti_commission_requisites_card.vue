<!--
  Карточка реквизитов шага «3. COORDINATE» (кадр «Карточка реквизитов»,
  Figma 1:524 / 241:23640 / 232:18058): получатель, IBAN, SWIFT и сумма,
  разделённые тонкими линиями, у каждой строки — кнопка копирования.

  Сами строки верстает общий примитив `avanti_copy_field` в варианте `row`:
  подпись, значение и кнопка копирования устроены так же, как в поле IBAN
  карточки «Dati personali», меняются только размеры и наличие плашки.

  В макете два варианта одного экрана. В варианте 1:501 приписка про поле
  «Causale» набрана последней строкой внутри карточки, после разделителя;
  в варианте 241:23617 её вынесли в отдельную плашку под карточкой. Здесь
  живёт первый вариант — он включается слотом `note`, который заполняет
  панель шага.
-->
<template>
  <div class="avanti-commission-requisites-card">
    <ul class="avanti-commission-requisites-card__list">
      <AvantiCopyField
        v-for="item in items"
        :key="item.id"
        class="avanti-commission-requisites-card__row"
        tag="li"
        variant="row"
        :label="item.label"
        :value="item.value"
        :copy-value="item.copyValue"
        :copy-label="copyActionLabel(item.label)"
        :copied-label="copyLabels.success"
        :failed-label="copyLabels.failure"
        @copy="emit('copy', item.id)"
      />
    </ul>
    <div v-if="$slots.note" class="avanti-commission-requisites-card__note">
      <slot name="note" />
    </div>
  </div>
</template>

<script setup lang="ts">
import AvantiCopyField from '@/components/ui/avanti_copy_field.vue'
import type { AvantiCommissionCopyLabels, AvantiCommissionRequisite } from '@/types/avanti_commission'

const props = defineProps<{
  /** Реквизиты сверху вниз. */
  items: AvantiCommissionRequisite[]
  /** Подписи кнопки копирования и сообщения о результате. */
  copyLabels: AvantiCommissionCopyLabels
}>()

const emit = defineEmits<{ copy: [id: string] }>()

/** Доступное имя кнопки: общая подпись плюс название реквизита. */
function copyActionLabel(label: string): string {
  return `${props.copyLabels.action} ${label}`
}
</script>

<style lang="scss" scoped>
.avanti-commission-requisites-card {
  @include inner-border(var(--avanti-color-border));

  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: stretch;
  padding: 20px;
  background-color: var(--avanti-color-surface-neutral);
  border-radius: var(--avanti-radius-xl);

  &__list {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 0;
    margin: 0;
    list-style: none;
  }

  /*
   * Разделители из макета: линия рисуется над каждой строкой, кроме первой,
   * и над приписки-строкой — так их число всегда на одну меньше строк.
   */
  &__row + &__row,
  &__note {
    padding-top: 16px;
    border-top: 1px solid var(--avanti-color-border);
  }

  &__note {
    font-size: 13px;
    font-weight: var(--avanti-font-weight-regular);
    line-height: 18px;
    color: var(--avanti-color-text-secondary);
  }

  @include mobile {
    gap: 8px;
    padding: 16px;

    &__list {
      gap: 8px;
    }

    &__row + &__row,
    &__note {
      padding-top: 8px;
    }

    &__note {
      font-size: 10px;
      line-height: normal;
    }
  }
}
</style>
