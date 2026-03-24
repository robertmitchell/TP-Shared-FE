import type { EventData } from '@/Common/Common.types'

/**
 * Finds the score for the player for a specific game
 */
export const getPlayerGameScore = (
  gameId: string,
  playerId: string | null,
  eventData: EventData,
): number => {
  if (playerId === null) {
    return 0
  }

  const gameScores = eventData.scores.filter(
    (score) => score.gameId === gameId && score.playerId === playerId,
  )

  // There should only be one match so return the first score
  if (gameScores.length === 0) {
    return 0
  }

  return gameScores[0].score
}
