<!--
  Сетка банков-партнёров на экране ожидания.
  Десктоп: четыре колонки по 285px с промежутками 12px и 20px (по макету).
  Мобильная: две колонки, ширина колонок делится поровну.
-->
<template>
  <ul class="avanti-onboarding-bank-grid" :aria-label="label">
    <AvantiOnboardingBankCard
      v-for="bank in banks"
      :key="bank.id"
      :name="bank.name"
      :status="bank.status"
      :logo="bank.logo"
      :status-label="statusLabels[bank.status]"
    />
  </ul>
</template>

<script setup lang="ts">
import AvantiOnboardingBankCard from '@/components/onboarding/avanti_onboarding_bank_card.vue'
import type { AvantiBankItem, AvantiBankStatus } from '@/types/avanti_onboarding'

defineProps<{
  /** Банки в порядке макета. */
  banks: AvantiBankItem[]
  /** Подписи состояний. */
  statusLabels: Record<AvantiBankStatus, string>
  /** Доступное имя списка. */
  label: string
}>()
</script>

<style lang="scss" scoped>
.avanti-onboarding-bank-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
  width: 100%;

  @include desktop-up {
    grid-template-columns: repeat(4, 285px);
    gap: 20px 12px;
    justify-content: space-between;
  }
}
</style>
