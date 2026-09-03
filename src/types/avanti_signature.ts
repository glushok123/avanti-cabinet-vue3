/**
 * Типы экрана подписания договора
 * (кадр Figma 1:2552 «Модальное окно — Подпись» внутри кадра 1:2060 «Подпись»).
 *
 * Панель `avanti_signature_panel` не знает, во что она вложена: все тексты
 * приходят пропами, а результат подписания уходит событием. На втором этапе
 * константы заменяются ответом API — разметку менять не потребуется.
 */

/** Шапка панели: надпись над заголовком, заголовок и пояснение под ним. */
export interface AvantiSignatureHeaderContent {
  /** Малая серая надпись над заголовком («Firma elettronica»). */
  eyebrow: string
  /** Заголовок окна. В макете выводится прописными — регистр задаёт CSS. */
  title: string
  /** Пояснение под заголовком («Disegna la tua firma…»). */
  description: string
}

/** Тексты поля подписи, включая клавиатурную альтернативу рисованию. */
export interface AvantiSignaturePadTexts {
  /** Подсказка по центру пустого поля («Firma qui...»). */
  placeholder: string
  /** Доступное имя холста: у рисунка нет текста, читает только скринридер. */
  canvasLabel: string
  /** Доступное имя кнопки очистки поля. */
  clearLabel: string
  /** Подпись поля ввода имени — клавиатурной замены рисованию. */
  typedLabel: string
  /** Замещающий текст в поле ввода имени. */
  typedPlaceholder: string
  /** Пояснение под полем ввода: зачем оно нужно. */
  typedHint: string
}

/**
 * Подписи кнопок. В макете заголовок кнопки подтверждения набран двумя
 * начертаниями («Conferma» обычным, «Firma» жирным), поэтому это два текста.
 */
export interface AvantiSignatureActionsTexts {
  cancelLabel: string
  confirmLabel: string
  confirmAccent: string
}

/** Всё содержимое панели подписания одним объектом. */
export interface AvantiSignatureContent {
  header: AvantiSignatureHeaderContent
  pad: AvantiSignaturePadTexts
  actions: AvantiSignatureActionsTexts
}

/** Результат подписания, который панель отдаёт наружу. */
export interface AvantiSignatureResult {
  /** Изображение подписи в виде data-URL (PNG с прозрачным фоном). */
  image: string
  /** Имя, если подпись поставлена текстом с клавиатуры. Иначе пустая строка. */
  typedName: string
}

/** Публичный API поля подписи, доступный родителю через `ref`. */
export interface AvantiSignaturePadInstance {
  /** Стирает нарисованное. Введённое имя очищает родитель — оно его состояние. */
  clear: () => void
  /** Поле пустое: ничего не нарисовано и имя не введено. */
  isEmpty: () => boolean
  /** Изображение подписи в виде data-URL. */
  toDataUrl: (type?: string, quality?: number) => string
}

/** Публичный API панели подписания. */
export interface AvantiSignaturePanelInstance {
  /** Полный сброс: и рисунок, и введённое имя. */
  reset: () => void
  /** Изображение подписи в виде data-URL. */
  toDataUrl: (type?: string, quality?: number) => string
}

/** События поля подписи. */
export interface AvantiSignaturePadEmits {
  /** Поле стало пустым или, наоборот, заполнилось. */
  change: [isEmpty: boolean]
  /** Нажата кнопка очистки — родитель сбрасывает и введённое имя. */
  clear: []
}

/** События панели подписания. */
export interface AvantiSignaturePanelEmits {
  /** Подпись появилась или пропала — для внешних индикаторов. */
  change: [isEmpty: boolean]
  /** Нажата «Cancella». Закрытие окна решает родитель. */
  cancel: []
  /** Нажата «Conferma firma» — подпись готова. */
  confirm: [result: AvantiSignatureResult]
}
