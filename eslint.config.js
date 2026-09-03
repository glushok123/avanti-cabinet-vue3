import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import vueTsEslintConfig from '@vue/eslint-config-typescript'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

export default [
  { ignores: ['dist/**', 'node_modules/**', '_figma_assets/**'] },

  js.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  ...vueTsEslintConfig(),
  skipFormatting,

  {
    // Скрипты проверок выполняются в Node, а не в браузере.
    name: 'avanti/node-scripts',
    files: ['scripts/**/*.mjs', 'eslint.config.js'],
    languageOptions: {
      globals: { process: 'readonly', console: 'readonly' },
    },
  },

  {
    name: 'avanti/project-rules',
    files: ['**/*.vue', '**/*.ts'],
    rules: {
      /*
       * Правила заказчика, проверяемые автоматически.
       */

      // 1. Никаких inline-стилей: ни статических style="...", ни привязок :style.
      //    Внимание: это правило ловит только литералы; привязку к переменной
      //    (:style="obj") оно пропускает, поэтому дополнительно работает
      //    scripts/check_inline_styles.mjs — он и является основной проверкой.
      'vue/no-static-inline-styles': ['error', { allowBinding: false }],

      // 2. Никакого inline-JS в шаблоне: логика выносится в script setup.
      'vue/no-multiple-objects-in-class': 'error',
      'vue/no-useless-v-bind': 'error',
      'vue/no-template-shadow': 'error',

      // 3. Имена файлов и компонентов — snake_case с доменным префиксом,
      //    поэтому стандартное требование multi-word-имён отключаем:
      //    его роль выполняет префикс avanti_.
      'vue/multi-word-component-names': 'off',

      // 4. Единый стиль объявления компонентов — только <script setup>.
      'vue/component-api-style': ['error', ['script-setup']],
      'vue/block-order': ['error', { order: ['template', 'script', 'style'] }],
      'vue/define-macros-order': ['error', { order: ['defineProps', 'defineEmits'] }],

      // 5. Порядок и качество атрибутов в шаблоне.
      'vue/attributes-order': 'error',
      'vue/html-self-closing': [
        'error',
        { html: { void: 'always', normal: 'always', component: 'always' } },
      ],
      'vue/require-default-prop': 'off',

      // 6. Общая строгость.
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/explicit-function-return-type': [
        'warn',
        { allowExpressions: true, allowTypedFunctionExpressions: true },
      ],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  },
]
