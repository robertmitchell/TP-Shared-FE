import type { EventData, Player } from '@/Common/Common.types'

/**
 * Looks up a player from their id
 */
export const getPlayerFromId = (
  playerId: string,
  eventData: EventData,
): Player => {
  for (let i = 0; i < eventData.guestPlayers.length; i++) {
    if (eventData.guestPlayers[i].id === playerId) {
      return eventData.guestPlayers[i]
    }
  }

  console.info("Can't find player")
  return createLostPlayer()
}

/**
 * Creates a not found player
 */
export const createLostPlayer = (): Player => ({
  average: 0,
  brackets: [],
  email: '',
  firstName: 'PLAYER NOT FOUND',
  id: 'NOT_FOUND',
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
