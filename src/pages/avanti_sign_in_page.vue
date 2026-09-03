<!--
  Страница маршрута «/sign-in» — кадры «Войти в аккаунт» (0:1338 и 8:1017).

  Разметка у входа и регистрации общая и живёт в `avanti_auth_layout`:
  страница задаёт только режим экрана. Так же устроены страницы профиля
  над общим `avanti_profile_layout`.
-->
<template>
  <AvantiAuthLayout mode="sign-in" />
</template>

<script setup lang="ts">
import AvantiAuthLayout from '@/components/auth/avanti_auth_layout.vue'
</script>
