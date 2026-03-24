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
import { reopenTournament } from './TournamentForm.helpers'

import { Button } from '@/Common/Components/Button'
import { EndModal } from './EndModal'
import { ErrorAndSuccess } from '@/Common/Components/ErrorAndSuccess'
import { TournamentPots } from './TournamentPots'
import { TournamentResults } from './TournamentResults'
import { TournamentResultsPrintModal } from './TournamentResultsPrintModal'

type Props = {
  eventData: EventData
  isPlayer: boolean
  selectedOption: number
  setEventData: Updater<EventData>
  setSelectedOption: SetState<number>
  tIndex: number
  tLBViewStatus: TLBViewStatus
}

/**
 * Different buttons for displaying tournament content
 */
export const TournamentOptions = (props: Props) => {
  const {
    eventData,
    isPlayer,
    selectedOption,
    setEventData,
    setSelectedOption,
    tIndex,
    tLBViewStatus,
  } = props

  const [formState, setFormState] = useImmer(
    getInitialGenericFormState(GenericFormStatus.Success),
  )

  if (tLBViewStatus === TLBViewStatus.Create) {
    return null
  }

  const { areTeamsEnabled, isOpen } = eventData.tournaments[tIndex]
  const hasPots =
    eventData.tournaments[tIndex].sidePots &&
    ((eventData.tournaments[tIndex].sidePots.highPot &&
      eventData.tournaments[tIndex].sidePots.highPot.enabled) ||
      (eventData.tournaments[tIndex].sidePots.lowPot &&
        eventData.tournaments[tIndex].sidePots.lowPot.enabled))

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
          <h3 className="flex text-lg font-medium leading-6 text-gray-900 mt-2 ml-2 sm:ml-0">
            Tournament Options
          </h3>
          {isOpen && !isPlayer && (
            <p className="text-gray-400 text-sm">
              (Ending the tournament will sort scores from highest to lowest.)
            </p>
          )}

          <div className="flex pt-4 flex-wrap">
            <Button
              variant={selectedOption === 0 ? 'black' : 'secondary'}
              className="m-2 sm:ml-0"
              onClick={() => setSelectedOption(0)}
            >
              Show Details
              <ChevronDownIcon aria-hidden="true" className="h-6 w-6" />
            </Button>

            <Button
              variant={selectedOption === 1 ? 'black' : 'secondary'}
              className="m-2"
              onClick={() => setSelectedOption(1)}
            >
              Show Standings
              <ChevronDownIcon aria-hidden="true" className="h-6 w-6" />
            </Button>

            {!areTeamsEnabled && hasPots && (
              <Button
                variant={selectedOption === 2 ? 'black' : 'secondary'}
                className="m-2"
                onClick={() => setSelectedOption(2)}
              >
                Show Pots
                <ChevronDownIcon aria-hidden="true" className="h-6 w-6" />
              </Button>
            )}

            <Button
              variant={selectedOption === -1 ? 'black' : 'secondary'}
              className="m-2"
              onClick={() => setSelectedOption(-1)}
            >
              Hide All
              <ChevronUpIcon aria-hidden="true" className="h-6 w-6" />
            </Button>

            {tLBViewStatus !== TLBViewStatus.ReadOnly && (
              <>
                {isOpen ? (
                  <>
                    {eventData.tournaments[tIndex].tournamentType !==
                      'Match Play Singles' && (
                      <Button
                        variant={selectedOption === 3 ? 'black' : 'secondary'}
                        onClick={() => setSelectedOption(3)}
                        className="m-2"
                      >
                        End Tournament
                      </Button>
                    )}
                  </>
                ) : (
                  <>
                    <Button
                      variant={selectedOption === 4 ? 'black' : 'secondary'}
                      className="m-2"
                      onClick={() => setSelectedOption(4)}
                    >
                      Print Results
                    </Button>

                    <Button
                      variant="danger"
                      className="m-2 sm:ml-0"
                      onClick={() =>
                        reopenTournament(eventData, setFormState, tIndex)
                      }
                    >
                      Reopen Tournament
                    </Button>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {selectedOption === 1 && (
        <TournamentResults
          eventData={eventData}
          isPlayer={isPlayer}
          tIndex={tIndex}
          tLBViewStatus={tLBViewStatus}
        />
      )}

      {selectedOption === 2 && (
        <TournamentPots
          eventData={eventData}
          isPlayer={isPlayer}
          tIndex={tIndex}
        />
      )}

      {selectedOption === 3 && (
        <EndModal
          onClose={() => setSelectedOption(-1)}
          tIndex={tIndex}
          eventData={eventData}
          setEventData={setEventData}
          formState={formState}
          setFormState={setFormState}
        />
      )}

      {selectedOption === 4 && (
        <TournamentResultsPrintModal
          onClose={() => setSelectedOption(-1)}
          tIndex={tIndex}
          eventData={eventData}
        />
      )}
    </>
  )
}
