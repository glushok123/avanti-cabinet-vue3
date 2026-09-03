<!--
  Кастомный выпадающий список анкеты по паттерну WAI-ARIA «combobox + listbox»:
  фокус остаётся на триггере, активный пункт помечается через aria-activedescendant.
  Клавиатура — Enter/Space, стрелки, Home/End, Escape (закрывает и возвращает фокус),
  Tab; клик вне компонента тоже закрывает. Список выводится в потоке, как в макете
  «Personal Data Form розворот»: раскрытие раздвигает форму, а не накрывает соседние
  поля. Пять пунктов из макета помещаются целиком, дальше появляется прокрутка.
-->
<template>
  <div ref="rootRef" class="avanti-select" :class="stateClasses">
    <AvantiFieldLabel v-if="label" :id="labelId" class="avanti-select__label" :text="label" :hint="hint" />
    <button
      ref="triggerRef"
      class="avanti-select__trigger"
      type="button"
      role="combobox"
      aria-haspopup="listbox"
      :aria-controls="listId"
      :aria-expanded="expandedAttr"
      :aria-activedescendant="activeDescendant"
      :aria-labelledby="labelledBy"
      :aria-invalid="invalidAttr"
      :disabled="disabled"
      @click="toggle"
      @keydown="handleKeydown"
    >
      <span class="avanti-select__value">{{ displayText }}</span>
      <span class="avanti-select__chevron">
        <AvantiIconChevronRight />
      </span>
    </button>
    <ul v-show="isOpen" :id="listId" class="avanti-select__list" role="listbox" :aria-labelledby="labelledBy">
      <AvantiSelectOption
        v-for="(option, index) in options"
        :id="optionId(index)"
        :key="option.value"
        :label="option.label"
        :selected="isSelected(option)"
        :active="isActive(index)"
        :disabled="option.disabled"
        @select="choose(option)"
        @activate="activate(index)"
      />
    </ul>
    <p v-if="errorMessage" class="avanti-select__error">{{ errorMessage }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, useId } from 'vue'
import AvantiFieldLabel from '@/components/ui/avanti_field_label.vue'
import AvantiSelectOption from '@/components/ui/avanti_select_option.vue'
import AvantiIconChevronRight from '@/components/icons/avanti_icon_chevron_right.vue'
import type { AvantiSelectOption as SelectOptionItem } from '@/types/avanti_form'

const props = withDefaults(
  defineProps<{
    modelValue?: string
    options: SelectOptionItem[]
    label?: string
    hint?: string
    /** Текст в триггере, пока значение не выбрано. */
    placeholder?: string
    disabled?: boolean
    invalid?: boolean
    errorMessage?: string
  }>(),
  { modelValue: '', label: '', placeholder: '', errorMessage: '' },
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
  open: []
  close: []
}>()

/** Клавиши триггера (остальные достаются браузеру) и те из них, что нужны только раскрытому списку. */
const HANDLED_KEYS = new Set(['ArrowDown', 'ArrowUp', 'Home', 'End', 'Enter', ' ', 'Escape'])
const OPEN_ONLY_KEYS = new Set(['Home', 'End', 'Escape'])

const uid = useId()
const listId = `${uid}-list`
const labelId = `${uid}-label`
const rootRef = ref<HTMLElement | null>(null)
const triggerRef = ref<HTMLButtonElement | null>(null)
const isOpen = ref(false)
const activeIndex = ref(-1)

const selectedIndex = computed(() => props.options.findIndex((item) => item.value === props.modelValue))
const displayText = computed(() => props.options[selectedIndex.value]?.label ?? props.placeholder)
const hasError = computed(() => props.invalid || props.errorMessage.length > 0)
const labelledBy = computed(() => (props.label ? labelId : undefined))
const expandedAttr = computed(() => (isOpen.value ? 'true' : 'false'))
const invalidAttr = computed(() => (hasError.value ? 'true' : undefined))
const activeDescendant = computed(() => (activeIndex.value < 0 ? undefined : optionId(activeIndex.value)))

const stateClasses = computed(() => ({
  'avanti-select--open': isOpen.value,
  'avanti-select--disabled': props.disabled,
  'avanti-select--invalid': hasError.value,
  'avanti-select--placeholder': selectedIndex.value < 0,
}))

function optionId(index: number): string {
  return `${uid}-option-${index}`
}

function isSelected(option: SelectOptionItem): boolean {
  return option.value === props.modelValue
}

function isActive(index: number): boolean {
  return index === activeIndex.value
}

/** Ближайший доступный пункт, начиная с start и двигаясь шагом step. */
function findEnabled(start: number, step: number): number {
  for (let index = start; index >= 0 && index < props.options.length; index += step) {
    if (!props.options[index].disabled) return index
  }
  return activeIndex.value
}

