<!--
  Форма модального окна авторизации: переключатель экранов, почта, пароль,
  кнопка и подпись о шифровании.

  Кадры регистрации (0:1235 / 7:1017) и входа (0:1338 / 8:1017) собраны из
  одной и той же формы и отличаются тремя вещами — все три задаёт проп `mode`:
  порядком половин переключателя (активная стоит первой), полем подтверждения
  пароля (только регистрация) и назначением автозаполнения пароля.

  Контейнером служит примитив avanti_form_card с тегом form; собственные
  поля, тень и скругления ему не нужны — их даёт модальное окно.
-->
<template>
  <AvantiFormCard class="avanti-auth-form" tag="form" @submit.prevent="handleSubmit">
    <AvantiSegmentedNav
      class="avanti-auth-form__tabs"
      :items="tabs"
      :active-id="mode"
      @select="handleSelect"
    />
    <AvantiModalField
      v-model="values.email"
      :label="shared.emailLabel"
      type="email"
      name="email"
      autocomplete="email"
      size="sm"
    />
    <AvantiModalPasswordField
      v-model="values.password"
      :label="shared.passwordLabel"
      :show-label="shared.showPassword"
      :hide-label="shared.hidePassword"
      name="password"
      :autocomplete="passwordAutocomplete"
      size="sm"
    />
    <AvantiModalPasswordField
      v-if="isSignUp"
      v-model="values.passwordConfirm"
      :label="shared.passwordConfirmLabel"
      :show-label="shared.showPassword"
      :hide-label="shared.hidePassword"
      name="password-confirm"
      autocomplete="new-password"
      size="sm"
    />
    <AvantiButton class="avanti-auth-form__submit" size="sm" type="submit">
      {{ texts.submit }}
    </AvantiButton>
    <p class="avanti-auth-form__note">{{ shared.note }}</p>
  </AvantiFormCard>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue'
import AvantiFormCard from '@/components/ui/avanti_form_card.vue'
import AvantiButton from '@/components/ui/avanti_button.vue'
import AvantiSegmentedNav from '@/components/ui/avanti_segmented_nav.vue'
import AvantiModalField from '@/components/ui/avanti_modal_field.vue'
import AvantiModalPasswordField from '@/components/ui/avanti_modal_password_field.vue'
import {
  AVANTI_AUTH_SCREEN_TEXTS,
  AVANTI_AUTH_SHARED_TEXTS as shared,
  AVANTI_AUTH_TABS,
} from '@/constants/avanti_auth_content'
import type { AvantiAuthFormValues, AvantiAuthMode } from '@/types/avanti_auth'

const props = defineProps<{ mode: AvantiAuthMode }>()

const emit = defineEmits<{
  submit: [values: AvantiAuthFormValues]
  select: [id: string]
}>()

const isSignUp = computed<boolean>(() => props.mode === 'sign-up')

const texts = computed(() => AVANTI_AUTH_SCREEN_TEXTS[props.mode])

/** В обоих кадрах активная половина переключателя стоит слева. */
const tabs = computed(() =>
  isSignUp.value
    ? [AVANTI_AUTH_TABS.signUp, AVANTI_AUTH_TABS.signIn]
    : [AVANTI_AUTH_TABS.signIn, AVANTI_AUTH_TABS.signUp],
)

/** Менеджеру паролей нужно знать, придумывают пароль или вводят прежний. */
const passwordAutocomplete = computed<string>(() => (isSignUp.value ? 'new-password' : 'current-password'))

const values = reactive({
  email: '',
  password: '',
  passwordConfirm: '',
})

/* Отправка появится вместе с API: вёрстка только сообщает о событии. */
function handleSubmit(): void {
  emit('submit', isSignUp.value ? { ...values } : { email: values.email, password: values.password })
}

function handleSelect(id: string): void {
  emit('select', id)
}
</script>

<style lang="scss" scoped>
/*
 * Отступы карточки формы переопределяются в контексте модального окна.
 * Селектор составной (класс блока + класс примитива): корневой элемент
 * дочернего компонента получает оба класса, и составной селектор гарантированно
 * перебивает собственные правила примитива независимо от порядка стилей.
 */
.avanti-auth-form {
  &.avanti-form-card {
    gap: 16px;

    /* Поля формы задаёт само модальное окно. */
    padding: 0;
    border-radius: 0;
    box-shadow: none;
  }

  &__tabs {
    align-self: stretch;
  }

  &__note {
    font-size: 11px;
    font-weight: var(--avanti-font-weight-regular);
    line-height: normal;
    color: var(--avanti-color-text-heading-strong);
    text-align: center;
  }

  @include desktop-up {
    &.avanti-form-card {
      gap: 24px;
      max-width: none;
      padding: 0;
    }

    &__tabs {
      align-self: center;
    }

    /*
     * Строка подписи поля в макете занимает 20px. Без явной высоты Chrome
     * отдаёт для Inter 14px около 17px, каждое поле становится на 3px ниже,
     * и всё, что лежит под ним, уезжает вверх относительно макета.
     * Правило локальное: размер `sm` встречается только в окнах входа.
     */
    :deep(.avanti-field-label__text) {
      line-height: 20px;
    }

    &__note {
      font-family: var(--avanti-font-family-alt);
      font-size: 14px;
      line-height: 20px;
    }
  }
}
</style>
