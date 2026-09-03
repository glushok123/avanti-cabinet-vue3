<!--
  Кнопка-переключатель видимости пароля.
  Живёт в слоте `icon` поля ввода: само поле не знает о состоянии видимости,
  оно принадлежит форме.

  В макете нарисован один глиф глаза без перечёркнутого варианта, поэтому
  состояние передаётся не второй иконкой, а атрибутом aria-pressed
  и цветом: скрытый пароль — приглушённый глаз, показанный — фирменный.

  Размеры из макета: `sm` — окна авторизации (20px на мобильной, 32px
  на десктопе), `md` — окна настроек аккаунта (32px везде).
-->
<template>
  <button
    class="avanti-password-toggle"
    :class="stateClasses"
    type="button"
    :aria-pressed="visible"
    :aria-label="visible ? hideLabel : showLabel"
    @click="handleClick"
  >
    <AvantiIconEye />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import AvantiIconEye from '@/components/icons/avanti_icon_eye.vue'

type PasswordToggleSize = 'sm' | 'md'

const props = withDefaults(
  defineProps<{
    /** Пароль сейчас показан открытым текстом. */
    visible: boolean
    /** Доступное имя в состоянии «пароль скрыт». */
    showLabel: string
    /** Доступное имя в состоянии «пароль показан». */
    hideLabel: string
    size?: PasswordToggleSize
  }>(),
  {
    size: 'md',
  },
)

const emit = defineEmits<{ toggle: [] }>()

const stateClasses = computed(() => [
  `avanti-password-toggle--${props.size}`,
  { 'avanti-password-toggle--active': props.visible },
])

function handleClick(): void {
  emit('toggle')
}
</script>

<style lang="scss" scoped>
.avanti-password-toggle {
  @include button-reset;
  @include focus-ring;

  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  color: var(--avanti-color-track);
  border-radius: var(--avanti-radius-xs);
  transition: color var(--avanti-transition-fast);

  &:hover {
    color: var(--avanti-color-text-tertiary);
  }

  &--active,
  &--active:hover {
    color: var(--avanti-color-primary);
  }

  &--sm {
    width: 20px;
    height: 20px;
  }

  &--md {
    width: 32px;
    height: 32px;
  }

  @include desktop-up {
    &--sm {
      width: 32px;
      height: 32px;
    }
  }
}
</style>
