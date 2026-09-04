<!--
  Блок подтверждения почты внутри карточки «Sicurezza»: заголовок со
  статусом, пояснение, ряд ячеек кода, кнопка подтверждения и ссылка
  повторной отправки.
  Десктоп — кадр 1:3558, мобильная — кадр 22:3508: там блок уже (отступы
  14px), тексты на пункт мельче, а кнопка и таймер идут столбиком по центру.
-->
<template>
  <section class="avanti-auth-email-verification">
    <div class="avanti-auth-email-verification__head">
      <span class="avanti-auth-email-verification__help">
        <span aria-hidden="true">{{ content.helpBadge }}</span>
        <span class="avanti-auth-email-verification__help-text">{{ content.helpLabel }}</span>
      </span>
      <h3 class="avanti-auth-email-verification__title">{{ content.title }}</h3>
      <span class="avanti-auth-email-verification__status">{{ content.statusLabel }}</span>
    </div>
    <p class="avanti-auth-email-verification__description">{{ content.description }}</p>
    <p class="avanti-auth-email-verification__prompt">{{ content.prompt }}</p>
    <AvantiAuthCodeInput
      v-model="code"
      class="avanti-auth-email-verification__code"
      :length="content.codeLength"
      :label="content.codeLabel"
    />
    <div class="avanti-auth-email-verification__footer">
      <AvantiButton class="avanti-auth-email-verification__confirm" @click="handleConfirm">
        {{ content.confirmLabel }}
      </AvantiButton>
      <p class="avanti-auth-email-verification__resend">
        <span class="avanti-auth-email-verification__resend-question">
          {{ content.resendQuestion }}
        </span>
        <button class="avanti-auth-email-verification__resend-action" type="button" @click="handleResend">
          {{ content.resendLabel }}
        </button>
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AvantiButton from '@/components/ui/avanti_button.vue'
import AvantiAuthCodeInput from '@/components/auth/avanti_auth_code_input.vue'
import type { AvantiEmailVerificationContent } from '@/types/avanti_auth'

defineProps<{ content: AvantiEmailVerificationContent }>()

const emit = defineEmits<{
  confirm: [code: string]
  resend: []
}>()

const code = ref<string>('')

/* Проверка кода появится вместе с API: вёрстка только отдаёт событие. */
function handleConfirm(): void {
  emit('confirm', code.value)
}

function handleResend(): void {
  emit('resend')
}
</script>

<style lang="scss" scoped>
.avanti-auth-email-verification {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-start;
  width: 100%;

  /* Кадр 22:3508: на мобильной внутренние отступы 14px. */
  padding: 14px;
  background-color: var(--avanti-color-primary-soft);
  border-radius: var(--avanti-radius-sm);

  &__head {
    display: flex;
    gap: 6px;
    align-items: center;
    width: 100%;
  }

  &__help {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    font-size: 11px;
    font-weight: var(--avanti-font-weight-bold);
    line-height: normal;
    color: var(--avanti-color-primary);
    background-color: var(--avanti-color-surface);
    border-radius: var(--avanti-radius-round);
  }

  /* Расшифровка знака вопроса нужна скринридеру, но не показывается. */
  &__help-text {
    @include visually-hidden;
  }

  &__title {
    flex: 1 0 auto;
    font-size: 13px;
    font-weight: var(--avanti-font-weight-semibold);
    line-height: normal;
    color: var(--avanti-color-text-strong);
  }

  &__status {
    flex-shrink: 0;
    padding: 3px 10px;
    font-size: 11px;
    font-weight: var(--avanti-font-weight-semibold);
    line-height: normal;
    color: var(--avanti-color-primary);
    background-color: var(--avanti-color-surface);
    border-radius: var(--avanti-radius-md);
  }

  &__description,
  &__prompt {
    font-size: 12px;
    font-weight: var(--avanti-font-weight-regular);
    line-height: normal;
  }

  &__description {
    /* Кадр 22:3583 → 22:3590: между заголовком и пояснением 18px. */
    margin-top: 8px;
    color: var(--avanti-color-text-secondary);
  }

  &__prompt {
    margin-top: 10px;
    color: var(--avanti-color-text-strong);
  }

  &__code {
    width: 100%;
    margin-top: 4px;
  }

  &__footer {
    display: flex;
    flex-direction: column;
    gap: 10px;

    /* Кадр 22:3604: кнопка и таймер выровнены по центру блока. */
    align-items: center;
    width: 100%;
    margin-top: 14px;
  }

  & &__confirm {
    width: 100%;
    height: 36px;
    padding: 8px 16px;
    font-size: 14px;
    font-weight: var(--avanti-font-weight-medium);
    text-transform: uppercase;
    border-radius: var(--avanti-radius-sm);
  }

  /* Кадр 22:3610: строки таймера идут по центру с зазором 2px. */
  &__resend {
    display: flex;
    flex-direction: column;
    gap: 2px;
    align-items: center;
    font-size: 12px;
    line-height: normal;
  }

  &__resend-question {
    font-weight: var(--avanti-font-weight-regular);
    color: var(--avanti-color-text-secondary);
  }

  &__resend-action {
    @include button-reset;
    @include focus-ring;

    font-size: 12px;
    font-weight: var(--avanti-font-weight-semibold);
    color: var(--avanti-color-primary);
    text-decoration: underline;
  }

  /* Десктопный кадр 1:3558: блок шире, тексты 13px, кнопка и таймер в строку. */
  @include desktop-up {
    gap: 10px;
    padding: 16px;

    &__description,
    &__prompt {
      max-width: 400px;
      font-size: 13px;
    }

    &__description {
      margin-top: 0;
    }

    &__footer {
      flex-direction: row;
      gap: 10px;
      align-items: center;
      margin-top: 14px;
    }

    & &__confirm {
      width: 160px;
      height: 36px;
      font-size: 16px;
      font-weight: var(--avanti-font-weight-medium);
    }

    &__resend {
      gap: 6px;
      align-items: flex-start;
      font-size: 13px;
    }

    &__resend-action {
      font-size: 13px;
    }
  }
}
</style>
