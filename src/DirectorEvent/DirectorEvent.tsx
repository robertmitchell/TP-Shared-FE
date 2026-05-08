import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useImmer } from 'use-immer'

import { ManageEventStatus } from './DirectorEvent.types'
import { TEST } from '@/Config/test'
import { TLBViewStatus } from '@/Common/Common.types'

import { getInitialEventFormData } from '../Common/Utils/UtilityFunctions'
import {
  // copyInfo,
  fetchEventData,
  getInitialManageEventState,
} from './DirectorEvent.helpers'
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
import { LeagueDetails } from '@/Common/Components/LeagueDetails/LeagueDetails'
import { RawResults } from './RawResults/RawResults'
import { TournamentDetails } from '@/Common/Components/TournamentDetails/TournamentDetails'

/**
 * Entrypoint for the Director's Event page
 * The tabs should be in sync with <PlayerEvent>
 */
export const DirectorEvent = () => {
  const [currentTab, setCurrentTab] = useState(0)

  const URLParams = useParams()

  const [eventData, setEventData] = useImmer(getInitialEventFormData)
  const [manageEventState, setManageEventState] = useState(
    getInitialManageEventState,
  )

  useEffect(() => {
    checkLoginStatus(true)
  }, [])

  useEffect(() => {
    if (!URLParams.eventId) {
      setManageEventState({
        ...manageEventState,
        status: ManageEventStatus.Error,
      })
      return
    }

    fetchEventData(URLParams.eventId, setManageEventState, setEventData)
  }, [])

  switch (manageEventState.status) {
    case ManageEventStatus.Loading:
      return (
        <h1 className="text-center mt-10 text-2xl font-medium">Loading...</h1>
      )

    case ManageEventStatus.Success:
      return (
        <>
          <Header
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
            eventData={eventData}
          />

          {/* {TEST && (
            <Button
              variant="secondary"
              onClick={() => copyInfo('aaaTest', eventData)}
              className="ml-8 bg-green-600 hover:bg-green-700 focus:ring-green-500"
            >
              Save info
            </Button>
          )} */}

          <main className="sm:mx-8">
            {URLParams.eventId && (
              <>
                {currentTab === 0 && (
                  <EventPlayers
                    eventData={eventData}
                    setEventData={setEventData}
                  />
                )}

                {currentTab === 1 && (
                  <EventTeams
                    eventData={eventData}
                    setEventData={setEventData}
                  />
                )}

                {currentTab === 2 && (
                  <EventScores
                    eventData={eventData}
                    setEventData={setEventData}
                  />
                )}

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

            {/* {eventData.leagues.length > 0 && currentTab === 7 && (
              <LeagueDetails
                tLBViewStatus={TLBViewStatus.Editable}
                descriptionText="Click the League name to expand/collapse."
                eventData={eventData}
                setEventData={setEventData}
              />
            )} */}

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
      return (
        <ErrorMessage>
          There was an error loading the data. Please try again. Error Code:
          METSX_001
        </ErrorMessage>
      )

    default:
      return (
        <ErrorMessage>
          An unknown error occured. Error Code: METSX_002
        </ErrorMessage>
      )
  }
}
