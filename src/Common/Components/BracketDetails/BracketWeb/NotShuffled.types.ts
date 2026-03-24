export type NotShuffledFormState = {
  error: string
  status: NotShuffledStatus
  success: string
}

export enum NotShuffledStatus {
  Confirmation = 'Confirmation',
  Error = 'Error',
  Loading = 'Loading',
  Success = 'Success',
}
