<!--
  Форма регистрации внутри модального окна: переключатель экранов, почта,
  пароль с подтверждением, кнопка и подпись о шифровании.

  Контейнером служит примитив avanti_form_card с тегом form; собственные
  поля, тень и скругления ему не нужны — их даёт модальное окно.
-->
<template>
  <AvantiFormCard class="avanti-auth-sign-up-form" tag="form" @submit.prevent="handleSubmit">
    <AvantiSegmentedNav
      class="avanti-auth-sign-up-form__tabs"
      :items="tabs"
      :active-id="activeTab"
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
      autocomplete="new-password"
      size="sm"
    />
    <AvantiModalPasswordField
      v-model="values.passwordConfirm"
      :label="texts.passwordConfirmLabel"
      :show-label="shared.showPassword"
      :hide-label="shared.hidePassword"
      name="password-confirm"
      autocomplete="new-password"
      size="sm"
    />
    <AvantiButton class="avanti-auth-sign-up-form__submit" size="sm" type="submit">
      {{ texts.submit }}
    </AvantiButton>
    <p class="avanti-auth-sign-up-form__note">{{ shared.note }}</p>
  </AvantiFormCard>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import AvantiFormCard from '@/components/ui/avanti_form_card.vue'
import AvantiButton from '@/components/ui/avanti_button.vue'
import AvantiSegmentedNav from '@/components/ui/avanti_segmented_nav.vue'
import AvantiModalField from '@/components/ui/avanti_modal_field.vue'
import AvantiModalPasswordField from '@/components/ui/avanti_modal_password_field.vue'
import {
  AVANTI_AUTH_SHARED_TEXTS as shared,
  AVANTI_AUTH_TABS,
  AVANTI_SIGN_UP_TEXTS as texts,
} from '@/constants/avanti_auth_content'
import type { AvantiAuthTabId, AvantiSignUpFormValues } from '@/types/avanti_auth'

const emit = defineEmits<{
  submit: [values: AvantiSignUpFormValues]
  select: [id: string]
}>()

/** На экране регистрации активна левая половина. */
const tabs = [AVANTI_AUTH_TABS.signUp, AVANTI_AUTH_TABS.signIn]
const activeTab: AvantiAuthTabId = AVANTI_AUTH_TABS.signUp.id

const values = reactive<AvantiSignUpFormValues>({
  email: '',
  password: '',
  passwordConfirm: '',
})

/* Отправка появится вместе с API: вёрстка только сообщает о событии. */
function handleSubmit(): void {
  emit('submit', { ...values })
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
.avanti-auth-sign-up-form {
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
