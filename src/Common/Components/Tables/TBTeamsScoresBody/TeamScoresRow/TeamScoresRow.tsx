import type { EventData, Team } from '@/Common/Common.types'

import { getBracketNumRounds } from '@/Common/Utils/getBracketNumRounds'
import {
  getTeamGameScore,
  getTeamMemberHandicaps,
  getTeamMemberScores,
  getTeamTotalScore,
} from './TeamScoresRow.helpers'

type Props = {
  eventData: EventData
  isBracket?: boolean
  showAll?: boolean
  tbIndex: number
  team: Team
}

/**
 * Shows the team scores for all rounds
 */
export const TeamScoresRow = (props: Props) => {
  const { eventData, isBracket = false, showAll = true, tbIndex, team } = props

  const { isHandicap, basedOnPercent, basedOnScore } = isBracket
    ? eventData.brackets[tbIndex]
    : eventData.tournaments[tbIndex]

  const numGames = isBracket
    ? getBracketNumRounds(eventData.brackets[tbIndex].bracketNumPlayers)
    : eventData.tournaments[tbIndex].numRounds

  let playerHandicaps = new Array(team.players.length).fill(0)
  if (isHandicap) {
    playerHandicaps = getTeamMemberHandicaps(
      team,
      eventData,
      basedOnPercent,
      basedOnScore,
    )
  }

  const playerScores = getTeamMemberScores(team, tbIndex, isBracket, eventData)
  const totalScore = getTeamTotalScore(
    playerScores,
    isHandicap,
    playerHandicaps,
    numGames,
  )

  const numRounds = isBracket
    ? getBracketNumRounds(eventData.brackets[tbIndex].bracketNumPlayers)
    : eventData.tournaments[tbIndex].numRounds
  const roundArray = new Array(numRounds).fill(true)

  return (
    <>
      {showAll &&
        roundArray.map((_round, columnIndex: number) => (
          <div
            key={`team:${team.id} score:${columnIndex}`}
            className="table-cell py-3 max-w-[150px] text-sm text-gray-500"
          >
            {playerScores.map((playerScore, playerIndex) => {
              if (playerScore === null) {
                return '---'
              }

              return (
                <div
                  key={`team:${team.id}_score:${columnIndex}_player:${playerIndex}`}
                  className={`text-center text-sm py-1 ${
                    playerIndex % 2 === 0 ? 'bg-white' : 'bg-gray-100'
                  }`}
                >
                  <span className="font-medium text-gray-600">
                    {playerScore[columnIndex].score +
                      playerHandicaps[playerIndex] || '---'}
                  </span>

                  {isHandicap && (
                    <p className="text-xs text-gray-400 ml-1 whitespace-nowrap">
                      ({playerScore[columnIndex].score} +{' '}
                      {playerHandicaps[playerIndex]})
                    </p>
                  )}
                </div>
              )
            })}

            <p className="text-sm font-bold text-black">
              {getTeamGameScore(playerScores, columnIndex)}
            </p>
          </div>
        ))}

      <div className="table-cell text-lg font-bold text-black max-w-[150px] border-l border-gray-200">
        {totalScore}
      </div>
    </>
  )
}
