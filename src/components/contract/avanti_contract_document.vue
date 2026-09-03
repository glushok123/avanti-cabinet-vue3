<!--
  Документ договора целиком (кадр Figma 22:4902): белая карточка,
  внутри которой блоки идут сверху вниз и разделяются линиями 1px.
  Порядок блоков и разделители повторяют макет.
-->
<template>
  <article class="avanti-contract-document" :aria-label="label">
    <AvantiContractDocumentHeader :title="heading.title" :subtitle="heading.subtitle" />
    <span class="avanti-contract-document__divider" />
    <AvantiContractMetaRow :meta="meta" />
    <span class="avanti-contract-document__divider" />
    <AvantiContractParties :parties="parties" />
    <span class="avanti-contract-document__divider" />
    <AvantiContractFields :fields="fields" />
    <span class="avanti-contract-document__divider" />
    <AvantiContractTerms :terms="terms" />
    <span class="avanti-contract-document__divider" />
    <AvantiContractPurposeRow :purpose="purpose" />
    <AvantiContractSchedule :schedule="schedule" />
    <AvantiContractClauseSection v-for="section in sections" :key="section.id" :section="section" />
    <AvantiContractSignatures :signatures="signatures" />
  </article>
</template>

<script setup lang="ts">
import AvantiContractClauseSection from '@/components/contract/avanti_contract_clause_section.vue'
import AvantiContractDocumentHeader from '@/components/contract/avanti_contract_document_header.vue'
import AvantiContractFields from '@/components/contract/avanti_contract_fields.vue'
import AvantiContractMetaRow from '@/components/contract/avanti_contract_meta_row.vue'
import AvantiContractParties from '@/components/contract/avanti_contract_parties.vue'
import AvantiContractPurposeRow from '@/components/contract/avanti_contract_purpose_row.vue'
import AvantiContractSchedule from '@/components/contract/avanti_contract_schedule.vue'
import AvantiContractSignatures from '@/components/contract/avanti_contract_signatures.vue'
import AvantiContractTerms from '@/components/contract/avanti_contract_terms.vue'
import type {
  AvantiContractDocumentHeading,
  AvantiContractField,
  AvantiContractMeta,
  AvantiContractParties as PartiesContent,
  AvantiContractPurpose,
  AvantiContractSchedule as ScheduleContent,
  AvantiContractSection,
  AvantiContractSignature,
  AvantiContractTerms as TermsContent,
} from '@/types/avanti_contract'

defineProps<{
  label: string
  heading: AvantiContractDocumentHeading
  meta: AvantiContractMeta
  parties: PartiesContent
  fields: AvantiContractField[]
  terms: TermsContent
  purpose: AvantiContractPurpose
  schedule: ScheduleContent
  sections: AvantiContractSection[]
  signatures: AvantiContractSignature[]
}>()
</script>

<style lang="scss" scoped>
.avanti-contract-document {
  @include inner-border(var(--avanti-color-border));

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  overflow: hidden;
  background-color: var(--avanti-color-surface);
  border-radius: var(--avanti-radius-xl);

  &__divider {
    width: 100%;
    height: 1px;
    background-color: var(--avanti-color-divider);
  }
}
</style>
