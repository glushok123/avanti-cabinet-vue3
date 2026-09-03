<!--
  Содержимое модальной панели «IBAN per l’accredito»
  (кадры Figma 1:1366 и 1:1521 — десктоп, 104:8482 и 104:8551 — мобильная).

  Панель не знает, во что вложена: белую подложку, скругление и кнопку
  закрытия рисует оболочка модального окна. Здесь только шапка с логотипом,
  переключатель шагов и содержимое текущего шага.

  Шаги отличаются только телом: `account` — поле ввода с подсказкой и
  кнопкой «Continua», `verify` — плашка с набранным номером, предупреждение
  и пара кнопок «Modifica» / «Salva iban».
-->
<template>
  <section class="avanti-iban-panel">
    <header class="avanti-iban-panel__head">
      <AvantiLogo v-if="showLogo" class="avanti-iban-panel__logo" size="lg" />
      <div class="avanti-iban-panel__heading">
        <h2 class="avanti-iban-panel__title">{{ content.title }}</h2>
        <p class="avanti-iban-panel__description">{{ content.description }}</p>
      </div>
    </header>

    <div class="avanti-iban-panel__tabs">
      <AvantiIbanTabs
        :tabs="content.tabs"
        :active-id="currentStep"
        :label="content.tabsLabel"
        @select="handleSelect"
      />
    </div>

    <div v-if="isAccount" class="avanti-iban-panel__body">
      <div class="avanti-iban-panel__group">
        <AvantiIbanField
          :model-value="currentValue"
          :label="content.fieldLabel"
          :placeholder="content.placeholder"
          :described-by="hintId"
          @update:model-value="updateValue"
        />
        <AvantiIbanHint
          :id="hintId"
          :lead="hintLead"
          :lead-strong="isCounterShown"
          :note="content.maskNote"
        />
      </div>
      <AvantiIbanActionButton @click="submit">{{ content.submitLabel }}</AvantiIbanActionButton>
    </div>

    <div v-else class="avanti-iban-panel__body">
      <div class="avanti-iban-panel__group avanti-iban-panel__group--verify">
        <AvantiIbanCheckCard :title="content.verifyTitle" :value="currentValue" />
        <AvantiIbanHint :lead="content.verifyWarning" />
      </div>
      <div class="avanti-iban-panel__actions">
        <AvantiIbanActionButton variant="outline" @click="edit">
          {{ content.editLabel }}
        </AvantiIbanActionButton>
        <AvantiIbanActionButton @click="save">{{ content.saveLabel }}</AvantiIbanActionButton>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref, useId, watch } from 'vue'
import AvantiLogo from '@/components/ui/avanti_logo.vue'
import AvantiIbanTabs from '@/components/iban/avanti_iban_tabs.vue'
import AvantiIbanField from '@/components/iban/avanti_iban_field.vue'
import AvantiIbanHint from '@/components/iban/avanti_iban_hint.vue'
import AvantiIbanCheckCard from '@/components/iban/avanti_iban_check_card.vue'
import AvantiIbanActionButton from '@/components/iban/avanti_iban_action_button.vue'
import { AVANTI_IBAN_LENGTH } from '@/constants/avanti_iban_content'
import type { AvantiIbanPanelContent, AvantiIbanStep } from '@/types/avanti_iban'

const props = withDefaults(
  defineProps<{
    /** Все тексты панели. */
    content: AvantiIbanPanelContent
    /** Отформатированный по группам номер счёта. */
    modelValue?: string
    /** Открытый шаг панели. */
    step?: AvantiIbanStep
    /** Логотип Avanti в шапке; в макете он есть только у модального окна. */
    showLogo?: boolean
  }>(),
  { modelValue: '', step: 'account', showLogo: true },
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'update:step': [step: AvantiIbanStep]
  submit: [value: string]
  edit: []
  save: [value: string]
}>()

const uid = useId()
const hintId = `${uid}-hint`

/*
 * Значение и шаг дублируются внутри: панель остаётся рабочей и без
 * привязок снаружи, а при их наличии просто следует за пропами.
 */
const currentValue = ref<string>(props.modelValue)
const currentStep = ref<AvantiIbanStep>(props.step)

watch(
  () => props.modelValue,
  (value) => {
    currentValue.value = value
  },
)

watch(
  () => props.step,
  (value) => {
    currentStep.value = value
  },
)

const isAccount = computed(() => currentStep.value === 'account')

/** Число значащих символов номера — пробелы-разделители не считаются. */
const charCount = computed(() => currentValue.value.replace(/\s+/g, '').length)

/** Счётчик показывается, только пока номер набран частично. */
const isCounterShown = computed(() => charCount.value > 0 && charCount.value < AVANTI_IBAN_LENGTH)

const hintLead = computed(() =>
  isCounterShown.value
    ? props.content.missingCharsTemplate.replace('{count}', String(AVANTI_IBAN_LENGTH - charCount.value))
    : props.content.lengthRule,
)

function updateValue(value: string): void {
  currentValue.value = value
  emit('update:modelValue', value)
}

function goToStep(step: AvantiIbanStep): void {
  currentStep.value = step
  emit('update:step', step)
}

/** Клик по вкладке: идентификаторы вкладок совпадают с именами шагов. */
function handleSelect(id: string): void {
  goToStep(id === 'verify' ? 'verify' : 'account')
}

/** «Continua» — переход к проверке набранного номера. */
function submit(): void {
  goToStep('verify')
  emit('submit', currentValue.value)
}

/** «Modifica» — возврат к вводу. */
function edit(): void {
  goToStep('account')
  emit('edit')
}

/** «Salva iban» — сохранение решает родитель, панель только сообщает о нём. */
function save(): void {
  emit('save', currentValue.value)
}
</script>

<style lang="scss" scoped>
.avanti-iban-panel {
  display: flex;
  flex-direction: column;
  width: 100%;

  /*
   * Шапка: логотип, заголовок и пояснение по центру.
   * Верхний отступ 56px учитывает место кнопки закрытия — её рисует
   * оболочка модального окна, а не панель.
   */
  &__head {
    display: flex;
    flex-direction: column;
    gap: 24px;
    align-items: center;
    padding: 56px 24px 32px;
    text-align: center;
  }

  &__heading {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
  }

  &__title {
    font-size: 26px;
    font-weight: var(--avanti-font-weight-semibold);
    line-height: 1;
    color: var(--avanti-color-text-heading-strong);
    text-transform: uppercase;
    letter-spacing: -0.6px;
  }

  &__description {
    font-family: var(--avanti-font-family-alt);
    font-size: 14px;
    font-weight: var(--avanti-font-weight-regular);
    line-height: 20px;
    color: var(--avanti-color-text-secondary);
  }

  /* Переключатель в макете на 6px шире полей формы. */
  &__tabs {
    padding: 0 18px 36px;
  }

  &__body {
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding: 0 24px 36px;
  }

  &__group {
    display: flex;
    flex-direction: column;
    gap: 8px;

    /* На шаге проверки плашка и предупреждение разведены сильнее. */
    &--verify {
      gap: 20px;
    }
  }

  &__actions {
    display: flex;
    gap: 36px;
  }

  @include mobile {
    &__head {
      gap: 20px;
      padding: 64px 16px 24px;
    }

    &__title {
      font-size: 22px;
      line-height: 26px;
    }

    &__description {
      font-size: 12px;
      line-height: 18px;
    }

    &__tabs {
      padding: 0 16px 20px;
    }

    &__body {
      gap: 20px;
      padding: 0 16px 24px;
    }

    &__group {
      gap: 12px;
    }

    &__actions {
      gap: 12px;
    }
  }
}
</style>
