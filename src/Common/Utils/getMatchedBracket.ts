import type { Player, Team } from '@/Common/Common.types'

/**
 * Gets the matching bracket from the player
 */
export const getPlayersMatchedBracket = (bId: string, player: Player) => {
  if (player.brackets === undefined) {
    return null
  }

  for (let i = 0; i < player.brackets.length; i++) {
    if (player.brackets[i].id === bId) {
      return player.brackets[i]
    }
  }

  return null
}

/**
 * Gets the matching bracket from the team
 */
export const getTeamsMatchedBracket = (bId: string, team: Team) => {
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
