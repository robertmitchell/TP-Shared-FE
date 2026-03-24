import type { Updater } from 'use-immer'

import type {
  GenericFormState,
  EventData,
  Score,
  SetState,
} from '@/Common/Common.types'

export type SavePlayerScoresParams = {
  eventId: string
  setEventData: Updater<EventData>
  setFormState: SetState<GenericFormState>
  scores: Score[]
  setIsDirty: SetState<boolean>
}

export type SaveRandomScoresParams = {
  newEventData: EventData
  setEventData: Updater<EventData>
  setFormState: SetState<GenericFormState>
  setIsDirty: SetState<boolean>
}
