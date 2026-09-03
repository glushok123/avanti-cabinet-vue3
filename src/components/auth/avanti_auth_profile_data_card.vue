<!--
  Карточка «Dati personali» левой колонки экрана подтверждения почты
  (кадр 1:3510): заголовок с кнопкой правки, список значений и поле IBAN.
  Строки списка и поле IBAN берутся у общих примитивов
  avanti_label_value_row и avanti_copy_field.

  ПОЧЕМУ ОТДЕЛЬНО ОТ avanti_profile_data_card: структура у карточек одна,
  но метрики расходятся на каждом уровне — размер строк и поля IBAN (sm
  против md), поля карточки (24px против 16/24px), раскладка шапки на
  мобильной (столбец против ряда) и кнопка правки (во всю ширину, 14px
  против кнопки по содержимому, 12px). Общий компонент пришлось бы почти
  целиком собрать из двух наборов правил, поэтому кадры оставлены
  раздельными: переиспользование живёт уровнем ниже — в примитивах.
-->
<template>
  <AvantiCard
    class="avanti-auth-profile-data-card"
    padding="lg"
    shadow="none"
    tag="section"
    :aria-labelledby="titleId"
  >
    <div class="avanti-auth-profile-data-card__head">
      <h2 :id="titleId" class="avanti-auth-profile-data-card__title">{{ content.title }}</h2>
      <AvantiButton class="avanti-auth-profile-data-card__edit" variant="outline" @click="handleEdit">
        {{ content.editLabel }}
      </AvantiButton>
    </div>
    <div class="avanti-auth-profile-data-card__list">
      <AvantiLabelValueRow v-for="row in content.rows" :key="row.id" :label="row.label" :value="row.value" />
      <AvantiCopyField
        :label="content.iban.label"
        :value="content.iban.value"
        :copy-label="content.iban.copyLabel"
        size="sm"
      />
    </div>
  </AvantiCard>
</template>

<script setup lang="ts">
import { computed, useId } from 'vue'
import AvantiCard from '@/components/ui/avanti_card.vue'
import AvantiButton from '@/components/ui/avanti_button.vue'
import AvantiLabelValueRow from '@/components/ui/avanti_label_value_row.vue'
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

  /*
   * Кнопка правки в макете с фирменной обводкой, но тёмной подписью.
   *
   * Обводка рисуется внутрь: обычный border прибавлял 2px к высоте, и кнопка
   * вместе со строкой заголовка выходила 39px вместо макетных 37px
   * (кадр 1:3513, 146×37). Тот же приём у карточки профиля — кадр 1:2823
   * задаёт ровно те же габариты.
   */
  & &__edit {
    @include inner-border(var(--avanti-color-primary), 1px);

    width: 100%;
    padding: 10px 12px;
    font-size: 14px;
    font-weight: var(--avanti-font-weight-medium);
    color: var(--avanti-color-text-strong);
    border: none;
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
