import type { Updater } from 'use-immer'

import type { GenericFormState, EventData } from '@/Common/Common.types'

export type MPStatusParams = {
  roundIndex: number
  tIndex: number
  eventData: EventData
  setFormState: Updater<GenericFormState>
}
