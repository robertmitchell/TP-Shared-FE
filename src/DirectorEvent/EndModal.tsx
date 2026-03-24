import { useEffect } from 'react'
import { Dialog } from '@headlessui/react'
import { useImmer } from 'use-immer'

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

/**
 * Confirms that the Director wants to end the event
 */
export const EndModal = (props: Props) => {
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
      <div>
        <Dialog.Title
          as="h3"
          className="text-center text-xl font-medium mb-2 text-red-600"
        >
          Are you sure you want to end the event?
        </Dialog.Title>
        <h4 className="text-center text-m font-medium mb-2 text-gray-500">
          (This can't be undone.)
        </h4>
      </div>

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

      <div className="flex justify-center">
        <Button
          variant="danger"
          onClick={() =>
            updateEventStatus(eventData, setFormState, GenericStatus.Closed)
          }
          className="mr-2"
        >
          Yes
        </Button>

        <Button onClick={onClose}>No</Button>
      </div>
      {formState.status === GenericFormStatus.Loading && (
        <LoadingModal displayText="Ending Event. Please wait..." />
      )}
    </Modal>
  )
}
