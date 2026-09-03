<!--
  Страница «Cambia email» (кадр 1:2997, мобильный 22:2953).

  Та же раскладка профиля с сразу открытым окном смены почты.
  Закрытие окна оставляет страницу профиля — возврат по маршруту
  подключается на этапе интеграции.
-->
<template>
  <AvantiProfileLayout :data-card="dataCard" :security="security" @open="openDialog">
    <template #dialog>
      <AvantiProfileSettingsForm :open="isOpen" :content="emailForm" @close="closeDialog" />
    </template>
  </AvantiProfileLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AvantiProfileLayout from '@/components/profile/avanti_profile_layout.vue'
import AvantiProfileSettingsForm from '@/components/profile/avanti_profile_settings_form.vue'
import {
  AVANTI_PROFILE_DATA_CARD as dataCard,
  AVANTI_PROFILE_EMAIL_FORM as emailForm,
  AVANTI_PROFILE_SECURITY as security,
} from '@/constants/avanti_profile_content'

/** В макете окно уже открыто, поэтому начальное состояние — «открыто». */
const isOpen = ref(true)

function openDialog(): void {
  isOpen.value = true
}

function closeDialog(): void {
  isOpen.value = false
}
</script>
