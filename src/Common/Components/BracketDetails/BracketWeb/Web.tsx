import type { BracketFormData, BracketWeb } from '../BracketForm.types'
import type { EventData, SetState } from '@/Common/Common.types'

import { Card } from '@/Common/Components/Card'
import { EntrantCard } from './EntrantCard'
import { WebHeader } from './WebHeader'

import bracketicon from '@/assets/bracketicon.png'

type Props = {
  bracketWeb: BracketWeb
  displayedIndex: number
  eventBracket: BracketFormData
  eventData: EventData
  loserBracket?: boolean
  setDisplayedIndex?: SetState<number>
}

/**
 * Displays a single page of a shuffled bracket
 */
export const Web = (props: Props) => {
  const {
    bracketWeb,
    displayedIndex,
    eventBracket,
    eventData,
    loserBracket = false,
    setDisplayedIndex,
  } = props

  const { activeRound } = eventBracket

  return (
    <div className="mt-8">
      {setDisplayedIndex !== undefined && !loserBracket && (
        <WebHeader
          bracketCount={eventBracket.bracketWebs.length}
          displayedIndex={displayedIndex}
          setDisplayedIndex={setDisplayedIndex}
        />
      )}

      <div className="flex min-w-[875px] overflow-x-scroll mb-2">
        {bracketWeb.rounds.map((round, rIndex) => (
          <Card
            key={`round_${rIndex}`}
            padding="na"
            className={`flex flex-col justify-around filter-none w-5/12 max-w-xs bg-transparent ${
              activeRound === rIndex ? '' : 'opacity-60'
            }`}
          >
            {round.matches.map((match, mi) => (
              <div key={`match_${mi}`}>
                <Card
                  padding="xs"
                  className="bg-transparent m-0 mb-3 flex !p-0 justify-between items-center"
                >
                  {rIndex > 0 && <img className="h-80" src={bracketicon} />}
                  <Card padding="xs" className="!bg-black w-full filter-none">
                    {match.players.map((entrant, pIndex) => (
                      <EntrantCard
                        key={`entrant_${pIndex}`}
                        round={rIndex}
                        pIndex={pIndex}
                        entrant={entrant}
                        eventBracket={eventBracket}
                        eventData={eventData}
                      />
                    ))}
                  </Card>
                </Card>
              </div>
            ))}
          </Card>
        ))}
      </div>
    </div>
  )
}
