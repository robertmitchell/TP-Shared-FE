import type { EventData, Player } from '@/Common/Common.types'

import { getRegisteredTPlayers } from '@/Common/Utils/getRegisteredTPlayers'

/**
 * Gets the players registered for a singles event
 */
export const getRegisteredPlayersList = (
  tbIndex: number,
  isBracket: boolean,
  eventData: EventData,
) => {
  let registeredPlayersList: Player[] = []
  const tbId = isBracket
    ? eventData.brackets[tbIndex].id
    : eventData.tournaments[tbIndex].id

  // Add the players from the correct source
  if (isBracket) {
    registeredPlayersList = getRegisteredBPlayers(tbId, eventData)
  } else {
    registeredPlayersList = getRegisteredTPlayers(tbId, eventData)
  }

  return registeredPlayersList
}

/**
 * Gets the list of players registered for this bracket
 */
const getRegisteredBPlayers = (tbId: string, eventData: EventData) => {
  const registeredPlayersList: Player[] = []

  // Loop through guest players (egi = eventData.guestPlayers index)
  for (let egi = 0; egi < eventData.guestPlayers.length; egi++) {
    // Loop through guest player's registered brackets
    if (eventData.guestPlayers[egi].brackets !== undefined) {
      for (
        let egbi = 0;
        egbi < eventData.guestPlayers[egi].brackets.length;
        egbi++
      ) {
        // Check if the guest player is enrolled in the current bracket
        if (eventData.guestPlayers[egi].brackets[egbi].id === tbId) {
          registeredPlayersList.push(eventData.guestPlayers[egi])
        }
      }
    }
  }

  return registeredPlayersList
}

/**
 * Sorts the players based on the selected option
 */
export const sortRegisteredPlayers = (
  registeredPlayers: Player[],
  sortBy: number,
  tbIndex: number,
  isBracket: boolean,
  eventData: EventData,
) => {
  const sortedPlayers = registeredPlayers

  return sortedPlayers
}
