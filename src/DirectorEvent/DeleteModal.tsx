import { Dialog } from '@headlessui/react'
import { useImmer } from 'use-immer'

import { GenericFormStatus, EventData } from '@/Common/Common.types'

import { deleteEvent } from '@/DirectorEvent/DeleteModal.helpers'
import { getInitialGenericFormState } from '@/Common/Utils/UtilityFunctions'

import { Button } from '@/Common/Components/Button'
import { ErrorAndSuccess } from '@/Common/Components/ErrorAndSuccess'
import { LoadingModal } from '@/Common/Components/LoadingModal'
import { Modal } from '@/Common/Components/Modal'

type Props = {
  eventData: EventData
  onClose: () => void
}

/**
 * Confirms the user wants to delete the event
 */
export const DeleteModal = (props: Props) => {
  const { eventData, onClose } = props

  const [formState, setFormState] = useImmer(
    getInitialGenericFormState(GenericFormStatus.Success),
  )

  return (
    <Modal onClose={onClose}>
      <div>
        <Dialog.Title
          as="h3"
          className="text-center text-xl font-medium mb-2 text-red-600"
        >
          Are you sure you want to delete the event?
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
          onClick={() => deleteEvent(eventData, setFormState)}
          className="mr-2"
        >
          Yes
        </Button>

        <Button onClick={onClose}>No</Button>
      </div>
      {formState.status === GenericFormStatus.Loading && (
        <LoadingModal displayText="Deleting Event. Please wait..." />
      )}
    </Modal>
  )
}
