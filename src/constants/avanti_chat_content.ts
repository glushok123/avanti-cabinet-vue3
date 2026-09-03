/**
 * Тексты и моковая переписка панели чат-консультанта.
 *
 * ВАЖНО: это данные только первого этапа (вёрстка). На втором этапе список
 * сообщений заменяется ответом API — панель принимает его через props,
 * поэтому менять компоненты не потребуется.
 */
import userAvatar from '@/assets/images/avanti_avatar_mobile.png'
import consultantAvatar from '@/assets/images/avanti_support_agent.png'
import type { AvantiChatConsultant, AvantiChatMessage, AvantiChatTexts } from '@/types/avanti_chat'

/** Подписи интерфейса. Язык кабинета — итальянский, как в макете. */
export const AVANTI_CHAT_TEXTS: AvantiChatTexts = {
  pageTitle: 'Chat con il consulente',
  dialogLabel: 'Chat con il consulente',
  logLabel: 'Cronologia dei messaggi',
  closeLabel: 'Chiudi la chat',
  inputLabel: 'Messaggio',
  inputPlaceholder: 'Voglio confermare il mio pagamento',
  attachLabel: 'Allega un file',
  sendLabel: 'Invia il messaggio',
  openLabel: 'Apri la chat',
  authorLabels: {
    consultant: 'Consulente',
    user: 'Tu',
  },
}

/** Консультант, закреплённый за пользователем. */
export const AVANTI_CHAT_CONSULTANT: AvantiChatConsultant = {
  name: 'Schierano Deborah',
  avatar: consultantAvatar,
  online: true,
  statusLabel: 'Online',
  replyTimeLabel: 'Risponde in ~30 sec',
}

/** Аватар пользователя рядом с исходящими сообщениями. */
export const AVANTI_CHAT_USER_AVATAR: string = userAvatar

/** Моковая переписка из макета. */
export const AVANTI_CHAT_MESSAGES: AvantiChatMessage[] = [
  {
    id: 'welcome',
    author: 'consultant',
    text: 'Salve. Mi chiamo Deborah, sarò la sua consulente personale dedicata.',
    dateLabel: '29 agosto',
  },
  {
    id: 'invite',
    author: 'consultant',
    text: 'Se avrà domande, non esiti a scrivermi.',
    time: '01:51',
  },
  {
    id: 'reply',
    author: 'user',
    text: 'Se avrà domande, non esiti a scrivermi.',
    time: '01:51',
  },
]
