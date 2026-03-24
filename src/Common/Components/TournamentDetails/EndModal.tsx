import { Dialog } from '@headlessui/react'
import type { Updater } from 'use-immer'

import {
  GenericFormState,
  GenericFormStatus,
  EventData,
  SetState,
} from '@/Common/Common.types'

import { handleEndTournament } from './EndModal.helpers'

import { Button } from '@/Common/Components/Button'
import { LoadingModal } from '@/Common/Components/LoadingModal'
import { Modal } from '@/Common/Components/Modal'
import { ErrorAndSuccess } from '@/Common/Components/ErrorAndSuccess'

type Props = {
  eventData: EventData
  formState: GenericFormState
  onClose: () => void
  setEventData: SetState<EventData>
  setFormState: Updater<GenericFormState>
  tIndex: number
}

/**
 * Confirmation modal before ending a tournament
 */
export const EndModal = (props: Props) => {
  const { eventData, formState, onClose, setEventData, setFormState, tIndex } =
    props

  return (
    <Modal onClose={onClose}>
      <div className="text-center">
        <Dialog.Title as="h3" className="text-xl font-medium mb-4 text-black">
          Are you sure you want to end the tournament?
        </Dialog.Title>
        <h4 className="mt-1 mb-6">
          Make sure all scores have been entered before ending.
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
      <div className="flex justify-center mt-2">
        <Button
          disabled={!eventData.tournaments[tIndex].isOpen}
          variant="danger"
          onClick={() =>
            handleEndTournament(
              tIndex,
              eventData,
              setEventData,
              setFormState,
              onClose,
            )
          }
        >
          Yes
        </Button>
        <Button variant="secondary" className="mx-2" onClick={onClose}>
          No
        </Button>
      </div>

      {formState.status === GenericFormStatus.Loading && <LoadingModal />}
    </Modal>
  )
}
