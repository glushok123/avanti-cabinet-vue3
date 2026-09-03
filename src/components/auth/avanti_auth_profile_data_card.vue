<!--
  Карточка «Dati personali» левой колонки экрана подтверждения почты
  (кадр 1:3510): заголовок с кнопкой правки, список значений и поле IBAN.
  Строки списка берутся у готового компонента личных данных дашборда.
-->
<template>
  <AvantiCard class="avanti-auth-profile-data-card" padding="lg" shadow="none" tag="section">
    <div class="avanti-auth-profile-data-card__head">
      <h2 class="avanti-auth-profile-data-card__title">{{ content.title }}</h2>
      <AvantiButton class="avanti-auth-profile-data-card__edit" variant="outline" @click="handleEdit">
        {{ content.editLabel }}
      </AvantiButton>
    </div>
    <div class="avanti-auth-profile-data-card__list">
      <AvantiDashboardPersonalDataRow
        v-for="row in content.rows"
        :key="row.id"
        :label="row.label"
        :value="row.value"
      />
      <AvantiCopyField
        :label="content.ibanLabel"
        :value="content.ibanValue"
        :copy-label="content.ibanCopyLabel"
        size="sm"
      />
    </div>
  </AvantiCard>
</template>

<script setup lang="ts">
import AvantiCard from '@/components/ui/avanti_card.vue'
import AvantiButton from '@/components/ui/avanti_button.vue'
import AvantiDashboardPersonalDataRow from '@/components/dashboard/avanti_dashboard_personal_data_row.vue'
import AvantiCopyField from '@/components/ui/avanti_copy_field.vue'
import type { AvantiProfileDataContent } from '@/types/avanti_auth'

defineProps<{ content: AvantiProfileDataContent }>()

const emit = defineEmits<{ edit: [] }>()

function handleEdit(): void {
  emit('edit')
}
</script>

<style lang="scss" scoped>
.avanti-auth-profile-data-card {
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: stretch;
  width: 100%;

  &__head {
    display: flex;
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
    width: 100%;
  }

  &__title {
    font-size: 15px;
    font-weight: var(--avanti-font-weight-semibold);
    line-height: normal;
    color: var(--avanti-color-text-strong);
  }

  /* Кнопка правки в макете с фирменной обводкой, но тёмной подписью. */
  & &__edit {
    width: 100%;
    padding: 10px 12px;
    font-size: 14px;
    font-weight: var(--avanti-font-weight-medium);
    color: var(--avanti-color-text-strong);
    border-width: 1px;
    border-radius: var(--avanti-radius-sm);
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
    width: 100%;
  }

  @include desktop-up {
    &__head {
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    }

    & &__edit {
      flex-shrink: 0;
      width: 146px;
      height: auto;
    }
  }
}
</style>
