import { v4 as uuidv4 } from 'uuid'

import type { Player } from '@/Common/Common.types'

/**
 * Creates an empty player
 */
export const createEmptyPlayer = (): Player => ({
  average: 0,
  brackets: [],
  email: '',
  firstName: '',
  id: uuidv4(),
  isMale: true,
  lane: '1',
  lastName: '',
  leagues: [],
  organizationId: '',
  organizationName: '',
  photo: null,
  teams: [],
  tournaments: [],
})
