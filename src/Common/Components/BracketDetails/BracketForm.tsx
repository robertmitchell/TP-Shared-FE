import { useState } from 'react'
import { Updater, useImmer } from 'use-immer'
import { InformationCircleIcon } from '@heroicons/react/20/solid'

import {
  GenericFormStatus,
  EventData,
  TLBViewStatus,
} from '@/Common/Common.types'
import {
  BracketStatus,
  bracketNumPlayers,
  bracketNumPlayersDES,
  bracketOptions,
  bracketScoringTypes,
  bracketFormatTypes,
} from './BracketForm.types'
import { BRACKET_TEXT } from '@/CreateEvent/CreateEvent.constants'

import { getInitialGenericFormState } from '@/Common/Utils/UtilityFunctions'
import { saveBracketChanges } from './BracketForm.helpers'

import { BoxInput } from '@/Common/Components/BoxInput'
import { Button } from '@/Common/Components/Button'
import { Checkbox } from '@/Common/Components/Checkbox'
import { Dropdown } from '@/Common/Components/Dropdown'
import { RadioGroup } from '@/Common/Components/RadioGroup'
import { StickyFooter } from '@/Common/Components/StickyFooter'
import { TextInput } from '@/Common/Components/TextInput'
import { Tooltip } from '@/Common/Components/Tooltip'

type Props = {
  bIndex: number
  eventData: EventData
  isPlayer: boolean
  setEventData: Updater<EventData>
  tLBViewStatus: TLBViewStatus
}

/**
 * Individual Bracket and all fields
 */
