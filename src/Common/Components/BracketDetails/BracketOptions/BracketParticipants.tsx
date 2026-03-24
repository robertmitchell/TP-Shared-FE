import type { EventData } from '@/Common/Common.types'

import { BracketPlayers } from './BracketPlayers'
import { BracketTeams } from './BracketTeams'
import { NoBracketPlayers } from '@/Common/Components/BracketDetails/NoBracketPlayers'

type Props = {
  bIndex: number
  eventData: EventData
  isPlayer: boolean
}

/**
 * Entrypoint to determine what to show during a bracket when `Show Players/Teams` button is pressed
 */
export const BracketParticipants = (props: Props) => {
  const { bIndex, eventData, isPlayer } = props

  if (
    eventData.brackets[bIndex].areTeamsEnabled &&
    eventData.brackets[bIndex].teamCount === 0
  ) {
    return (
      <h3 className="text-lg text-center mt-2 text-red-600">
        There are no teams added to the bracket. Please add them from the
        "Teams" tab at the top.
      </h3>
    )
  }

  if (
    !eventData.brackets[bIndex].areTeamsEnabled &&
    eventData.brackets[bIndex].playerCount === 0
  ) {
    return <NoBracketPlayers isPlayer={isPlayer} />
  }

  if (eventData.brackets[bIndex].areTeamsEnabled) {
    return <BracketTeams bIndex={bIndex} eventData={eventData} />
  }

  return (
    <BracketPlayers bIndex={bIndex} eventData={eventData} isPlayer={isPlayer} />
  )
}
