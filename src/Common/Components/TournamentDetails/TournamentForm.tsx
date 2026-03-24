import { useState } from 'react'
import { Updater, useImmer } from 'use-immer'

import { tournamentOptions } from './TournamentForm.types'
import {
  GenericFormStatus,
  EventData,
  TLBViewStatus,
} from '@/Common/Common.types'
import { TOURNAMENT_TEXT } from './TournamentForm.constants'

import { getInitialGenericFormState } from '@/Common/Utils/UtilityFunctions'
import { saveTournamentChanges } from './TournamentForm.helpers'

import { BoxInput } from '@/Common/Components/BoxInput'
import { Button } from '@/Common/Components/Button'
import { Checkbox } from '@/Common/Components/Checkbox'
import { Dropdown } from '@/Common/Components/Dropdown'
import { MatchPlayDetails } from './MatchPlayDetails'
import { SidePots } from './SidePots'
import { StickyFooter } from '@/Common/Components/StickyFooter'
import { TextInput } from '@/Common/Components/TextInput'

type Props = {
  eventData: EventData
  isPlayer: boolean
  setEventData: Updater<EventData>
  tIndex: number
  tLBViewStatus: TLBViewStatus
}

/**
 * Individual Tournament and all fields
 */
export const TournamentForm = (props: Props) => {
  const { eventData, isPlayer, setEventData, tIndex, tLBViewStatus } = props

  const [formState, setFormState] = useImmer(
    getInitialGenericFormState(GenericFormStatus.Success),
  )

  const [isEditing, setIsEditing] = useState(
    tLBViewStatus === TLBViewStatus.Create ||
      tLBViewStatus === TLBViewStatus.Editing,
  )

  let areTeamsEnabled = false
  if (eventData.tournaments[tIndex]) {
    areTeamsEnabled = eventData.tournaments[tIndex].areTeamsEnabled
  }
  const hasPots =
    eventData.tournaments[tIndex] &&
    eventData.tournaments[tIndex].sidePots &&
    ((eventData.tournaments[tIndex].sidePots.highPot &&
      eventData.tournaments[tIndex].sidePots.highPot.enabled) ||
      (eventData.tournaments[tIndex].sidePots.lowPot &&
        eventData.tournaments[tIndex].sidePots.lowPot.enabled))

  let RRDescription = 'Round Robin final score pairings will be one M and one F'
  if (
    !isEditing &&
    eventData.tournaments[tIndex] &&
    !eventData.tournaments[tIndex].isMixed
  ) {
    RRDescription = ''
  }

  return (
    <div className="border-t-2">
      {eventData.tournaments[tIndex] && (
        <div className="grid grid-cols-6 gap-6 my-4 mx-2 sm:mx-0">
          <TextInput
            required
            autoFocus
            isEditing={isEditing}
            labelText="Tournament Name"
            tooltipText={isEditing ? TOURNAMENT_TEXT.NAME : ''}
            value={eventData.tournaments[tIndex].name}
            onChange={(e) =>
              setEventData((draft) => {
                draft.tournaments[tIndex].name = e.target.value
              })
            }
          />

          {!isEditing && (
            <TextInput
              isEditing={isEditing}
              required
              labelText="Status"
              value={eventData.tournaments[tIndex].isOpen ? 'Open' : 'Ended'}
            />
          )}

          <Dropdown
            isEditing={isEditing}
            labelText="Tournament Type"
            tooltipText={TOURNAMENT_TEXT.TYPE}
            items={tournamentOptions}
            value={eventData.tournaments[tIndex].tournamentType}
            onChange={(e) =>
              setEventData((draft) => {
                draft.tournaments[tIndex].tournamentType = e.target.value
                draft.tournaments[tIndex].areTeamsEnabled =
                  e.target.value === 'Teams'
              })
            }
          />

          {eventData.tournaments[tIndex].tournamentType ===
          'Match Play Singles' ? (
            <MatchPlayDetails
              isEditing={isEditing}
              tIndex={tIndex}
              eventData={eventData}
              setEventData={setEventData}
            />
          ) : (
            <TextInput
              required
              type="number"
              isEditing={isEditing}
              labelText="Number of Games"
              description={isEditing ? 'Must be at least 1' : ''}
              value={eventData.tournaments[tIndex].numRounds}
              onChange={(e) =>
                setEventData((draft) => {
                  draft.tournaments[tIndex].numRounds = e.target.valueAsNumber
                })
              }
            />
          )}

          {eventData.tournaments[tIndex].tournamentType ===
            'Round Robin Singles' && (
            <Checkbox
              isEditing={isEditing}
              labelText="Is Mixed"
              description={RRDescription}
              isChecked={eventData.tournaments[tIndex].isMixed}
              onChange={() =>
                setEventData((draft) => {
                  draft.tournaments[tIndex].isMixed =
                    !eventData.tournaments[tIndex].isMixed
                })
              }
            />
          )}

          <Checkbox
            isEditing={isEditing}
            labelText="Handicap Enabled"
            isChecked={eventData.tournaments[tIndex].isHandicap}
            onChange={() =>
              setEventData((draft) => {
                draft.tournaments[tIndex].isHandicap =
                  !eventData.tournaments[tIndex].isHandicap
              })
            }
          />

          <TextInput
            required
            type="number"
            isEditing={isEditing}
            labelText="Based on %"
            hide={!eventData.tournaments[tIndex].isHandicap}
            description={isPlayer ? '' : 'enter 90 for 90%'}
            placeholder="ie: 90"
            value={eventData.tournaments[tIndex].basedOnPercent}
            onChange={(e) =>
              setEventData((draft) => {
                draft.tournaments[tIndex].basedOnPercent =
                  e.target.valueAsNumber
              })
            }
          />

          <TextInput
            required
            type="number"
            isEditing={isEditing}
            labelText="Based on Score"
            hide={!eventData.tournaments[tIndex].isHandicap}
            placeholder="ie: 220"
            value={eventData.tournaments[tIndex].basedOnScore}
            onChange={(e) =>
              setEventData((draft) => {
                draft.tournaments[tIndex].basedOnScore = e.target.valueAsNumber
              })
            }
          />

          <TextInput
            isEditing={isEditing}
            labelText="Sport"
            value={eventData.tournaments[tIndex].sport}
            onChange={(e) =>
              setEventData((draft) => {
                draft.tournaments[tIndex].sport = e.target.value
              })
            }
          />

          <BoxInput
            isEditing={isEditing}
            labelText="Description"
            value={eventData.tournaments[tIndex].description}
            onChange={(e) =>
              setEventData((draft) => {
                draft.tournaments[tIndex].description = e.target.value
              })
            }
          />
          <BoxInput
            isEditing={isEditing}
            labelText="Rules"
            value={eventData.tournaments[tIndex].rules}
            onChange={(e) =>
              setEventData((draft) => {
                draft.tournaments[tIndex].rules = e.target.value
              })
            }
          />

          <TextInput
            isEditing={isEditing}
            labelText="Location"
            value={eventData.tournaments[tIndex].location}
            onChange={(e) =>
              setEventData((draft) => {
                draft.tournaments[tIndex].location = e.target.value
              })
            }
          />

          <TextInput
            isEditing={isEditing}
            labelText="Date(s)"
            value={eventData.tournaments[tIndex].dates}
            onChange={(e) =>
              setEventData((draft) => {
                draft.tournaments[tIndex].dates = e.target.value
              })
            }
          />

          <TextInput
            type="number"
            isEditing={isEditing}
            labelText="Entry Fee"
            value={eventData.tournaments[tIndex].entryFee}
            onChange={(e) =>
              setEventData((draft) => {
                draft.tournaments[tIndex].entryFee = e.target.valueAsNumber
              })
            }
          />

          <TextInput
            isEditing={isEditing}
            labelText="Age"
            value={eventData.tournaments[tIndex].age}
            onChange={(e) =>
              setEventData((draft) => {
                draft.tournaments[tIndex].age = e.target.value
              })
            }
          />

          <TextInput
            type="number"
            isEditing={isEditing}
            labelText="House Cut"
            value={eventData.tournaments[tIndex].houseCut}
            onChange={(e) =>
              setEventData((draft) => {
                draft.tournaments[tIndex].houseCut = e.target.valueAsNumber
              })
            }
          />

          <TextInput
            isEditing={isEditing}
            labelText="Prizes?"
            value={eventData.tournaments[tIndex].prizes}
            description="Prizes are separated with a comma"
            onChange={(e) =>
              setEventData((draft) => {
                draft.tournaments[tIndex].prizes = e.target.value
              })
            }
          />

          <TextInput
            type="number"
            isEditing={isEditing}
            labelText="Number of Lanes"
            value={eventData.tournaments[tIndex].numLanes}
            onChange={(e) =>
              setEventData((draft) => {
                draft.tournaments[tIndex].numLanes = e.target.valueAsNumber
              })
            }
          />

          {!areTeamsEnabled && (
            <SidePots
              eventData={eventData}
              hasPots={hasPots}
              isEditing={isEditing}
              setEventData={setEventData}
              tIndex={tIndex}
            />
          )}
        </div>
      )}

      {tLBViewStatus !== TLBViewStatus.Create &&
        tLBViewStatus !== TLBViewStatus.ReadOnly && (
          <>
            {isEditing ? (
              <StickyFooter>
                <div className="flex">
                  <Button
                    variant="primary"
                    onClick={() => {
                      saveTournamentChanges(eventData, setFormState, tIndex)
                      setIsEditing(false)
                    }}
                  >
                    Save
                  </Button>
                  <Button
                    variant="dangertext"
                    onClick={() => (window.location.href = '/manage')}
                  >
                    Cancel
                  </Button>
                </div>
              </StickyFooter>
            ) : (
              <Button
                className="ml-2 sm:ml-0"
                onClick={() => {
                  setIsEditing(true)
                }}
                variant="secondary"
              >
                Edit Tournament
              </Button>
            )}
          </>
        )}
    </div>
  )
}
