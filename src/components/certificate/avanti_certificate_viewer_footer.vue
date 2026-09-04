<!--
  Подвал просмотрщика сертификата (кадры 256:12246 — десктоп 793×86,
  232:16438 — мобильная 390×82): слева замок с подписью о защите документа,
  справа кнопка закрытия.
-->
<template>
  <footer class="avanti-certificate-viewer-footer">
    <p class="avanti-certificate-viewer-footer__protection">
      <span class="avanti-certificate-viewer-footer__lock">
        <!-- Обводка глифа в кадре 3px при размере 24px: замок нарисован
             в системе координат 20, отсюда 3 × 20 / 24. -->
        <AvantiIconLock :stroke-width="2.5" />
      </span>
      {{ protectionLabel }}
    </p>

    <AvantiButton class="avanti-certificate-viewer-footer__action" size="md" @click="emit('close')">
      {{ closeLabel }}
    </AvantiButton>
  </footer>
</template>

<script setup lang="ts">
import AvantiButton from '@/components/ui/avanti_button.vue'
import AvantiIconLock from '@/components/icons/avanti_icon_lock.vue'

defineProps<{
  protectionLabel: string
  closeLabel: string
}>()

const emit = defineEmits<{ close: [] }>()
</script>

<style lang="scss" scoped>
.avanti-certificate-viewer-footer {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: space-between;

  /* Поля кадра 232:16438; линия сверху нарисована тенью, чтобы не менять высоту. */
  padding: 16px 20px 24px;
  background-color: var(--avanti-color-surface);
  box-shadow: inset 0 1px 0 0 var(--avanti-color-border-slate);

  &__protection {
    display: flex;
    gap: 6px;
    align-items: center;
    font-size: 13px;
    font-weight: var(--avanti-font-weight-medium);
    line-height: normal;
    color: var(--avanti-color-text-slate);
  }

  &__lock {
    display: flex;
    flex-shrink: 0;
    width: 16px;
    height: 16px;
    color: var(--avanti-color-primary);
  }

  /*
   * Кнопка в кадре шире размера `md`: 104×42 на мобильной и 200×46
   * на десктопе, поля 12/28, надпись жирная. Габариты задаются здесь,
   * чтобы не заводить в общей кнопке размер под один экран.
   */
  & &__action {
    width: auto;
    height: 42px;
    padding: 12px 28px;
    font-size: 15px;
    font-weight: var(--avanti-font-weight-bold);
  }

  @include desktop-up {
    /* Кадр 256:12246: поля 16/32/24, замок 24px, подпись 16px. */
    padding: 16px 32px 24px;

    &__protection {
      gap: 8px;
      font-size: 16px;
    }

    &__lock {
      width: 24px;
      height: 24px;
    }

    & &__action {
      width: 200px;
      height: 46px;
      font-size: 18px;
    }
  }
}
</style>
