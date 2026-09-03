import { computed, ref, type ComputedRef, type Ref } from 'vue'
import {
  AVANTI_AMOUNT_DEFAULT,
  AVANTI_MONTHS_DEFAULT,
  AVANTI_TAN_RATE,
} from '@/constants/avanti_simulation_config'

/*
 * useGrouping: 'always' обязателен: по умолчанию итальянская локаль
 * не разделяет разряды у четырёхзначных чисел (1000 → «1000»),
 * а в макете нижняя граница подписана как «1.000 €».
 */
const AMOUNT_FORMATTER = new Intl.NumberFormat('it-IT', {
  maximumFractionDigits: 0,
  useGrouping: true,
})

/** Неразрывный пробел — разделитель разрядов в десктопной карточке итогов. */
const NARROW_SPACE = '\u00a0'

/**
 * Форматирует сумму в итальянском стиле с точкой-разделителем: 12000 → «12.000».
 */
export function formatAmount(value: number): string {
  return AMOUNT_FORMATTER.format(Math.round(value))
}

/**
 * Форматирует сумму с пробелом-разделителем: 10000 → «10 000».
 * Такой вариант используется в десктопной карточке итогов.
 */
export function formatAmountSpaced(value: number): string {
  return formatAmount(value).replace(/\./g, NARROW_SPACE)
}

/**
 * Разбирает введённую пользователем строку суммы: оставляет только цифры,
 * поэтому «12.000», «12 000 €» и «12000» дают одно и то же число.
 * Пустой ввод (нет ни одной цифры) даёт null — вызывающий код решает,
 * чем его заменить.
 */
export function parseAmount(text: string): number | null {
  const digits = text.replace(/\D/g, '')
  return digits.length > 0 ? Number(digits) : null
}

/** Загоняет сумму в границы [min, max]. */
export function clampAmount(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value))
}

/**
 * Аннуитетный платёж по формуле P × i / (1 − (1 + i)^−n),
 * где i — месячная ставка, n — срок в месяцах. При нулевой ставке
 * или нулевом сроке формула вырождается в простое деление.
 */
export function calculateMonthlyPayment(amount: number, months: number, annualRate: number): number {
  if (months <= 0) {
    return 0
  }

  const monthlyRate = annualRate / 12
  if (monthlyRate === 0) {
    return amount / months
  }

  return (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months))
}

interface CreditSimulation {
  /** Запрошенная сумма кредита, евро. */
  amount: Ref<number>
  /** Срок возврата, месяцы. */
  months: Ref<number>
  /** Ежемесячный аннуитетный платёж, евро (округлён до целого). */
  monthlyPayment: ComputedRef<number>
}

/**
 * Состояние калькулятора кредита: сумма, срок и производный от них платёж.
 */
export function useCreditSimulation(): CreditSimulation {
  const amount = ref<number>(AVANTI_AMOUNT_DEFAULT)
  const months = ref<number>(AVANTI_MONTHS_DEFAULT)

  const monthlyPayment = computed(() =>
    Math.round(calculateMonthlyPayment(amount.value, months.value, AVANTI_TAN_RATE)),
  )

  return { amount, months, monthlyPayment }
}
