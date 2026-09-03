<!--
  Список требуемых документов (Figma 95:3877 + 95:3878): надпись-рубрика
  и переключатели типов документа. Обёрнут в fieldset — так группа
  переключателей получает общее имя для скринридеров.
-->
<template>
  <fieldset class="avanti-documents-requirements" :disabled="disabled">
    <legend class="avanti-documents-requirements__legend">{{ label }}</legend>
    <div class="avanti-documents-requirements__list">
      <AvantiDocumentsOption
        v-for="option in options"
        :key="option.id"
        :option="option"
        :name="name"
        :selected="option.id === selectedId"
        @select="handleSelect"
      />
    </div>
  </fieldset>
</template>

<script setup lang="ts">
import AvantiDocumentsOption from '@/components/documents/avanti_documents_option.vue'
import type { AvantiDocumentOption } from '@/types/avanti_documents'

defineProps<{
  /** Надпись-рубрика над списком: «Scegli il tipo di documento». */
  label: string
  options: AvantiDocumentOption[]
  /** Имя группы переключателей: у каждой панели своё. */
  name: string
  selectedId?: string
  disabled?: boolean
}>()

const emit = defineEmits<{ select: [id: string] }>()

function handleSelect(id: string): void {
  emit('select', id)
}
</script>

<style lang="scss" scoped>
/*
 * fieldset намеренно оставлен блочным: в браузерах legend не участвует
 * в раскладке flex-контейнера, поэтому отступ до списка задаётся margin.
 */
.avanti-documents-requirements {
  display: block;
  width: 100%;
  padding: 0;
  margin: 0;
  border: none;

  &__legend {
    padding: 0;
    font-size: 10px;
    font-weight: var(--avanti-font-weight-bold);
    line-height: normal;
    color: var(--avanti-color-text-tertiary);
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
    margin-top: 16px;
  }
}
</style>
