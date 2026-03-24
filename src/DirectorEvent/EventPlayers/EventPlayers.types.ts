import type { GenericFormStatus } from '@/Common/Common.types'

export type EventPlayersState = {
  error: string
  isAddModalVisible: boolean
  isImportModalVisible: boolean
  status: GenericFormStatus
  success: string
}
