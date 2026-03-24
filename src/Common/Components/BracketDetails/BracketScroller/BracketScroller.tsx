import { Carousel } from 'react-responsive-carousel'

import type { EventData, TLBViewStatus } from '@/Common/Common.types'
import { BracketStatus } from '@/Common/Components/BracketDetails/BracketForm.types'

import { NoBracketPlayers } from '../NoBracketPlayers'
import { NotShuffled } from '@/Common/Components/BracketDetails/BracketWeb/NotShuffled'
import { Web } from '../BracketWeb/Web'

import 'react-responsive-carousel/lib/styles/carousel.min.css'

type Props = {
  bIndex: number
  eventData: EventData
  isPlayer: boolean
  tLBViewStatus: TLBViewStatus
}

/**
 * Scrolls through the bracket webs
 */
export const BracketScroller = (props: Props) => {
  const { bIndex, eventData, isPlayer, tLBViewStatus } = props

  const { status } = eventData.brackets[bIndex]

  if (
    !eventData.brackets[bIndex].areTeamsEnabled &&
    eventData.brackets[bIndex].playerCount === 0
  ) {
    return <NoBracketPlayers isPlayer={isPlayer} />
  }

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

  if (status === BracketStatus.Not_Shuffled) {
    return (
      <NotShuffled
        bIndex={bIndex}
        eventData={eventData}
        tLBViewStatus={tLBViewStatus}
      />
    )
  }

  return (
    <div className="overflow-x-scroll">
      <h2 className="text-center text-3xl my-3">
        {eventData.brackets[bIndex].name}
      </h2>

      <Carousel
        autoPlay
        interval={10000}
        infiniteLoop
        showThumbs={false}
        stopOnHover={false}
      >
        {eventData.brackets[bIndex].bracketWebs.map((bracket, index) => (
          <div key={index}>
            <h3 className="text-center text-xl">Bracket # {index + 1}</h3>
            <Web
              eventBracket={eventData.brackets[bIndex]}
              bracketWeb={bracket}
              displayedIndex={index}
              eventData={eventData}
            />
          </div>
        ))}
      </Carousel>
    </div>
  )
}
