import type { EventData, Team } from '@/Common/Common.types'

/**
 * Entrypoint for Gets the teams added to a Tournament or Bracket
 */
export const getRegisteredTeamsList = (
  tbId: string,
  isBracket: boolean,
  eventData: EventData,
) => {
  const registeredTeams: Team[] = []

  // Add the teams from the correct source
  if (isBracket) {
    getRegisteredBracketTeams(eventData, tbId, registeredTeams)
  } else {
    getRegisteredTournamentTeams(eventData, tbId, registeredTeams)
  }

  return registeredTeams
}

/**
 * Gets the list of teams registered for this bracket
 */
const getRegisteredBracketTeams = (
  eventData: EventData,
  tbId: string,
  registeredTeamsList: Team[],
) => {
  // Loop through teams (eti = eventData.teams index)
  for (let eti = 0; eti < eventData.teams.length; eti++) {
    // Loop through team's registered brackets (etbi = eventData.teams.brackets index)
    for (let etbi = 0; etbi < eventData.teams[eti].brackets?.length; etbi++) {
      // Check if the team is enrolled in the current bracket
      if (eventData.teams[eti].brackets[etbi].id === tbId) {
        registeredTeamsList.push(eventData.teams[eti])
      }
    }
  }
}

/**
 * Gets the list of teams registered for this tournament
 */
const getRegisteredTournamentTeams = (
  eventData: EventData,
  tbId: string,
  registeredTeamsList: Team[],
) => {
  // Loop through teams (eti = eventData.teams index)
  for (let eti = 0; eti < eventData.teams.length; eti++) {
    // Loop through team's registered tournaments (etti = eventData.teams.tournaments index)
    for (
      let etti = 0;
      etti < eventData.teams[eti].tournaments?.length;
      etti++
    ) {
      // Check if the team is enrolled in the current bracket
      if (eventData.teams[eti].tournaments[etti].id === tbId) {
        registeredTeamsList.push(eventData.teams[eti])
      }
    }
  }
}

/**
 * Sorts the teams based on the selected option
 */
export const sortRegisteredTeams = (
  eventData: EventData,
  isBracket: boolean,
  registeredTeams: Team[],
  sortBy: number,
  tbIndex: number,
) => {
  const sortedTeams = registeredTeams

  return sortedTeams
}
