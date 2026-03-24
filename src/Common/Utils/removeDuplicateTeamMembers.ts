import type { Team } from '@/Common/Common.types'

import { deepCloneObj } from '@/Common/Utils/deepCloneObj'

/**
 * Checks for and removes duplicate team members
 */
export const removeDuplicateTeamPlayers = (team: Team) => {
  const updatedTeam = deepCloneObj(team)

  const filteredPlayers = team.players.filter((value, index) => {
    const valueString = JSON.stringify(value)
    return (
      index ===
      team.players.findIndex((obj) => {
        return JSON.stringify(obj) === valueString
      })
    )
  })

  updatedTeam.players = filteredPlayers
  return updatedTeam
}
