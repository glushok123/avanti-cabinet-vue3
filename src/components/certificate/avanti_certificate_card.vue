<!--
  Карточка страхового сертификата CPI в левой колонке кабинета
  (кадры 256:11723, 256:12481 — десктоп 792×224; 232:16385, 232:14510 —
  мобильная 358×287, где заголовок переносится на две строки).

  Разметка обоих кадров одна: поля 20px, зазор между блоками 20px, поэтому
  мобильных переопределений почти нет — карточка перестраивается сама.

  Состояние приходит пропом `state`: `issued` — сертификат выпущен (все кадры
  кабинета), `pending` — выпуск ещё идёт (тексты библиотечного компонента
  `certificato-cpi-progress`, Figma 220:2829): щит приглушён, кнопка выключена.
-->
<template>
  <article class="avanti-certificate-card" :class="stateClass">
    <div class="avanti-certificate-card__header">
      <span class="avanti-certificate-card__badge">
        <!-- Обводка глифа в кадре 2px при размере 20px: щит нарисован
             в системе координат 19.5556, отсюда 2 × 19.5556 / 20. -->
        <AvantiIconShield :stroke-width="1.9556" />
      </span>
      <div class="avanti-certificate-card__titles">
        <p class="avanti-certificate-card__overline">{{ overline }}</p>
        <h2 class="avanti-certificate-card__title">{{ title }}</h2>
      </div>
    </div>

    <p class="avanti-certificate-card__description">{{ description }}</p>
    <p class="avanti-certificate-card__metadata">{{ metadata }}</p>

    <AvantiButton
      class="avanti-certificate-card__action"
      size="md"
      :disabled="state === 'pending'"
      @click="emit('action')"
    >
      {{ actionLabel }}
    </AvantiButton>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import AvantiButton from '@/components/ui/avanti_button.vue'
import AvantiIconShield from '@/components/icons/avanti_icon_shield.vue'
import type { AvantiCertificateCardContent } from '@/types/avanti_certificate'

const props = withDefaults(defineProps<AvantiCertificateCardContent>(), {
  state: 'issued',
})

const emit = defineEmits<{
  /** Нажата кнопка карточки — родитель открывает просмотрщик документа. */
  action: []
}>()

const stateClass = computed(() => `avanti-certificate-card--${props.state}`)
</script>

<style lang="scss" scoped>
.avanti-certificate-card {
  /* Обводка внутрь: обычный border прибавил бы 2px к 792×224 из кадра. */
  @include inner-border(var(--avanti-color-border-slate), 1px, var(--avanti-shadow-certificate-card));

  display: flex;
  flex-direction: column;
  gap: 20px;

  /* Колонка кабинета выравнивает карточки по левому краю, ширину они
     занимают сами (792px на десктопе, 358px на мобильной). */
  width: 100%;
  padding: 20px;
  background-color: var(--avanti-color-surface);
  border-radius: var(--avanti-radius-3xl);

  &__header {
    display: flex;
    gap: 12px;
    align-items: center;
  }

  /* Щит в кадре 40×40 со скруглением 20px — то есть ровный круг. */
  &__badge {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    color: var(--avanti-color-primary);
    background-color: var(--avanti-color-primary-soft);
    border-radius: var(--avanti-radius-round);
  }

  &__badge :deep(svg) {
    width: 20px;
    height: 20px;
  }

  &__titles {
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    gap: 4px;
    min-width: 0;
  }

  &__overline {
    font-size: 11px;
    font-weight: var(--avanti-font-weight-bold);

    /* Высота строки из кадра: при line-height: normal Chrome даёт 14px
       вместо макетных 13px и шапка карточки уезжает на пиксель. */
    line-height: 13px;
    color: var(--avanti-color-text-slate);
    text-transform: uppercase;
  }

  &__title {
    font-size: 18px;
    font-weight: var(--avanti-font-weight-bold);

    /* Кадр: строка заголовка 22px (на мобильной их две — 44px). */
    line-height: 22px;
    color: var(--avanti-color-text-slate-deep);
  }

  &__description {
    font-size: 14px;
    font-weight: var(--avanti-font-weight-regular);
    line-height: 1.5;
    color: var(--avanti-color-text-slate-body);
  }

  &__metadata {
    font-size: 12px;
    font-weight: var(--avanti-font-weight-semibold);
    line-height: normal;
    color: var(--avanti-color-text-slate);
  }

  /*
   * Кнопка в кадре 318×48 и на десктопе, и на мобильной, поэтому десктопный
   * рост размера `md` до 50px здесь гасится, а ширина ограничена шириной
   * контента мобильной карточки (358 − 20 × 2 = 318).
   */
  & &__action {
    width: 318px;
    max-width: 100%;
    height: 48px;
  }

  /* Состояние «выпуск идёт»: щит нейтральный, кнопка выключена самим `disabled`. */
  &--pending &__badge {
    color: var(--avanti-color-text-tertiary);
    background-color: var(--avanti-color-surface-neutral);
  }
}
</style>
