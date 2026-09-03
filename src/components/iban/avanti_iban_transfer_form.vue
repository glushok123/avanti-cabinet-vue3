<!--
  Форма вывода средств внутри карточки одобренной суммы
  (кадры Figma 31:6422 — десктоп 728px, 33:6817 — мобильная 334px).

  От модальной панели отличается содержимым: здесь выбирается способ
  получения денег (перевод на счёт или на карту), а кроме номера
  запрашивается владелец счёта. Логотипа в шапке нет, зато есть
  собственная кнопка закрытия — форма лежит прямо на странице.
-->
<template>
  <section class="avanti-iban-transfer-form">
    <header class="avanti-iban-transfer-form__head">
      <button
        class="avanti-iban-transfer-form__close"
        type="button"
        :aria-label="content.closeLabel"
        @click="close"
      >
        <AvantiIconClose :stroke-width="2" />
      </button>
      <h2 class="avanti-iban-transfer-form__title">
        <span v-for="line in content.titleLines" :key="line" class="avanti-iban-transfer-form__title-line">
          {{ line }}
        </span>
      </h2>
      <p class="avanti-iban-transfer-form__description">{{ content.description }}</p>
    </header>

    <div class="avanti-iban-transfer-form__body">
      <AvantiIbanTabs
        class="avanti-iban-transfer-form__tabs"
        :tabs="content.tabs"
        :active-id="currentMethod"
        :label="content.tabsLabel"
        @select="selectMethod"
      />
      <AvantiIbanField
        :model-value="currentIban"
        :label="content.ibanLabel"
        :placeholder="content.ibanPlaceholder"
        @update:model-value="updateIban"
      />
      <AvantiIbanTextField
        :model-value="currentOwner"
        :label="content.ownerLabel"
        :placeholder="content.ownerPlaceholder"
        autocomplete="name"
        @update:model-value="updateOwner"
      />
      <AvantiIbanActionButton @click="submit">{{ content.submitLabel }}</AvantiIbanActionButton>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import AvantiIconClose from '@/components/icons/avanti_icon_close.vue'
import AvantiIbanTabs from '@/components/iban/avanti_iban_tabs.vue'
import AvantiIbanField from '@/components/iban/avanti_iban_field.vue'
import AvantiIbanTextField from '@/components/iban/avanti_iban_text_field.vue'
import AvantiIbanActionButton from '@/components/iban/avanti_iban_action_button.vue'
import type { AvantiIbanTransferContent } from '@/types/avanti_iban'

const props = withDefaults(
  defineProps<{
    content: AvantiIbanTransferContent
    /** Отформатированный по группам номер счёта. */
    iban?: string
    /** Владелец счёта. */
    owner?: string
    /** Выбранный способ получения средств — id вкладки. */
    method?: string
  }>(),
  { iban: '', owner: '', method: '' },
)

const emit = defineEmits<{
  'update:iban': [value: string]
  'update:owner': [value: string]
  'update:method': [id: string]
  submit: []
  close: []
}>()

/* Значения дублируются внутри: форма работает и без привязок снаружи. */
const currentIban = ref<string>(props.iban)
const currentOwner = ref<string>(props.owner)
const currentMethod = ref<string>(props.method || props.content.tabs[0].id)

watch(
  () => props.iban,
  (value) => {
    currentIban.value = value
  },
)

watch(
  () => props.owner,
  (value) => {
    currentOwner.value = value
  },
)

watch(
  () => props.method,
  (value) => {
    if (value) {
      currentMethod.value = value
    }
  },
)

function updateIban(value: string): void {
  currentIban.value = value
  emit('update:iban', value)
}

function updateOwner(value: string): void {
  currentOwner.value = value
  emit('update:owner', value)
}

function selectMethod(id: string): void {
  currentMethod.value = id
  emit('update:method', id)
}

function submit(): void {
  emit('submit')
}

function close(): void {
  emit('close')
}
</script>

<style lang="scss" scoped>
/* Скругление панели снято с макета, отдельного токена под него нет. */
$panel-radius: 23px;

.avanti-iban-transfer-form {
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: var(--avanti-color-surface);
  border-radius: $panel-radius;

  &__head {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 12px 24px 32px;
    text-align: center;
  }

  /* Кнопка закрытия прижата к правому краю и не влияет на высоту шапки. */
  &__close {
    @include button-reset;
    @include focus-ring;

    display: flex;
    flex-shrink: 0;
    align-items: center;
    align-self: flex-end;
    justify-content: center;
    width: 32px;
    height: 32px;
    margin-bottom: 12px;
    color: var(--avanti-color-primary);
    border-radius: var(--avanti-radius-round);
    transition: color var(--avanti-transition-fast);

    &:hover {
      color: var(--avanti-color-primary-dark);
    }
  }

  &__title {
    display: flex;
    flex-direction: column;
    font-size: 26px;
    font-weight: var(--avanti-font-weight-semibold);
    line-height: 1;
    color: var(--avanti-color-text-heading-strong);
    text-transform: uppercase;
    letter-spacing: -0.6px;
  }

  &__description {
    font-family: var(--avanti-font-family-alt);
    font-size: 16px;
    font-weight: var(--avanti-font-weight-regular);
    line-height: 20px;
    color: var(--avanti-color-text-secondary);
  }

  &__body {
    display: flex;
    flex-direction: column;
    gap: 24px;
    align-items: center;
    padding: 0 24px 36px;
  }

  /* Переключатель у́же полей и стоит по центру формы — так в макете. */
  &__tabs {
    width: 488px;
    max-width: 100%;
  }

  @include mobile {
    &__head {
      padding: 12px;
    }

    &__title {
      font-size: 18px;
      line-height: 21px;
    }

    &__description {
      font-size: 14px;
    }

    &__body {
      padding: 0 12px 36px;
    }

    &__tabs {
      width: 100%;
    }
  }
}
</style>
