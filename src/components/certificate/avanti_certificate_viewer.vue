<!--
  Просмотрщик страхового сертификата CPI поверх кабинета
  (кадры 256:12221 — десктоп 793×696, 232:16413 — мобильная 390×844).

  Оболочка — общее модальное окно проекта в варианте `bare`: оно даёт
  затемнение, ловушку фокуса и закрытие по Escape, а подложку, скругление,
  поля и ширину рисует сам просмотрщик. Крестик у окна свой (в шапке),
  поэтому кнопка закрытия оболочки выключена.

  Чтение PDF не реализуется: страница — статичное изображение из макета,
  счётчик страниц постоянный, кнопка масштаба увеличивает превью.
-->
<template>
  <AvantiModal
    :open="open"
    variant="bare"
    :closable="false"
    :label="content.title"
    @update:open="emit('update:open', $event)"
  >
    <section class="avanti-certificate-viewer">
      <AvantiCertificateViewerHeader
        :category="content.category"
        :status-label="content.statusLabel"
        :title="content.title"
        :subtitle="content.subtitle"
        :close-label="content.closeLabel"
        @close="close"
      />
      <AvantiCertificateDocument
        :page-label="content.pageLabel"
        :zoom-in-label="content.zoomInLabel"
        :zoom-out-label="content.zoomOutLabel"
        :src="content.documentSrc"
        :alt="content.documentAlt"
      />
      <AvantiCertificateViewerFooter
        :protection-label="content.protectionLabel"
        :close-label="content.closeLabel"
        @close="close"
      />
    </section>
  </AvantiModal>
</template>

<script setup lang="ts">
import AvantiModal from '@/components/ui/avanti_modal.vue'
import AvantiCertificateViewerHeader from '@/components/certificate/avanti_certificate_viewer_header.vue'
import AvantiCertificateDocument from '@/components/certificate/avanti_certificate_document.vue'
import AvantiCertificateViewerFooter from '@/components/certificate/avanti_certificate_viewer_footer.vue'
import type { AvantiCertificateViewerContent } from '@/types/avanti_certificate'

defineProps<{
  /** Окно открыто. Работает как `v-model:open`. */
  open: boolean
  content: AvantiCertificateViewerContent
}>()

const emit = defineEmits<{ 'update:open': [value: boolean] }>()

function close(): void {
  emit('update:open', false)
}
</script>

<style lang="scss" scoped>
.avanti-certificate-viewer {
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;

  /*
   * На мобильной просмотрщик занимает экран целиком (кадр 232:16413:
   * 390×844 при высоте страницы 1006). Высота окна задаётся содержимым,
   * поэтому проценты здесь не разрешаются — нужна единица окна просмотра.
   */
  height: 100dvh;
  min-height: 0;
  overflow: hidden;
  background-color: var(--avanti-color-surface);

  @include desktop-up {
    /*
     * Габариты кадра 256:12221: 793×696. Ширину держит сам просмотрщик —
     * оболочка в варианте `bare` полей и ширины не задаёт. Скругление
     * в коде Figma не размечено, снято с экспортного изображения кадра.
     */
    width: 793px;
    max-width: 100%;
    height: 696px;
    max-height: 100%;
    margin-inline: auto;
    border-radius: var(--avanti-radius-md);
  }
}
</style>
