import { useEffect, useState } from 'react'
import type { Updater } from 'use-immer'

import type { Game, EventData, Player, SetState } from '@/Common/Common.types'
import { ScoreFieldStatus } from './ScoreField.types'

import {
  checkForEmpty,
  fetchGameData,
  getInitialScoreFieldState,
  getScoreIndex,
} from './ScoreField.helpers'

import { TextInput } from '@/Common/Components/TextInput'

type Props = {
  eventData: EventData
  game: Game
  isPlayer: boolean
  isPrintMode?: boolean
  player: Player
  setEventData: Updater<EventData>
  setIsDirty?: SetState<boolean>
  tabIndex: number
}

/**
 * Individual field where scores are entered for a game
 */
export const ScoreField = (props: Props) => {
  const {
    eventData,
    game,
    isPlayer,
    isPrintMode,
    player,
    setEventData,
    setIsDirty,
    tabIndex,
  } = props

  const [formStatus, setFormStatus] = useState(getInitialScoreFieldState)

  useEffect(() => {
    fetchGameData(player, game, eventData, setEventData, setFormStatus)
  }, [])

  switch (formStatus.status) {
    case ScoreFieldStatus.Loading:
      return (
        <div className="table-cell p-3 whitespace-nowrap text-sm">
          Loading...
        </div>
      )

    case ScoreFieldStatus.Enrolled:
      const scoreIndex = getScoreIndex(player, game, eventData)

      return (
        <div className="table-cell p-3 whitespace-nowrap text-sm text-gray-500 min-w-[7rem]">
          <TextInput
            isEditing={!isPrintMode && !isPlayer}
            tabIndex={tabIndex}
            type="number"
            labelText=""
            value={eventData.scores[scoreIndex].score}
            onChange={(e) => {
              setEventData((draft) => {
                draft.scores[scoreIndex].score = e.target.valueAsNumber
              })
              if (setIsDirty !== undefined) {
                setIsDirty(true)
              }
            }}
            onBlur={() => checkForEmpty(eventData, scoreIndex, setEventData)}
          />
        </div>
      )

    case ScoreFieldStatus.Not_Enrolled:
      return (
        <div className="table-cell p-3 whitespace-nowrap text-sm text-gray-500">
          -----
        </div>
      )

    case ScoreFieldStatus.Error:
      return (
        <div className="table-cell p-3 whitespace-nowrap text-sm text-gray-500">
          Error: {formStatus.error}
        </div>
      )

    default:
      return (
        <div className="table-cell p-3 whitespace-nowrap text-sm text-gray-500">
          Error Code: SFTSX_001
        </div>
      )
  }
}
