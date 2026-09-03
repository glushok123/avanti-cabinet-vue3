/**
 * Проверка правила заказчика: ни один файл компонента не длиннее 300 строк.
 * Запускается в `npm run lint` и падает с ненулевым кодом, если правило нарушено.
 */
import { readFileSync } from 'node:fs'
import { glob } from 'node:fs/promises'

const MAX_LINES = 300
const PATTERNS = ['src/**/*.vue', 'src/**/*.ts']

const violations = []

for (const pattern of PATTERNS) {
  for await (const file of glob(pattern)) {
    const lines = readFileSync(file, 'utf8').split('\n').length
    if (lines > MAX_LINES) {
      violations.push({ file, lines })
    }
  }
}

if (violations.length > 0) {
  console.error(`\nПревышен лимит в ${MAX_LINES} строк на файл:\n`)
  for (const { file, lines } of violations) {
    console.error(`  ${file} — ${lines} строк`)
  }
  console.error('')
  process.exit(1)
}

console.log(`Лимит ${MAX_LINES} строк на файл соблюдён.`)
