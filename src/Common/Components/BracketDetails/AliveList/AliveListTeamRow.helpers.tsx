import type { Team } from '@/Common/Common.types'

/**
 * Gets the matching bracket from the team
 */
export const getMatchedBracket = (bId: string, team: Team) => {
  if (team.brackets === undefined) {
    return null
  }

  for (let i = 0; i < team.brackets.length; i++) {
    if (team.brackets[i].id === bId) {
      return team.brackets[i]
    }
  }

  return null
}
