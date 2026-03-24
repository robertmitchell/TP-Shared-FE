import type { EventData } from '@/Common/Common.types'

import { EndedScoresBody } from '@/Common/Components/TournamentDetails/EndedScoresBody'
import { MatchPlayWinnersHeader } from '@/Common/Components/TournamentDetails/MatchPlayWinnersHeader'
import { RawResultsBody } from './RawResultsBody'
import { RawResultsHeader } from './RawResultsHeader'

type Props = {
  eventData: EventData
  showAll: boolean
  tIndex: number
}

/**
 * Wrapper for Singles Tournaments Raw Results
 */
export const TournamentRawResultsSinglesWrapper = (props: Props) => {
  const { eventData, showAll, tIndex } = props

  if (eventData.tournaments[tIndex].tournamentType === 'Match Play Singles') {
    return (
      <>
        <MatchPlayWinnersHeader />
        <EndedScoresBody
          eventData={eventData}
          numResults={25}
          tIndex={tIndex}
        />
      </>
    )
  }

  return (
    <>
      <RawResultsHeader
        eventData={eventData}
        showAll={showAll}
        tbIndex={tIndex}
      />
      <RawResultsBody
        eventData={eventData}
        showAll={showAll}
        tbIndex={tIndex}
      />
    </>
  )
}
