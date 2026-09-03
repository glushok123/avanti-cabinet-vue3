<!--
  Блок навигации мастера: «Indietro» (контурная) и «Continua» (с заливкой).
  На десктопе кнопки разнесены по краям и имеют фиксированную ширину 294px,
  на мобильной делят строку поровну.
-->
<template>
  <div class="avanti-simulation-actions">
    <div class="avanti-simulation-actions__slot">
      <AvantiButton variant="outline" @click="handleBack">
        <template #icon-before>
          <span class="avanti-simulation-actions__icon avanti-simulation-actions__icon--back">
            <AvantiIconChevronRight />
          </span>
        </template>
        {{ backLabel }}
      </AvantiButton>
    </div>
    <div class="avanti-simulation-actions__slot">
      <AvantiButton variant="primary" @click="handleNext">
        {{ nextLabel }}
        <template #icon-after>
          <span class="avanti-simulation-actions__icon">
            <AvantiIconChevronRight />
          </span>
        </template>
      </AvantiButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import AvantiButton from '@/components/ui/avanti_button.vue'
import AvantiIconChevronRight from '@/components/icons/avanti_icon_chevron_right.vue'

defineProps<{
  /** Подпись кнопки возврата на предыдущий шаг. */
  backLabel: string
  /** Подпись кнопки перехода к следующему шагу. */
  nextLabel: string
}>()

/*
 * События шагов мастера. Обработчики (переход по маршрутам и отправка формы)
 * появятся на этапе интеграции с API — сейчас страница на них не подписана
 * намеренно: логики переходов во вёрстке нет.
 */
const emit = defineEmits<{ back: []; next: [] }>()

function handleBack(): void {
  emit('back')
}

function handleNext(): void {
  emit('next')
}
</script>

<style lang="scss" scoped>
.avanti-simulation-actions {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  width: 100%;

  &__slot {
    flex: 1 0 0;
    min-width: 0;
  }

  &__icon {
    display: flex;
    width: 100%;
    height: 100%;

    /* Шеврон «назад» — тот же спрайт, развёрнутый на 180°. */
    &--back {
      transform: rotate(180deg);
    }
  }

  @include desktop-up {
    justify-content: space-between;

    .avanti-simulation-actions__slot {
      flex: 0 0 auto;
      width: 294px;
    }
  }
}
</style>
