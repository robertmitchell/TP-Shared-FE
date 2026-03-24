import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

import type { EventData } from '@/Common/Common.types'

import {
  NO_PLAYERS_IN_TOURNAMENT,
  NO_PLAYERS_IN_TOURNAMENT_PLAYER,
  NO_TEAMS_IN_TOURNAMENT,
  NO_TEAMS_IN_TOURNAMENT_PLAYER,
} from './TournamentForm.constants'

import { TournamentPlayerPots } from './TournamentPlayerPots'

type Props = {
  eventData: EventData
  isPlayer: boolean
  tIndex: number
}

/**
 * Entrypoint to determine what to show during a tournament
 * when `Show Pots` button is pressed
 */
export const TournamentPots = (props: Props) => {
  const { eventData, isPlayer, tIndex } = props

  // Teams
  if (eventData.tournaments[tIndex].areTeamsEnabled) {
    // No Teams added
    if (eventData.tournaments[tIndex].teamCount === 0) {
      return (
        <h3 className="text-lg text-center mt-2 text-red-600">
          {isPlayer ? NO_TEAMS_IN_TOURNAMENT_PLAYER : NO_TEAMS_IN_TOURNAMENT}
        </h3>
      )
    }

    // TODO
    // return <TournamentTeams tIndex={tIndex} eventData={eventData} />
    return <h1 className="text-center text-3xl">Coming soon...</h1>
  }

  // Players
  // No Players added
  if (eventData.tournaments[tIndex].playerCount === 0) {
    return (
      <h3 className="flex items-center justify-center text-lg mt-2 text-red-600">
        <ExclamationTriangleIcon
          className="mr-2 h-16 w-16 sm:h-6 sm:w-6"
          aria-hidden="true"
        />
        {isPlayer ? NO_PLAYERS_IN_TOURNAMENT_PLAYER : NO_PLAYERS_IN_TOURNAMENT}
      </h3>
    )
  }

  return <TournamentPlayerPots tIndex={tIndex} eventData={eventData} />
}
