import { v4 as uuidv4 } from 'uuid'
import type { Updater } from 'use-immer'

import { Game, GenericStatus, EventData } from '@/Common/Common.types'

import { getBracketNumRounds } from '@/Common/Utils/getBracketNumRounds'

/**
 * Adds the minimum number of games needed based on number of rounds
 */
export const getGamesList = (eventData: EventData): Game[] => {
  let maxNumGames = 0
  const gamesList: Game[] = []

  for (let i = 0; i < eventData.tournaments.length; i++) {
    // Generic case where numRounds matters
    if (eventData.tournaments[i].numRounds > maxNumGames) {
      maxNumGames = eventData.tournaments[i].numRounds
    }

    // Special case for Match Play
    if (eventData.tournaments[i].tournamentType === 'Match Play Singles') {
      let numMatchPlayGames = 0
      for (let mpsi = 0; mpsi < eventData.tournaments[i].numRounds; mpsi++) {
        numMatchPlayGames +=
          +eventData.tournaments[i].matchPlayInfo[mpsi].numGames
      }

      if (numMatchPlayGames > maxNumGames) {
        maxNumGames = numMatchPlayGames
      }
    }
  }

  for (let i = 0; i < eventData.brackets.length; i++) {
    // Add the plus since the dropdown sets it to a string on select
    const numRounds = getBracketNumRounds(
      +eventData.brackets[i].bracketNumPlayers,
    )

    if (numRounds > maxNumGames) {
      maxNumGames = numRounds
    }
  }

  for (let i = 0; i < maxNumGames; i++) {
    gamesList.push({
      brackets: getBracketsArray(eventData),
      id: uuidv4(),
      leagues: getLeaguesArray(eventData),
      name: `Game ${i + 1}`,
      status: GenericStatus.Open,
      tournaments: getTournamentsArray(eventData),
    })
  }

  return gamesList
}

/**
 * Adds an additional empty game to the games list
 */
export const addEmptyGame = (
  eventData: EventData,
  setEventData: Updater<EventData>,
) => {
  const numGames = eventData.games.length
  setEventData((draft) => {
    draft.games.push({
      brackets: getBracketsArray(eventData),
      id: uuidv4(),
      leagues: getLeaguesArray(eventData),
      name: `Game ${numGames + 1}`,
      status: GenericStatus.Open,
      tournaments: getTournamentsArray(eventData),
    })
  })
}

const getTournamentsArray = (eventData: EventData) => {
  const tournamentsArray = []

  for (let i = 0; i < eventData.tournaments.length; i++) {
    tournamentsArray.push({
      id: eventData.tournaments[i].id,
      roundNum: 'NA',
    })
  }

  return tournamentsArray
}

const getLeaguesArray = (eventData: EventData) => {
  const leaguesArray = []

  for (let i = 0; i < eventData.leagues.length; i++) {
    leaguesArray.push({
      id: eventData.leagues[i].id,
      roundNum: 'NA',
    })
  }

  return leaguesArray
}

const getBracketsArray = (eventData: EventData) => {
  const bracketsArray = []

  for (let i = 0; i < eventData.brackets.length; i++) {
    bracketsArray.push({
      id: eventData.brackets[i].id,
      roundNum: 'NA',
    })
  }

  return bracketsArray
}
