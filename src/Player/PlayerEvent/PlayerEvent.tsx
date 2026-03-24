import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useImmer } from 'use-immer'

import { ManageEventStatus } from '@/DirectorEvent/DirectorEvent.types'
import { TLBViewStatus } from '@/Common/Common.types'

import { getInitialEventFormData } from '@/Common/Utils/UtilityFunctions'
import {
  // copyInfo,
  fetchEventData,
  getInitialManageEventState,
} from '@/DirectorEvent/DirectorEvent.helpers'
import { checkLoginStatus } from '@/Common/Utils/checkLoginStatus'

import { BracketDetails } from '@/Common/Components/BracketDetails/BracketDetails'
import { ErrorMessage } from '@/Common/Components/ErrorMessage'
import { EventDetails } from '@/Common/Components/EventDetails/EventDetails'
import { EventGames } from '@/DirectorEvent/EventGames/EventGames'
import { EventPlayers } from '@/DirectorEvent/EventPlayers/EventPlayers'
import { EventScores } from '@/DirectorEvent/EventScores/EventScores'
import { EventTeams } from '@/DirectorEvent/EventTeams/EventTeams'
import { Generators } from '@/DirectorEvent/Generators/Generators'
import { Header } from '@/DirectorEvent/Header/Header'
import { LeagueDetails } from '@/Common/Components/LeagueDetails/LeagueDetails'
import { RawResults } from '@/DirectorEvent/RawResults/RawResults'
import { TournamentDetails } from '@/Common/Components/TournamentDetails/TournamentDetails'

/**
 * Entrypoint for the Player Event page
 * This is a read-only version of what Director's see
 * The tabs should be in sync with <DirectorEvent>
 */
export const PlayerEvent = () => {
  const [currentTab, setCurrentTab] = useState(7) // Set the default for players to "Results"

  const URLParams = useParams()

  const [eventData, setEventData] = useImmer(getInitialEventFormData)
  const [manageEventState, setManageEventState] = useState(
    getInitialManageEventState,
  )
  const [directorUID, setDirectorUID] = useState('')

  /**
   * Check that they are logged in and check for a `directorUID` in the URL
   * The `directorUID` is passed to the URL when a player scans the QR Code
   */
  useEffect(() => {
    checkLoginStatus(false)

    if (URLParams.directorUID) {
      setDirectorUID(URLParams.directorUID)
    }
  }, [])

  // Once the `directorUID` is set we can fetch the information
  useEffect(() => {
    if (!URLParams.eventId) {
      setManageEventState({
        ...manageEventState,
        status: ManageEventStatus.Error,
      })
      return
    }

    fetchEventData(
      URLParams.eventId,
      setManageEventState,
      setEventData,
      directorUID,
    )
  }, [directorUID])

  // The `directorUID` is passed in the state when they browse for the event
  if (directorUID.length === 0) {
    const location = useLocation()
    if (location.state && location.state.directorUID) {
      setDirectorUID(location.state.directorUID)
    }
  }

  const tLBViewStatus = TLBViewStatus.ReadOnly

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
            isPlayer
          />

          <main className="sm:mx-8">
            {URLParams.eventId && (
              <>
                {currentTab === 0 && (
                  <EventPlayers
                    isPlayer
                    eventData={eventData}
                    setEventData={setEventData}
                  />
                )}

                {currentTab === 1 && (
                  <EventTeams
                    isPlayer
                    eventData={eventData}
                    setEventData={setEventData}
                  />
                )}

                {currentTab === 2 && (
                  <EventScores
                    isPlayer
                    eventData={eventData}
                    setEventData={setEventData}
                  />
                )}

                {currentTab === 3 && (
                  <EventGames isPlayer eventData={eventData} />
                )}
              </>
            )}

            {currentTab === 4 && (
              <TournamentDetails
                tLBViewStatus={tLBViewStatus}
                descriptionText=""
                eventData={eventData}
                isPlayer
                setEventData={setEventData}
              />
            )}

            {currentTab === 5 && (
              <BracketDetails
                descriptionText=""
                eventData={eventData}
                isPlayer
                setEventData={setEventData}
                tLBViewStatus={tLBViewStatus}
              />
            )}

            {/* {eventData.leagues.length > 0 && currentTab === 6 && (
              <LeagueDetails
                descriptionText="Click the League name to expand/collapse."
                eventData={eventData}
                isPlayer
                setEventData={setEventData}
                tLBViewStatus={tLBViewStatus}
              />
            )} */}

            {currentTab === 6 && (
              <EventDetails
                eventData={eventData}
                isPlayer
                setEventData={setEventData}
                tLBViewStatus={tLBViewStatus}
              />
            )}

            {currentTab === 7 && <RawResults eventData={eventData} />}

            {currentTab === 8 && <Generators eventData={eventData} isPlayer />}
          </main>
        </>
      )

    case ManageEventStatus.Error:
      return (
        <ErrorMessage isPlayer>
          There was an error loading the data. Please try again. Error Code:
          PETSX_001
        </ErrorMessage>
      )

    default:
      return (
        <ErrorMessage isPlayer>
          An unknown error occured. Error Code: METSX_002
        </ErrorMessage>
      )
  }
}
