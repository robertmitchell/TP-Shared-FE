import { useState } from 'react'
import { Updater } from 'use-immer'

import { EventData, TLBViewStatus } from '@/Common/Common.types'

import { BoxInput } from '@/Common/Components/BoxInput'
import { Checkbox } from '@/Common/Components/Checkbox'
import { TextInput } from '@/Common/Components/TextInput'
import { Divider } from '@/Common/Components/Divider'

type Props = {
  eventData: EventData
  index: number
  isPlayer: boolean
  setEventData: Updater<EventData>
  tLBViewStatus: TLBViewStatus
}

/**
 * Individual League and all details
 */
export const LeagueForm = (props: Props) => {
  const { eventData, index, isPlayer, setEventData, tLBViewStatus } = props

  const isInitiallyEditable =
    tLBViewStatus === TLBViewStatus.Create ||
    tLBViewStatus === TLBViewStatus.Editing

  const [isExpanded, setIsExpanded] = useState(isInitiallyEditable)

  const isEditing = isInitiallyEditable

  return (
    <div>
      <Divider
        labelText={eventData.leagues[index].name}
        handleClick={() => setIsExpanded(!isExpanded)}
      />

      {isExpanded && (
        <div className="grid grid-cols-6 gap-6 my-4 mx-2 sm:mx-0">
          <TextInput
            required
            autoFocus
            isEditing={isEditing}
            labelText="Name"
            value={eventData.leagues[index].name}
            onChange={(e) =>
              setEventData((draft) => {
                draft.leagues[index].name = e.target.value
              })
            }
          />

          <TextInput
            isEditing={isEditing}
            labelText="Sport"
            value={eventData.leagues[index].sport}
            onChange={(e) =>
              setEventData((draft) => {
                draft.leagues[index].sport = e.target.value
              })
            }
          />

          <BoxInput
            isEditing={isEditing}
            labelText="Description"
            value={eventData.leagues[index].description}
            onChange={(e) =>
              setEventData((draft) => {
                draft.leagues[index].description = e.target.value
              })
            }
          />

          <BoxInput
            isEditing={isEditing}
            labelText="Rules"
            value={eventData.leagues[index].rules}
            onChange={(e) =>
              setEventData((draft) => {
                draft.leagues[index].rules = e.target.value
              })
            }
          />

          <TextInput
            isEditing={isEditing}
            labelText="Location"
            value={eventData.leagues[index].location}
            onChange={(e) =>
              setEventData((draft) => {
                draft.leagues[index].location = e.target.value
              })
            }
          />

          <TextInput
            isEditing={isEditing}
            labelText="Date(s)"
            value={eventData.leagues[index].dates}
            onChange={(e) =>
              setEventData((draft) => {
                draft.leagues[index].dates = e.target.value
              })
            }
          />

          <TextInput
            required
            type="number"
            isEditing={isEditing}
            labelText="Number of Weeks"
            value={eventData.leagues[index].numWeeks}
            onChange={(e) =>
              setEventData((draft) => {
                draft.leagues[index].numWeeks = e.target.valueAsNumber
              })
            }
          />

          <TextInput
            required
            type="number"
            isEditing={isEditing}
            labelText="Number of Rounds"
            value={eventData.leagues[index].numRounds}
            onChange={(e) =>
              setEventData((draft) => {
                draft.leagues[index].numRounds = e.target.valueAsNumber
              })
            }
          />

          <TextInput
            required
            type="number"
            isEditing={isEditing}
            labelText="Number of Week Points"
            value={eventData.leagues[index].numWeekPoints}
            onChange={(e) =>
              setEventData((draft) => {
                draft.leagues[index].numWeekPoints = e.target.valueAsNumber
              })
            }
          />

          <TextInput
            required
            type="number"
            isEditing={isEditing}
            labelText="Number of Game Points"
            value={eventData.leagues[index].numGamePoints}
            onChange={(e) =>
              setEventData((draft) => {
                draft.leagues[index].numGamePoints = e.target.valueAsNumber
              })
            }
          />

          <TextInput
            required
            type="number"
            isEditing={isEditing}
            labelText="Number of Series Points"
            value={eventData.leagues[index].numSeriesPoints}
            onChange={(e) =>
              setEventData((draft) => {
                draft.leagues[index].numSeriesPoints = e.target.valueAsNumber
              })
            }
          />

          <TextInput
            isEditing={isEditing}
            labelText="League Secretary Link?"
            value={eventData.leagues[index].secretaryLink}
            onChange={(e) =>
              setEventData((draft) => {
                draft.leagues[index].secretaryLink = e.target.value
              })
            }
          />

          <Checkbox
            isEditing={isEditing}
            labelText="Handicap Enabled"
            isChecked={eventData.leagues[index].isHandicap}
            onChange={() =>
              setEventData((draft) => {
                draft.leagues[index].isHandicap =
                  !eventData.leagues[index].isHandicap
              })
            }
          />

          <TextInput
            required
            type="number"
            isEditing={isEditing}
            labelText="Based on %"
            hide={!eventData.leagues[index].isHandicap}
            description={isPlayer ? '' : 'enter 90 for 90%'}
            placeholder="ie: 90"
            value={eventData.leagues[index].basedOnPercent}
            onChange={(e) =>
              setEventData((draft) => {
                draft.leagues[index].basedOnPercent = e.target.valueAsNumber
              })
            }
          />

          <TextInput
            required
            type="number"
            isEditing={isEditing}
            labelText="Based on Score"
            hide={!eventData.leagues[index].isHandicap}
            placeholder="ie: 220"
            value={eventData.leagues[index].basedOnScore}
            onChange={(e) =>
              setEventData((draft) => {
                draft.leagues[index].basedOnScore = e.target.valueAsNumber
              })
            }
          />

          {/* <Checkbox
          isEditing={isEditing}
          labelText="Teams Enabled"
          isChecked={eventData.leagues[index].areTeamsEnabled}
          onChange={() =>
            setEventData((draft) => {
              draft.leagues[index].areTeamsEnabled =
                !eventData.leagues[index].areTeamsEnabled
            })
          }
        /> */}

          <TextInput
            type="number"
            isEditing={isEditing}
            labelText="Entry Fee"
            value={eventData.leagues[index].entryFee}
            onChange={(e) =>
              setEventData((draft) => {
                draft.leagues[index].entryFee = e.target.valueAsNumber
              })
            }
          />

          <TextInput
            isEditing={isEditing}
            labelText="Age"
            value={eventData.leagues[index].age}
            onChange={(e) =>
              setEventData((draft) => {
                draft.leagues[index].age = e.target.value
              })
            }
          />

          <TextInput
            type="number"
            isEditing={isEditing}
            labelText="Weekly Dues"
            value={eventData.leagues[index].weeklyDues}
            onChange={(e) =>
              setEventData((draft) => {
                draft.leagues[index].weeklyDues = e.target.valueAsNumber
              })
            }
          />

          <TextInput
            type="number"
            isEditing={isEditing}
            labelText="House Cut"
            value={eventData.leagues[index].houseCut}
            onChange={(e) =>
              setEventData((draft) => {
                draft.leagues[index].houseCut = e.target.valueAsNumber
              })
            }
          />

          <TextInput
            isEditing={isEditing}
            labelText="Prizes?"
            value={eventData.leagues[index].prizes}
            onChange={(e) =>
              setEventData((draft) => {
                draft.leagues[index].prizes = e.target.value
              })
            }
          />

          <TextInput
            type="number"
            isEditing={isEditing}
            labelText="Number of Lanes"
            value={eventData.leagues[index].numLanes}
            onChange={(e) =>
              setEventData((draft) => {
                draft.leagues[index].numLanes = e.target.valueAsNumber
              })
            }
          />
          {/**
           * TODO ADD ANY FOOTER OPTIONS SIMILAR TO TOURNAMENTS
           */}
        </div>
      )}
    </div>
  )
}
