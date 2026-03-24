import { useEffect } from 'react'
import { Dialog } from '@headlessui/react'
import { Updater, useImmer } from 'use-immer'

import { GenericFormStatus, EventData } from '@/Common/Common.types'

import { getInitialGenericModalState } from '@/Common/Utils/UtilityFunctions'
import { rollback } from './RollbackButton.helpers'

import { Button } from '@/Common/Components/Button'
import { ErrorAndSuccess } from '@/Common/Components/ErrorAndSuccess'
import { LoadingModal } from '@/Common/Components/LoadingModal'
import { Modal } from '@/Common/Components/Modal'

type Props = {
  bIndex: number
  eventData: EventData
  setEventData: Updater<EventData>
}

/**
 * Rollback button for a bracket
 */
export const RollbackButton = (props: Props) => {
  const { bIndex, eventData, setEventData } = props

  const [rollbackState, setRollbackState] = useImmer(
    getInitialGenericModalState(GenericFormStatus.Success),
  )

  useEffect(() => {
    if (rollbackState.success.length > 0) {
      window.location.href = `/manage/event/${eventData.eventDetails.id}`
    }
  }, [rollbackState])

  const { activeRound } = eventData.brackets[bIndex]

  return (
    <>
      <div className="flex flex-col m-4">
        <ErrorAndSuccess
          error={rollbackState.error}
          success={rollbackState.success}
          clearMessageFn={() =>
            setRollbackState((draft) => {
              draft.error = ''
              draft.success = ''
            })
          }
        />

        {activeRound > 0 && (
          <Button
            variant="danger"
            className="max-w-xs"
            disabled={activeRound === 0}
            onClick={() =>
              setRollbackState((draft) => {
                draft.isModalVisible = true
              })
            }
          >
            Rollback Round
          </Button>
        )}
      </div>

      {rollbackState.status === GenericFormStatus.Loading && <LoadingModal />}

      {rollbackState.isModalVisible && (
        <Modal
          onClose={() =>
            setRollbackState((draft) => {
              draft.isModalVisible = false
            })
          }
          size="md"
        >
          <Dialog.Title
            as="h3"
            className="text-center text-xl font-medium text-black"
          >
            Are you sure you want to rollback to the previous round of the
            bracket?
          </Dialog.Title>
          <div className="flex flex-col items-center mt-4 ">
            <div>
              <Button
                className="ml-2"
                variant="danger"
                onClick={() =>
                  rollback(bIndex, eventData, setEventData, setRollbackState)
                }
              >
                Yes
              </Button>

              <Button
                className="ml-2"
                onClick={() =>
                  setRollbackState((draft) => {
                    draft.isModalVisible = false
                  })
                }
              >
                No
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  )
}
