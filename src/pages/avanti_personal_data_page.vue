<!--
  Страница «Dati personali» — анкета второго шага мастера.
  Карточка формы центрирована и не растягивается шире макета (1117px): на
  широких экранах увеличиваются только боковые отступы.

  Поле «Numero del documento» появляется после выбора типа документа — так же,
  как на развороте 263:7568: в базовом фрейме 0:977 этого поля ещё нет.
  Выпадающий список раскрывается в потоке и раздвигает форму (фрейм 0:1021),
  это поведение уже заложено в avanti_select.
-->
<template>
  <div class="avanti-personal-data-page">
    <AvantiSimulationHeader :menu-label="texts.menu" />
    <main class="avanti-personal-data-page__body">
      <AvantiFormCard tag="form" novalidate @submit.prevent="handleNext">
        <AvantiPersonalDataHeading :overline="texts.overline" :title="texts.title" />
        <AvantiPersonalDataFieldRow>
          <AvantiTextField
            v-model="values.lastName"
            :label="texts.lastNameLabel"
            :placeholder="texts.lastNamePlaceholder"
            name="family-name"
            autocomplete="family-name"
            :error-message="errors.lastName"
          />
          <AvantiTextField
            v-model="values.firstName"
            :label="texts.firstNameLabel"
            :placeholder="texts.firstNamePlaceholder"
            name="given-name"
            autocomplete="given-name"
            :error-message="errors.firstName"
          />
        </AvantiPersonalDataFieldRow>
        <AvantiChoiceGroup
          v-model="values.gender"
          :options="genderOptions"
          :label="texts.genderLabel"
          :hint="texts.genderHint"
        />
        <AvantiSelect
          v-model="values.documentType"
          :options="documentTypeOptions"
          :label="texts.documentTypeLabel"
          :placeholder="texts.documentTypePlaceholder"
          :error-message="errors.documentType"
        />
        <AvantiTextField
          v-if="hasDocumentType"
          v-model="values.documentNumber"
          :label="texts.documentNumberLabel"
          :placeholder="texts.documentNumberPlaceholder"
          name="document-number"
          autocomplete="off"
          :error-message="errors.documentNumber"
        />
        <AvantiPersonalDataConsent :badge="texts.consentBadge" :text="texts.consentText" />
        <AvantiSimulationActions
          :back-label="texts.actionBack"
          :next-label="texts.actionNext"
          @back="handleBack"
          @next="handleNext"
        />
      </AvantiFormCard>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useFlowNavigation } from '@/composables/use_flow_navigation'
import AvantiSimulationHeader from '@/components/layout/avanti_simulation_header.vue'
import AvantiSimulationActions from '@/components/simulation/avanti_simulation_actions.vue'
import AvantiFormCard from '@/components/ui/avanti_form_card.vue'
import AvantiTextField from '@/components/ui/avanti_text_field.vue'
import AvantiSelect from '@/components/ui/avanti_select.vue'
import AvantiChoiceGroup from '@/components/ui/avanti_choice_group.vue'
import AvantiPersonalDataHeading from '@/components/personal_data/avanti_personal_data_heading.vue'
import AvantiPersonalDataFieldRow from '@/components/personal_data/avanti_personal_data_field_row.vue'
import AvantiPersonalDataConsent from '@/components/personal_data/avanti_personal_data_consent.vue'
import { usePersonalDataForm } from '@/composables/use_personal_data_form'
import {
  AVANTI_DOCUMENT_TYPE_OPTIONS,
  AVANTI_GENDER_OPTIONS,
  AVANTI_PERSONAL_DATA_TEXTS,
} from '@/constants/avanti_personal_data_form'

const texts = AVANTI_PERSONAL_DATA_TEXTS
const genderOptions = AVANTI_GENDER_OPTIONS
const documentTypeOptions = AVANTI_DOCUMENT_TYPE_OPTIONS

const { values, errors, hasDocumentType } = usePersonalDataForm()

/*
 * Переходы мастера: порядок шагов задан в `avanti_flow`. Отправки анкеты пока
 * нет — она появится вместе с API, а `@submit.prevent` не даёт форме
 * перезагрузить страницу, поэтому переход остаётся управляемым роутером.
 */
const { goBack: handleBack, goNext: handleNext } = useFlowNavigation()
</script>

<style lang="scss" scoped>
.avanti-personal-data-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: var(--avanti-color-page);

  &__body {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 24px 16px 48px;
  }

  @include desktop-up {
    .avanti-personal-data-page__body {
      padding: 48px $content-gutter 80px;
    }
  }
}
</style>
