<!--
  Карточка «Sicurezza»: заголовок со щитом, строки смены пароля и почты,
  разделённые линиями, и блок подтверждения почты внизу.
-->
<template>
  <AvantiCard
    class="avanti-profile-security-card"
    padding="none"
    shadow="none"
    tag="section"
    :aria-labelledby="titleId"
  >
    <div class="avanti-profile-security-card__head">
      <span class="avanti-profile-security-card__icon" aria-hidden="true">
        <AvantiIconShield />
      </span>
      <h2 :id="titleId" class="avanti-profile-security-card__title">{{ content.title }}</h2>
    </div>
    <template v-for="row in content.rows" :key="row.id">
      <span class="avanti-profile-security-card__divider" aria-hidden="true" />
      <AvantiSecurityRow
        :description="row.description"
        :action-label="row.actionLabel"
        variant="compact"
        @action="handleAction(row.id)"
      />
    </template>
    <span class="avanti-profile-security-card__divider" aria-hidden="true" />
    <AvantiProfileVerificationBlock :content="content.verification" @verify="handleVerify" />
  </AvantiCard>
</template>

<script setup lang="ts">
import { computed, useId } from 'vue'
import AvantiCard from '@/components/ui/avanti_card.vue'
import AvantiIconShield from '@/components/icons/avanti_icon_shield.vue'
import AvantiSecurityRow from '@/components/ui/avanti_security_row.vue'
import AvantiProfileVerificationBlock from '@/components/profile/avanti_profile_verification_block.vue'
import type { AvantiProfileSecurityContent } from '@/types/avanti_profile'

defineProps<{ content: AvantiProfileSecurityContent }>()

/** Идентификатор строки уходит наружу: по нему страница открывает нужную форму. */
const emit = defineEmits<{ action: [id: string]; verify: [] }>()

const uid = useId()
const titleId = computed(() => `${uid}-title`)

function handleAction(id: string): void {
  emit('action', id)
}

function handleVerify(): void {
  emit('verify')
}
</script>

<style lang="scss" scoped>
.avanti-profile-security-card {
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: flex-start;
  width: 100%;
  padding: 16px;

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
    flex-shrink: 0;
    width: 100%;
    height: 1px;
    background-color: var(--avanti-color-border);
  }

  @include desktop-up {
    /*
     * Высота карточки зафиксирована кадром Figma (792×333), а строки внутри
     * распределяются по остатку — поэтому gap заменён на space-between.
     */
    gap: 0;
    justify-content: space-between;
    height: 333px;
    padding: 24px;

    &__head {
      padding-bottom: 16px;
    }
  }
}
</style>
