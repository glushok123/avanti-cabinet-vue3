<!--
  Карточка «Sicurezza»: заголовок со щитом, строки смены пароля и почты,
  разделённые линиями, и блок под ними — он приходит слотом.

  Одна карточка на два кадра: 1:3541 («Verifica email») и 1:2583 («Profilo»).
  Шапка, плитка щита, разделители и список строк в них совпадают, а различия
  сведены к пропу `variant` — как у примитива строки avanti_security_row,
  которому этот же вариант передаётся дальше:
  `default` — кадр подтверждения почты: карточка растёт по содержимому,
              под шапкой 16px на обеих ширинах;
  `compact` — кадр профиля: на мобильной зазор 16px, на десктопе высота
              карточки зафиксирована (792×333) и строки распределены
              по остатку.

  Нижний блок у кадров разный (ввод кода против кнопки «отправить код»),
  поэтому он не проп, а слот: карточка не знает, что в неё вложено.
-->
<template>
  <AvantiCard
    class="avanti-profile-security-card"
    :class="variantClass"
    :padding="cardPadding"
    shadow="none"
    tag="section"
    :aria-labelledby="titleId"
  >
    <div class="avanti-profile-security-card__head">
      <span class="avanti-profile-security-card__icon" aria-hidden="true">
        <AvantiIconShield />
      </span>
      <h2 :id="titleId" class="avanti-profile-security-card__title">{{ title }}</h2>
    </div>
    <template v-for="row in rows" :key="row.id">
      <span class="avanti-profile-security-card__divider" aria-hidden="true" />
      <AvantiSecurityRow
        :description="row.description"
        :action-label="row.actionLabel"
        :variant="variant"
        @action="handleAction(row.id)"
      />
    </template>
    <template v-if="$slots.default">
      <span class="avanti-profile-security-card__divider" aria-hidden="true" />
      <slot />
    </template>
  </AvantiCard>
</template>

<script setup lang="ts">
import { computed, useId } from 'vue'
import AvantiCard from '@/components/ui/avanti_card.vue'
import AvantiIconShield from '@/components/icons/avanti_icon_shield.vue'
import AvantiSecurityRow from '@/components/ui/avanti_security_row.vue'
import type { AvantiProfileSecurityRow, AvantiProfileSecurityVariant } from '@/types/avanti_profile'

const props = withDefaults(
  defineProps<{
    title: string
    rows: AvantiProfileSecurityRow[]
    variant?: AvantiProfileSecurityVariant
  }>(),
  {
    variant: 'default',
  },
)

/** Идентификатор строки уходит наружу: по нему страница открывает нужную форму. */
const emit = defineEmits<{ action: [id: string] }>()

const uid = useId()
const titleId = computed(() => `${uid}-title`)

const variantClass = computed<string>(() => `avanti-profile-security-card--${props.variant}`)

/*
 * В кадре подтверждения почты поля карточки одинаковы на обеих ширинах —
 * их даёт сама карточка. В кадре профиля они разные (16 и 24px), поэтому
 * там поля задаются стилями блока.
 */
const cardPadding = computed<'lg' | 'none'>(() => (props.variant === 'default' ? 'lg' : 'none'))

function handleAction(id: string): void {
  emit('action', id)
}
</script>

<style lang="scss" scoped>
.avanti-profile-security-card {
  display: flex;
  flex-direction: column;
  width: 100%;

  &__head {
    display: flex;
    gap: 10px;
    align-items: center;
    width: 100%;
  }

  &__icon {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    color: var(--avanti-color-primary);
    background-color: var(--avanti-color-primary-soft);
    border-radius: var(--avanti-radius-sm);

    /* Глиф щита в макете 18px внутри плитки 32px. */
    svg {
      width: 18px;
      height: 18px;
    }
  }

  &__title {
    font-size: 15px;
    font-weight: var(--avanti-font-weight-semibold);
    line-height: normal;
    color: var(--avanti-color-text-strong);
  }

  &__divider {
    width: 100%;
    height: 1px;
    background-color: var(--avanti-color-border);
  }

  /* --- default: карточка экрана подтверждения почты (кадр 1:3541) --- */
  &--default {
    align-items: stretch;
  }

  &--default &__head {
    padding-bottom: 16px;
  }

  /* --- compact: карточка страницы профиля (кадр 1:2583) --- */
  &--compact {
    gap: 16px;
    align-items: flex-start;
    padding: 16px;
  }

  &--compact &__divider {
    flex-shrink: 0;
  }

  @include desktop-up {
    /*
     * Высота карточки профиля зафиксирована кадром Figma (792×333), а строки
     * внутри распределяются по остатку — поэтому gap заменён на space-between.
     */
    &--compact {
      gap: 0;
      justify-content: space-between;
      height: 333px;
      padding: 24px;
    }

    &--compact &__head {
      padding-bottom: 16px;
    }
  }
}
</style>
