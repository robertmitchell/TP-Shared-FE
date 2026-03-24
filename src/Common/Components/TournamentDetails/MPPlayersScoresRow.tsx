import type { EventData } from '@/Common/Common.types'
import type { MatchupResult } from './TournamentForm.types'

import { getPlayerHandicap } from '@/Common/Utils/getPlayerHandicap'

import { MPFinalResult } from './MPFinalResult'
import { MPResult } from './MPResult'

type Props = {
  eventData: EventData
  matchup: MatchupResult
  roundIndex: number
  tIndex: number
}

/**
 * Shows the players' scores for all games in the Matchup Round
 */
export const MPPlayersScoresRow = (props: Props) => {
  const { eventData, matchup, roundIndex, tIndex } = props

  const { isHandicap, basedOnPercent, basedOnScore } =
    eventData.tournaments[tIndex]

  const { player1, player1Scores, player2, player2Scores } = matchup

  const scorePairs = []
  let player1Handicap = 0
  if (isHandicap) {
    player1Handicap = getPlayerHandicap(player1, basedOnPercent, basedOnScore)
  }

  let player2Handicap = 0
  if (isHandicap) {
    player2Handicap = getPlayerHandicap(player2, basedOnPercent, basedOnScore)
  }

  let totalScore1 = 0
  let totalScore2 = 0
  for (let i = 0; i < player1Scores.length; i++) {
    totalScore1 += player1Scores[i] | 0
    totalScore1 += player1Handicap

    totalScore2 += player2Scores[i] | 0
    totalScore2 += player2Handicap

    scorePairs.push([player1Scores[i], player2Scores[i]])
  }

  return (
    <>
      {scorePairs.map((scorePair, index) => (
        <div
          key={`player:${player1.id} score:${index}`}
          className="table-cell p-3 text-sm"
        >
          <div className="flex flex-col items-center h-full space-y-9">
            <div className="font-medium">
              <p className="text-gray-600">
                {scorePair[0] + player1Handicap || '---'}{' '}
                <MPResult
                  playerIndex={0}
                  scorePair={scorePair}
                  tIndex={tIndex}
                  roundIndex={roundIndex}
                  eventData={eventData}
                />
              </p>
              {isHandicap && (
                <span className="text-xs text-gray-400 whitespace-nowrap">
                  {scorePair[0]} + {player1Handicap}
                </span>
              )}
            </div>

            <div className="font-medium">
              <p className="text-blue-600">
                {scorePair[1] + player2Handicap || '---'}{' '}
                <MPResult
                  playerIndex={1}
                  scorePair={scorePair}
                  tIndex={tIndex}
                  roundIndex={roundIndex}
                  eventData={eventData}
                />
              </p>
              {isHandicap && (
                <span className="text-xs text-blue-400">
                  {scorePair[1]} + {player2Handicap}
                </span>
              )}
            </div>
          </div>
        </div>
      ))}

      <div className="table-cell p-3 text-sm font-bold border-l border-gray-200">
        <div className="flex flex-col items-center h-full space-y-9">
          <p className="text-black">
            {totalScore1}
            <MPFinalResult
              playerIndex={0}
              matchup={matchup}
              tIndex={tIndex}
              roundIndex={roundIndex}
              eventData={eventData}
            />
          </p>
          <p className="text-blue-700">
            {totalScore2}
            <MPFinalResult
              playerIndex={1}
              matchup={matchup}
              tIndex={tIndex}
              roundIndex={roundIndex}
              eventData={eventData}
            />
          </p>
        </div>
      </div>
    </>
  )
}
