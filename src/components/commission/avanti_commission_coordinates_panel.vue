<!--
  Шаг «3. COORDINATE» мастера оплаты комиссии
  (кадры Figma 1:501 и 241:23617 — десктоп 681px, 232:18038 — мобильная 350px).

  Панель не знает, во что она вложена: затемнение, кнопки «Назад» и «Закрыть»,
  заголовок и полоса шагов — забота оболочки `avanti_modal` и мастера.
  Здесь только тело шага: пояснение, плашка способа оплаты, карточка реквизитов
  с копированием, ссылка на отправку квитанции, кнопка и полоса платёжных систем.

  Панель — вкладочная панель полосы `avanti_tabs`: она объявлена
  `role="tabpanel"` и ссылается на свою вкладку через `aria-labelledby`.

  В макете два варианта экрана, они различаются только местом приписки про
  поле «Causale» — свойство `variant`, см. `AvantiCommissionCoordinatesVariant`.
-->
<template>
  <section :id="panelId" class="avanti-commission-coordinates-panel" role="tabpanel" :aria-labelledby="tabId">
    <p class="avanti-commission-coordinates-panel__subtitle">{{ content.subtitle }}</p>
    <AvantiCommissionMethodNote
      :text="content.methodLabel"
      :action-label="content.methodActionLabel"
      interactive
      @activate="emit('info')"
    />
    <div class="avanti-commission-coordinates-panel__data">
      <AvantiCommissionRequisitesCard
        :items="content.requisites"
        :copy-labels="content.copyLabels"
        @copy="emit('copy', $event)"
      >
        <template v-if="isNoteInside" #note>
          {{ content.causaleNote.lead
          }}<strong class="avanti-commission-coordinates-panel__accent">{{
            content.causaleNote.accent
          }}</strong
          >{{ content.causaleNote.tail }}
        </template>
      </AvantiCommissionRequisitesCard>
      <AvantiCommissionMethodNote
        v-if="!isNoteInside"
        :text="causaleText"
        glyph="!"
        mark-side="start"
        tone="plain"
      />
      <div class="avanti-commission-coordinates-panel__footer">
        <button class="avanti-commission-coordinates-panel__receipt" type="button" @click="emit('receipt')">
          {{ content.receiptNote }}
        </button>
        <AvantiButton class="avanti-commission-coordinates-panel__submit" @click="emit('submit')">
          {{ content.submitLabel }}
          <template #icon-after>
            <AvantiIconArrowRight />
          </template>
        </AvantiButton>
        <AvantiCommissionPaymentSystems :content="content.paymentSystems" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import AvantiCommissionMethodNote from '@/components/commission/avanti_commission_method_note.vue'
import AvantiCommissionPaymentSystems from '@/components/commission/avanti_commission_payment_systems.vue'
import AvantiCommissionRequisitesCard from '@/components/commission/avanti_commission_requisites_card.vue'
import AvantiIconArrowRight from '@/components/icons/avanti_icon_arrow_right.vue'
import AvantiButton from '@/components/ui/avanti_button.vue'
import { AVANTI_COMMISSION_COORDINATES_PANEL_ID } from '@/constants/avanti_commission_content'
import type {
  AvantiCommissionCoordinatesContent,
  AvantiCommissionCoordinatesPanelEmits,
  AvantiCommissionCoordinatesVariant,
} from '@/types/avanti_commission'

const props = withDefaults(
  defineProps<{
    /** Все тексты и реквизиты шага. На втором этапе приходят из API. */
    content: AvantiCommissionCoordinatesContent
    /** Где показать приписку про поле «Causale». По умолчанию — отдельной плашкой. */
    variant?: AvantiCommissionCoordinatesVariant
    /** `id` панели; из него же выводится `id` её вкладки в полосе шагов. */
    panelId?: string
  }>(),
  {
    variant: 'note-outside',
    panelId: AVANTI_COMMISSION_COORDINATES_PANEL_ID,
  },
)

const emit = defineEmits<AvantiCommissionCoordinatesPanelEmits>()

/** `id` вкладки, которую строит `avanti_tabs` по `panelId`. */
const tabId = computed<string>(() => `${props.panelId}-tab`)

const isNoteInside = computed<boolean>(() => props.variant === 'note-inside')

/** Та же приписка одной строкой: в отдельной плашке выделения нет. */
const causaleText = computed<string>(() => {
  const { lead, accent, tail } = props.content.causaleNote
  return `${lead}${accent}${tail}`
})
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

.avanti-commission-coordinates-panel {
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: stretch;
  width: 100%;

  &__subtitle {
    font-size: 15px;
    font-weight: var(--avanti-font-weight-regular);
    line-height: 22px;
    color: var(--avanti-color-text-secondary);
  }

  &__accent {
    font-weight: var(--avanti-font-weight-bold);
    color: var(--avanti-color-text-strong);
  }

  /* Карточка, приписка и завершающий блок стоят плотнее остального тела. */
  &__data {
    display: flex;
    flex-direction: column;
    gap: 12px;
    align-items: stretch;
  }

  &__footer {
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }

  &__receipt {
    @include button-reset;
    @include focus-ring;

    font-size: 14px;
    font-weight: var(--avanti-font-weight-semibold);
    line-height: normal;
    color: var(--avanti-color-primary);
    text-align: center;

    &:hover {
      color: var(--avanti-color-primary-dark);
    }
  }

  /* Отступ до кнопки: 12px между строками блока плюс 8px над самой кнопкой. */
  &__submit {
    @include submit-appearance(48px);

    margin-top: 12px;
  }

  @include desktop-up {
    gap: 24px;

    &__footer {
      padding-top: 8px;
    }

    &__submit {
      @include submit-appearance(50px);

      margin-top: 20px;
    }
  }
}
</style>
