<!--
  Страница профиля (кадр 1:2583, мобильные 19:1228 и 22:3408).

  Базовое состояние раскладки настроек — без открытого модального окна.
  Кнопки «Modifica nome», «Cambia password» и «Cambia email» открывают
  соответствующую форму: в макете каждая из них ведёт на отдельный экран,
  но маршруты подключаются на этапе интеграции, поэтому здесь показывается
  то же окно, что и на выделенных страницах.
-->
<template>
  <AvantiProfileLayout :data-card="dataCard" :security="security" :consultant="consultant" @open="openForm">
    <template #dialog>
      <AvantiProfileSettingsForm :open="isNameOpen" :content="nameForm" @close="closeForm" />
      <AvantiProfileSettingsForm :open="isEmailOpen" :content="emailForm" @close="closeForm" />
      <AvantiProfileSettingsForm :open="isPasswordOpen" :content="passwordForm" @close="closeForm" />
    </template>
  </AvantiProfileLayout>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import AvantiProfileLayout from '@/components/profile/avanti_profile_layout.vue'
import AvantiProfileSettingsForm from '@/components/profile/avanti_profile_settings_form.vue'
import {
  AVANTI_PROFILE_CONSULTANT as consultant,
  AVANTI_PROFILE_DATA_CARD as dataCard,
  AVANTI_PROFILE_EMAIL_FORM as emailForm,
  AVANTI_PROFILE_NAME_FORM as nameForm,
  AVANTI_PROFILE_PASSWORD_FORM as passwordForm,
  AVANTI_PROFILE_SECURITY as security,
} from '@/constants/avanti_profile_content'

/** Идентификатор открытой формы; пустая строка — все окна закрыты. */
const activeForm = ref('')

const isNameOpen = computed(() => activeForm.value === 'name')
const isEmailOpen = computed(() => activeForm.value === 'email')
const isPasswordOpen = computed(() => activeForm.value === 'password')

function openForm(id: string): void {
  activeForm.value = id
}

function closeForm(): void {
  activeForm.value = ''
}
</script>
