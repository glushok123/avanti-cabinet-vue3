<!--
  Сегментированный переключатель анкеты («UOMO / DONNA»): надпись с пояснением
  и ряд равных по ширине сегментов.

  Доступность — по паттерну WAI-ARIA radiogroup: в обход по Tab попадает только
  выбранный сегмент (roving tabindex), между сегментами переходят стрелками,
  Home/End прыгают к краям. Переход стрелкой сразу меняет значение.
-->
<template>
  <div class="avanti-choice-group">
    <AvantiFieldLabel
      v-if="label"
      :id="labelId"
      class="avanti-choice-group__label"
      :text="label"
      :hint="hint"
    />
    <div
      ref="optionsRef"
      class="avanti-choice-group__options"
      role="radiogroup"
      :aria-labelledby="labelledBy"
      @keydown="handleKeydown"
    >
      <AvantiChoiceOption
        v-for="(option, index) in options"
        :key="option.value"
        :label="option.label"
        :icon="option.icon"
        :selected="isSelected(option)"
        :disabled="option.disabled"
        :tabbable="isTabbable(index)"
        @select="choose(option)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, ref, useId } from 'vue'
import AvantiChoiceOption from '@/components/ui/avanti_choice_option.vue'
import AvantiFieldLabel from '@/components/ui/avanti_field_label.vue'
import type { AvantiChoiceOption as ChoiceOptionItem } from '@/types/avanti_form'

const props = withDefaults(
  defineProps<{
    modelValue?: string
    options: ChoiceOptionItem[]
    label?: string
    hint?: string
  }>(),
  {
    modelValue: '',
    label: '',
    hint: '',
  },
)

const emit = defineEmits<{ 'update:modelValue': [value: string] }>()

const uid = useId()
const labelId = `${uid}-label`
const optionsRef = ref<HTMLElement | null>(null)

const labelledBy = computed(() => (props.label ? labelId : undefined))
const selectedIndex = computed(() => props.options.findIndex((item) => item.value === props.modelValue))

/**
 * Индекс сегмента, доступного по Tab: выбранный, а пока выбора нет —
 * первый доступный. Так группа занимает в обходе ровно одну остановку.
 */
const tabbableIndex = computed(() => (selectedIndex.value >= 0 ? selectedIndex.value : findEnabled(0, 1)))

function isSelected(option: ChoiceOptionItem): boolean {
  return option.value === props.modelValue
}

function isTabbable(index: number): boolean {
  return index === tabbableIndex.value
}

/** Ближайший доступный сегмент, начиная с start и двигаясь шагом step. */
function findEnabled(start: number, step: number): number {
  for (let index = start; index >= 0 && index < props.options.length; index += step) {
    if (!props.options[index].disabled) {
      return index
    }
  }
  return -1
}

function choose(option: ChoiceOptionItem): void {
  if (option.value === props.modelValue) {
    return
  }
  emit('update:modelValue', option.value)
}

/** Переносит фокус на сегмент с указанным индексом после перерисовки. */
async function focusOption(index: number): Promise<void> {
  await nextTick()
  const buttons = optionsRef.value?.querySelectorAll('button')
  buttons?.item(index)?.focus()
}

/** Выбирает сегмент по индексу и уводит на него фокус. */
function selectAt(index: number): void {
  const option = props.options[index]
  if (!option) {
    return
  }
  choose(option)
  void focusOption(index)
}

function move(step: number): void {
  const from = selectedIndex.value < 0 ? -step : selectedIndex.value
  const next = findEnabled(from + step, step)
  if (next >= 0) {
    selectAt(next)
  }
}

function moveEdge(toEnd: boolean): void {
  const next = toEnd ? findEnabled(props.options.length - 1, -1) : findEnabled(0, 1)
  if (next >= 0) {
    selectAt(next)
  }
}

function handleKeydown(event: KeyboardEvent): void {
  switch (event.key) {
    case 'ArrowRight':
    case 'ArrowDown':
      event.preventDefault()
      move(1)
      break
    case 'ArrowLeft':
    case 'ArrowUp':
      event.preventDefault()
      move(-1)
      break
    case 'Home':
    case 'End':
      event.preventDefault()
      moveEdge(event.key === 'End')
      break
    default:
      break
  }
}
</script>

<style lang="scss" scoped>
.avanti-choice-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;

  &__options {
    display: flex;
    gap: 10px;
    align-items: stretch;
    width: 100%;
  }

  @include desktop-up {
    gap: 16px;

    &__options {
      gap: 16px;
    }
  }
}
</style>
