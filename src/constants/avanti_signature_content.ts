/**
 * Тексты экрана подписания договора (кадр Figma 1:2552 «Модальное окно — Подпись»).
 *
 * ВАЖНО: это данные только первого этапа (вёрстка). На втором этапе объект
 * заменяется ответом API — панель получает ту же структуру через props,
 * поэтому менять разметку не потребуется.
 *
 * Тексты клавиатурной альтернативы (`typed*`) в макете отсутствуют: они
 * добавлены ради доступности, потому что рисовать мышью с клавиатуры нельзя.
 */
import type { AvantiSignatureContent } from '@/types/avanti_signature'

export const AVANTI_SIGNATURE_CONTENT: AvantiSignatureContent = {
  header: {
    eyebrow: 'Firma elettronica',
    title: 'Firma il contratto',
    description: 'Disegna la tua firma nell’area sottostante:',
  },
  pad: {
    placeholder: 'Firma qui...',
    canvasLabel: 'Area di firma: disegna la tua firma con il mouse o con il dito',
    clearLabel: 'Cancella la firma',
    typedLabel: 'Oppure digita il tuo nome per firmare',
    typedPlaceholder: 'Nome e cognome',
    typedHint: 'Il nome digitato viene riprodotto come firma nell’area qui sopra.',
  },
  actions: {
    cancelLabel: 'Cancella',
    confirmLabel: 'Conferma',
    confirmAccent: 'Firma',
  },
}
