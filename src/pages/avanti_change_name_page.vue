<!--
  Страница «Modifica nome» (кадр 1:2773, мобильный 17:2626).

  Это та же раскладка профиля, что и на avanti_profile_page, поверх которой
  сразу открыто окно смены имени и фамилии. Закрытие окна оставляет
  страницу профиля — возврат по маршруту подключается на этапе интеграции.
-->
<template>
  <AvantiProfileLayout :data-card="dataCard" :security="security" @open="openDialog">
    <template #dialog>
      <AvantiProfileSettingsForm :open="isOpen" :content="nameForm" @close="closeDialog" />
    </template>
  </AvantiProfileLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AvantiProfileLayout from '@/components/profile/avanti_profile_layout.vue'
import AvantiProfileSettingsForm from '@/components/profile/avanti_profile_settings_form.vue'
import {
  AVANTI_PROFILE_DATA_CARD as dataCard,
  AVANTI_PROFILE_NAME_FORM as nameForm,
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
