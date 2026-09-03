<!--
  Полоса шагов мастера («1. IBAN / 2. COMMISSIONE / 3. COORDINATE»,
  кадр «Шаги оплаты», Figma 1:352 / 33:7113).

  Доступность — по паттерну WAI-ARIA tabs: контейнер role="tablist",
  вкладки role="tab" с aria-selected и aria-controls. В обход по Tab попадает
  только текущая вкладка (roving tabindex), между вкладками ходят стрелками
  ← →, Home/End прыгают к краям; недоступные шаги пропускаются.
-->
<template>
  <div ref="listRef" class="avanti-tabs" role="tablist" :aria-label="label" @keydown="handleKeydown">
    <AvantiTab
      v-for="(item, index) in items"
      :key="item.id"
      :label="item.label"
      :selected="item.id === modelValue"
      :state="item.state"
      :tabbable="isTabbable(index)"
      :element-id="tabElementId(item)"
      :panel-id="item.panelId"
      @select="choose(item)"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, ref } from 'vue'
import AvantiTab from '@/components/ui/avanti_tab.vue'
import type { AvantiTabItem } from '@/types/avanti_tabs'

const props = withDefaults(
  defineProps<{
    /** Идентификатор открытого шага. */
    modelValue: string
    /** Шаги мастера слева направо. */
    items: AvantiTabItem[]
    /** Доступное имя полосы вкладок. */
    label?: string
  }>(),
  {
    label: undefined,
  },
)

const emit = defineEmits<{ 'update:modelValue': [value: string] }>()

const listRef = ref<HTMLElement | null>(null)

const selectedIndex = computed(() => props.items.findIndex((item) => item.id === props.modelValue))

/**
 * Индекс вкладки, доступной по Tab: открытая, а если открытой нет —
 * первая доступная. Полоса занимает в обходе ровно одну остановку.
 */
const tabbableIndex = computed(() => (selectedIndex.value >= 0 ? selectedIndex.value : findEnabled(0, 1)))

function isTabbable(index: number): boolean {
  return index === tabbableIndex.value
}

/** `id` элемента вкладки выводится из `panelId`, чтобы панель могла на него сослаться. */
function tabElementId(item: AvantiTabItem): string | undefined {
  return item.panelId ? `${item.panelId}-tab` : undefined
}

/** Ближайший доступный шаг, начиная с start и двигаясь шагом step. */
function findEnabled(start: number, step: number): number {
  for (let index = start; index >= 0 && index < props.items.length; index += step) {
    if (props.items[index].state !== 'locked') {
      return index
    }
  }
  return -1
}

function choose(item: AvantiTabItem): void {
  if (item.id === props.modelValue) {
    return
  }
  emit('update:modelValue', item.id)
}

/** Переносит фокус на вкладку с указанным индексом после перерисовки. */
async function focusTab(index: number): Promise<void> {
  await nextTick()
  listRef.value?.querySelectorAll('button').item(index)?.focus()
}

/** Открывает шаг по индексу и уводит на него фокус. */
function selectAt(index: number): void {
  const item = props.items[index]
  if (!item) {
    return
  }
  choose(item)
  void focusTab(index)
}

function move(step: number): void {
  const from = selectedIndex.value < 0 ? -step : selectedIndex.value
  const next = findEnabled(from + step, step)
  if (next >= 0) {
    selectAt(next)
  }
}

function moveEdge(toEnd: boolean): void {
  const next = toEnd ? findEnabled(props.items.length - 1, -1) : findEnabled(0, 1)
  if (next >= 0) {
    selectAt(next)
  }
}

function handleKeydown(event: KeyboardEvent): void {
  switch (event.key) {
    case 'ArrowRight':
      event.preventDefault()
      move(1)
      break
    case 'ArrowLeft':
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
.avanti-tabs {
  display: flex;

  /* Зазор 2px между шагами — из макета: полоса читается как один элемент. */
  gap: 2px;
  align-items: stretch;
  width: 100%;
}
</style>
