<!--
  Шапка просмотрщика сертификата (кадры 256:12222 — десктоп 793×110,
  232:16414 — мобильная 390×89): щит в скруглённом квадрате, строка статуса
  с точкой-индикатором, заголовок с подписью и круглая кнопка закрытия.
-->
<template>
  <header class="avanti-certificate-viewer-header">
    <div class="avanti-certificate-viewer-header__lead">
      <span class="avanti-certificate-viewer-header__badge">
        <!-- Обводка глифа в кадре 2px при размере 22px: щит нарисован
             в системе координат 19.5556, отсюда 2 × 19.5556 / 22. -->
        <AvantiIconShield :stroke-width="1.7778" />
      </span>
      <div class="avanti-certificate-viewer-header__texts">
        <p class="avanti-certificate-viewer-header__status">
          <span class="avanti-certificate-viewer-header__category">{{ category }}</span>
          <span class="avanti-certificate-viewer-header__dot" />
          <span class="avanti-certificate-viewer-header__status-label">{{ statusLabel }}</span>
        </p>
        <div class="avanti-certificate-viewer-header__heading">
          <h2 class="avanti-certificate-viewer-header__title">{{ title }}</h2>
          <p class="avanti-certificate-viewer-header__subtitle">{{ subtitle }}</p>
        </div>
      </div>
    </div>

    <button
      class="avanti-certificate-viewer-header__close"
      type="button"
      :aria-label="closeLabel"
      @click="emit('close')"
    >
      <!-- Обводка глифа в кадре 3.125px при размере 28.125px: крестик
           нарисован в системе координат 24, отсюда 3.125 × 24 / 28.125. -->
      <AvantiIconCloseCircle :stroke-width="2.6667" />
    </button>
  </header>
</template>

<script setup lang="ts">
import AvantiIconShield from '@/components/icons/avanti_icon_shield.vue'
import AvantiIconCloseCircle from '@/components/icons/avanti_icon_close_circle.vue'

defineProps<{
  category: string
  statusLabel: string
  title: string
  subtitle: string
  closeLabel: string
}>()

const emit = defineEmits<{ close: [] }>()
</script>

<style lang="scss" scoped>
.avanti-certificate-viewer-header {
  display: flex;
  flex-shrink: 0;
  align-items: flex-start;
  justify-content: space-between;

  /* Поля кадра 232:16414; линия снизу нарисована тенью, чтобы не менять высоту. */
  padding: 16px 20px;
  background-color: var(--avanti-color-surface);
  box-shadow: inset 0 -1px 0 0 var(--avanti-color-border-slate);

  &__lead {
    display: flex;
    flex: 1 1 auto;
    gap: 12px;
    align-items: center;
    min-width: 0;
  }

  &__badge {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    color: var(--avanti-color-primary);
    background-color: var(--avanti-color-primary-soft);
    border-radius: var(--avanti-radius-md);
  }

  &__badge :deep(svg) {
    width: 22px;
    height: 22px;
  }

  &__texts {
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;

    /* На мобильной строки идут почти вплотную (кадр 232:16419). */
    gap: 2px;
    min-width: 0;
  }

  /* Заголовок с подписью — отдельная группа: на десктопе внутри неё
     зазор 4px, а между ней и строкой статуса 8px (кадр 256:12227). */
  &__heading {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
  }

  &__status {
    display: flex;
    gap: 6px;
    align-items: center;
  }

  &__category {
    font-size: 11px;
    font-weight: var(--avanti-font-weight-bold);

    /* Высоты строк заданы явно: при line-height: normal Chrome даёт на 1px
       больше, чем кадр, и шапка выходит 112px вместо 110px. */
    line-height: 13px;
    color: var(--avanti-color-text-slate);
    text-transform: uppercase;
  }

  &__dot {
    flex-shrink: 0;
    width: 5px;
    height: 5px;
    background-color: var(--avanti-color-primary);
    border-radius: var(--avanti-radius-round);
  }

  &__status-label {
    font-size: 11px;
    font-weight: var(--avanti-font-weight-semibold);
    line-height: 13px;
    color: var(--avanti-color-primary);
  }

  &__title {
    font-size: 20px;
    font-weight: var(--avanti-font-weight-bold);
    line-height: 24px;
    color: var(--avanti-color-text-slate-strong);
  }

  &__subtitle {
    font-size: 13px;
    font-weight: var(--avanti-font-weight-regular);
    line-height: 16px;
    color: var(--avanti-color-text-slate);
  }

  /* Кнопка закрытия: 32×32 на мобильной, 50×50 на десктопе. */
  &__close {
    @include button-reset;
    @include focus-ring;

    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    color: var(--avanti-color-text-slate);
    border-radius: var(--avanti-radius-round);
    transition: color var(--avanti-transition-fast);

    &:hover {
      color: var(--avanti-color-primary);
    }
  }

  &__close :deep(svg) {
    width: 18px;
    height: 18px;
  }

  @include desktop-up {
    /* Кадр 256:12222: поля 16/32, между строками 8px, шрифты крупнее. */
    padding: 16px 32px;

    &__texts {
      gap: 8px;
    }

    &__heading {
      gap: 4px;
    }

    &__category,
    &__status-label {
      font-size: 15px;
      line-height: 18px;
    }

    &__title {
      font-size: 24px;
      line-height: 29px;
    }

    &__subtitle {
      font-size: 16px;
      line-height: 19px;
    }

    &__close {
      width: 50px;
      height: 50px;
    }

    &__close :deep(svg) {
      width: 28.125px;
      height: 28.125px;
    }
  }
}
</style>
