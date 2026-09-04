<!--
  Градиентная карточка одобренной суммы: подпись, статусный бейдж,
  сумма, кнопка вывода средств и сноска.
-->
<template>
  <section class="avanti-dashboard-balance-card">
    <div class="avanti-dashboard-balance-card__meta">
      <div class="avanti-dashboard-balance-card__meta-text">
        <span class="avanti-dashboard-balance-card__caption">{{ caption }}</span>
        <span class="avanti-dashboard-balance-card__description">{{ description }}</span>
      </div>
      <AvantiBadge tone="translucent">{{ statusLabel }}</AvantiBadge>
    </div>
    <div class="avanti-dashboard-balance-card__amount-block">
      <span class="avanti-dashboard-balance-card__amount">{{ amount }}</span>
      <span class="avanti-dashboard-balance-card__details">{{ details }}</span>
    </div>
    <AvantiDashboardWithdrawButton :label="actionLabel" :state="actionState" @click="emit('withdraw')" />
    <div class="avanti-dashboard-balance-card__footer">
      <span class="avanti-dashboard-balance-card__line" aria-hidden="true" />
      <span class="avanti-dashboard-balance-card__note">{{ note }}</span>
    </div>
  </section>
</template>

<script setup lang="ts">
import AvantiBadge from '@/components/ui/avanti_badge.vue'
import AvantiDashboardWithdrawButton from '@/components/dashboard/avanti_dashboard_withdraw_button.vue'
import type { AvantiWithdrawState } from '@/types/avanti_dashboard'

/** actionState — доступность кнопки вывода; по умолчанию базовое `locked`. */
withDefaults(
  defineProps<{
    caption: string
    description: string
    statusLabel: string
    amount: string
    details: string
    note: string
    actionLabel: string
    actionState?: AvantiWithdrawState
  }>(),
  { actionState: 'locked' },
)

/**
 * Кнопка вывода средств: маршрут решает страница. В состоянии `locked`
 * кнопка выключена, поэтому событие оттуда не приходит.
 */
const emit = defineEmits<{ withdraw: [] }>()
</script>

<style lang="scss" scoped>
.avanti-dashboard-balance-card {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  padding: 32px;
  background-image: var(--avanti-gradient-primary);
  border-radius: var(--avanti-radius-3xl);
  box-shadow: var(--avanti-shadow-balance);

  &__meta {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }

  &__meta-text {
    display: flex;
    flex-direction: column;
    gap: 22px;
    align-items: flex-start;
    width: 361px;
    line-height: normal;
    color: var(--avanti-color-text-on-primary-soft);
    text-transform: uppercase;
  }

  &__caption {
    font-size: 13px;
    font-weight: var(--avanti-font-weight-semibold);
    letter-spacing: 0.13px;
  }

  &__description {
    font-size: 16px;
    font-weight: var(--avanti-font-weight-semibold);
    letter-spacing: 0.16px;
  }

  &__amount-block {
    display: flex;
    flex-direction: column;
    gap: 4px;
    align-items: flex-start;
    line-height: normal;
    white-space: nowrap;
  }

  &__amount {
    font-size: 52px;
    font-weight: var(--avanti-font-weight-bold);
    color: var(--avanti-color-text-on-primary);
    letter-spacing: -0.78px;
  }

  &__details {
    font-size: 14px;
    font-weight: var(--avanti-font-weight-regular);
    color: var(--avanti-color-text-on-primary-soft);
  }

  &__footer {
    display: flex;
    gap: 16px;
    align-items: center;
    padding-top: 8px;
  }

  &__line {
    flex-shrink: 0;
    width: 100px;
    height: 1px;
    background-color: var(--avanti-color-divider-on-primary);
  }

  &__note {
    font-size: 12px;
    font-weight: var(--avanti-font-weight-regular);
    line-height: normal;
    color: var(--avanti-color-text-on-primary-soft);
    white-space: nowrap;
  }

  @include mobile {
    gap: 12px;
    padding: 20px;

    &__meta-text {
      flex: 1 1 0;
      gap: 8px;
      width: auto;
      min-width: 0;
      text-transform: none;
    }

    &__caption {
      font-weight: var(--avanti-font-weight-light);
    }

    /* В мобильном кадре подпись набрана средним начертанием: при semibold
       строка выходит на пиксель шире эталонных 131px и заметно жирнее. */
    &__description {
      width: 150px;
      font-size: 10px;
      font-weight: var(--avanti-font-weight-medium);
      text-transform: uppercase;
      letter-spacing: 0.1px;
    }

    /* В мобильном кадре сумма набрана без трекинга: с −0,54px строка выходит
       на 3px короче эталонных 150px и цифры уезжают влево. */
    &__amount {
      font-size: 36px;
      letter-spacing: normal;
    }

    &__details {
      font-size: 12px;
    }

    &__footer {
      padding-top: 0;
    }

    &__line {
      display: none;
    }

    &__note {
      font-weight: var(--avanti-font-weight-regular);
      white-space: normal;
    }
  }
}
</style>
