<!--
  Форма настроек аккаунта в модальном окне — одна оболочка для всех трёх
  окон профиля: «Modifica nome e cognome» (1:2773), «Cambia indirizzo email»
  (1:2997) и «Cambia password» (1:3226). Окна отличаются только набором
  полей, поэтому он приходит в контенте, а не в разметке.

  Оболочка окна — общий примитив avanti_modal в брендовом варианте:
  шапка «пусто — логотип — крестик», подпись по центру, поля и кнопки
  «Annulla» / «Salva» одинаковы во всех трёх кадрах.

  Поле с доступным именем кнопки-глаза (`toggleLabel`) собирается
  компонентом поля пароля, остальные — обычным полем модального окна.
-->
<template>
  <AvantiModal
    :open="open"
    variant="brand"
    :label="content.dialog.title"
    :close-label="content.dialog.closeLabel"
    @close="handleClose"
  >
    <template #header-center>
      <AvantiLogo :size="logoSize" tone="black" />
    </template>
    <template #header>
      <AvantiModalIntro :title="content.dialog.title" :lines="content.dialog.descriptionLines" />
    </template>
    <form class="avanti-profile-settings-form" :aria-label="texts.formLabel" @submit.prevent="handleSubmit">
      <template v-for="field in content.fields" :key="field.id">
        <AvantiModalPasswordField
          v-if="field.toggleLabel"
          v-model="values[field.id]"
          :label="field.label"
          :show-label="field.toggleLabel"
          :hide-label="field.toggleLabel"
          :autocomplete="field.autocomplete"
          :note="field.note"
        />
        <AvantiModalField
          v-else
          v-model="values[field.id]"
          :label="field.label"
          :type="field.type"
          :placeholder="field.placeholder"
          :autocomplete="field.autocomplete"
          :note="field.note"
        />
      </template>
      <div class="avanti-profile-settings-form__actions">
        <AvantiButton
          class="avanti-profile-settings-form__button"
          variant="outline"
          uppercase
          @click="handleClose"
        >
          {{ content.dialog.cancelLabel }}
        </AvantiButton>
        <AvantiButton class="avanti-profile-settings-form__button" type="submit" uppercase>
          {{ content.dialog.submitLabel }}
        </AvantiButton>
      </div>
    </form>
  </AvantiModal>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue'
import { useIsMobile } from '@/composables/use_is_mobile'
import AvantiModal from '@/components/ui/avanti_modal.vue'
import AvantiModalIntro from '@/components/ui/avanti_modal_intro.vue'
import AvantiModalField from '@/components/ui/avanti_modal_field.vue'
import AvantiModalPasswordField from '@/components/ui/avanti_modal_password_field.vue'
import AvantiLogo from '@/components/ui/avanti_logo.vue'
import AvantiButton from '@/components/ui/avanti_button.vue'
import { AVANTI_PROFILE_TEXTS as texts } from '@/constants/avanti_profile_content'
import type { AvantiProfileFormContent } from '@/types/avanti_profile'

const props = defineProps<{
  open: boolean
  content: AvantiProfileFormContent
}>()

const emit = defineEmits<{ close: [] }>()

/* Начальные значения — заглушки из макета; отправка будет на этапе интеграции. */
const values = reactive<Record<string, string>>(
  Object.fromEntries(props.content.fields.map((field) => [field.id, field.value])),
)

const isMobile = useIsMobile()

/*
 * В макете логотип модального окна крупнее мобильного (40×32 против 34×26)
 * и мельче десктопного, поэтому берётся ближайший размер общего компонента.
 */
const logoSize = computed(() => (isMobile.value ? 'md' : 'lg'))

function handleClose(): void {
  emit('close')
}

function handleSubmit(): void {
  emit('close')
}
</script>

<style lang="scss" scoped>
.avanti-profile-settings-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  width: 100%;

  &__actions {
    display: flex;
    gap: 12px;
    width: 100%;
  }

  /* Габариты кнопок из макета: 44px на мобильной, 50px на десктопе. */
  &__button.avanti-button {
    flex: 1 1 0;
    height: 44px;
    padding: 8px 16px;
    font-size: 15px;
    font-weight: var(--avanti-font-weight-semibold);
    border-width: 1px;
  }

  &__button.avanti-button--outline {
    background-color: var(--avanti-color-surface-tab);
  }

  /*
   * Метрики подписи поля из кадра 1:2977: строка подписи 20px, до поля 8px.
   * Общий компонент подписи отдаёт line-height: normal (17px) и зазор 12px,
   * из-за чего поле и всё под ним опускались на пиксель. Правится точечно
   * здесь: avanti_field_label и avanti_text_field общие для проекта.
   */
  :deep(.avanti-field-label__text) {
    line-height: 20px;
  }

  :deep(.avanti-text-field) {
    gap: 8px;
  }

  @include desktop-up {
    gap: 24px;

    &__actions {
      justify-content: space-between;
    }

    /* Ширина кнопки зафиксирована кадром Figma (220×50). */
    &__button.avanti-button {
      flex: 0 0 220px;
      height: 50px;
      font-size: 16px;
      font-weight: var(--avanti-font-weight-medium);
    }
  }
}
</style>
