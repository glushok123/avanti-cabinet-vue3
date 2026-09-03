<!--
  Надпись над полем анкеты. В макете набрана прописными («COGNOME», «SESSO»),
  под ней может стоять поясняющая подпись обычным регистром.

  Если передан fieldId, надпись рендерится как <label for>, иначе — как <span>.
  Второй вариант нужен для составных элементов (выпадающий список, группа
  переключателей): у них нет одиночного input, и связь идёт через aria-labelledby,
  для чего надписи задаётся id.
-->
<template>
  <div class="avanti-field-label">
    <component :is="tag" :id="id" class="avanti-field-label__text" :for="fieldId">
      {{ text }}
    </component>
    <p v-if="hint" class="avanti-field-label__hint">{{ hint }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    /** Текст надписи. Регистр приводится к прописным средствами CSS. */
    text: string
    /** Поясняющая подпись под надписью. */
    hint?: string
    /** id связанного input — включает режим <label for>. */
    fieldId?: string
    /** id самой надписи, чтобы ссылаться на неё через aria-labelledby. */
    id?: string
  }>(),
  {
    hint: '',
    fieldId: undefined,
    id: undefined,
  },
)

const tag = computed(() => (props.fieldId ? 'label' : 'span'))
</script>

<style lang="scss" scoped>
.avanti-field-label {
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;

  &__text {
    display: block;
    font-size: 15px;
    font-weight: var(--avanti-font-weight-regular);
    line-height: normal;
    color: var(--avanti-color-text-label);
    text-transform: uppercase;
    letter-spacing: 0.6px;
  }

  &__hint {
    font-size: 14px;
    font-weight: var(--avanti-font-weight-regular);
    line-height: normal;
    color: var(--avanti-color-text-muted);
    letter-spacing: 0.56px;
  }

  @include desktop-up {
    gap: 12px;

    &__text {
      font-size: 20px;
      letter-spacing: 0.8px;
    }

    &__hint {
      font-size: 18px;
      letter-spacing: 0.72px;
    }
  }
}
</style>
