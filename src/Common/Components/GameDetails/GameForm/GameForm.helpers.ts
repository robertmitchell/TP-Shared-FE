import type { Updater } from 'use-immer'

import type { EventData } from '@/Common/Common.types'

import { deepCloneObj } from '@/Common/Utils/deepCloneObj'
import { getBracketNumRounds } from '@/Common/Utils/getBracketNumRounds'

export const getTNumGames = (eventData: EventData, tIndex: number) => {
  const { matchPlayInfo, numRounds, tournamentType } =
    eventData.tournaments[tIndex]
  const gameNums: string[] = ['NA']

  // Special case for Match Play
  if (tournamentType === 'Match Play Singles') {
    let count = 0
    for (let i = 0; i < numRounds; i++) {
      count += +matchPlayInfo[i].numGames
    }

    for (let i = 0; i < count; i++) {
      gameNums.push((i + 1).toString())
    }
  } else {
    // Generic Case
    for (let i = 0; i < numRounds; i++) {
      gameNums.push((i + 1).toString())
    }
  }

  return gameNums
}

export const getBNumGames = (numPlayers: number): string[] => {
  const gameNums: string[] = ['NA']

  const numRounds = getBracketNumRounds(numPlayers)

  for (let i = 0; i < numRounds; i++) {
    gameNums.push((i + 1).toString())
  }

  return gameNums
}

/**
 * Sets the initial game numbers in the dropdowns to simplify the user exeprience
 */
export const updateInitialDropdowns = (
  eventData: EventData,
  setEventData: Updater<EventData>,
) => {
  const updatedEventData: EventData = deepCloneObj(eventData)

  // Loop through tournaments
  // Tournaments are a total (sum) so they don't need to have complex logic
  for (let t = 0; t < updatedEventData.tournaments.length; t++) {
    const tNumRounds = updatedEventData.tournaments[t].numRounds

    for (let g = 0; g < tNumRounds; g++) {
      updatedEventData.games[g].tournaments[t].roundNum = (g + 1).toString()
    }
  }

  // Loop through brackets
  // Brackets have different scoring options so they are a little trickier
  // `bracketScoringType`s are `Standard`, `Reverse`, and `Mystery`
  for (let b = 0; b < updatedEventData.brackets.length; b++) {
    const bNumRounds = getBracketNumRounds(
      updatedEventData.brackets[b].bracketNumPlayers,
    )

    if (updatedEventData.brackets[b].bracketScoringType === 'Standard') {
      for (let g = 0; g < bNumRounds; g++) {
        updatedEventData.games[g].brackets[b].roundNum = (g + 1).toString()
      }
    } else if (updatedEventData.brackets[b].bracketScoringType === 'Reverse') {
      for (let g = 0; g < bNumRounds; g++) {
        updatedEventData.games[g].brackets[b].roundNum = (
          bNumRounds - g
        ).toString()
      }
    }
    // Last option would be mystery and don't do anything here.
  }

  setEventData(updatedEventData)
}
