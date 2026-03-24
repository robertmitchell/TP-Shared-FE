export enum CreateEventStatus {
  Details = 'Details',
  Tournaments = 'Tournaments',
  Leagues = 'Leagues',
  Brackets = 'Brackets',
  Games = 'Games',
}

export type CreateEventState = {
  error: string
  loading: boolean
  status: CreateEventStatus
  success: string
}
