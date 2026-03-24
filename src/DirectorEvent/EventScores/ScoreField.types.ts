export type ScoreFieldState = {
  error: string
  status: ScoreFieldStatus
  success: string
}

export enum ScoreFieldStatus {
  Loading = 'Loading',
  Enrolled = 'Enrolled',
  Not_Enrolled = 'Not Enrolled',
  Error = 'Error',
}
