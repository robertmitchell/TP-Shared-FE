import type { EventData, Player } from '@/Common/Common.types'

/**
 * Gets the list of players registered for this tournament
 */
export const getRegisteredTPlayers = (tId: string, eventData: EventData) => {
  const registeredPlayersList: Player[] = []

  // Loop through guest players (egi = eventData.guestPlayers index)
  for (let egi = 0; egi < eventData.guestPlayers.length; egi++) {
    // Loop through guest player's registered tournaments
    for (
      let egti = 0;
      egti < eventData.guestPlayers[egi].tournaments?.length;
      egti++
    ) {
      // Check if the guest player is enrolled in the current tournament
      if (eventData.guestPlayers[egi].tournaments[egti].id === tId) {
        registeredPlayersList.push(eventData.guestPlayers[egi])
      }
    }
  }

  return registeredPlayersList
}
