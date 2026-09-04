<!--
  Страница-витрина модального окна «IBAN per l’accredito»
  (кадры Figma 1:1366 и 1:1521 — десктоп, 104:8482 и 104:8551 — мобильная).

  В макете окно открыто поверх личного кабинета, поэтому фоном служит та же
  раскладка, что и на главной. Панель `avanti_iban_panel` рассчитана на окно:
  подложку, затемнение и кнопку закрытия даёт `avanti_modal`.

  Оформление окна — `variant="brand"`: 524px и поля 12/24/36 на десктопе,
  350px на мобильной, шапка без обводки. Это те же габариты, под которые
  свёрстана панель. Собственные поля у панели уже есть (24px по бокам на
  десктопе, 16px на мобильной), поэтому поля окна под ней гасятся —
  иначе они сложились бы и поле ввода стало бы вдвое уже нужного.

  Оба шага («Conto» и «Verifica») переключает сама панель, страница только
  хранит набранный номер.
-->
<template>
  <div class="avanti-iban-modal-page">
    <AvantiDashboardView :state="dashboardState" :title="content.title" />
    <AvantiModal v-model:open="isOpen" variant="brand" :label="content.title">
      <div class="avanti-iban-modal-page__panel">
        <AvantiIbanPanel v-model="iban" v-model:step="step" :content="content" @save="handleSave" />
      </div>
    </AvantiModal>
    <p class="avanti-iban-modal-page__status" role="status">{{ status }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useFlowNavigation } from '@/composables/use_flow_navigation'
import AvantiDashboardView from '@/components/dashboard/avanti_dashboard_view.vue'
import AvantiIbanPanel from '@/components/iban/avanti_iban_panel.vue'
import AvantiModal from '@/components/ui/avanti_modal.vue'
import { AVANTI_DASHBOARD_STATE_BASE as dashboardState } from '@/constants/avanti_dashboard_states'
import { AVANTI_IBAN_PANEL_CONTENT as content } from '@/constants/avanti_iban_content'
import type { AvantiIbanStep } from '@/types/avanti_iban'

/** В макете окно открыто сразу — витрина повторяет это поведение. */
const isOpen = ref<boolean>(true)

/* В кадре поле номера пустое: пользователь набирает его сам. */
const iban = ref<string>('')
const step = ref<AvantiIbanStep>('account')
const saved = ref<boolean>(false)

const status = computed<string>(() => (saved.value ? 'IBAN salvato.' : 'IBAN non salvato.'))

/** «Salva iban»: запроса нет — витрина закрывает окно и помечает сохранение. */
function handleSave(): void {
  saved.value = true
  isOpen.value = false
  goNext()
}

/** Сохранение реквизитов ведёт к оплате комиссии. */
const { goNext } = useFlowNavigation()
</script>

<style lang="scss" scoped>
.avanti-iban-modal-page {
  min-height: 100vh;
  background-color: var(--avanti-color-page);

  /*
   * Панель приносит свои поля из макета, поэтому поля окна под ней гасятся:
   * по бокам — целиком, сверху — на зазор между шапкой окна и телом
   * (в панели это место занимает её собственный отступ под кнопку закрытия).
   */
  &__panel {
    margin-inline: calc(var(--avanti-modal-pad) * -1);
    margin-top: calc(var(--avanti-modal-gap) * -1);
  }

  /* Строка состояния нужна только витрине: в макете её нет. */
  &__status {
    @include visually-hidden;
  }
}
</style>
