<!--
  Вложенное окно «DETTAGLI» мастера оплаты комиссии (кадр Figma 246:6880).
  Открывается по знаку «?» в поясняющей плашке и ложится поверх окна мастера,
  затемняя его: заголовок, два абзаца пояснения и кнопка «HO CAPITO».

  Оболочку даёт общий `avanti_modal`, но шапка у кадра своя: крестик
  бирюзовый и без серого круга, заголовок выровнен по центру. Поэтому штатные
  заголовок и кнопка закрытия окна выключены, а их место занимает содержимое
  безымянного слота.
-->
<template>
  <AvantiModal
    :open="open"
    size="sm"
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
  gap: 24px;
  align-items: stretch;
  text-align: center;

  /* Крестик в кадре бирюзовый, без подложки, прижат к правому краю. */
  &__close {
    @include button-reset;
    @include focus-ring;

    display: flex;
    align-self: flex-end;

    /*
     * Поля выравнивают глиф по кадру и оставляют строке крестика её высоту:
     * 26 − 4 − 12 = 10px, ровно столько между крестиком и заголовком.
     */
    margin-top: -4px;
    margin-right: 2px;
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
    line-height: 18px;
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

<!--
  Метрики окна из кадра 246:6880. Общая оболочка `avanti_modal` живёт
  в `@/components/ui` и правится другими агентами, поэтому размеры кадра
  задаются здесь — точечно и только для окна с этим содержимым:
  * ширина 510px вместо 480px размера `sm`;
  * поля 20px сверху и снизу и 16px по бокам;
  * пустая верхняя строка окна (крестик выключен) не добавляет промежутка.
  Блок намеренно не scoped: окно уходит в `body` через Teleport, а класс
  на его корень не пробрасывается (корень компонента — сам Teleport).
-->
<style lang="scss">
.avanti-modal:has(.avanti-commission-info) {
  --avanti-modal-gap: 0;

  .avanti-modal__window {
    max-width: 510px;
    padding: 20px 16px;
  }

  /*
   * В кадре окно мастера затемнено сильнее базовых 45%. Своего токена под
   * это значение нет и палитру трогать нельзя, поэтому затемнение набирается
   * вторым слоем того же токена: 45% + 55% × 45% × 0.6 = 60%.
   */
  .avanti-modal__backdrop::after {
    position: absolute;
    inset: 0;
    content: '';
    background-color: var(--avanti-color-overlay);
    opacity: 0.6;
  }
}
</style>
