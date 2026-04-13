import { useState } from 'react'
import { GenericStatus, EventData } from '@/Common/Common.types'
import { Button } from '@/Common/Components/Button'
import { EndModal } from './EndModal'
import { ErrorMessage } from '@/Common/Components/ErrorMessage'
import { StartModal } from './StartModal'

type Props = {
  eventData: EventData
}

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
          <div className="border border-amber-200 bg-amber-50 rounded-xl p-4 mt-4 w-full">
            <p className="text-sm font-semibold text-gray-700 mb-1">Ready to go?</p>
            <p className="text-xs text-gray-500 mb-3">
              Once you start the event, players will no longer be able to register.
            </p>
            <button
              onClick={() => setModals({ isStartModalOpen: true, isEndModalOpen: false })}
              className="px-5 py-2 bg-amber-400 hover:bg-amber-500 text-black text-sm font-semibold rounded-lg transition-colors"
            >
              Start Event →
            </button>
          </div>

          {modals.isStartModalOpen && (
            <StartModal
              eventData={eventData}
              onClose={() => setModals({ isStartModalOpen: false, isEndModalOpen: false })}
            />
          )}
        </>
      )

    case GenericStatus.In_Progress:
      return (
        <>
          <div className="border border-red-200 bg-red-50 rounded-xl p-4 mt-4 w-full">
            <p className="text-sm font-semibold text-gray-700 mb-1">End this event?</p>
            <p className="text-xs text-gray-500 mb-3">
              Ending the event will finalize all results.
            </p>
            <button
              onClick={() => setModals({ isStartModalOpen: false, isEndModalOpen: true })}
              className="px-5 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold rounded-lg transition-colors"
            >
              End Event
            </button>
          </div>

          {modals.isEndModalOpen && (
            <EndModal
              eventData={eventData}
              onClose={() => setModals({ isStartModalOpen: false, isEndModalOpen: false })}
            />
          )}
        </>
      )

    case GenericStatus.Closed:
      return null

    default:
      return <ErrorMessage>An unknown error occurred. Error Code: EATSX_001</ErrorMessage>
  }
}