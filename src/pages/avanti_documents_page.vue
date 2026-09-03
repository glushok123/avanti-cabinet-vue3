<!--
  Страница-витрина загрузки документов (десктопный кадр Figma 1:935,
  узел окна 246:5973).

  Витрина повторяет ровно то, что нарисовано в десктопном кадре: заголовок
  окна, строка типа документа со статусным бейджем, подпись «SCEGLI IL TIPO
  DI DOCUMENTO» с тремя вариантами и сноска о форматах. Ни один вариант
  изначально не выбран.

  Чего в десктопном кадре нет и что витрина поэтому не выводит: зона
  перетаскивания файла, строка загруженного файла с кнопкой «Sostituisci»,
  кнопка «Carica il documento» и крестик закрытия окна. Сам поток загрузки
  никуда не делся — он живёт в `avanti_documents_panel` и включается пропами
  (`files`, `actions`, `showDropzone`, `state`, `result`) для мобильных
  кадров 22:3657, 95:5965 и 95:6532.

  Панель рассчитана на модальное окно: собственной подложки у неё нет,
  поэтому здесь она вложена в `avanti_modal`, а фоном служит раскладка
  кабинета — как в макете, где окно открыто поверх личного кабинета.
  Заголовок рисует сама панель: в кадре он отбит линией на всю ширину окна,
  а штатный заголовок `avanti_modal` устроен иначе.
-->
<template>
  <div class="avanti-documents-page">
    <AvantiDashboardView :state="dashboardState" :title="texts.pageTitle" />
    <AvantiModal v-model:open="isOpen" :closable="false" :label="texts.panelTitle">
      <AvantiDocumentsPanel
        v-model:selected-option-id="selectedOptionId"
        :title="texts.panelTitle"
        :summary="summary"
        :options-label="texts.optionsLabel"
        :options="options"
        :note="texts.note"
      />
    </AvantiModal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AvantiDashboardView from '@/components/dashboard/avanti_dashboard_view.vue'
import AvantiDocumentsPanel from '@/components/documents/avanti_documents_panel.vue'
import AvantiModal from '@/components/ui/avanti_modal.vue'
import {
  AVANTI_DOCUMENTS_OPTIONS as options,
  AVANTI_DOCUMENTS_SUMMARY as summary,
  AVANTI_DOCUMENTS_TEXTS as texts,
} from '@/constants/avanti_documents_content'
import { AVANTI_DASHBOARD_STATE_BASE as dashboardState } from '@/constants/avanti_dashboard_states'

/** В макете окно открыто сразу — витрина повторяет это поведение. */
const isOpen = ref<boolean>(true)

/** В кадре ни один тип документа не отмечен: выбор начинается пустым. */
const selectedOptionId = ref<string>('')
</script>

<style lang="scss" scoped>
.avanti-documents-page {
  min-height: 100vh;
  background-color: var(--avanti-color-page);
}
</style>

<!--
  Метрики окна из кадра 1:935. Общая оболочка `avanti_modal` живёт
  в `@/components/ui` и правится другими агентами, поэтому размеры кадра
  задаются здесь — точечно и только для окна с панелью документов:
  * ширина окна 650px вместо базовых 681px размера `md`;
  * поля 20px сверху и снизу и 16px по бокам вместо десктопных 24px;
  * между пустой верхней строкой окна и телом промежутка нет;
  * линия под заголовком идёт от края до края окна.
  Блок намеренно не scoped: окно уходит в `body` через Teleport, а класс
  на его корень не пробрасывается (корень компонента — сам Teleport).
-->
<style lang="scss">
.avanti-modal:has(.avanti-documents-panel) {
  --avanti-modal-gap: 0;
  --avanti-modal-pad: 16px;

  .avanti-modal__window {
    max-width: 650px;

    /* Поля кадра: 20px сверху и снизу, 16px по бокам. */
    padding: 20px var(--avanti-modal-pad);
  }

  .avanti-documents-panel__header {
    padding-right: var(--avanti-modal-pad);
    padding-left: var(--avanti-modal-pad);
    margin-right: calc(-1 * var(--avanti-modal-pad));
    margin-left: calc(-1 * var(--avanti-modal-pad));
  }
}
</style>
