<!--
  Страница «Cambia password» (кадр 1:3226, мобильный 22:3181).

  МОБИЛЬНАЯ ВЕРСИЯ: в задании этот кадр числился отсутствующим. Он есть,
  но подписан в Figma как «Cambia email» (22:3181) — внутри именно окно
  смены пароля с тремя полями. Мобильная раскладка взята из него и совпадает
  с окном смены почты: ширина 350px, поля 44px, кнопки в ряд по половине
  ширины. Отдельных отличий от образца «Cambia email» в макете нет.

  Та же раскладка профиля с сразу открытым окном смены пароля.
  Закрытие окна оставляет страницу профиля — возврат по маршруту
  подключается на этапе интеграции.
-->
<template>
  <AvantiProfileLayout :data-card="dataCard" :security="security" @open="openDialog">
    <template #dialog>
      <AvantiProfileSettingsForm :open="isOpen" :content="passwordForm" @close="closeDialog" />
    </template>
  </AvantiProfileLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AvantiProfileLayout from '@/components/profile/avanti_profile_layout.vue'
import AvantiProfileSettingsForm from '@/components/profile/avanti_profile_settings_form.vue'
import {
  AVANTI_PROFILE_DATA_CARD as dataCard,
  AVANTI_PROFILE_PASSWORD_FORM as passwordForm,
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
