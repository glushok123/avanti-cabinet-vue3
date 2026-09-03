<!--
  Плавающая всплывашка чат-консультанта в правом нижнем углу экрана профиля
  (кадр 1:2583). Показывает аватар консультанта, его имя, начало последнего
  сообщения и счётчик непрочитанных; нажатие открывает переписку.

  Виджет есть только на десктопном кадре профиля: в кадрах с открытым
  модальным окном («Modifica nome», «Cambia email», «Cambia password»)
  и в мобильных кадрах профиля его нет, поэтому он подключается страницей,
  а не раскладкой.

  Габариты сняты с кадра: плашка 464×108, аватар 61px, счётчик 18px.
-->
<template>
  <button class="avanti-profile-consultant-widget" type="button">
    <span class="avanti-profile-consultant-widget__avatar">
      <img
        class="avanti-profile-consultant-widget__photo"
        :src="content.avatar"
        alt=""
        loading="lazy"
        decoding="async"
      />
      <span class="avanti-profile-consultant-widget__online" aria-hidden="true" />
    </span>
    <span class="avanti-profile-consultant-widget__text">
      <span class="avanti-profile-consultant-widget__name">{{ content.name }}</span>
      <span class="avanti-profile-consultant-widget__message">{{ content.message }}</span>
    </span>
    <span v-if="content.count" class="avanti-profile-consultant-widget__badge">
      {{ content.count }}
      <span class="avanti-profile-consultant-widget__badge-label">{{ content.countLabel }}</span>
    </span>
  </button>
</template>

<script setup lang="ts">
import type { AvantiProfileConsultantContent } from '@/types/avanti_profile'

defineProps<{ content: AvantiProfileConsultantContent }>()
</script>

<style lang="scss" scoped>
.avanti-profile-consultant-widget {
  @include button-reset;
  @include focus-ring;

  position: relative;
  display: flex;
  gap: 18px;
  align-items: center;
  width: 464px;
  height: 108px;
  padding: 0 16px;
  text-align: left;
  background-color: var(--avanti-color-primary);
  border-radius: var(--avanti-radius-xl);

  /*
   * В кадре под плашкой мягкая нейтральная тень (~0 6px 30px, 20%).
   * Точного токена под неё нет, взят ближайший по смещению и плотности.
   */
  box-shadow: var(--avanti-shadow-summary-mobile);

  &__avatar {
    position: relative;
    display: block;
    flex-shrink: 0;
    width: 61px;
    height: 61px;
  }

  &__photo {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: var(--avanti-radius-round);
  }

  /* Кольцо «на связи» перекрывает аватар снизу справа — так в макете. */
  &__online {
    position: absolute;
    right: -6px;
    bottom: 0;
    width: 20px;
    height: 20px;
    border: 3px solid var(--avanti-color-surface);
    border-radius: var(--avanti-radius-round);
  }

  &__text {
    display: flex;
    flex-direction: column;
    gap: 1px;
    min-width: 0;
  }

  &__name {
    font-size: 22px;
    font-weight: var(--avanti-font-weight-semibold);
    line-height: 28px;
    color: var(--avanti-color-text-on-primary);
  }

  /*
   * Сообщение обрезается многоточием: в макете видно только его начало.
   * Ширина ограничена явно — иначе строка растянет флекс-контейнер.
   */
  &__message {
    overflow: hidden;
    font-size: 15px;
    font-weight: var(--avanti-font-weight-regular);
    line-height: 20px;
    color: var(--avanti-color-text-on-primary);
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__badge {
    position: absolute;
    top: 30px;
    right: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 18px;
    height: 18px;
    font-size: 11px;
    font-weight: var(--avanti-font-weight-bold);
    line-height: normal;
    color: var(--avanti-color-text-on-primary);
    background-color: var(--avanti-color-danger-dark);
    border-radius: var(--avanti-radius-round);
  }

  /* Расшифровка счётчика для скринридеров: в макете видна только цифра. */
  &__badge-label {
    @include visually-hidden;
  }
}
</style>
