<!--
  Форма вывода средств «Scegli il metodo di ricezione».

  Корневой блок правой колонки кабинета: выбор способа получения, реквизиты,
  сумма перевода со слайдером и кнопка запуска. О странице ничего не знает —
  доступный остаток, способы и предзаполненные реквизиты приходят пропами,
  введённые значения уходят наружу событием submit.

  Разметка одинакова на обеих ширинах макета: в мобильном кадре панель
  занимает 358px, на десктопе — ширину правой колонки; ширину задаёт
  родитель, форма растягивается на 100%.
-->
<template>
  <form class="avanti-withdrawal-form" novalidate @submit.prevent="handleSubmit">
    <AvantiWithdrawalHeader :title="texts.title" :subtitle="texts.subtitle" />
    <AvantiWithdrawalMethodGroup
      v-model="selectedMethod"
      :methods="methods"
      :label="texts.methodsLabel"
      :disabled="disabled"
    />
    <div class="avanti-withdrawal-form__body">
      <AvantiWithdrawalFields
        :fields="activeFields"
        :values="values"
        :disabled="disabled"
        @update="handleFieldUpdate"
      />
      <AvantiWithdrawalAmount
        v-model="amount"
        :min="amountMin"
        :max="availableAmount"
        :step="amountStep"
        :label="texts.amountLabel"
        :slider-label="texts.amountSliderLabel"
        :share-suffix="texts.amountShareSuffix"
        :currency="currency"
      />
    </div>
    <AvantiWithdrawalSubmit :label="texts.submit" :disabled="disabled" />
  </form>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import AvantiWithdrawalAmount from '@/components/withdrawal/avanti_withdrawal_amount.vue'
import AvantiWithdrawalFields from '@/components/withdrawal/avanti_withdrawal_fields.vue'
import AvantiWithdrawalHeader from '@/components/withdrawal/avanti_withdrawal_header.vue'
import AvantiWithdrawalMethodGroup from '@/components/withdrawal/avanti_withdrawal_method_group.vue'
import AvantiWithdrawalSubmit from '@/components/withdrawal/avanti_withdrawal_submit.vue'
import {
  AVANTI_WITHDRAWAL_AMOUNT_MIN,
  AVANTI_WITHDRAWAL_AMOUNT_STEP,
  AVANTI_WITHDRAWAL_CURRENCY,
  AVANTI_WITHDRAWAL_METHODS,
  AVANTI_WITHDRAWAL_METHOD_DEFAULT,
  AVANTI_WITHDRAWAL_TEXTS,
} from '@/constants/avanti_withdrawal_content'
import type {
  AvantiWithdrawalDetails,
  AvantiWithdrawalMethod,
  AvantiWithdrawalMethodId,
  AvantiWithdrawalSubmitPayload,
} from '@/types/avanti_withdrawal'

const props = withDefaults(
  defineProps<{
    /** Доступный к выводу остаток, евро — верхняя граница суммы перевода. */
    availableAmount: number
    /** Способы получения и их поля; по умолчанию — набор из макета. */
    methods?: AvantiWithdrawalMethod[]
    /** Способ, выбранный при открытии формы. */
    initialMethod?: AvantiWithdrawalMethodId
    /** Сумма при открытии формы; по умолчанию — весь доступный остаток. */
    initialAmount?: number
    /** Предзаполненные реквизиты: ключ поля → значение. */
    details?: AvantiWithdrawalDetails
    /** Нижняя граница и шаг суммы перевода, евро. */
    amountMin?: number
    amountStep?: number
    /** Символ валюты в подписях суммы. */
    currency?: string
    /** Форма только для чтения: поля и кнопка выключены. */
    disabled?: boolean
  }>(),
  {
    methods: () => AVANTI_WITHDRAWAL_METHODS,
    initialMethod: AVANTI_WITHDRAWAL_METHOD_DEFAULT,
    initialAmount: undefined,
    details: () => ({}),
    amountMin: AVANTI_WITHDRAWAL_AMOUNT_MIN,
    amountStep: AVANTI_WITHDRAWAL_AMOUNT_STEP,
    currency: AVANTI_WITHDRAWAL_CURRENCY,
    disabled: false,
  },
)

const emit = defineEmits<{ submit: [payload: AvantiWithdrawalSubmitPayload] }>()

const texts = AVANTI_WITHDRAWAL_TEXTS

const selectedMethod = ref<AvantiWithdrawalMethodId>(props.initialMethod)
const values = ref<AvantiWithdrawalDetails>({ ...props.details })
const amount = ref<number>(props.initialAmount ?? props.availableAmount)

/** Выбранный способ получения; если такого в списке нет — первый доступный. */
const activeMethod = computed(
  () => props.methods.find((method) => method.id === selectedMethod.value) ?? props.methods[0],
)

const activeFields = computed(() => activeMethod.value?.fields ?? [])

/* Реквизиты могут прийти после загрузки данных — тогда форма их подхватывает. */
watch(
  () => props.details,
  (next) => {
    values.value = { ...next }
  },
)

/* Остаток тоже приходит с сервера: сумма перевода не должна его превышать. */
watch(
  () => props.availableAmount,
  (next) => {
    amount.value = Math.min(amount.value, Math.max(next, props.amountMin))
  },
)

function handleFieldUpdate(name: string, value: string): void {
  values.value[name] = value
}

function handleSubmit(): void {
  const details: AvantiWithdrawalDetails = {}
  for (const field of activeFields.value) {
    details[field.name] = values.value[field.name] ?? ''
  }

  emit('submit', { method: selectedMethod.value, amount: amount.value, details })
}
</script>

<style lang="scss" scoped>
.avanti-withdrawal-form {
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  padding: 20px;
  background-color: var(--avanti-color-surface);
  border-radius: var(--avanti-radius-4xl);
  box-shadow: var(--avanti-shadow-card-soft);

  /* Реквизиты и сумма — одна колонка с шагом 16px (кадр 134:2881). */
  &__body {
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
  }
}
</style>
