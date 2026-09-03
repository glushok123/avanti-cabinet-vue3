<!--
  Шаг «1. IBAN» мастера оплаты комиссии
  (кадры Figma 1:342 — десктоп 681px, 33:7103 — мобильная 350px).

  Панель не знает, во что она вложена: затемнение, кнопки «Назад» и «Закрыть»,
  заголовок и полоса шагов — забота оболочки `avanti_modal` и мастера.
  Здесь только тело шага: карточка суммы, поясняющая плашка, блок способа
  оплаты, кнопка перехода к реквизитам и полоса платёжных систем.

  Панель — вкладочная панель полосы `avanti_tabs`: она объявлена
  `role="tabpanel"` и ссылается на свою вкладку через `aria-labelledby`.

  Блоки в кадре те же, что и на шаге «2. COMMISSIONE», но порядок обратный:
  здесь карточка суммы стоит НАД поясняющей плашкой — и на десктопе,
  и на мобильной. Поэтому шаг переиспользует те же блоки, а не повторяет их.
-->
<template>
  <section :id="panelId" class="avanti-commission-iban-panel" role="tabpanel" :aria-labelledby="tabId">
    <AvantiCommissionAmountCard :amount="content.amount" />
    <AvantiCommissionNotice :text="content.notice" @info="emit('info')" />
    <AvantiCommissionPaymentMethod :method="content.payment" />
    <AvantiButton class="avanti-commission-iban-panel__submit" @click="emit('submit')">
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
import { AVANTI_COMMISSION_IBAN_PANEL_ID } from '@/constants/avanti_commission_content'
import type { AvantiCommissionIbanContent, AvantiCommissionIbanPanelEmits } from '@/types/avanti_commission'

const props = withDefaults(
  defineProps<{
    /** Все тексты и суммы шага. На втором этапе приходят из API. */
    content: AvantiCommissionIbanContent
    /** `id` панели; из него же выводится `id` её вкладки в полосе шагов. */
    panelId?: string
  }>(),
  {
    panelId: AVANTI_COMMISSION_IBAN_PANEL_ID,
  },
)

const emit = defineEmits<AvantiCommissionIbanPanelEmits>()

/** `id` вкладки, которую строит `avanti_tabs` по `panelId`. */
const tabId = computed<string>(() => `${props.panelId}-tab`)
</script>

<style lang="scss" scoped>
/*
 * Оформление кнопки из макета. Базовая кнопка на десктопе вырастает до 60px
 * и 24px текста, поэтому набор применяется дважды — в базовых стилях и внутри
 * desktop-up, где он гасит её правила той же специфичностью.
 */
@mixin submit-appearance($height) {
  gap: 8px;
  height: $height;
  padding: 12px 16px;
  font-size: 16px;
  font-weight: var(--avanti-font-weight-semibold);
  border: none;
  border-radius: var(--avanti-radius-sm);
  box-shadow: var(--avanti-shadow-input);
}

.avanti-commission-iban-panel {
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: stretch;
  width: 100%;

  &__submit {
    @include submit-appearance(48px);
  }

  @include desktop-up {
    gap: 24px;

    /* Кнопка отбита от блока оплаты сильнее остальных промежутков. */
    &__submit {
      @include submit-appearance(50px);

      margin-top: 8px;
    }
  }
}
</style>
