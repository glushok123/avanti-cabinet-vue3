<!--
  Главная страница личного кабинета (роут /home).
  Десктоп 1440px: шапка, две колонки (792px + 464px).
  Мобильная 390px: компактная шапка, одна колонка, нижняя навигация
  и плавающий виджет чат-консультанта.

  Сама раскладка живёт в `avanti_dashboard_view` — её переиспользуют экраны,
  где поверх кабинета открыто модальное окно. Страница только выбирает
  уровень прогресса: чтобы посмотреть другой, достаточно подставить сюда
  другое состояние из `avanti_dashboard_states`.
-->
<template>
  <AvantiDashboardView :state="state" />
</template>

<script setup lang="ts">
import AvantiDashboardView from '@/components/dashboard/avanti_dashboard_view.vue'
import { AVANTI_DASHBOARD_STATE_BASE as state } from '@/constants/avanti_dashboard_states'
</script>
