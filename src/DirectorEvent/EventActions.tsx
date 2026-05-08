import { useState } from 'react'

import { GenericStatus, EventData } from '@/Common/Common.types'

import { Button } from '@/Common/Components/Button'
import { EndModal } from './EndModal'
import { ErrorMessage } from '@/Common/Components/ErrorMessage'
import { StartModal } from './StartModal'

type Props = {
  eventData: EventData
}

/**
 * Displays buttons needed for updating event status
 */
export const EventActions = (props: Props) => {
  const { eventData } = props

  const [modals, setModals] = useState({
    isStartModalOpen: false,
    isEndModalOpen: false,
  })

  switch (eventData.eventDetails.status) {
    case GenericStatus.Open:
      return (
        <>
          <Button
            className="ml-2 mt-2"
            onClick={() =>
              setModals({
                isStartModalOpen: true,
                isEndModalOpen: false,
              })
            }
            variant="primary"
          >
            Start Event
          </Button>

          {modals.isStartModalOpen && (
            <StartModal
              eventData={eventData}
              onClose={() =>
                setModals({
                  isStartModalOpen: false,
                  isEndModalOpen: false,
                })
              }
            />
          )}
        </>
      )

    case GenericStatus.In_Progress:
      return (
        <>
          <Button
            variant="danger"
            className="ml-4"
            onClick={() =>
              setModals({
                isStartModalOpen: false,
                isEndModalOpen: true,
              })
            }
          >
            End Event
          </Button>

          {modals.isEndModalOpen && (
            <EndModal
              eventData={eventData}
              onClose={() =>
                setModals({
                  isStartModalOpen: false,
                  isEndModalOpen: false,
                })
              }
            />
          )}
        </>
      )

    case GenericStatus.Closed:
      return null

    default:
      return (
        <ErrorMessage>
          An unknown error occured. Error Code: EATSX_001
        </ErrorMessage>
      )
  }
}
