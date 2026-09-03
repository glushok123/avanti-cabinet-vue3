<!--
  Карточка «Sicurezza» (кадр 1:3541): шапка со щитом, строки смены пароля
  и почты через разделители и блок подтверждения email в конце.
-->
<template>
  <AvantiCard class="avanti-auth-security-card" padding="lg" shadow="none" tag="section">
    <div class="avanti-auth-security-card__head">
      <span class="avanti-auth-security-card__icon">
        <span class="avanti-auth-security-card__glyph">
          <AvantiIconShield />
        </span>
      </span>
      <h2 class="avanti-auth-security-card__title">{{ title }}</h2>
    </div>
    <template v-for="row in rows" :key="row.id">
      <span class="avanti-auth-security-card__divider" />
      <AvantiAuthSecurityRow :description="row.description" :action-label="row.actionLabel" />
    </template>
    <span class="avanti-auth-security-card__divider" />
    <AvantiAuthEmailVerification :content="verification" />
  </AvantiCard>
</template>

<script setup lang="ts">
import AvantiCard from '@/components/ui/avanti_card.vue'
import AvantiIconShield from '@/components/icons/avanti_icon_shield.vue'
import AvantiAuthSecurityRow from '@/components/auth/avanti_auth_security_row.vue'
import AvantiAuthEmailVerification from '@/components/auth/avanti_auth_email_verification.vue'
import type { AvantiEmailVerificationContent, AvantiSecurityRow } from '@/types/avanti_auth'

defineProps<{
  title: string
  rows: AvantiSecurityRow[]
  verification: AvantiEmailVerificationContent
}>()
</script>

<style lang="scss" scoped>
.avanti-auth-security-card {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 100%;

  &__head {
    display: flex;
    gap: 10px;
    align-items: center;
    width: 100%;
    padding-bottom: 16px;
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
  }

  /* Щит в макете 18px внутри квадрата 32px. */
  &__glyph {
    display: flex;
    width: 18px;
    height: 18px;
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
}
</style>