/** Прокручивает список так, чтобы подсвеченный пункт был виден целиком. */
async function scrollActiveIntoView(): Promise<void> {
  await nextTick()
  const id = activeDescendant.value
  if (id) document.getElementById(id)?.scrollIntoView({ block: 'nearest' })
}

function open(): void {
  if (props.disabled || isOpen.value) return
  isOpen.value = true
  activeIndex.value = selectedIndex.value >= 0 ? selectedIndex.value : findEnabled(0, 1)
  emit('open')
  void scrollActiveIntoView()
}

function close(returnFocus = false): void {
  if (!isOpen.value) return
  isOpen.value = false
  activeIndex.value = -1
  emit('close')
  if (returnFocus) triggerRef.value?.focus()
}

function toggle(): void {
  if (isOpen.value) close()
  else open()
}

function activate(index: number): void {
  activeIndex.value = index
}

function choose(option: SelectOptionItem): void {
  emit('update:modelValue', option.value)
  close(true)
}

/** Сдвигает подсветку на шаг step; на закрытом списке просто открывает его. */
function move(step: number): void {
  if (!isOpen.value) return open()
  activeIndex.value = findEnabled((activeIndex.value < 0 ? -step : activeIndex.value) + step, step)
  void scrollActiveIntoView()
}

function moveEdge(toEnd: boolean): void {
  activeIndex.value = toEnd ? findEnabled(props.options.length - 1, -1) : findEnabled(0, 1)
  void scrollActiveIntoView()
}

function confirmActive(): void {
  if (!isOpen.value) return open()
  const option = props.options[activeIndex.value]
  if (option && !option.disabled) choose(option)
}

function handleKeydown(event: KeyboardEvent): void {
  const { key } = event
  if (key === 'Tab') return close()
  if (!HANDLED_KEYS.has(key)) return
  if (!isOpen.value && OPEN_ONLY_KEYS.has(key)) return
  event.preventDefault()
  if (key === 'ArrowDown' || key === 'ArrowUp') move(key === 'ArrowDown' ? 1 : -1)
  else if (key === 'Home' || key === 'End') moveEdge(key === 'End')
  else if (key === 'Escape') close(true)
  else confirmActive()
}

function handleDocumentPointerDown(event: PointerEvent): void {
  const target = event.target as Node | null
  if (isOpen.value && !(target && rootRef.value?.contains(target))) close()
}

onMounted(() => document.addEventListener('pointerdown', handleDocumentPointerDown))
onBeforeUnmount(() => document.removeEventListener('pointerdown', handleDocumentPointerDown))
</script>

<style lang="scss" scoped>
.avanti-select {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;

  &__trigger {
    @include button-reset;
    @include inner-border(var(--avanti-color-primary), 1.5px, var(--avanti-shadow-field));
    @include focus-ring;

    display: flex;
    gap: 12px;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 58px;
    padding: 0 16px;
    font-size: 15px;
    line-height: normal;
    background-color: var(--avanti-color-surface-muted);
    border-radius: var(--avanti-radius-lg);
    transition: box-shadow var(--avanti-transition-base);

    &:hover:not(:disabled) {
      @include inner-border(var(--avanti-color-primary-dark), 1.5px, var(--avanti-shadow-field));
    }

    &:disabled {
      @include inner-border(var(--avanti-color-border-neutral), 1.5px);

      color: var(--avanti-color-text-tertiary);
      cursor: not-allowed;
      background-color: var(--avanti-color-surface-neutral);
    }
  }

  &__value {
    overflow: hidden;
    color: var(--avanti-color-text-strong);
    text-align: left;
    text-overflow: ellipsis;
    text-transform: uppercase;
    white-space: nowrap;
  }

  &__chevron {
    display: flex;
    flex-shrink: 0;
    width: 24px;
    height: 24px;
    color: var(--avanti-color-primary);
    transition: transform var(--avanti-transition-base);
    transform: rotate(90deg);
  }

  &__list {
    max-height: 158px;
    overflow-y: auto;
    border: 1.5px solid var(--avanti-color-primary);
    border-radius: var(--avanti-radius-lg);
  }

  &__error {
    font-size: 13px;
    color: var(--avanti-color-danger);
  }

  &--placeholder &__value {
    color: var(--avanti-color-text-muted);
    text-transform: none;
  }

  &--open &__chevron {
    transform: rotate(-90deg);
  }

  &--invalid &__trigger,
  &--invalid &__trigger:hover:not(:disabled) {
    @include inner-border(var(--avanti-color-danger), 1.5px, var(--avanti-shadow-field));
  }

  @include desktop-up {
    gap: 12px;

    &__trigger {
      height: 85px;
      padding: 0 24px;
      font-size: 18px;
      letter-spacing: 0.72px;
      border-radius: var(--avanti-radius-2xl);
    }

    &__list {
      max-height: 237px;
    }
  }
}
</style>
