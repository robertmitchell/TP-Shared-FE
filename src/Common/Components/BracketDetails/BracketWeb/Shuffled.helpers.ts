import type { EventData } from '@/Common/Common.types'

/**
 * Gets the gameId for the bracket and round
 */
export const getGameId = (
  bracketId: string,
  ebbri: number, // round index
  eventData: EventData,
): string => {
  for (let egi = 0; egi < eventData.games.length; egi++) {
    for (let egbi = 0; egbi < eventData.games[egi].brackets.length; egbi++) {
      if (
        eventData.games[egi].brackets[egbi].id === bracketId &&
        parseInt(eventData.games[egi].brackets[egbi].roundNum, 10) === ebbri + 1
      ) {
        return eventData.games[egi].id
      }
    }
  }

  return 'NA'
}
