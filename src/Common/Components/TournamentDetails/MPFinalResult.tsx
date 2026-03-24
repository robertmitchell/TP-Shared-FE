import type { EventData } from '@/Common/Common.types'
import type { MatchupResult } from './TournamentForm.types'

type Props = {
  eventData: EventData
  matchup: MatchupResult
  playerIndex: number
  roundIndex: number
  tIndex: number
}

/**
 * Shows the player's final W/L designation
 */
export const MPFinalResult = (props: Props) => {
  const { eventData, matchup, playerIndex, roundIndex, tIndex } = props

  const { numGames, scoringType } =
    eventData.tournaments[tIndex].matchPlayInfo[roundIndex]
  const { player1Scores, player2Scores } = matchup

  let points = 0
  let total1 = 0
  let total2 = 0

  // Loop through the scores
  for (let i = 0; i < player1Scores.length; i++) {
    // Add a point if the player has the higher score for the round
    if (
      (playerIndex === 0 && player1Scores[i] >= player2Scores[i]) ||
      (playerIndex === 1 && player2Scores[i] >= player1Scores[i])
    ) {
      points++
    }

    // Add the round score to the total
    total1 += player1Scores[i]
    total2 += player2Scores[i]
  }

  // Figure out if the player had the higher total score
  let totalPoints = 0
  if (
    (playerIndex === 0 && total1 >= total2) ||
    (playerIndex === 1 && total2 >= total1)
  ) {
    totalPoints++
  }

  // Return the final W/L determination based on `scoringType`
  switch (scoringType) {
    case 'Point':
      return points >= numGames / 2 ? <span> (W)</span> : <span> (L)</span>

    case 'Point + Total':
      return points + totalPoints >= numGames / 2 ? (
        <span>(W)</span>
      ) : (
        <span>(L)</span>
      )

    case 'Total':
      return totalPoints >= numGames / 2 ? <span> (W)</span> : <span> (L)</span>

    default:
      return null
  }
}
