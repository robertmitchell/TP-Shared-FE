import { Dialog } from '@headlessui/react'

import type { CreateEventState } from './CreateEvent.types'

import { Button } from '@/Common/Components/Button'
import { ErrorAndSuccess } from '@/Common/Components/ErrorAndSuccess'
import { Modal } from '@/Common/Components/Modal'

type Props = {
  formState: CreateEventState
  onClose: () => void
  onSubmit: () => void
}

/**
 * Confirms that the Director wants to create the event when not all TLB have
 * games assigned for each round
 */
export const WarningModal = (props: Props) => {
  const { formState, onClose, onSubmit } = props

  return (
    <Modal onClose={onClose} size="md">
      <div>
        <Dialog.Title
          as="h3"
          className="text-center text-xl font-medium mb-4 text-red-600"
        >
          Warning:
        </Dialog.Title>
        <p className="text-center mb-4">
          <p className="text-red-600 font-medium">
            There are Tournaments and/or Brackets that don't have a game
            assigned to them.
          </p>
          <p className="my-2">
            This could cause issues where scores may not apply correctly.
          </p>
          <p>Are you sure you're ready to create the event?</p>
        </p>
      </div>

      <ErrorAndSuccess error={formState.error} success={formState.success} />

      <div className="flex justify-center">
        <Button variant="danger" onClick={onSubmit} className="mr-2">
          Yes
        </Button>

        <Button variant="dangertext" onClick={onClose}>
          No
        </Button>
      </div>
    </Modal>
  )
}
