import type { EventData } from '@/Common/Common.types'

type Props = {
  eventData: EventData
  playerIndex: number
  roundIndex: number
  scorePair: number[]
  tIndex: number
}

/**
 * Shows the player's W/L designation for the round
 */
export const MPResult = (props: Props) => {
  const { eventData, playerIndex, roundIndex, scorePair, tIndex } = props

  const { scoringType } =
    eventData.tournaments[tIndex].matchPlayInfo[roundIndex]

  switch (scoringType) {
    case 'Point':
    case 'Point + Total':
      if (playerIndex === 0) {
        return scorePair[0] >= scorePair[1] ? (
          <span>(W)</span>
        ) : (
          <span>(L)</span>
        )
      }

      return scorePair[1] >= scorePair[0] ? <span>(W)</span> : <span>(L)</span>

    case 'Total':
    default:
      return null
  }
}
