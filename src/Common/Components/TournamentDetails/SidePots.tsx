import type { Updater } from 'use-immer'

import type { EventData } from '@/Common/Common.types'

import { Checkbox } from '@/Common/Components/Checkbox'
import { TextInput } from '@/Common/Components/TextInput'

type Props = {
  eventData: EventData
  hasPots: boolean
  isEditing: boolean
  setEventData: Updater<EventData>
  tIndex: number
}

/**
 * Shows the side Pots for a tournament
 */
export const SidePots = (props: Props) => {
  const { eventData, hasPots, isEditing, setEventData, tIndex } = props

  if (isEditing || hasPots) {
    const isHighChecked = eventData.tournaments[tIndex].sidePots.highPot.enabled
    const isLowChecked = eventData.tournaments[tIndex].sidePots.lowPot.enabled

    return (
      <div className="col-span-6 sm:col-span-3">
        <h3 className="font-medium">Side Pots</h3>
        <div className="grid grid-cols-6 gap-6 my-4 mx-2 sm:mx-0">
          <div className="col-span-3">
            <Checkbox
              isEditing={isEditing}
              labelText="High Score"
              isChecked={isHighChecked}
              onChange={() => {
                setEventData((draft) => {
                  draft.tournaments[tIndex].sidePots.highPot.enabled =
                    !eventData.tournaments[tIndex].sidePots.highPot.enabled
                })
              }}
            />

            {isHighChecked && (
              <TextInput
                type="number"
                isEditing={isEditing}
                labelText="High Pot Entry Fee"
                value={
                  eventData.tournaments[tIndex].sidePots.highPot.enrollmentFee
                }
                onChange={(e) => {
                  setEventData((draft) => {
                    draft.tournaments[tIndex].sidePots.highPot.enrollmentFee =
                      e.currentTarget.valueAsNumber
                  })
                }}
              />
            )}
          </div>

          <div className="col-span-3">
            <Checkbox
              isEditing={isEditing}
              labelText="Low Score"
              isChecked={isLowChecked}
              onChange={() => {
                setEventData((draft) => {
                  draft.tournaments[tIndex].sidePots.lowPot.enabled =
                    !eventData.tournaments[tIndex].sidePots.lowPot.enabled
                })
              }}
            />

            {isLowChecked && (
              <TextInput
                type="number"
                isEditing={isEditing}
                labelText="Low Pot Entry Fee"
                value={
                  eventData.tournaments[tIndex].sidePots.lowPot.enrollmentFee
                }
                onChange={(e) => {
                  setEventData((draft) => {
                    draft.tournaments[tIndex].sidePots.lowPot.enrollmentFee =
                      e.currentTarget.valueAsNumber
                  })
                }}
              />
            )}
          </div>
        </div>
      </div>
    )
  }

  return null
}
