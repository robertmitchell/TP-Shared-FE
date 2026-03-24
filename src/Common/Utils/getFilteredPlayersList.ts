import type { EventData, Player } from '@/Common/Common.types'

/**
 * Used for finding players with the given term in their name
 */
export const getFilteredPlayersList = (
  eventData: EventData,
  term: string,
): Player[] => {
  const cleanedTerm = term.toLowerCase().trim()
  let players: Player[] = eventData.players.concat(eventData.guestPlayers)

  players = players.filter((player) => {
    const firstName = player.firstName.toLowerCase().trim()
    const lastName = player.lastName.toLowerCase().trim()
    const fullName = `${firstName} ${lastName}`

    return (
      firstName.indexOf(cleanedTerm) > -1 ||
      lastName.indexOf(cleanedTerm) > -1 ||
      fullName.indexOf(cleanedTerm) > -1
    )
  })

  return players
}
