<!--
  Широкая карточка «Dati personali» левой колонки профиля: заголовок с кнопкой
  перехода к смене имени, список «подпись — значение» и поле IBAN.

  Отступы карточки заданы здесь, а не пропом padding базовой карточки:
  в макете они разные (24px на десктопе, 16px на мобильной).
-->
<template>
  <AvantiCard
    class="avanti-profile-data-card"
    padding="none"
    shadow="none"
    tag="section"
    :aria-labelledby="titleId"
  >
    <div class="avanti-profile-data-card__head">
      <h2 :id="titleId" class="avanti-profile-data-card__title">{{ content.title }}</h2>
      <AvantiButton class="avanti-profile-data-card__edit" variant="outline" @click="handleEdit">
        {{ content.editLabel }}
      </AvantiButton>
    </div>
    <div class="avanti-profile-data-card__list">
      <AvantiProfileDataRow v-for="row in content.rows" :key="row.id" :label="row.label" :value="row.value" />
      <AvantiCopyField
        :label="content.iban.label"
        :value="content.iban.value"
        :copy-label="content.iban.copyLabel"
        size="md"
      />
    </div>
  </AvantiCard>
</template>

<script setup lang="ts">
import { computed, useId } from 'vue'
import AvantiCard from '@/components/ui/avanti_card.vue'
import AvantiButton from '@/components/ui/avanti_button.vue'
import AvantiProfileDataRow from '@/components/profile/avanti_profile_data_row.vue'
import AvantiCopyField from '@/components/ui/avanti_copy_field.vue'
import type { AvantiProfileDataCardContent } from '@/types/avanti_profile'

defineProps<{ content: AvantiProfileDataCardContent }>()

/** Нажатие кнопки «Modifica nome»: маршрут подключается на этапе интеграции. */
const emit = defineEmits<{ edit: [] }>()

const uid = useId()
const titleId = computed(() => `${uid}-title`)

function handleEdit(): void {
  emit('edit')
}
</script>

<style lang="scss" scoped>
.avanti-profile-data-card {
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: flex-start;
  width: 100%;
  padding: 16px;

  &__head {
    display: flex;
    gap: 12px;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  &__title {
    font-size: 15px;
    font-weight: var(--avanti-font-weight-semibold);
    line-height: normal;
    color: var(--avanti-color-text-strong);
  }

  /*
   * Кнопка в макете отличается от базового контурного варианта: подпись
   * тёмная, обводка тоньше, ширина по содержимому. Переопределения собраны
   * здесь, чтобы сам компонент кнопки оставался общим для проекта.
   */
  &__edit.avanti-button {
    flex-shrink: 0;
    width: auto;
    height: auto;
    padding: 8px 12px;
    font-size: 12px;
    font-weight: var(--avanti-font-weight-medium);
    color: var(--avanti-color-text-strong);
    border-width: 1px;
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
    width: 100%;
  }

  @include desktop-up {
    padding: 24px;

    &__list {
      gap: 16px;
    }

    /* Ширина кнопки зафиксирована кадром Figma (146×40). */
    &__edit.avanti-button {
      width: 146px;
      padding: 10px 12px;
      font-size: 14px;
    }
  }
}
</style>
