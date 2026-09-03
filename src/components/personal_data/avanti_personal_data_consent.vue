<!--
  Строка согласия под полями анкеты: круглый бейдж «i» и мелкий поясняющий текст.

  Бейдж имеет точный размер из макета (20px на мобильной, 24px на десктопе),
  поэтому обводка рисуется внутрь через inner-border — обычный border прибавил
  бы к габаритам 2–3px. В макете это не чекбокс, а информационная подпись,
  поэтому блок не интерактивен.
-->
<template>
  <p class="avanti-personal-data-consent">
    <span class="avanti-personal-data-consent__badge" aria-hidden="true">{{ badge }}</span>
    <span class="avanti-personal-data-consent__text">{{ text }}</span>
  </p>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    /** Текст согласия. */
    text: string
    /** Символ внутри бейджа. */
    badge?: string
  }>(),
  { badge: 'i' },
)
</script>

<style lang="scss" scoped>
.avanti-personal-data-consent {
  display: flex;
  gap: 10px;
  align-items: center;
  width: 100%;
  margin: 0;

  &__badge {
    @include inner-border(var(--avanti-color-primary), 1.5px);

    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    font-size: 12px;
    font-weight: var(--avanti-font-weight-semibold);
    line-height: normal;
    color: var(--avanti-color-primary);
    border-radius: var(--avanti-radius-round);
  }

  &__text {
    flex: 1 0 0;
    min-width: 0;
    font-size: 12px;
    font-weight: var(--avanti-font-weight-light);
    line-height: normal;
    color: var(--avanti-color-text-muted);
    letter-spacing: 0.48px;
  }

  @include desktop-up {
    gap: 12px;

    .avanti-personal-data-consent__badge {
      @include inner-border(var(--avanti-color-primary), 1px);

      width: 24px;
      height: 24px;
      font-size: 14px;
    }

    .avanti-personal-data-consent__text {
      font-size: 14px;
      letter-spacing: 0.56px;
    }
  }
}
</style>
