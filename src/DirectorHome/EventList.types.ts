import type { EventData } from '@/Common/Common.types'

export enum EventListState {
  Loading = 'Loading',
  Success = 'Success',
  No_Events = 'No Events',
  Error = 'Error',
}

export type MyEventsInfoResponse = {
  error: string
  events: EventData[]
  status: EventListState
}
