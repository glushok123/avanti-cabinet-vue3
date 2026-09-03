/**
 * Проверка правила заказчика №8: в шаблонах не должно быть inline-стилей.
 *
 * Штатное правило ESLint `vue/no-static-inline-styles` ловит только статические
 * литералы (`style="color: red"` и `:style="{ color: 'red' }"`), но пропускает
 * привязку к переменной (`:style="progressStyle"`). Поэтому проверяем отдельно.
 *
 * Разрешено ровно одно исключение — передача динамического CSS-кастом-свойства
 * в слайдере: там `:style` не задаёт оформление, а прокидывает в CSS долю
 * заполнения. Все стили слайдера при этом живут в SCSS.
 */
import { readFileSync } from 'node:fs'
import { glob } from 'node:fs/promises'

const ALLOWED = new Set(['src/components/ui/avanti_range_slider.vue'])

const STATIC_STYLE = /\sstyle\s*=\s*"/
const BOUND_STYLE = /\s(?::style|v-bind:style)\s*=/

const violations = []

for await (const file of glob('src/**/*.vue')) {
  const normalized = file.replace(/\\/g, '/')
  const lines = readFileSync(file, 'utf8').split('\n')

  lines.forEach((line, index) => {
    const isStatic = STATIC_STYLE.test(line)
    const isBound = BOUND_STYLE.test(line)
    if (!isStatic && !isBound) {
      return
    }
    if (isBound && !isStatic && ALLOWED.has(normalized)) {
      return
    }
    violations.push({
      file: normalized,
      line: index + 1,
      kind: isStatic ? 'style="..."' : ':style',
    })
  })
}

if (violations.length > 0) {
  console.error('\nНайдены inline-стили в шаблонах (правило 8):\n')
  for (const { file, line, kind } of violations) {
    console.error(`  ${file}:${line} — ${kind}`)
  }
  console.error('\nОформление выносится в <style lang="scss" scoped>.')
  console.error('Исключение допустимо только для передачи CSS-переменной ')
  console.error('и должно быть добавлено в ALLOWED этого скрипта с обоснованием.\n')
  process.exit(1)
}

console.log('Inline-стилей в шаблонах нет.')
