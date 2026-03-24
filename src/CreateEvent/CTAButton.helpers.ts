import type { EventData } from '@/Common/Common.types'

export const isEventDetailsValidated = (eventData: EventData): boolean =>
  eventData.eventDetails.name.length === 0

export const isBracketValidated = (eventData: EventData): boolean => {
  for (let i = 0; i < eventData.brackets.length; i++) {
    if (eventData.brackets[i].name.length === 0) {
      return true
    }
  }

  return false
}

export const isLeagueValidated = (eventData: EventData): boolean => {
  for (let i = 0; i < eventData.leagues.length; i++) {
    if (
      eventData.leagues[i].name.length === 0 ||
      eventData.leagues[i].numWeeks <= 0 ||
      eventData.leagues[i].numRounds <= 0 ||
      eventData.leagues[i].numWeekPoints <= 0 ||
      eventData.leagues[i].numGamePoints <= 0 ||
      eventData.leagues[i].numSeriesPoints <= 0
    ) {
      return true
    }
  }

  return false
}

export const isTournamentValidated = (eventData: EventData): boolean => {
  for (let i = 0; i < eventData.tournaments.length; i++) {
    if (
      eventData.tournaments[i].name.length === 0 ||
      eventData.tournaments[i].numRounds <= 0 ||
      eventData.tournaments[i].numRounds.toString() === 'NaN'
    ) {
      return true
    }
  }

  return false
}

/**
 * Checks for any `NA`s in the TLB and then warns that scores may not be applied correctly
 */
export const areAllRoundsAssigned = (eventData: EventData): boolean => {
  // Loop through games and check for `NA` value
  for (let i = 0; i < eventData.games.length; i++) {
    for (let j = 0; j < eventData.games[i].tournaments.length; j++) {
      if (eventData.games[i].tournaments[j].roundNum === 'NA') {
        return false
      }
    }

    for (let j = 0; j < eventData.games[i].leagues.length; j++) {
      if (eventData.games[i].leagues[j].roundNum === 'NA') {
        return false
      }
    }

    for (let j = 0; j < eventData.games[i].brackets.length; j++) {
      if (eventData.games[i].brackets[j].roundNum === 'NA') {
        return false
      }
    }
  }

  return true
}
