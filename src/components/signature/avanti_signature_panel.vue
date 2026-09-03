<!--
  Содержимое окна подписания договора (кадр Figma 1:2552 «Модальное окно — Подпись»).

  Панель не знает, во что она вложена: ни затемнения, ни ловушки фокуса, ни
  кнопки закрытия здесь нет — это забота оболочки `avanti_modal`. Наружу
  уходят события `cancel` и `confirm`; горизонтальных полей у панели нет,
  потому что 24px по бокам задаёт само окно.
-->
<template>
  <section class="avanti-signature-panel">
    <AvantiSignatureHeader :content="content.header" :title-id="titleId" />
    <div class="avanti-signature-panel__form">
      <AvantiSignaturePad
        ref="padRef"
        :texts="content.pad"
        :typed-name="typedName"
        @change="handleChange"
        @clear="handlePadClear"
      />
      <AvantiSignatureTypedField
        :label="content.pad.typedLabel"
        :placeholder="content.pad.typedPlaceholder"
        :hint="content.pad.typedHint"
        :model-value="typedName"
        @update:model-value="handleTypedName"
      />
      <AvantiSignatureActions
        :texts="content.actions"
        :confirm-disabled="isEmpty"
        @cancel="handleCancel"
        @confirm="handleConfirm"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AvantiSignatureActions from '@/components/signature/avanti_signature_actions.vue'
import AvantiSignatureHeader from '@/components/signature/avanti_signature_header.vue'
import AvantiSignaturePad from '@/components/signature/avanti_signature_pad.vue'
import AvantiSignatureTypedField from '@/components/signature/avanti_signature_typed_field.vue'
import type { AvantiSignatureContent, AvantiSignaturePanelEmits } from '@/types/avanti_signature'

defineProps<{
  /** Все тексты панели. На втором этапе приходят из API. */
  content: AvantiSignatureContent
  /** Идентификатор заголовка для `aria-labelledby` оболочки модального окна. */
  titleId?: string
}>()

const emit = defineEmits<AvantiSignaturePanelEmits>()

const padRef = ref<InstanceType<typeof AvantiSignaturePad> | null>(null)

/** Имя, введённое с клавиатуры: альтернатива рисованию, состояние панели. */
const typedName = ref<string>('')

/** Подпись ещё не поставлена — кнопка подтверждения заблокирована. */
const isEmpty = ref<boolean>(true)

function handleChange(value: boolean): void {
  isEmpty.value = value
  emit('change', value)
}

function handleTypedName(value: string): void {
  typedName.value = value
}

/** Кнопка очистки в поле стирает и росчерк, и набранное имя. */
function handlePadClear(): void {
  typedName.value = ''
}

function handleCancel(): void {
  emit('cancel')
}

function handleConfirm(): void {
  if (isEmpty.value) {
    return
  }
  emit('confirm', { image: padRef.value?.toDataUrl() ?? '', typedName: typedName.value.trim() })
}

/** Полный сброс панели — например, при повторном открытии окна. */
function reset(): void {
  typedName.value = ''
  padRef.value?.clear()
}

function toDataUrl(type?: string, quality?: number): string {
  return padRef.value?.toDataUrl(type, quality) ?? ''
}

defineExpose({ reset, toDataUrl })
</script>

<style lang="scss" scoped>
.avanti-signature-panel {
  display: flex;
  flex-direction: column;
  gap: 32px;
  align-items: stretch;
  width: 100%;

  /* Поле подписи, клавиатурная альтернатива и кнопки — одной колонкой. */
  &__form {
    display: flex;
    flex-direction: column;
    gap: 24px;
    align-items: stretch;
    width: 100%;
  }

  /* Мобильного макета этого экрана в Figma нет — отступы сжаты по логике проекта. */
  @include mobile {
    gap: 20px;

    &__form {
      gap: 16px;
    }
  }
}
</style>
