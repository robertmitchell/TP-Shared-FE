import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

import type { EventData, TLBViewStatus } from '@/Common/Common.types'
import {
  NO_PLAYERS_IN_TOURNAMENT,
  NO_PLAYERS_IN_TOURNAMENT_PLAYER,
  NO_TEAMS_IN_TOURNAMENT,
  NO_TEAMS_IN_TOURNAMENT_PLAYER,
} from './TournamentForm.constants'

import { MatchPlayResults } from './MatchPlayResults'
import { TournamentPlayers } from './TournamentPlayers'
import { TournamentTeams } from './TournamentTeams'

type Props = {
  eventData: EventData
  isPlayer: boolean
  tIndex: number
  tLBViewStatus: TLBViewStatus
}

/**
 * Entrypoint to determine what to show during a tournament when `Show Results` button is pressed
 */
export const TournamentResults = (props: Props) => {
  const { eventData, isPlayer, tIndex, tLBViewStatus } = props

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

    // Team Results
    return <TournamentTeams eventData={eventData} tIndex={tIndex} />
  }

  // No Players added
  if (eventData.tournaments[tIndex].playerCount === 0) {
    return (
      <h3 className="flex items-center justify-center text-lg mt-2 text-red-600">
        <ExclamationTriangleIcon
          aria-hidden="true"
          className="mr-2 h-16 w-16 sm:h-6 sm:w-6"
        />
        {isPlayer ? NO_PLAYERS_IN_TOURNAMENT_PLAYER : NO_PLAYERS_IN_TOURNAMENT}
      </h3>
    )
  }

  // Match Play Results
  if (eventData.tournaments[tIndex].tournamentType === 'Match Play Singles') {
    return (
      <MatchPlayResults
        tIndex={tIndex}
        eventData={eventData}
        tLBViewStatus={tLBViewStatus}
      />
    )
  }

  // Singles Results
  return <TournamentPlayers tIndex={tIndex} eventData={eventData} />
}
