<!--
  Базовое модальное окно проекта: затемнение на всю страницу и центрированное
  белое окно (кадр «Модальное окно — Комиссия», Figma 1:342 / 33:7103).
  Верхняя строка с кнопкой закрытия, блок заголовка, прокручиваемое тело и
  подвал наполняются слотами — оболочка не знает о содержимом. Пропы и события
  описаны в `@/types/avanti_modal`.

  Слоты: `header-start` и `header-center` — левая и центральная ячейки верхней
  строки (вторая нужна брендовым окнам: «пусто — логотип — крестик»),
  `header` — блок заголовка целиком, безымянный — тело, `footer` — подвал.

  Поведение окна (ловушка фокуса, Escape, блокировка прокрутки страницы)
  живёт в `@/composables/use_modal_behavior`.
-->
<template>
  <Teleport to="body">
    <Transition name="avanti-modal">
      <div v-if="open" class="avanti-modal" :class="rootClasses">
        <div class="avanti-modal__backdrop" @click="handleBackdrop" />
        <div
          ref="windowRef"
          class="avanti-modal__window"
          role="dialog"
          aria-modal="true"
          :aria-label="ariaLabel"
          :aria-labelledby="ariaLabelledby"
          tabindex="-1"
        >
          <AvantiModalBar
            :variant="variant"
            :closable="closable"
            :close-label="closeLabel"
            @close="handleCloseButton"
          >
            <template #lead>
              <slot name="header-start" />
            </template>
            <template v-if="$slots['header-center']" #center>
              <slot name="header-center" />
            </template>
          </AvantiModalBar>
          <div v-if="hasHeader" class="avanti-modal__header">
            <slot name="header">
              <AvantiModalHeading :title="title" :eyebrow="eyebrow" :title-id="titleId" />
            </slot>
          </div>
          <div class="avanti-modal__body">
            <slot />
          </div>
          <div v-if="$slots.footer" class="avanti-modal__footer">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, useId, useSlots } from 'vue'
import AvantiModalBar from '@/components/ui/avanti_modal_bar.vue'
import AvantiModalHeading from '@/components/ui/avanti_modal_heading.vue'
import { useModalBehavior } from '@/composables/use_modal_behavior'
import type { AvantiModalCloseReason, AvantiModalEmits, AvantiModalProps } from '@/types/avanti_modal'

const props = withDefaults(defineProps<AvantiModalProps>(), {
  title: '',
  eyebrow: '',
  label: '',
  size: 'md',
  variant: 'default',
  closable: true,
  closeOnBackdrop: true,
  closeOnEscape: true,
  closeLabel: 'Chiudi',
})

const emit = defineEmits<AvantiModalEmits>()

const slots = useSlots()
const titleId = `${useId()}-title`

const rootClasses = computed(() => [`avanti-modal--${props.size}`, `avanti-modal--${props.variant}`])
const hasHeader = computed(() => Boolean(props.title || props.eyebrow || slots.header))
const ariaLabelledby = computed(() => (props.title ? titleId : undefined))
const ariaLabel = computed(() => (props.title ? undefined : props.label || undefined))

function requestClose(reason: AvantiModalCloseReason): void {
  emit('update:open', false)
  emit('close', reason)
}

function handleCloseButton(): void {
  requestClose('button')
}

function handleBackdrop(): void {
  if (props.closeOnBackdrop) {
    requestClose('backdrop')
  }
}

const windowRef = useModalBehavior({
  isOpen: () => props.open,
  closeOnEscape: () => props.closeOnEscape,
  onEscape: () => requestClose('escape'),
})
</script>

<style lang="scss" scoped>
/* Слой поверх шапки: окно перекрывает и навигацию, и нижнее меню. */
$modal-layer: 110;

