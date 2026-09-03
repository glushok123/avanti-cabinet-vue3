<!--
  Страница «Войти в аккаунт» (кадры 0:1338 и 8:1017).
  Модальное окно входа лежит поверх экрана одобрения кредита:
  фон собран из тех же компонентов онбординга, что и страница «Кредит апрув».
  Оболочка окна — общий примитив avanti_modal в брендовом варианте.

  Переходы (крестик, вкладка «Crea account», отправка формы) появятся вместе
  с маршрутами и API — на этапе вёрстки страница на события не подписана.
-->
<template>
  <div class="avanti-sign-in-page">
    <h1 class="avanti-sign-in-page__title">{{ texts.pageTitle }}</h1>
    <AvantiSimulationHeader :menu-label="shared.menu" />
    <main class="avanti-sign-in-page__body">
      <AvantiAuthBackdropContent />
    </main>
    <AvantiModal :open="isOpen" variant="brand" :label="texts.dialogLabel" :close-label="shared.closeLabel">
      <template #header-center>
        <AvantiLogo :size="logoSize" />
      </template>
      <template #header>
        <AvantiModalIntro :title="texts.title" :lines="subtitleLines" size="sm" />
      </template>
      <AvantiAuthSignInForm />
    </AvantiModal>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useIsMobile } from '@/composables/use_is_mobile'
import AvantiSimulationHeader from '@/components/layout/avanti_simulation_header.vue'
import AvantiAuthBackdropContent from '@/components/auth/avanti_auth_backdrop_content.vue'
import AvantiModal from '@/components/ui/avanti_modal.vue'
import AvantiModalIntro from '@/components/ui/avanti_modal_intro.vue'
import AvantiLogo from '@/components/ui/avanti_logo.vue'
import AvantiAuthSignInForm from '@/components/auth/avanti_auth_sign_in_form.vue'
import {
  AVANTI_AUTH_SHARED_TEXTS as shared,
  AVANTI_SIGN_IN_TEXTS as texts,
} from '@/constants/avanti_auth_content'

/** В макете окно открыто всегда: закрытие подключается вместе с маршрутами. */
const isOpen = true

/** Подпись под заголовком в макете умещается в одну строку. */
const subtitleLines = [shared.subtitle]

const isMobile = useIsMobile()

/** В макете логотип окна мельче шапочного: sm на мобильной, lg на десктопе. */
const logoSize = computed(() => (isMobile.value ? 'sm' : 'lg'))
</script>

<style lang="scss" scoped>
.avanti-sign-in-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  /* Иллюстрация фона выходит за правый край контентной колонки. */
  overflow-x: hidden;
  background-color: var(--avanti-color-page);

  /* Заголовок нужен только для доступности — в макете его нет. */
  &__title {
    @include visually-hidden;
  }

  &__body {
    display: flex;
    flex: 1 0 auto;
  }
}
</style>
