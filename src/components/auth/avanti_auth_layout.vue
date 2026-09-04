<!--
  Экран авторизации целиком: модальное окно поверх страницы одобрения кредита.
  Кадры «Создать аккаунт» (0:1235 / 7:1017) и «Войти в аккаунт» (0:1338 /
  8:1017) — одна и та же раскладка, поэтому она собрана здесь один раз,
  а страницы маршрутов различаются только пропом `mode`.

  Фон собран из тех же компонентов онбординга, что и страница «Кредит апрув».
  Оболочка окна — общий примитив avanti_modal в брендовом варианте.

  Переходы (крестик, вторая половина переключателя, отправка формы) появятся
  вместе с API — на этапе вёрстки экран на события не подписан.
-->
<template>
  <div class="avanti-auth-layout">
    <h1 class="avanti-auth-layout__title">{{ texts.pageTitle }}</h1>
    <AvantiSimulationHeader :menu-label="shared.menu" />
    <main class="avanti-auth-layout__body">
      <AvantiAuthBackdropContent />
    </main>
    <AvantiModal :open="isOpen" variant="brand" :label="texts.dialogLabel" :close-label="shared.closeLabel">
      <template #header-center>
        <AvantiLogo :size="logoSize" />
      </template>
      <template #header>
        <AvantiModalIntro
          class="avanti-auth-layout__intro"
          :title="texts.title"
          :lines="subtitleLines"
          size="sm"
        />
      </template>
      <AvantiAuthForm :mode="mode" @submit="goNext" />
    </AvantiModal>
  </div>
</template>

<script setup lang="ts">
import { useFlowNavigation } from '@/composables/use_flow_navigation'
import { computed } from 'vue'
import { useIsMobile } from '@/composables/use_is_mobile'
import AvantiSimulationHeader from '@/components/layout/avanti_simulation_header.vue'
import AvantiAuthBackdropContent from '@/components/auth/avanti_auth_backdrop_content.vue'
import AvantiModal from '@/components/ui/avanti_modal.vue'
import AvantiModalIntro from '@/components/ui/avanti_modal_intro.vue'
import AvantiLogo from '@/components/ui/avanti_logo.vue'
import AvantiAuthForm from '@/components/auth/avanti_auth_form.vue'
import { AVANTI_AUTH_SCREEN_TEXTS, AVANTI_AUTH_SHARED_TEXTS as shared } from '@/constants/avanti_auth_content'
import type { AvantiAuthMode } from '@/types/avanti_auth'

const props = defineProps<{ mode: AvantiAuthMode }>()

const texts = computed(() => AVANTI_AUTH_SCREEN_TEXTS[props.mode])

/** В макете окно открыто всегда: закрытие подключается вместе с маршрутами. */
const isOpen = true

/** Подпись под заголовком в макете умещается в одну строку. */
const subtitleLines = [shared.subtitle]

const isMobile = useIsMobile()

/** В макете логотип окна мельче шапочного: sm на мобильной, lg на десктопе. */
const logoSize = computed(() => (isMobile.value ? 'sm' : 'lg'))

/**
 * Отправка формы ведёт к следующему шагу сценария: регистрация — к
 * подтверждению почты, вход — сразу в кабинет. Проверок пока нет, они
 * появятся вместе с API.
 */
const { goNext } = useFlowNavigation()
</script>

<style lang="scss" scoped>
.avanti-auth-layout {
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

  /*
   * В кадре между логотипом окна и заголовком 26px, а общий зазор
   * брендового окна — 24px. Двух пикселей не хватает, и всё содержимое
   * ниже заголовка встаёт выше макета. Правка точечная: менять общий
   * зазор avanti_modal нельзя — он общий для всех модальных окон.
   */
  @include desktop-up {
    &__intro {
      margin-top: 2px;
    }
  }
}
</style>
