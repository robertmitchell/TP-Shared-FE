import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useImmer } from 'use-immer'
import cn from 'classnames'
import { CheckIcon } from '@heroicons/react/20/solid'

import { ManageEventStatus } from './DirectorEvent.types'
import { TEST } from '@/Config/test'
import { TLBViewStatus } from '@/Common/Common.types'

import { getInitialEventFormData } from '../Common/Utils/UtilityFunctions'
import { fetchEventData, getInitialManageEventState } from './DirectorEvent.helpers'
import { checkLoginStatus } from '@/Common/Utils/checkLoginStatus'

import { BracketDetails } from '../Common/Components/BracketDetails/BracketDetails'
import { Button } from '@/Common/Components/Button'
import { DeleteModal } from './DeleteModal'
import { ErrorMessage } from '@/Common/Components/ErrorMessage'
import { EventActions } from './EventActions'
import { EventDetails } from '@/Common/Components/EventDetails/EventDetails'
import { EventGames } from './EventGames/EventGames'
import { EventPlayers } from './EventPlayers/EventPlayers'
import { EventScores } from './EventScores/EventScores'
import { EventTeams } from './EventTeams/EventTeams'
import { Generators } from './Generators/Generators'
import { Header } from './Header/Header'
import { RawResults } from './RawResults/RawResults'
import { TournamentDetails } from '@/Common/Components/TournamentDetails/TournamentDetails'

const STEPS = [
  { label: 'Players', tab: 0 },
  { label: 'Teams', tab: 1 },
  { label: 'Tournament', tab: 4 },
  { label: 'Games', tab: 3 },
  { label: 'Results', tab: 7 },
]

export const DirectorEvent = () => {
  const [currentTab, setCurrentTab] = useState(0)
  const URLParams = useParams()
  const [eventData, setEventData] = useImmer(getInitialEventFormData)
  const [manageEventState, setManageEventState] = useState(getInitialManageEventState)

  useEffect(() => { checkLoginStatus(true) }, [])

  useEffect(() => {
    if (!URLParams.eventId) {
      setManageEventState({ ...manageEventState, status: ManageEventStatus.Error })
      return
    }
    fetchEventData(URLParams.eventId, setManageEventState, setEventData)
  }, [])

  const hasPlayers = eventData.eventDetails.numParticipants > 0
  const hasTeams = (eventData.teams?.length || 0) > 0
  const hasTournament = eventData.tournaments?.length > 0 || eventData.brackets?.length > 0

  const getStepStatus = (stepIndex: number) => {
    if (stepIndex === 0) return hasPlayers ? 'complete' : 'current'
    if (stepIndex === 1) return !hasPlayers ? 'locked' : hasTeams ? 'complete' : 'current'
    if (stepIndex === 2) return !hasTeams ? 'locked' : hasTournament ? 'complete' : 'current'
    if (stepIndex === 3) return !hasTournament ? 'locked' : 'current'
    if (stepIndex === 4) return !hasTournament ? 'locked' : 'current'
    return 'current'
  }

  switch (manageEventState.status) {
    case ManageEventStatus.Loading:
      return <p className="text-center mt-10 text-gray-500">Loading...</p>

    case ManageEventStatus.Success:
      return (
        <>
          <Header
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
            eventData={eventData}
          />

          {/* Progress steps */}
          <div className="bg-white border-b border-gray-200 px-6 py-3">
            <div className="flex items-center gap-0 max-w-2xl">
              {STEPS.map((step, i) => {
                const status = getStepStatus(i)
                return (
                  <div key={step.label} className="flex items-center">
                    <button
                      onClick={() => status !== 'locked' && setCurrentTab(step.tab)}
                      disabled={status === 'locked'}
                      className={cn(
                        'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors',
                        status === 'complete' && 'bg-green-100 text-green-700 hover:bg-green-200',
                        status === 'current' && currentTab === step.tab && 'bg-amber-100 text-amber-700',
                        status === 'current' && currentTab !== step.tab && 'text-gray-600 hover:bg-gray-100',
                        status === 'locked' && 'text-gray-300 cursor-not-allowed',
                      )}
                    >
                      {status === 'complete' && (
                        <CheckIcon className="h-3 w-3" />
                      )}
                      {step.label}
                    </button>
                    {i < STEPS.length - 1 && (
                      <span className={cn('mx-1 text-xs', status === 'locked' ? 'text-gray-200' : 'text-gray-300')}>→</span>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          <main className="sm:mx-8">
            {URLParams.eventId && (
              <>
                {currentTab === 0 && <EventPlayers eventData={eventData} setEventData={setEventData} />}
                {currentTab === 1 && <EventTeams eventData={eventData} setEventData={setEventData} />}
                {currentTab === 2 && <EventScores eventData={eventData} setEventData={setEventData} />}
                {currentTab === 3 && <EventGames eventData={eventData} />}
              </>
            )}

            {currentTab === 4 && (
              <TournamentDetails
                tLBViewStatus={TLBViewStatus.Editable}
                descriptionText=""
                eventData={eventData}
                isPlayer={false}
                setEventData={setEventData}
              />
            )}
            {currentTab === 5 && (
              <BracketDetails
                descriptionText=""
                eventData={eventData}
                isPlayer={false}
                setEventData={setEventData}
                tLBViewStatus={TLBViewStatus.Editable}
              />
            )}
            {currentTab === 6 && (
              <EventDetails
                tLBViewStatus={TLBViewStatus.Editable}
                eventData={eventData}
                setEventData={setEventData}
              />
            )}
            {currentTab === 7 && <RawResults eventData={eventData} />}
            {currentTab === 8 && <Generators eventData={eventData} />}

            <div className="flex justify-between pb-6 pt-2">
              <EventActions eventData={eventData} />
              <Button
                variant="dangertext"
                onClick={() =>
                  setManageEventState({
                    status: ManageEventStatus.Success,
                    error: '',
                    success: '',
                    isDeleteModalOpen: true,
                  })
                }
              >
                Delete Event
              </Button>
            </div>
          </main>

          {manageEventState.isDeleteModalOpen && (
            <DeleteModal
              eventData={eventData}
              onClose={() =>
                setManageEventState({
                  status: ManageEventStatus.Success,
                  error: '',
                  success: '',
                  isDeleteModalOpen: false,
                })
              }
            />
          )}
        </>
      )

    case ManageEventStatus.Error:
      return <ErrorMessage>There was an error loading the data. Error Code: METSX_001</ErrorMessage>

    default:
      return <ErrorMessage>An unknown error occurred. Error Code: METSX_002</ErrorMessage>
  }
}