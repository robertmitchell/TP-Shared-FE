// TODO import type { GenericFormStatus } from "@/Common/Common.types"

export enum ManageEventStatus {
  Loading = 'Loading',
  Success = 'Success',
  Error = 'Error',
}

export type ManageEventState = {
  error: string
  isDeleteModalOpen: boolean
  status: ManageEventStatus
  success: string
}
