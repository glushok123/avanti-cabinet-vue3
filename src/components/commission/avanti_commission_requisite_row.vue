<!--
  Строка реквизита в карточке шага «3. COORDINATE» (кадр «Строка — IBAN»,
  Figma 241:23649 / 232:18067): малая надпись, значение и кнопка копирования.

  Копирование настоящее: значение уходит в системный буфер через
  `navigator.clipboard`. Пока держится состояние «скопировано», иконка
  меняется на галочку, а результат объявляется скринридеру через `aria-live`
  в области, скрытой визуально.

  РАСХОЖДЕНИЕ МАКЕТА: состояния «скопировано» и «не удалось» в кадрах не
  нарисованы — оформление собрано из токенов палитры (фирменный цвет для
  успеха, красный для ошибки).
-->
<template>
  <li class="avanti-commission-requisite-row">
    <div class="avanti-commission-requisite-row__data">
      <p class="avanti-commission-requisite-row__label">{{ requisite.label }}</p>
      <p class="avanti-commission-requisite-row__value">{{ requisite.value }}</p>
    </div>
    <button
      class="avanti-commission-requisite-row__action"
      :class="actionClass"
      type="button"
      :aria-label="actionLabel"
      @click="copy"
    >
      <AvantiIconCheck v-if="isCopied" />
      <AvantiCommissionIconCopy v-else />
    </button>
    <span class="avanti-commission-requisite-row__status" role="status" aria-live="polite">
      {{ statusMessage }}
    </span>
  </li>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue'
import AvantiCommissionIconCopy from '@/components/commission/avanti_commission_icon_copy.vue'
import AvantiIconCheck from '@/components/icons/avanti_icon_check.vue'
import type { AvantiCommissionCopyLabels, AvantiCommissionRequisite } from '@/types/avanti_commission'

/** Результат последней попытки копирования. */
type CopyStatus = 'idle' | 'copied' | 'failed'

const props = defineProps<{
  /** Надпись, значение и значение для буфера. */
  requisite: AvantiCommissionRequisite
  /** Подписи кнопки и сообщения о результате. */
  copyLabels: AvantiCommissionCopyLabels
}>()

const emit = defineEmits<{ copy: [id: string] }>()

/** Сколько держится отметка «скопировано», мс. */
const RESET_DELAY = 2000

const status = ref<CopyStatus>('idle')

let resetTimer: ReturnType<typeof setTimeout> | undefined

const actionLabel = computed<string>(() => `${props.copyLabels.action} ${props.requisite.label}`)

const actionClass = computed<string>(() => `avanti-commission-requisite-row__action--${status.value}`)

/** Держится ли отметка «скопировано»: по ней подменяется иконка кнопки. */
const isCopied = computed<boolean>(() => status.value === 'copied')

/** Текст для `aria-live`; в спокойном состоянии область пуста. */
const statusMessage = computed<string>(() => {
  if (status.value === 'copied') {
    return props.copyLabels.success
  }
  return status.value === 'failed' ? props.copyLabels.failure : ''
})

/** Возвращает строку в исходное состояние через RESET_DELAY. */
function scheduleReset(): void {
  clearTimeout(resetTimer)
  resetTimer = setTimeout(() => {
    status.value = 'idle'
  }, RESET_DELAY)
}

async function copy(): Promise<void> {
  const text = props.requisite.copyValue ?? props.requisite.value
  try {
    await navigator.clipboard.writeText(text)
    status.value = 'copied'
    emit('copy', props.requisite.id)
  } catch {
    /* Буфер недоступен: страница без защищённого соединения или отказ пользователя. */
    status.value = 'failed'
  }
  scheduleReset()
}

onBeforeUnmount(() => {
  clearTimeout(resetTimer)
})
</script>

<style lang="scss" scoped>
.avanti-commission-requisite-row {
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: space-between;

  &__data {
    display: flex;
    flex-direction: column;
    gap: 4px;
    min-width: 0;
  }

  &__label {
    font-size: 11px;
    font-weight: var(--avanti-font-weight-bold);
    line-height: normal;
    color: var(--avanti-color-text-secondary);
    letter-spacing: 0.8px;
  }

  /* Длинный IBAN переносится по символам, а не выходит за карточку. */
  &__value {
    font-size: 16px;
    font-weight: var(--avanti-font-weight-semibold);
    line-height: normal;
    color: var(--avanti-color-text-strong);
    overflow-wrap: anywhere;
  }

  /* Кнопка 20×20 из макета: сам глиф занимает 16×16 (отступ 10%). */
  &__action {
    @include button-reset;
    @include focus-ring;

    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    padding: 2px;
    color: var(--avanti-color-text-secondary);
    transition: color var(--avanti-transition-fast);

    &:hover {
      color: var(--avanti-color-primary);
    }

    &--copied {
      color: var(--avanti-color-primary);
    }

    &--failed {
      color: var(--avanti-color-danger);
    }
  }

  /* Область объявления результата: её читает скринридер, на экране её нет. */
  &__status {
    @include visually-hidden;
  }

  /* Мобильная карточка уже десктопной, поэтому обе надписи мельче. */
  @include mobile {
    gap: 8px;

    &__label {
      font-size: 10px;
    }

    &__value {
      font-size: 12px;
    }
  }
}
</style>
