/**
 * Раздел главного меню, которому принадлежит текущий маршрут.
 *
 * Подсветка пункта не хранится в данных, а выводится из адреса: иначе при
 * переходе подсвеченными оказались бы сразу два пункта — заданный в моке
 * и определённый роутером.
 *
 * Экраны оформления кредита и окна, открытые поверх кабинета (комиссия,
 * IBAN, договор, подпись), относятся к разделу «Home»: в макете на них
 * подсвечен именно он. Поэтому раздел по умолчанию — `home`, а перечислены
 * только маршруты, которые из него выходят.
 */
import { computed, type ComputedRef } from 'vue'
import { useRoute } from 'vue-router'

/** Раздел по умолчанию: кабинет и все шаги оформления кредита. */
const AVANTI_DEFAULT_NAV_SECTION = 'home'

/** Префикс маршрута → идентификатор пункта меню. */
const AVANTI_NAV_SECTION_BY_PREFIX: ReadonlyArray<readonly [string, string]> = [
  ['/documents', 'documents'],
  ['/profile', 'profile'],
  ['/chat', 'support'],
]

/**
 * Идентификатор активного пункта меню.
 * Вложенные маршруты (`/profile/name`) относятся к разделу родителя.
 */
export function useActiveNavSection(): ComputedRef<string> {
  const route = useRoute()

  return computed(() => {
    const section = AVANTI_NAV_SECTION_BY_PREFIX.find(
      ([prefix]) => route.path === prefix || route.path.startsWith(`${prefix}/`),
    )

    return section ? section[1] : AVANTI_DEFAULT_NAV_SECTION
  })
}
