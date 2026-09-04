<!--
  Поле кода подтверждения: ряд отдельных ячеек по одной цифре.

  Доступность: ячейки собраны в группу с одним доступным именем — у самих
  полей подписи нет, поэтому скринридер объявляет имя группы один раз,
  а не повторяет его шесть раз подряд.

  Поведение: ввод цифры переводит фокус на следующую ячейку, Backspace на
  пустой — на предыдущую, стрелки двигают каретку по ряду, вставка из буфера
  раскладывает код по ячейкам целиком.
-->
<template>
  <div ref="containerRef" class="avanti-auth-code-input" role="group" :aria-label="label">
    <input
      v-for="(digit, index) in digits"
      :key="index"
      class="avanti-auth-code-input__cell"
      type="text"
      inputmode="numeric"
      maxlength="1"
      :autocomplete="index === 0 ? 'one-time-code' : 'off'"
      :value="digit"
      @input="handleInput(index, $event)"
      @keydown="handleKeydown(index, $event)"
      @paste="handlePaste(index, $event)"
      @focus="handleFocus"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const props = withDefaults(
  defineProps<{
    /** Введённый код целиком; длина не превышает количества ячеек. */
    modelValue: string
    /** Количество ячеек. */
    length: number
    /** Единственное доступное имя всей группы ячеек. */
    label: string
  }>(),
  {
    length: 6,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
  /** Код набран полностью. */
  complete: [value: string]
}>()

const containerRef = ref<HTMLDivElement | null>(null)

/**
 * Значение разложено по ячейкам. Пропущенные позиции хранятся в модели
 * пробелом, чтобы цифры не съезжали влево, когда пользователь заполняет
 * ячейки не по порядку; наружу такая позиция отдаётся пустой строкой.
 */
const digits = computed<string[]>(() =>
  Array.from({ length: props.length }, (_unused, index) => (props.modelValue[index] ?? '').trim()),
)

/** Ячейки берутся из DOM по порядку — так индекс всегда совпадает с позицией. */
function cells(): HTMLInputElement[] {
  return Array.from(containerRef.value?.querySelectorAll('input') ?? [])
}

function focusCell(index: number): void {
  const cell = cells()[index]
  cell?.focus()
  cell?.select()
}

/** Ставит значение и сообщает наружу, обрезая до количества ячеек. */
function commit(value: string): void {
  const next = value.slice(0, props.length)
  emit('update:modelValue', next)
  if (next.length === props.length && !next.includes(' ')) {
    emit('complete', next)
  }
}

/** Заменяет одну позицию в коде на цифру (пустая строка стирает позицию). */
function replaceAt(index: number, digit: string): string {
  const chars = Array.from({ length: props.length }, (_unused, i) => props.modelValue[i] ?? ' ')
  chars[index] = digit || ' '
  return chars.join('').trimEnd()
}

function handleInput(index: number, event: Event): void {
  const input = event.target as HTMLInputElement
  const digit = input.value.replace(/\D/g, '').slice(-1)
  input.value = digit
  commit(replaceAt(index, digit))
  if (digit && index < props.length - 1) {
    focusCell(index + 1)
  }
}

function handleKeydown(index: number, event: KeyboardEvent): void {
  const input = event.target as HTMLInputElement

  if (event.key === 'Backspace' && !input.value && index > 0) {
    event.preventDefault()
    commit(replaceAt(index - 1, ''))
    focusCell(index - 1)
    return
  }

  if (event.key === 'ArrowLeft' && index > 0) {
    event.preventDefault()
    focusCell(index - 1)
    return
  }

  if (event.key === 'ArrowRight' && index < props.length - 1) {
    event.preventDefault()
    focusCell(index + 1)
  }
}

function handlePaste(index: number, event: ClipboardEvent): void {
  event.preventDefault()
  const pasted = (event.clipboardData?.getData('text') ?? '').replace(/\D/g, '')
  if (!pasted) {
    return
  }
  const head = props.modelValue.slice(0, index).padEnd(index, ' ')
  const next = (head + pasted).slice(0, props.length)
  commit(next)
  focusCell(Math.min(next.length, props.length - 1))
}

/** Клик по ячейке выделяет её содержимое: цифра сразу заменяется новой. */
function handleFocus(event: FocusEvent): void {
  ;(event.target as HTMLInputElement).select()
}
</script>

<style lang="scss" scoped>
.avanti-auth-code-input {
  display: flex;

  /* Кадры 1:3573 и 22:3597: ячейки 32px с зазором 10px в обеих ширинах. */
  gap: 10px;
  align-items: center;

  &__cell {
    @include focus-ring;

    /* Обводка внутрь: габарит ячейки совпадает с кадром Figma. */
    @include inner-border(var(--avanti-color-primary));

    flex: 0 0 32px;
    width: 32px;
    height: 32px;
    padding: 0;
    font-family: var(--avanti-font-family-base);
    font-size: 14px;
    font-weight: var(--avanti-font-weight-semibold);
    line-height: normal;
    color: var(--avanti-color-text-strong);
    text-align: center;
    background-color: var(--avanti-color-surface);
    border: none;
    border-radius: var(--avanti-radius-xs);
  }
}
</style>
