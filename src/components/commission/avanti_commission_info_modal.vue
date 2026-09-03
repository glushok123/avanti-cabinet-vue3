<!--
  Вложенное окно «DETTAGLI» мастера оплаты комиссии (кадр Figma 246:6880).
  Открывается по знаку «?» в поясняющей плашке и ложится поверх окна мастера,
  затемняя его: заголовок, два абзаца пояснения и кнопка «HO CAPITO».

  Оболочку даёт общий `avanti_modal`: ширину, поля и плотное затемнение кадра
  включает его вариант `info`. Шапка у кадра своя — крестик бирюзовый и без
  серого круга, заголовок выровнен по центру, — поэтому штатные заголовок
  и кнопка закрытия окна выключены, а их место занимает содержимое
  безымянного слота.
-->
<template>
  <AvantiModal
    :open="open"
    variant="info"
    :closable="false"
    :label="content.title"
    @update:open="emit('update:open', $event)"
    @close="emit('close', $event)"
  >
    <div class="avanti-commission-info">
      <button
        class="avanti-commission-info__close"
        type="button"
        :aria-label="content.closeLabel"
        @click="handleClose"
      >
        <AvantiIconClose :stroke-width="2" />
      </button>

      <div class="avanti-commission-info__head">
        <h2 class="avanti-commission-info__title">{{ content.title }}</h2>
        <p class="avanti-commission-info__text">{{ content.description }}</p>
      </div>

      <p class="avanti-commission-info__text">
        {{ content.note.lead
        }}<strong class="avanti-commission-info__accent">{{ content.note.accent }}</strong
        >{{ content.note.tail }}
      </p>

      <AvantiButton class="avanti-commission-info__submit" @click="handleClose">
        {{ content.submitLabel }}
      </AvantiButton>
    </div>
  </AvantiModal>
</template>

<script setup lang="ts">
import AvantiIconClose from '@/components/icons/avanti_icon_close.vue'
import AvantiButton from '@/components/ui/avanti_button.vue'
import AvantiModal from '@/components/ui/avanti_modal.vue'
import { AVANTI_COMMISSION_INFO_CONTENT } from '@/constants/avanti_commission_content'
import type { AvantiCommissionInfoContent } from '@/types/avanti_commission'
import type { AvantiModalCloseReason } from '@/types/avanti_modal'

withDefaults(
  defineProps<{
    /** Окно открыто. Работает и как `v-model:open`. */
    open: boolean
    /** Тексты окна; по умолчанию — тексты из макета. */
    content?: AvantiCommissionInfoContent
  }>(),
  {
    content: () => AVANTI_COMMISSION_INFO_CONTENT,
  },
)

const emit = defineEmits<{
  /** Половина `v-model:open`. */
  'update:open': [value: boolean]
  /** Окно закрыто — с причиной от оболочки. */
  close: [reason: AvantiModalCloseReason]
}>()

/** Крестик и кнопка «HO CAPITO» закрывают окно одинаково. */
function handleClose(): void {
  emit('update:open', false)
  emit('close', 'button')
}
</script>

<style lang="scss" scoped>
/*
 * Крестик в кадре — глиф 18×18. В `avanti_icon_close` глиф занимает 11/16
 * вьюбокса, поэтому квадрат svg берётся 26px: 26 × 11/16 ≈ 18.
 */
$close-size: 26px;

/*
 * Оформление кнопки из кадра. Базовая кнопка на десктопе вырастает до 60px
 * и 24px текста, поэтому набор применяется дважды — в базовых стилях и внутри
 * desktop-up, где он гасит её правила той же специфичностью.
 */
@mixin submit-appearance {
  height: 44px;
  padding: 12px 16px;
  font-size: 15px;
  font-weight: var(--avanti-font-weight-semibold);
  border: none;
  border-radius: var(--avanti-radius-sm);
  box-shadow: var(--avanti-shadow-input);
}

.avanti-commission-info {
  display: flex;
  flex-direction: column;

  /*
   * Зазор 20px — расстояние заголовочного блока до второго абзаца и абзаца
   * до кнопки в кадре (246:7158 → 246:7163). Строка крестика отделена от
   * заголовка восемью пикселями, поэтому у неё поле снизу −12.
   */
  gap: 20px;
  align-items: stretch;
  text-align: center;

  /* Крестик в кадре бирюзовый, без подложки, прижат к правому краю. */
  &__close {
    @include button-reset;
    @include focus-ring;

    /* Кликабельная область 32×32 из кадра 246:7155, глиф в ней по центру. */
    display: flex;
    align-items: center;
    align-self: flex-end;
    justify-content: center;
    width: 32px;
    height: 32px;
    margin-bottom: -12px;
    color: var(--avanti-color-primary);
    transition: color var(--avanti-transition-fast);

    &:hover {
      color: var(--avanti-color-primary-dark);
    }

    svg {
      width: $close-size;
      height: $close-size;
    }
  }

  /* Заголовок и первый абзац стоят вплотную: в кадре между ними 8px. */
  &__head {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  &__title {
    margin: 0;
    font-size: 20px;
    font-weight: var(--avanti-font-weight-bold);
    line-height: normal;
    color: var(--avanti-color-text-strong);
  }

  &__text {
    margin: 0;
    font-size: 16px;
    font-weight: var(--avanti-font-weight-regular);

    /* Пояснение в кадре — четыре строки по 20px (246:7160, высота 80). */
    line-height: 20px;
    color: var(--avanti-color-text-secondary);
  }

  &__accent {
    font-weight: var(--avanti-font-weight-bold);
    color: var(--avanti-color-text-strong);
  }

  &__submit {
    @include submit-appearance;
  }

  @include desktop-up {
    &__submit {
      @include submit-appearance;
    }
  }
}
</style>
