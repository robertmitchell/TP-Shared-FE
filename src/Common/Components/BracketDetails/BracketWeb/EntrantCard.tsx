import cn from 'classnames'

import type { BracketFormData, MatchEntrant } from '../BracketForm.types'

import {
  getBGColor,
  getEntrantHandicap,
  getPlayerScore,
} from './EntrantCard.helpers'

import { Card } from '@/Common/Components/Card'
import { EventData } from '@/Common/Common.types'

type Props = {
  entrant: MatchEntrant
  eventBracket: BracketFormData
  eventData: EventData
  pIndex: number
  round: number
}

/**
 * Individual entrant in a bracket web match (player or team)
 */
export const EntrantCard = (props: Props) => {
  const { entrant, eventBracket, eventData, pIndex, round } = props

  const { id, name, lane, average } = entrant
  const {
    activeRound,
    areTeamsEnabled,
    basedOnPercent,
    basedOnScore,
    bracketType,
    isHandicap,
  } = eventBracket

  const displayScore = activeRound !== round
  const score = getPlayerScore(round, entrant)
  let entrantHandicap = 0
  if (isHandicap) {
    entrantHandicap = getEntrantHandicap(
      entrant,
      areTeamsEnabled,
      basedOnPercent,
      basedOnScore,
      eventData,
    )
  }

  const bgColor = getBGColor(round, entrant)

  // Error catching - shouldn't show up in normal bracket cases
  if (id === null) {
    return <Card className={cn(bgColor, { 'mb-1': pIndex === 0 })}> </Card>
  }

  // Future matches
  if (id === 'TBD_007') {
    return (
      <Card
        className={cn(bgColor, {
          'mb-1': pIndex === 0 && bracketType !== 'Eliminator',
        })}
      >
        <span className="font-medium">{name}</span>{' '}
      </Card>
    )
  }

  return (
    <Card
      className={cn(
        'items-center justify-between my-0.5 rounded-none first:rounded-t-lg last:rounded-b-lg',
        bgColor,
        { 'mb-1': pIndex === 0 && bracketType !== 'Eliminator' },
      )}
    >
      <div className="mb-4 flex justify-between">
        <h3 className="font-medium">{name}</h3>

        {displayScore ? (
          <div className="flex flex-col items-center ml-8 min-w-max">
            <span className="font-medium text-amber-600">
              {score + entrantHandicap}
            </span>
            {isHandicap && (
              <span className="text-xs">
                ({`${score} + ${entrantHandicap}`})
              </span>
            )}
          </div>
        ) : (
          <span>TBD</span>
        )}
      </div>
      <div>
        <div className="flex justify-evenly italic">
          {lane.length > 0 && (
            <>
              <span
                className={`
              ${isHandicap ? 'text-xs' : 'first-letter:text-md'}`}
              >{`Lane: ${lane}`}</span>
              {!areTeamsEnabled && (
                <span className="text-xs">{`Average: ${average}`}</span>
              )}
            </>
          )}
          {isHandicap && (
            <span className="text-xs">{`${
              areTeamsEnabled ? 'Team Handicap: ' : 'Handicap: '
            } ${entrantHandicap}`}</span>
          )}
        </div>
      </div>
    </Card>
  )
}
