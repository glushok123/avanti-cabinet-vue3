<!--
  План амортизации (кадр Figma 28:5319): заголовок и таблица из 22 платежей.

  Мобильного макета этого экрана в Figma нет, а таблица из шести колонок
  на 390px не помещается физически. Поэтому таблица заключена в область
  с горизонтальной прокруткой: у неё есть tabindex и доступное имя,
  так что прокрутка работает и с клавиатуры, и для скринридера.
-->
<template>
  <section class="avanti-contract-schedule">
    <AvantiContractSectionTitle :text="schedule.title" />
    <div class="avanti-contract-schedule__scroller" tabindex="0" role="region" :aria-label="schedule.caption">
      <table class="avanti-contract-schedule__table">
        <caption class="avanti-contract-schedule__caption">
          {{
            schedule.caption
          }}
        </caption>
        <thead>
          <tr>
            <th
              v-for="column in schedule.columns"
              :key="column.id"
              class="avanti-contract-schedule__head-cell"
              :class="alignClass(column.numeric)"
              scope="col"
            >
              {{ column.label }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in schedule.rows" :key="row.id" class="avanti-contract-schedule__row">
            <th class="avanti-contract-schedule__cell avanti-contract-schedule__cell--index" scope="row">
              {{ row.number }}
            </th>
            <td class="avanti-contract-schedule__cell">{{ row.date }}</td>
            <td class="avanti-contract-schedule__cell avanti-contract-schedule__cell--numeric">
              {{ row.total }}
            </td>
            <td class="avanti-contract-schedule__cell avanti-contract-schedule__cell--numeric">
              {{ row.principal }}
            </td>
            <td class="avanti-contract-schedule__cell avanti-contract-schedule__cell--numeric">
              {{ row.interest }}
            </td>
            <td
              class="avanti-contract-schedule__cell avanti-contract-schedule__cell--numeric avanti-contract-schedule__cell--total"
            >
              {{ row.balance }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script setup lang="ts">
import AvantiContractSectionTitle from '@/components/contract/avanti_contract_section_title.vue'
import type { AvantiContractSchedule } from '@/types/avanti_contract'

defineProps<{ schedule: AvantiContractSchedule }>()

/** Денежные колонки выравниваются по правому краю, номер и дата — по левому. */
function alignClass(numeric: boolean): string {
  return numeric
    ? 'avanti-contract-schedule__head-cell--numeric'
    : 'avanti-contract-schedule__head-cell--text'
}
</script>

<style lang="scss" scoped>
.avanti-contract-schedule {
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: flex-start;
  width: 100%;
  padding: 24px 32px;

  /* Рамка и скругление живут на области прокрутки: при сдвиге таблицы
     вбок они остаются на месте и обрамляют видимую часть. */
  &__scroller {
    @include inner-border(var(--avanti-color-border));
    @include focus-ring(-2px);

    width: 100%;
    overflow-x: auto;
    border-radius: var(--avanti-radius-md);
  }

  &__caption {
    @include visually-hidden;
  }

  &__table {
    /* Ширина колонок задаётся заголовками, а не содержимым: иначе
       столбцы «пляшут» при разной длине сумм. */
    width: 100%;

    /* Ниже этой ширины колонки нечитаемы — включается прокрутка. */
    min-width: 640px;
    table-layout: fixed;
    border-collapse: collapse;
  }

  /* --- Шапка таблицы --- */
  &__head-cell {
    /* Доли повторяют макет: 147px у крайних колонок и 135px у средних
       при ширине таблицы 834px. */
    width: 16.19%;
    padding: 14px 4px;
    font-size: 10px;
    font-weight: var(--avanti-font-weight-bold);
    line-height: normal;
    color: var(--avanti-color-text-secondary);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    white-space: nowrap;
    background-color: var(--avanti-color-surface-muted);
    border-bottom: 1px solid var(--avanti-color-border);

    &--text {
      text-align: left;
    }

    &--numeric {
      text-align: right;
    }

    &:first-child,
    &:last-child {
      width: 17.63%;
    }
  }

  /* --- Тело таблицы --- */
  &__row {
    /* Чередование фона — как в макете: чётные строки чуть темнее. */
    &:nth-child(even) {
      background-color: var(--avanti-color-surface-zebra);
    }

    & + & {
      border-top: 1px solid var(--avanti-color-divider);
    }
  }

  &__cell {
    padding: 12px 4px;
    font-size: 12px;
    font-weight: var(--avanti-font-weight-regular);

    /* Моноширинные цифры: без них разряды в соседних строках не совпадают. */
    font-variant-numeric: tabular-nums;
    line-height: normal;
    color: var(--avanti-color-text-strong);
    text-align: left;
    white-space: nowrap;

    &--index {
      color: var(--avanti-color-text-secondary);
    }

    &--numeric {
      text-align: right;
    }

    &--total {
      font-weight: var(--avanti-font-weight-semibold);
    }
  }

  /* Внешние отступы строки: 16px слева и справа, между колонками — 8px. */
  &__head-cell:first-child,
  &__cell:first-child {
    padding-left: 16px;
  }

  &__head-cell:last-child,
  &__cell:last-child {
    padding-right: 16px;
  }

  @include mobile {
    gap: 12px;
    padding: 16px;
  }
}
</style>
