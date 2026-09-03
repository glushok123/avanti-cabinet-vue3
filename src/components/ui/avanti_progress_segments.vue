<!--
  Сегментированный индикатор прогресса под карточкой чеклиста.
  Завершённые сегменты залиты фирменным цветом, текущий — градиентом
  от фирменного к нейтральному, остальные нейтральные.
-->
<template>
  <div
    class="avanti-progress-segments"
    role="progressbar"
    :aria-label="label"
    :aria-valuenow="completed"
    :aria-valuemin="0"
    :aria-valuemax="total"
  >
    <span
      v-for="segment in total"
      :key="segment"
      class="avanti-progress-segments__item"
      :class="segmentClass(segment)"
    />
  </div>
</template>

<script setup lang="ts">
/** label — доступное имя индикатора: у него нет видимого заголовка. */
const props = withDefaults(
  defineProps<{
    label: string
    total?: number
    completed?: number
  }>(),
  {
    total: 5,
    completed: 0,
  },
)

function segmentClass(segment: number): string {
  if (segment <= props.completed) {
    return 'avanti-progress-segments__item--done'
  }
  if (segment === props.completed + 1) {
    return 'avanti-progress-segments__item--current'
  }
  return 'avanti-progress-segments__item--pending'
}
</script>

<style lang="scss" scoped>
.avanti-progress-segments {
  display: flex;
  gap: 4px;
  align-items: center;
  width: 100%;

  &__item {
    flex: 1 1 0;
    min-width: 0;
    height: 4px;
    border-radius: var(--avanti-radius-pill);

    &--done {
      background-color: var(--avanti-color-primary);
    }

    &--current {
      background-image: linear-gradient(
        90deg,
        var(--avanti-color-primary) 0%,
        var(--avanti-color-border) 100%
      );
    }

    &--pending {
      background-color: var(--avanti-color-border);
    }
  }
}
</style>
