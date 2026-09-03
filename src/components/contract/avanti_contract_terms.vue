<!--
  Блок «Condizioni Finanziarie» (кадр Figma 22:4950): заголовок,
  ряд из трёх карточек условий и сноска о фиксированной ставке TAN.
-->
<template>
  <section class="avanti-contract-terms">
    <AvantiContractSectionTitle :text="terms.title" />
    <div class="avanti-contract-terms__row">
      <AvantiContractTermCard
        v-for="item in terms.items"
        :key="item.id"
        :label="item.label"
        :value="item.value"
        :highlighted="item.highlighted"
      />
    </div>
    <p class="avanti-contract-terms__note">{{ terms.note }}</p>
  </section>
</template>

<script setup lang="ts">
import AvantiContractSectionTitle from '@/components/contract/avanti_contract_section_title.vue'
import AvantiContractTermCard from '@/components/contract/avanti_contract_term_card.vue'
import type { AvantiContractTerms } from '@/types/avanti_contract'

defineProps<{ terms: AvantiContractTerms }>()
</script>

<style lang="scss" scoped>
.avanti-contract-terms {
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: flex-start;
  width: 100%;
  padding: 20px 32px;

  &__row {
    display: flex;
    gap: 16px;
    align-items: stretch;
    width: 100%;
  }

  &__note {
    margin: 0;
    font-size: 11px;
    font-weight: var(--avanti-font-weight-regular);
    line-height: normal;
    color: var(--avanti-color-text-secondary);
  }

  @include mobile {
    padding: 16px;

    /* Три карточки в ряд на 390px нечитаемы — раскладываем в столбец. */
    &__row {
      flex-direction: column;
      gap: 12px;
    }
  }
}
</style>
