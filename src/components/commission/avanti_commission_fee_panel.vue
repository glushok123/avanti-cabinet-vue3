<!--
  Шаг «2. COMMISSIONE» мастера оплаты комиссии
  (кадры Figma 246:6992 — десктоп, 232:17709 — мобильная).

  Панель не знает, во что она вложена: затемнение, кнопки «Назад» и «Закрыть»,
  заголовок и полоса шагов — забота оболочки `avanti_modal` и мастера.
  Здесь только тело шага: поясняющая плашка, карточка суммы, блок способа
  оплаты, кнопка перехода к реквизитам и полоса платёжных систем.

  Панель — вкладочная панель полосы `avanti_tabs`: она объявлена
  `role="tabpanel"` и ссылается на свою вкладку через `aria-labelledby`.

  РАСХОЖДЕНИЕ МАКЕТА: на десктопе плашка стоит над карточкой суммы,
  на мобильной — под ней. Порядок переставляется свойством `order`.
-->
<template>
  <section :id="panelId" class="avanti-commission-fee-panel" role="tabpanel" :aria-labelledby="tabId">
    <AvantiCommissionNotice
      class="avanti-commission-fee-panel__notice"
      :text="content.notice"
      @info="emit('info')"
    />
    <AvantiCommissionAmountCard class="avanti-commission-fee-panel__amount" :amount="content.amount" />
    <AvantiCommissionPaymentMethod :method="content.payment" />
    <AvantiButton class="avanti-commission-fee-panel__submit" size="md" @click="emit('submit')">
      {{ content.submitLabel }}
      <template #icon-after>
        <AvantiIconArrowRight />
      </template>
    </AvantiButton>
    <AvantiCommissionPaymentSystems :content="content.paymentSystems" />
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import AvantiCommissionAmountCard from '@/components/commission/avanti_commission_amount_card.vue'
import AvantiCommissionNotice from '@/components/commission/avanti_commission_notice.vue'
import AvantiCommissionPaymentMethod from '@/components/commission/avanti_commission_payment_method.vue'
import AvantiCommissionPaymentSystems from '@/components/commission/avanti_commission_payment_systems.vue'
import AvantiIconArrowRight from '@/components/icons/avanti_icon_arrow_right.vue'
import AvantiButton from '@/components/ui/avanti_button.vue'
import { AVANTI_COMMISSION_FEE_PANEL_ID } from '@/constants/avanti_commission_content'
import type { AvantiCommissionFeeContent, AvantiCommissionFeePanelEmits } from '@/types/avanti_commission'

const props = withDefaults(
  defineProps<{
    /** Все тексты и суммы шага. На втором этапе приходят из API. */
    content: AvantiCommissionFeeContent
    /** `id` панели; из него же выводится `id` её вкладки в полосе шагов. */
    panelId?: string
  }>(),
  {
    panelId: AVANTI_COMMISSION_FEE_PANEL_ID,
  },
)

const emit = defineEmits<AvantiCommissionFeePanelEmits>()

/** `id` вкладки, которую строит `avanti_tabs` по `panelId`. */
const tabId = computed<string>(() => `${props.panelId}-tab`)
</script>

<style lang="scss" scoped>
.avanti-commission-fee-panel {
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: stretch;
  width: 100%;

  /* На мобильной карточка суммы поднимается над поясняющей плашкой. */
  &__amount {
    order: -1;
  }

  @include desktop-up {
    gap: 24px;

    &__amount {
      order: 0;
    }

    /* Кнопка отбита от блока оплаты сильнее остальных промежутков. */
    &__submit {
      margin-top: 8px;
    }
  }
}
</style>
