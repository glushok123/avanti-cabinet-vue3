<!--
  Верхняя строка модального окна: слот слева, слот по центру и кнопка
  закрытия справа. Вынесена из `avanti_modal.vue` отдельным компонентом,
  чтобы у окна остался запас до лимита в 300 строк.

  Раскладок две:
  * `default` — строка «содержимое слева — крестик справа» (кадр 1:342);
  * `brand` — строка «пусто — логотип — крестик» окон авторизации
    и настроек аккаунта (кадры 0:1235, 1:2773). На десктопе крестик
    в этих кадрах стоит отдельной строкой над логотипом, поэтому
    строка разворачивается в колонку.
-->
<template>
  <div class="avanti-modal-bar" :class="variantClass">
    <div class="avanti-modal-bar__lead">
      <slot name="lead" />
    </div>
    <div v-if="$slots.center" class="avanti-modal-bar__center">
      <slot name="center" />
    </div>
    <AvantiModalCloseButton
      v-if="closable"
      class="avanti-modal-bar__close"
      :label="closeLabel"
      :variant="closeVariant"
      @click="handleClose"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import AvantiModalCloseButton from '@/components/ui/avanti_modal_close_button.vue'
import type { AvantiModalVariant } from '@/types/avanti_modal'

const props = withDefaults(
  defineProps<{
    /** Оформление строки: как у самого окна. */
    variant?: AvantiModalVariant
    /** Показывать кнопку закрытия. */
    closable?: boolean
    /** Доступное имя кнопки закрытия. */
    closeLabel?: string
  }>(),
  {
    variant: 'default',
    closable: true,
    closeLabel: 'Chiudi',
  },
)

const emit = defineEmits<{ close: [] }>()

const variantClass = computed(() => `avanti-modal-bar--${props.variant}`)

/** В брендовой шапке крестик нарисован без серой подложки. */
const closeVariant = computed(() => (props.variant === 'brand' ? 'plain' : 'circle'))

function handleClose(): void {
  emit('close')
}
</script>

<style lang="scss" scoped>
.avanti-modal-bar {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: space-between;

  /* --- Брендовая шапка: пустая ячейка — логотип — крестик --- */
  &--brand {
    display: grid;
    grid-template-columns: 32px 1fr 32px;
    align-items: center;
    width: 100%;
  }

  &--brand &__lead {
    width: 32px;
    height: 32px;
  }

  &--brand &__center {
    display: flex;
    justify-content: center;
  }

  &--brand &__close {
    justify-self: end;
  }

  /* На десктопе крестик стоит отдельной строкой над логотипом. */
  @include desktop-up {
    &--brand {
      display: flex;
      flex-direction: column-reverse;
      gap: 12px;
      align-items: stretch;
    }

    &--brand &__lead {
      display: none;
    }

    &--brand &__close {
      align-self: flex-end;
    }
  }
}
</style>
