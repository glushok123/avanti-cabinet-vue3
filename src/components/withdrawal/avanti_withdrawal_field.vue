<!--
  Поле реквизитов формы вывода средств.

  Разметку, надпись и доступность даёт готовый примитив avanti_text_field —
  здесь только габариты из кадров вывода средств (поле ниже и с нейтральной
  обводкой: 54px против 58/85px в анкете) и поясняющая подпись под полем.
  В анкете такая подпись стоит над полем, поэтому она добавлена здесь,
  а не пробрасывается пропом hint.

  Наружу поле отдаёт своё имя вместе со значением: так список полей
  обходится без обработчиков в шаблоне.
-->
<template>
  <div class="avanti-withdrawal-field">
    <AvantiTextField
      class="avanti-withdrawal-field__control"
      :model-value="modelValue"
      :label="label"
      :placeholder="placeholder"
      :name="name"
      :autocomplete="autocomplete"
      :disabled="disabled"
      :error-message="errorMessage"
      @update:model-value="handleUpdate"
    />
    <p v-if="caption" class="avanti-withdrawal-field__caption">{{ caption }}</p>
  </div>
</template>

<script setup lang="ts">
import AvantiTextField from '@/components/ui/avanti_text_field.vue'

const props = withDefaults(
  defineProps<{
    /** Ключ поля: возвращается наружу вместе с введённым значением. */
    name: string
    modelValue: string
    label: string
    placeholder?: string
    /** Поясняющая подпись под полем. */
    caption?: string
    autocomplete?: string
    disabled?: boolean
    errorMessage?: string
  }>(),
  {
    placeholder: '',
    caption: '',
    autocomplete: undefined,
    disabled: false,
    errorMessage: '',
  },
)

const emit = defineEmits<{ update: [name: string, value: string] }>()

function handleUpdate(value: string): void {
  emit('update', props.name, value)
}
</script>

<style lang="scss" scoped>
/*
 * Габариты поля из макета. Размеры одинаковы на обеих ширинах, а примитив
 * на десктопе вырастает до 85px, поэтому набор применяется дважды —
 * в базовых стилях и внутри desktop-up, где он гасит правила примитива.
 */
@mixin field-metrics {
  gap: 6px;

  :deep(.avanti-field-label__text) {
    font-size: 11px;
    font-weight: var(--avanti-font-weight-bold);
    color: var(--avanti-color-text-secondary);
    letter-spacing: 0;
  }

  :deep(.avanti-text-field__control),
  :deep(.avanti-text-field__control:hover) {
    @include inner-border(var(--avanti-color-border-soft), 1px);

    height: 54px;
    padding: 0 16px;
    border-radius: var(--avanti-radius-sm);
  }

  :deep(.avanti-text-field__control:focus-within) {
    @include inner-border(var(--avanti-color-primary), 1px);
  }

  :deep(.avanti-text-field__input) {
    font-size: 15px;
    font-weight: var(--avanti-font-weight-medium);
  }
}

.avanti-withdrawal-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;

  &__control {
    @include field-metrics;
  }

  &__caption {
    font-size: 11px;
    font-weight: var(--avanti-font-weight-medium);
    line-height: normal;
    color: var(--avanti-color-text-secondary);
  }

  @include desktop-up {
    &__control {
      @include field-metrics;
    }
  }
}
</style>
