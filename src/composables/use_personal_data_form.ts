/**
 * Состояние анкеты «Dati personali».
 * Во вёрстке composable хранит только значения полей и заготовку под ошибки:
 * валидации на этом этапе нет, но пропы invalid/errorMessage у полей уже
 * подключены к этому объекту — на интеграции останется заполнить тексты.
 */
import { computed, reactive, type ComputedRef } from 'vue'
import { AVANTI_GENDER_DEFAULT } from '@/constants/avanti_personal_data_form'
import type { AvantiPersonalDataErrors, AvantiPersonalDataValues } from '@/types/avanti_personal_data'

export interface AvantiPersonalDataForm {
  /** Значения полей анкеты. */
  values: AvantiPersonalDataValues
  /** Тексты ошибок по полям (пока пустые). */
  errors: AvantiPersonalDataErrors
  /**
   * Тип документа выбран. На развороте 263:7568 поле «Numero del documento»
   * появляется именно после выбора типа — до этого его в макете нет.
   */
  hasDocumentType: ComputedRef<boolean>
  /** Возвращает анкету к исходному состоянию. */
  reset: () => void
}

function createValues(): AvantiPersonalDataValues {
  return {
    lastName: '',
    firstName: '',
    gender: AVANTI_GENDER_DEFAULT,
    documentType: '',
    documentNumber: '',
  }
}

function createErrors(): AvantiPersonalDataErrors {
  return {
    lastName: '',
    firstName: '',
    gender: '',
    documentType: '',
    documentNumber: '',
  }
}

export function usePersonalDataForm(): AvantiPersonalDataForm {
  const values = reactive<AvantiPersonalDataValues>(createValues())
  const errors = reactive<AvantiPersonalDataErrors>(createErrors())

  const hasDocumentType = computed(() => values.documentType.length > 0)

  function reset(): void {
    Object.assign(values, createValues())
    Object.assign(errors, createErrors())
  }

  return { values, errors, hasDocumentType, reset }
}
