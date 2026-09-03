<!--
  Страница маршрута «/sign-up» — кадры «Создать аккаунт» (0:1235 и 7:1017).

  Разметка у регистрации и входа общая и живёт в `avanti_auth_layout`:
  страница задаёт только режим экрана. Так же устроены страницы профиля
  над общим `avanti_profile_layout`.
-->
<template>
  <AvantiAuthLayout mode="sign-up" />
</template>

<script setup lang="ts">
import AvantiAuthLayout from '@/components/auth/avanti_auth_layout.vue'
</script>
