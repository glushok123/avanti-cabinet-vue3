<!--
  Страница-витрина загрузки документов (десктопный кадр Figma 1:935,
  узел окна 246:5973).

  Без параметров витрина повторяет ровно то, что нарисовано в десктопном
  кадре: заголовок окна, строка типа документа со статусным бейджем, подпись
  «SCEGLI IL TIPO DI DOCUMENTO» с тремя вариантами и сноска о форматах.
  Ни один вариант не выбран.

  Остальные кадры потока загрузки выбираются query-параметром `state`
  (тот же приём, что у `/home?state=`), поэтому свёрстанные мобильные экраны
  открываются ссылкой, без правки кода:
  * `/documents` — кадр 1:935, окно только что открыто;
  * `/documents?state=upload` — кадр 22:3657, тип выбран и файл загружен;
  * `/documents?state=error` — кадр 95:5965, загрузка не удалась;
  * `/documents?state=verified` — кадр 95:6532, документ проверен.
  Неизвестное или отсутствующее значение — базовый кадр.

  Панель рассчитана на модальное окно: собственной подложки у неё нет,
  поэтому здесь она вложена в `avanti_modal`, а фоном служит раскладка
  кабинета — как в макете, где окно открыто поверх личного кабинета.
  Ширину и поля окна из кадра даёт вариант `panel` оболочки. Заголовок
  рисует сама панель: в кадре он отбит линией на всю ширину окна,
  а штатный заголовок `avanti_modal` устроен иначе.
-->
<template>
  <div class="avanti-documents-page">
    <AvantiDashboardView :state="dashboardState" :title="texts.pageTitle" />
    <AvantiModal v-model:open="isOpen" variant="panel" :closable="false" :label="texts.panelTitle">
      <!--
        НЕТ В МАКЕТЕ: тексты зоны перетаскивания переданы, но сама зона
        выключена — проп `showDropzone` панели по умолчанию `false`.
        Кадра с этой зоной в Figma нет, поэтому в поставке её не видно.
      -->
      <AvantiDocumentsPanel
        v-model:selected-option-id="selectedOptionId"
        :title="texts.panelTitle"
        :state="frame.state"
        :summary="frame.summary"
        :options-label="texts.optionsLabel"
        :options="options"
        :dropzone="dropzone"
        :files="frame.files"
        :files-label="texts.filesLabel"
        :error-text="frame.errorText"
        :result="frame.result"
        :actions="frame.actions"
        :note="texts.note"
      />
    </AvantiModal>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import AvantiDashboardView from '@/components/dashboard/avanti_dashboard_view.vue'
import AvantiDocumentsPanel from '@/components/documents/avanti_documents_panel.vue'
import AvantiModal from '@/components/ui/avanti_modal.vue'
import {
  AVANTI_DOCUMENTS_DROPZONE as dropzone,
  AVANTI_DOCUMENTS_FRAMES,
  AVANTI_DOCUMENTS_OPTIONS as options,
  AVANTI_DOCUMENTS_TEXTS as texts,
  type AvantiDocumentsFrame,
} from '@/constants/avanti_documents_content'
import { AVANTI_DASHBOARD_STATE_BASE as dashboardState } from '@/constants/avanti_dashboard_states'

const route = useRoute()

/** В макете окно открыто сразу — витрина повторяет это поведение. */
const isOpen = ref<boolean>(true)

/** Неизвестный, повторённый в URL или отсутствующий параметр — базовый кадр. */
function resolveFrame(query: string | null | undefined): AvantiDocumentsFrame {
  if (!query) {
    return AVANTI_DOCUMENTS_FRAMES.base
  }
  return AVANTI_DOCUMENTS_FRAMES[query] ?? AVANTI_DOCUMENTS_FRAMES.base
}

const frame = computed<AvantiDocumentsFrame>(() => {
  const queryValue = route.query.state
  return resolveFrame(Array.isArray(queryValue) ? queryValue[0] : queryValue)
})

/** Отмеченный тип документа: задаётся кадром, дальше им управляет пользователь. */
const selectedOptionId = ref<string>(frame.value.selectedOptionId)

watch(frame, (next) => {
  selectedOptionId.value = next.selectedOptionId
})
</script>

<style lang="scss" scoped>
.avanti-documents-page {
  min-height: 100vh;
  background-color: var(--avanti-color-page);
}
</style>
