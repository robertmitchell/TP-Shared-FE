import { useEffect } from 'react'
import { Dialog } from '@headlessui/react'
import { useImmer } from 'use-immer'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

import {
  GenericFormStatus,
  GenericStatus,
  EventData,
} from '@/Common/Common.types'

import { getInitialGenericFormState } from '@/Common/Utils/UtilityFunctions'
import { updateEventStatus } from './EventActions.helpers'

import { Button } from '@/Common/Components/Button'
import { ErrorAndSuccess } from '@/Common/Components/ErrorAndSuccess'
import { LoadingModal } from '@/Common/Components/LoadingModal'
import { Modal } from '@/Common/Components/Modal'

type Props = {
  eventData: EventData
  onClose: () => void
}

export const StartModal = (props: Props) => {
  const { eventData, onClose } = props

  const [formState, setFormState] = useImmer(
    getInitialGenericFormState(GenericFormStatus.Success),
  )

  useEffect(() => {
    if (formState.success.length > 0) {
      window.location.href = '/manage'
    }
  }, [formState.success])

  return (
    <Modal onClose={onClose}>
      <div className="text-center px-2 py-4">
        <div className="mx-auto flex items-center justify-center h-14 w-14 rounded-full bg-amber-50 mb-4">
          <ExclamationTriangleIcon className="h-7 w-7 text-amber-500" />
        </div>

        <Dialog.Title as="h3" className="text-xl font-bold text-gray-900 mb-2">
          Start this event?
        </Dialog.Title>

        <p className="text-sm text-gray-500 mb-1">
          You're about to start <span className="font-semibold text-gray-700">{eventData.eventDetails.name}</span>.
        </p>
        <p className="text-xs text-red-500 mb-6">
          This action cannot be undone.
        </p>

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

        <div className="flex gap-3 justify-center mt-2">
          <button
            onClick={() =>
              updateEventStatus(eventData, setFormState, GenericStatus.In_Progress)
            }
            className="flex-1 max-w-xs px-4 py-2 bg-amber-400 hover:bg-amber-500 text-black text-sm font-semibold rounded-lg transition-colors"
          >
            Yes, Start Event
          </button>
          <button
            onClick={onClose}
            className="flex-1 max-w-xs px-4 py-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-medium rounded-lg transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>

      {formState.status === GenericFormStatus.Loading && (
        <LoadingModal displayText="Starting Event. Please wait..." />
      )}
    </Modal>
  )
}