.avanti-modal {
  --avanti-modal-gap: 20px;
  --avanti-modal-pad: 16px;

  position: fixed;
  inset: 0;
  z-index: $modal-layer;
  display: flex;
  align-items: center;
  justify-content: center;

  /* Поля мобильного кадра: 390 − 20×2 = 350px — ширина окна из макета. */
  padding: 20px;

  &__backdrop {
    position: absolute;
    inset: 0;
    cursor: pointer;
    background-color: var(--avanti-color-overlay);
  }

  &__window {
    @include inner-border(var(--avanti-color-border));

    position: relative;
    display: flex;
    flex-direction: column;
    gap: var(--avanti-modal-gap);
    width: 100%;
    max-height: 100%;
    padding: var(--avanti-modal-pad) var(--avanti-modal-pad) calc(var(--avanti-modal-pad) + 8px);
    background-color: var(--avanti-color-surface);
    border-radius: var(--avanti-radius-modal);

    /* Фокус уходит на окно только чтобы объявить диалог — рамка не нужна. */
    &:focus {
      outline: none;
    }
  }

  &--sm &__window {
    max-width: 480px;
  }

  &--md &__window {
    max-width: 681px;
  }

  &--lg &__window {
    max-width: 880px;
  }

  &__header {
    display: flex;
    flex-shrink: 0;
    flex-direction: column;
    gap: 4px;
  }

  /* Длинное содержимое прокручивается внутри окна, а не растягивает его. */
  &__body {
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    gap: var(--avanti-modal-gap);
    min-height: 0;

    /* Боковые поля окна держит тело, а не окно: иначе обрезка съедала бы
       блоки, намеренно выходящие в эти поля. Подробности — в миксине. */
    @include modal-body;
  }

  &__footer {
    flex-shrink: 0;
  }

  /* --- Брендовый вариант: окна авторизации и настроек аккаунта --- */
  &--brand {
    --avanti-modal-gap: 16px;
  }

  &--brand &__window {
    max-width: 350px;
    border-radius: var(--avanti-radius-4xl);
    box-shadow: none;
  }

  /* В кадрах между подписью окна и первым полем 20px: 16px зазора плюс 4px. */
  &--brand &__header {
    padding-bottom: 4px;
  }

  @include desktop-up {
    --avanti-modal-gap: 24px;
    --avanti-modal-pad: 24px;

    padding: 24px;

    /* Ширина, поля и радиус брендового окна зафиксированы кадром (524px). */
    &--brand &__window {
      max-width: 524px;
      padding: 12px 24px 36px;
      border-radius: var(--avanti-radius-modal);
    }

    &--brand &__header {
      padding-bottom: 8px;
    }
  }

  /* --- Варианты с шириной и полями из своих кадров. Стоят после блока
     desktop-up намеренно: у `.avanti-modal--*` и `.avanti-modal` одинаковая
     специфичность, поэтому решает порядок — иначе десктопные значения
     `--avanti-modal-*` перебивали бы кадровые. Проп `size` в этих вариантах
     не участвует, как и в `brand`. --- */

  /*
   * Окно-обёртка для панели во всю ширину (кадр «Документы всплывашка» 1:935).
   * Содержимое размечает себя само, поэтому зазора между частями окна нет,
   * а поля 16px по бокам отдаются панели через `--avanti-modal-pad`: по ним
   * панель выводит линию под заголовком от края до края окна.
   */
  &--panel {
    --avanti-modal-gap: 0;
    --avanti-modal-pad: 16px;
  }

  &--panel &__window {
    /* Габариты кадра: ширина 650px, поля 20px сверху и снизу, 16px по бокам. */
    max-width: 650px;
    padding: 20px var(--avanti-modal-pad);
  }

  /* Узкое поясняющее окно поверх другого окна (кадр «DETTAGLI» 246:6880). */
  &--info {
    --avanti-modal-gap: 0;
  }

  &--info &__window {
    /* Габариты кадра: ширина 511px, поля 16px сверху и по бокам, 24px снизу. */
    max-width: 511px;
    padding: 16px 16px 24px;
  }

  /* Окна блока сертификата CPI: оформление целиком на содержимом. */
  &--bare {
    @include modal-bare;
  }

  /*
   * В кадре окно под поясняющим затемнено сильнее базовых 45%. Своего токена
   * под это значение нет и палитру трогать нельзя, поэтому затемнение
   * набирается вторым слоем того же токена: 45% + 55% × 45% × 0.6 = 60%.
   */
  &--info &__backdrop::after {
    position: absolute;
    inset: 0;
    content: '';
    background-color: var(--avanti-color-overlay);
    opacity: 0.6;
  }
}

/* --- Анимация: затемнение проявляется, окно всплывает.
   Системную настройку «меньше движения» отрабатывает base.scss: он глушит
   длительность всех переходов, поэтому окно просто появляется. --- */
.avanti-modal-enter-active,
.avanti-modal-leave-active {
  transition: opacity var(--avanti-transition-base);

  .avanti-modal__window {
    transition: transform var(--avanti-transition-base);
  }
}

.avanti-modal-enter-from,
.avanti-modal-leave-to {
  opacity: 0;

  .avanti-modal__window {
    transform: translateY(12px) scale(0.98);
  }
}
</style>
