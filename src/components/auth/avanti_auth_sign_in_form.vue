<!--
  Форма входа внутри модального окна: переключатель экранов, почта, пароль,
  кнопка и подпись о шифровании. От регистрации отличается порядком половин
  переключателя и отсутствием поля подтверждения пароля.
-->
<template>
  <AvantiFormCard class="avanti-auth-sign-in-form" tag="form" @submit.prevent="handleSubmit">
    <AvantiSegmentedNav
      class="avanti-auth-sign-in-form__tabs"
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
      autocomplete="current-password"
      size="sm"
    />
    <AvantiButton class="avanti-auth-sign-in-form__submit" size="sm" type="submit">
      {{ texts.submit }}
    </AvantiButton>
    <p class="avanti-auth-sign-in-form__note">{{ shared.note }}</p>
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
  AVANTI_SIGN_IN_TEXTS as texts,
} from '@/constants/avanti_auth_content'
import type { AvantiAuthTabId, AvantiSignInFormValues } from '@/types/avanti_auth'

const emit = defineEmits<{
  submit: [values: AvantiSignInFormValues]
  select: [id: string]
}>()

/** На экране входа активна левая половина, и это «Accedi». */
const tabs = [AVANTI_AUTH_TABS.signIn, AVANTI_AUTH_TABS.signUp]
const activeTab: AvantiAuthTabId = AVANTI_AUTH_TABS.signIn.id

const values = reactive<AvantiSignInFormValues>({
  email: '',
  password: '',
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
/* Про составной селектор с .avanti-form-card — см. форму регистрации. */
.avanti-auth-sign-in-form {
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
