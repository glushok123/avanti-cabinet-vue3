/**
 * Состояния кабинета с блоком страхового сертификата CPI.
 *
 * Вынесены из `avanti_dashboard_states` отдельным файлом: там уже 167 строк,
 * а лимит правил заказчика — 300. Разметка страницы при переключении, как и
 * у остальных уровней, не меняется — меняется только набор данных.
 *
 * Тело страницы во всех четырёх кадрах одно: шкалы шагов, баннера с замком
 * и карточки разблокировки нет, карточка суммы разблокирована, чеклист
 * пройден целиком. Ниже карточки суммы встаёт карточка сертификата.
 */
import { AVANTI_DASHBOARD_STATE_LEVEL_4 } from '@/constants/avanti_dashboard_states'
import { AVANTI_PERSONAL_DATA } from '@/constants/avanti_dashboard_mock'
import { AVANTI_CERTIFICATE, AVANTI_CERTIFICATE_CARD_PENDING } from '@/constants/avanti_certificate_content'
import type { AvantiDashboardState, AvantiDashboardWarningContent } from '@/types/avanti_dashboard'

/** Предупреждение о частых попытках вывода средств (кадры 258:17494, 232:15652). */
const WARNING: AvantiDashboardWarningContent = {
  badge: 'Avviso',
  title: 'Attenzione',
  message: 'Sono stati registrati frequenti tentativi di prelievo fondi. Sei sicuro di voler continuare?',
  actionLabel: 'Continua',
  closeLabel: 'Chiudi',
}

/**
 * «Сертификат выпущен» — карточка сертификата в левой колонке, окон нет.
 *
 * Расхождение макета: десктопные кадры показывают в правой колонке карточку
 * «Dati personali» над чеклистом, мобильные — нет. Карточка оставлена: на
 * мобильной её и так скрывает `avanti_dashboard_view`, как в базовом уровне.
 */
export const AVANTI_DASHBOARD_STATE_CERTIFICATE: AvantiDashboardState = {
  ...AVANTI_DASHBOARD_STATE_LEVEL_4,
  id: 'certificate',
  figmaNodes: '256:11462, 256:12475 (десктоп 1440×880), 232:16351 (390×692), 232:14478 (390×1345)',
  unlock: null,
  personalData: AVANTI_PERSONAL_DATA,
  certificate: AVANTI_CERTIFICATE,
}

/**
 * «Выпуск сертификата идёт» — та же страница, карточка в состоянии `pending`.
 * Кадра кабинета с этим состоянием нет: тексты и сам факт состояния взяты
 * у библиотечного компонента `certificato-cpi-progress` (Figma 220:2829),
 * который ни в один кадр не поставлен. Уровень добавлен, чтобы состояние
 * карточки можно было посмотреть.
 */
export const AVANTI_DASHBOARD_STATE_CERTIFICATE_PENDING: AvantiDashboardState = {
  ...AVANTI_DASHBOARD_STATE_CERTIFICATE,
  id: 'certificate-pending',
  figmaNodes: 'кадра нет; тексты из компонента 220:2829 (мобильная 358×565)',
  certificate: { ...AVANTI_CERTIFICATE, card: AVANTI_CERTIFICATE_CARD_PENDING },
}

/**
 * «Просмотрщик открыт» — поверх кабинета висит окно с документом.
 * В этих кадрах карточки «Dati personali» в правой колонке нет.
 */
export const AVANTI_DASHBOARD_STATE_CERTIFICATE_VIEWER: AvantiDashboardState = {
  ...AVANTI_DASHBOARD_STATE_CERTIFICATE,
  id: 'certificate-viewer',
  figmaNodes: '256:11916 (десктоп 1440×827), 232:16399 (мобильная 390×1006)',
  personalData: null,
  certificate: { ...AVANTI_CERTIFICATE, viewerOpen: true },
}

/** «Подтверждение просмотра» — карточка подтверждения поверх просмотрщика. */
export const AVANTI_DASHBOARD_STATE_CERTIFICATE_CONFIRM: AvantiDashboardState = {
  ...AVANTI_DASHBOARD_STATE_CERTIFICATE_VIEWER,
  id: 'certificate-confirm',
  figmaNodes: '256:12255 (десктоп 1440×827), 232:16446 (мобильная 390×1006)',
  certificate: { ...AVANTI_CERTIFICATE, viewerOpen: true, confirmationOpen: true },
}

/**
 * «Предупреждение» — тело страницы то же, что на «Уровне 4» (карточка
 * разблокировки средств на месте), поверх него модальное окно «Avviso».
 *
 * Расхождение макета: в кадре 258:17357 колонки шире и уже обычных
 * (646 и 616 против 792 и 464 в остальном кабинете). Взята раскладка
 * кабинета — она проверена пиксельной сверкой на пятнадцати экранах.
 */
export const AVANTI_DASHBOARD_STATE_WARNING: AvantiDashboardState = {
  ...AVANTI_DASHBOARD_STATE_LEVEL_4,
  id: 'warning',
  figmaNodes: '258:17357 (десктоп 1440×900), 232:15586 (мобильная 390×1276)',
  warning: WARNING,
}