export const BracketForm = (props: Props) => {
  const { bIndex, eventData, isPlayer, setEventData, tLBViewStatus } = props

  const [formState, setFormState] = useImmer(
    getInitialGenericFormState(GenericFormStatus.Success),
  )

  const [isEditing, setIsEditing] = useState(
    tLBViewStatus === TLBViewStatus.Create ||
      tLBViewStatus === TLBViewStatus.Editing,
  )

  const isDES =
    eventData.brackets[bIndex]?.bracketType === 'Double Elimination'
  const isOpen =
    eventData.brackets[bIndex]?.status === BracketStatus.Not_Shuffled

  return (
    <>
      {eventData.brackets[bIndex] && (
        <div className="border-t-2">
          <div className="grid grid-cols-6 gap-6 my-4 mx-2 sm:mx-0">
            <TextInput
              autoFocus
              isEditing={isEditing}
              labelText="Bracket Name"
              onChange={(e) =>
                setEventData((draft) => {
                  draft.brackets[bIndex].name = e.target.value
                })
              }
              required
              tooltipText={BRACKET_TEXT.NAME}
              value={eventData.brackets[bIndex].name}
            />

            {!isEditing && (
              <TextInput
                isEditing={isEditing}
                labelText="Status"
                required
                value={eventData.brackets[bIndex].status}
              />
            )}

            <Dropdown
              description={
                isEditing
                  ? "This can't be changed after the bracket is shuffled."
                  : ''
              }
              isEditing={isEditing && isOpen}
              items={bracketOptions}
              labelText="Bracket Type"
              onChange={(e) =>
                setEventData((draft) => {
                  draft.brackets[bIndex].bracketType = e.target.value
                  draft.brackets[bIndex].areTeamsEnabled =
                    e.target.value === 'Teams'
                })
              }
              tooltipText={BRACKET_TEXT.TYPE}
              value={eventData.brackets[bIndex].bracketType}
            />

            <Dropdown
              description={
                isDES
                  ? '* Double Elimination singles currently only supports up to 8 players per bracket'
                  : ''
              }
              isEditing={isEditing}
              items={isDES ? bracketNumPlayersDES : bracketNumPlayers}
              labelText="Bracket Number of Players"
              onChange={(e) =>
                setEventData((draft) => {
                  draft.brackets[bIndex].bracketNumPlayers = e.target.value
                })
              }
              value={eventData.brackets[bIndex].bracketNumPlayers}
            />

            {tLBViewStatus === TLBViewStatus.Create && (
              <RadioGroup
                isEditing
                labelText="Scoring Style"
                tooltipText={BRACKET_TEXT.SCORING}
                items={bracketScoringTypes}
                value={eventData.brackets[bIndex].bracketScoringType}
                onChange={(e) => {
                  setEventData((draft) => {
                    draft.brackets[bIndex].bracketScoringType = e.target.value
                  })
                }}
              />
            )}

            <Checkbox
              isEditing={isEditing}
              labelText="Handicap Enabled"
              isChecked={eventData.brackets[bIndex].isHandicap}
              onChange={() =>
                setEventData((draft) => {
                  draft.brackets[bIndex].isHandicap =
                    !eventData.brackets[bIndex].isHandicap
                })
              }
            />

            <TextInput
              required
              type="number"
              isEditing={isEditing}
              labelText="Based on %"
              hide={!eventData.brackets[bIndex].isHandicap}
              description={isPlayer ? '' : 'enter 90 for 90%'}
              placeholder="ie: 90"
              value={eventData.brackets[bIndex].basedOnPercent}
              onChange={(e) =>
                setEventData((draft) => {
                  draft.brackets[bIndex].basedOnPercent = e.target.valueAsNumber
                })
              }
            />

            <TextInput
              required
              type="number"
              isEditing={isEditing}
              labelText="Based on Score"
              hide={!eventData.brackets[bIndex].isHandicap}
              placeholder="ie: 220"
              value={eventData.brackets[bIndex].basedOnScore}
              onChange={(e) =>
                setEventData((draft) => {
                  draft.brackets[bIndex].basedOnScore = e.target.valueAsNumber
                })
              }
            />

            <RadioGroup
              isEditing={isEditing}
              labelText="Format"
              items={bracketFormatTypes}
              value={eventData.brackets[bIndex].format}
              onChange={(e) =>
                setEventData((draft) => {
                  draft.brackets[bIndex].format = e.target.value
                })
              }
              vertical
            />

            <BoxInput
              isEditing={isEditing}
              labelText="Description"
              value={eventData.brackets[bIndex].description}
              onChange={(e) =>
                setEventData((draft) => {
                  draft.brackets[bIndex].description = e.target.value
                })
              }
            />

            <BoxInput
              isEditing={isEditing}
              labelText="Rules"
              value={eventData.brackets[bIndex].rules}
              onChange={(e) =>
                setEventData((draft) => {
                  draft.brackets[bIndex].rules = e.target.value
                })
              }
            />

            <TextInput
              isEditing={isEditing}
              labelText="Location"
              value={eventData.brackets[bIndex].location}
              onChange={(e) =>
                setEventData((draft) => {
                  draft.brackets[bIndex].location = e.target.value
                })
              }
            />

            <TextInput
              isEditing={isEditing}
              labelText="Date(s)"
              value={eventData.brackets[bIndex].dates}
              onChange={(e) =>
                setEventData((draft) => {
                  draft.brackets[bIndex].dates = e.target.value
                })
              }
            />

            <TextInput
              type="number"
              isEditing={isEditing}
              labelText="Entry Fee"
              value={eventData.brackets[bIndex].entryFee}
              onChange={(e) =>
                setEventData((draft) => {
                  draft.brackets[bIndex].entryFee = e.target.valueAsNumber
                })
              }
            />

            <TextInput
              isEditing={isEditing}
              labelText="Age"
              value={eventData.brackets[bIndex].age}
              onChange={(e) =>
                setEventData((draft) => {
                  draft.brackets[bIndex].age = e.target.value
                })
              }
            />

            <TextInput
              type="number"
              isEditing={isEditing}
              labelText="House Cut"
              value={eventData.brackets[bIndex].houseCut}
              onChange={(e) =>
                setEventData((draft) => {
                  draft.brackets[bIndex].houseCut = e.target.valueAsNumber
                })
              }
            />

            <TextInput
              isEditing={isEditing}
              labelText="Prizes?"
              tooltipText={BRACKET_TEXT.PRIZES}
              value={eventData.brackets[bIndex].prizes}
              onChange={(e) =>
                setEventData((draft) => {
                  draft.brackets[bIndex].prizes = e.target.value
                })
              }
            />

            <TextInput
              type="number"
              isEditing={isEditing}
              labelText="Number of Lanes"
              value={eventData.brackets[bIndex].numLanes}
              onChange={(e) =>
                setEventData((draft) => {
                  draft.brackets[bIndex].numLanes = e.target.valueAsNumber
                })
              }
            />
          </div>

          <Tooltip tooltipText={BRACKET_TEXT.PAYOUTS}>
            <div className="flex">
              <InformationCircleIcon
                className="shrink-0 h-4 w-4"
                aria-hidden="true"
                onSubmit={(e) => e.preventDefault()}
                onClick={(e) => e.preventDefault()}
              />
              <h3 className="font-medium">Payouts</h3>
            </div>
          </Tooltip>

          <div className="grid grid-cols-6 gap-6 my-4 mx-2 sm:mx-0">
            <TextInput
              type="number"
              isEditing={isEditing}
              labelText="First Place Payout"
              value={eventData.brackets[bIndex].firstPayout}
              onChange={(e) =>
                setEventData((draft) => {
                  draft.brackets[bIndex].firstPayout = e.target.valueAsNumber
                })
              }
            />

            <TextInput
              type="number"
              isEditing={isEditing}
              labelText="Second Place Payout"
              value={eventData.brackets[bIndex].secondPayout}
              onChange={(e) =>
                setEventData((draft) => {
                  draft.brackets[bIndex].secondPayout = e.target.valueAsNumber
                })
              }
            />
          </div>

          {eventData.brackets[bIndex].bracketType ===
            'Double Elimination' && (
            <div className="grid grid-cols-6 gap-6 my-4 mx-2 sm:mx-0">
              <TextInput
                type="number"
                isEditing={isEditing}
                labelText="Third Place Payout"
                value={eventData.brackets[bIndex].thirdPayout}
                onChange={(e) =>
                  setEventData((draft) => {
                    draft.brackets[bIndex].thirdPayout = e.target.valueAsNumber
                  })
                }
              />

              <TextInput
                type="number"
                isEditing={isEditing}
                labelText="Fourth Place Payout"
                value={eventData.brackets[bIndex].fourthPayout}
                onChange={(e) =>
                  setEventData((draft) => {
                    draft.brackets[bIndex].fourthPayout = e.target.valueAsNumber
                  })
                }
              />
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
                          saveBracketChanges(bIndex, eventData, setFormState)
                          setIsEditing(false)
                        }}
                      >
                        Save
                      </Button>
                      <Button
                        variant="dangertext"
                        onClick={() =>
                          (window.location.href = window.location.href)
                        }
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
                    Edit Bracket
                  </Button>
                )}
              </>
            )}
        </div>
      )}
    </>
  )
}
