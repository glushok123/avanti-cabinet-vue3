<!--
  Нумерованный раздел условий договора (кадры Figma 22:5154 … 22:5169):
  заголовок раздела и одна или несколько групп абзацев,
  у части групп есть свой подзаголовок («Obblighi del Mutuatario:»).
-->
<template>
  <section class="avanti-contract-clause-section">
    <AvantiContractSectionTitle :text="section.title" />
    <div v-for="group in section.groups" :key="group.id" class="avanti-contract-clause-section__group">
      <h4 v-if="group.subtitle" class="avanti-contract-clause-section__subtitle">
        {{ group.subtitle }}
      </h4>
      <div class="avanti-contract-clause-section__paragraphs">
        <p
          v-for="(paragraph, index) in group.paragraphs"
          :key="index"
          class="avanti-contract-clause-section__paragraph"
        >
          {{ paragraph }}
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import AvantiContractSectionTitle from '@/components/contract/avanti_contract_section_title.vue'
import type { AvantiContractSection } from '@/types/avanti_contract'

defineProps<{ section: AvantiContractSection }>()
</script>

<style lang="scss" scoped>
.avanti-contract-clause-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: flex-start;
  width: 100%;
  padding: 12px 32px;

  &__group {
    display: flex;
    flex-direction: column;
    gap: 4px;
    align-items: flex-start;
    width: 100%;
  }

  &__subtitle {
    margin: 0;
    font-size: 12px;
    font-weight: var(--avanti-font-weight-semibold);
    line-height: normal;
    color: var(--avanti-color-text-strong);
  }

  /* В макете абзацы разделены пустой строкой — здесь ту же высоту
     даёт отступ в 15px (одна строка текста 12px). */
  &__paragraphs {
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 100%;
  }

  &__paragraph {
    margin: 0;
    font-size: 12px;
    font-weight: var(--avanti-font-weight-regular);
    line-height: normal;
    color: var(--avanti-color-text-secondary);
  }

  @include mobile {
    gap: 12px;
    padding: 12px 16px;
  }
}
</style>
