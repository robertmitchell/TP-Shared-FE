import type { EventPlayersState } from './EventPlayers.types'
import { GenericFormStatus } from '@/Common/Common.types'

/**
 * Gets intial form state for the Event Players tab
 */
export const getInitialEventPlayersState = (): EventPlayersState => ({
  isAddModalVisible: false,
  isImportModalVisible: false,
  status: GenericFormStatus.Loading,
  error: '',
  success: '',
})
