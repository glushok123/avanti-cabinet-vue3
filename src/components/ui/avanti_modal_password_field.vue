<!--
  Поле пароля модального окна: поле ввода плюс кнопка-глаз в слоте иконки.
  Состояние видимости локальное — форма о нём не знает, наружу уходит
  только значение.

  Размер `sm` собирает поле окон авторизации, `md` — окон настроек аккаунта.
-->
<template>
  <AvantiModalField
    :id="id"
    :model-value="modelValue"
    :label="label"
    :type="fieldType"
    :name="name"
    :autocomplete="autocomplete"
    :note="note"
    :size="size"
    @update:model-value="handleUpdate"
  >
    <template #icon>
      <AvantiPasswordToggle
        :visible="isVisible"
        :show-label="showLabel"
        :hide-label="hideLabel"
        :size="size"
        @toggle="toggleVisibility"
      />
    </template>
  </AvantiModalField>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import AvantiModalField from '@/components/ui/avanti_modal_field.vue'
import AvantiPasswordToggle from '@/components/ui/avanti_password_toggle.vue'
import type { AvantiModalFieldSize } from '@/types/avanti_form'

withDefaults(
  defineProps<{
    modelValue: string
    label: string
    /** Доступное имя кнопки в состоянии «пароль скрыт». */
    showLabel: string
    /** Доступное имя кнопки в состоянии «пароль показан». */
    hideLabel: string
    name?: string
    autocomplete?: string
    /** Пояснение под полем. */
    note?: string
    size?: AvantiModalFieldSize
    id?: string
  }>(),
  {
    name: undefined,
    autocomplete: undefined,
    note: '',
    size: 'md',
    id: undefined,
  },
)

const emit = defineEmits<{ 'update:modelValue': [value: string] }>()

const isVisible = ref<boolean>(false)

const fieldType = computed<'text' | 'password'>(() => (isVisible.value ? 'text' : 'password'))

function toggleVisibility(): void {
  isVisible.value = !isVisible.value
}

function handleUpdate(value: string): void {
  emit('update:modelValue', value)
}
</script>
