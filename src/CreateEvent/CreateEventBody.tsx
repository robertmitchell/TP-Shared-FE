import { Updater } from 'use-immer'

import { EventData, TLBViewStatus } from '../Common/Common.types'
import { CreateEventState, CreateEventStatus } from './CreateEvent.types'

import { BracketDetails } from '../Common/Components/BracketDetails/BracketDetails'
import { ErrorMessage } from '@/Common/Components/ErrorMessage'
import { EventDetails } from '@/Common/Components/EventDetails/EventDetails'
import { GameDetails } from '@/Common/Components/GameDetails/GameDetails'
import { LeagueDetails } from '@/Common/Components/LeagueDetails/LeagueDetails'
import { TournamentDetails } from '@/Common/Components/TournamentDetails/TournamentDetails'

type Props = {
  eventData: EventData
  formState: CreateEventState
  setEventData: Updater<EventData>
}

/**
 * The main content displayed on the create event page
 */
export const CreateEventBody = (props: Props) => {
  const { eventData, formState, setEventData } = props

  switch (formState.status) {
    case CreateEventStatus.Details:
      return (
        <EventDetails
          tLBViewStatus={TLBViewStatus.Create}
          eventData={eventData}
          setEventData={setEventData}
        />
      )

    case CreateEventStatus.Tournaments:
      return (
        <TournamentDetails
          tLBViewStatus={TLBViewStatus.Create}
          descriptionText="Add Tournaments to your event (not required)."
          eventData={eventData}
          isPlayer={false}
          setEventData={setEventData}
        />
      )

    // case CreateEventStatus.Leagues:
    //   return (
    //     <LeagueDetails
    //       tLBViewStatus={TLBViewStatus.Create}
    //       descriptionText="Add Leagues to your event (not required)."
    //       eventData={eventData}
    //       setEventData={setEventData}
    //     />
    //   )

    case CreateEventStatus.Brackets:
      return (
        <BracketDetails
          descriptionText="Add Brackets to your event (not required)."
          eventData={eventData}
          isPlayer={false}
          setEventData={setEventData}
          tLBViewStatus={TLBViewStatus.Create}
        />
      )

    case CreateEventStatus.Games:
      return <GameDetails eventData={eventData} setEventData={setEventData} />

    default:
      return (
        <ErrorMessage>
          An unkown error occured. Error Code: BTSX_001
        </ErrorMessage>
      )
  }
}
