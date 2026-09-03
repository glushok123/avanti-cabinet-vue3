<!--
  Бирюзовая карточка итогов симуляции.
  Десктоп: карточка 420px с градиентной заливкой, три строки без разделителей.
  Мобильная: плоская заливка, строки разделены светлыми линиями.
-->
<template>
  <div class="avanti-simulation-summary-card">
    <div class="avanti-simulation-summary-card__content">
      <template v-for="(row, index) in rows" :key="row.label">
        <span
          v-if="isMobile && index > 0"
          class="avanti-simulation-summary-card__divider"
          aria-hidden="true"
        />
        <AvantiSimulationSummaryRow :label="row.label" :value="row.value" :unit="row.unit" />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import AvantiSimulationSummaryRow from '@/components/simulation/avanti_simulation_summary_row.vue'
import { useIsMobile } from '@/composables/use_is_mobile'

/** Строки итогов: подпись, готовое значение и необязательная единица. */
defineProps<{ rows: readonly { label: string; value: string; unit?: string }[] }>()

const isMobile = useIsMobile()
</script>

<style lang="scss" scoped>
.avanti-simulation-summary-card {
  width: 100%;
  padding: 20px;
  overflow: hidden;
  background-color: var(--avanti-color-primary);
  border-radius: var(--avanti-radius-xl);
  box-shadow: var(--avanti-shadow-summary-mobile);

  &__content {
    display: flex;
    flex-direction: column;
    gap: 8px;
    align-items: flex-start;
    width: 100%;
  }

  &__divider {
    display: block;
    width: 100%;
    height: 1px;
    background-color: var(--avanti-color-divider-on-primary);
  }

  @include desktop-up {
    display: flex;
    align-items: center;
    height: 420px;

    /* Отступ по макету: содержимое центрировано по вертикали и прижато влево. */
    padding: 0 0 0 40px;
    background: var(--avanti-gradient-primary);
    border-radius: var(--avanti-radius-lg);
    box-shadow: var(--avanti-shadow-summary);

    .avanti-simulation-summary-card__content {
      gap: 36px;
      width: auto;
    }
  }
}
</style>
