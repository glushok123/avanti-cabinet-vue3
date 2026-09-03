<!--
  Логотип Avanti: фирменный знак + текстовая часть.
  Размеры соответствуют четырём вариантам из макета:
  sm  — мобильная шапка личного кабинета;
  md  — мобильная шапка симуляции кредита;
  lg  — десктопная шапка личного кабинета;
  xl  — десктопная шапка симуляции кредита.
-->
<template>
  <component :is="tag" class="avanti-logo" :class="[sizeClass, toneClass]">
    <span class="avanti-logo__mark">
      <AvantiIconLogoMark />
    </span>
    <span class="avanti-logo__wordmark">Avanti</span>
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import AvantiIconLogoMark from '@/components/icons/avanti_icon_logo_mark.vue'

type LogoSize = 'sm' | 'md' | 'lg' | 'xl'
type LogoTone = 'black' | 'strong'

const props = withDefaults(
  defineProps<{
    size?: LogoSize
    tone?: LogoTone
    tag?: string
  }>(),
  {
    size: 'lg',
    tone: 'black',
    tag: 'div',
  },
)

const sizeClass = computed(() => `avanti-logo--${props.size}`)
const toneClass = computed(() => `avanti-logo--tone-${props.tone}`)
</script>

<style lang="scss" scoped>
.avanti-logo {
  display: inline-flex;
  align-items: center;

  &__mark {
    flex-shrink: 0;
  }

  &__wordmark {
    font-weight: var(--avanti-font-weight-bold);
    line-height: normal;
    white-space: nowrap;
  }

  /* --- Размеры --- */
  &--sm {
    gap: 6px;

    .avanti-logo__mark {
      width: 34px;
      height: 26px;
    }

    .avanti-logo__wordmark {
      font-size: 22px;
      letter-spacing: -1.1px;
    }
  }

  &--md {
    gap: 9.1px;

    .avanti-logo__mark {
      width: 36.941px;
      height: 29.788px;
    }

    .avanti-logo__wordmark {
      font-size: 26.141px;
      letter-spacing: -1.3071px;
    }
  }

  &--lg {
    gap: 11.86px;

    .avanti-logo__mark {
      width: 48.147px;
      height: 37.566px;
    }

    .avanti-logo__wordmark {
      font-size: 32px;
      letter-spacing: -1.6px;
    }
  }

  &--xl {
    gap: 15.47px;

    .avanti-logo__mark {
      width: 62.773px;
      height: 48.835px;
    }

    .avanti-logo__wordmark {
      font-size: 44.505px;
      letter-spacing: -2.2253px;
    }
  }

  /* --- Цвет текстовой части --- */
  &--tone-black .avanti-logo__wordmark {
    color: var(--avanti-color-text-black);
  }

  &--tone-strong .avanti-logo__wordmark {
    color: var(--avanti-color-text-strong);
  }
}
</style>
