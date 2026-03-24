import { Updater, useImmer } from 'use-immer'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { ChevronUpIcon } from '@heroicons/react/20/solid'

import {
  GenericFormStatus,
  EventData,
  SetState,
  TLBViewStatus,
} from '@/Common/Common.types'

import { getInitialGenericFormState } from '@/Common/Utils/UtilityFunctions'

import { AliveList } from '../AliveList/AliveList'
import { BracketParticipants } from './BracketParticipants'
import { BracketScroller } from '../BracketScroller/BracketScroller'
import { BracketWeb } from '../BracketWeb/BracketWeb'
import { Button } from '@/Common/Components/Button'
import { ErrorAndSuccess } from '@/Common/Components/ErrorAndSuccess'

type Props = {
  bIndex: number
  eventData: EventData
  isPlayer: boolean
  setEventData: Updater<EventData>
  selectedOption: number
  setSelectedOption: SetState<number>
  tLBViewStatus: TLBViewStatus
}

/**
 * Different buttons for displaying bracket content
 */
export const BracketOptions = (props: Props) => {
  const {
    bIndex,
    eventData,
    isPlayer,
    setEventData,
    selectedOption,
    setSelectedOption,
    tLBViewStatus,
  } = props

  const [formState, setFormState] = useImmer(
    getInitialGenericFormState(GenericFormStatus.Success),
  )

  const playersOrTeams = eventData.brackets[bIndex].areTeamsEnabled
    ? 'Teams'
    : 'Players'

  return (
    <>
      <div>
        <ErrorAndSuccess
          error={formState.error}
          success={formState.success}
          clearMessageFn={() =>
            setFormState((draft) => {
              draft.error = ''
              draft.success = ''
            })
          }
        />

        <div className="flex flex-col border-t-2">
          <h3 className="flex text-lg font-medium leading-6 text-gray-900 ml-2 sm:ml-0">
            Bracket Options
          </h3>

          <div className="flex pt-4 flex-wrap">
            <Button
              variant={selectedOption === 1 ? 'black' : 'secondary'}
              className="m-2"
              onClick={() => setSelectedOption(1)}
            >
              Show {playersOrTeams}
              <ChevronDownIcon aria-hidden="true" className="h-6 w-6" />
            </Button>

            <Button
              variant={selectedOption === 2 ? 'black' : 'secondary'}
              className="m-2"
              onClick={() => setSelectedOption(2)}
            >
              Show Bracket
              <ChevronDownIcon aria-hidden="true" className="h-6 w-6" />
            </Button>

            <Button
              variant={selectedOption === 3 ? 'black' : 'secondary'}
              className="m-2"
              onClick={() => setSelectedOption(3)}
            >
              Show Alive List
              <ChevronDownIcon aria-hidden="true" className="h-6 w-6" />
            </Button>

            <Button
              variant={selectedOption === 4 ? 'black' : 'secondary'}
              className="m-2"
              onClick={() => setSelectedOption(4)}
            >
              Scroll Brackets
            </Button>

            <Button
              variant={selectedOption === 0 ? 'black' : 'secondary'}
              className="m-2"
              onClick={() => setSelectedOption(0)}
            >
              Bracket Details
              <ChevronDownIcon aria-hidden="true" className="h-6 w-6" />
            </Button>

            <Button
              variant={selectedOption === -1 ? 'black' : 'secondary'}
              className="m-2"
              onClick={() => setSelectedOption(-1)}
            >
              Hide All
              <ChevronUpIcon aria-hidden="true" className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>

      {selectedOption === 1 && (
        <BracketParticipants
          bIndex={bIndex}
          eventData={eventData}
          isPlayer={isPlayer}
        />
      )}

      {selectedOption === 2 && (
        <BracketWeb
          bIndex={bIndex}
          eventData={eventData}
          setEventData={setEventData}
          tLBViewStatus={tLBViewStatus}
        />
      )}

      {selectedOption === 3 && (
        <AliveList bIndex={bIndex} eventData={eventData} isPlayer={isPlayer} />
      )}

      {selectedOption === 4 && (
        <BracketScroller
          bIndex={bIndex}
          eventData={eventData}
          isPlayer={isPlayer}
          tLBViewStatus={tLBViewStatus}
        />
      )}
    </>
  )
}
