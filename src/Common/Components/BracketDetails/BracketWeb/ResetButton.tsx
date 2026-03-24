import { useEffect } from 'react'
import { Dialog } from '@headlessui/react'
import { useImmer } from 'use-immer'

import type { EventData } from '@/Common/Common.types'

import { getInitialResetState, resetBracket } from './ResetButton.helpers'

import { Button } from '@/Common/Components/Button'
import { ErrorAndSuccess } from '@/Common/Components/ErrorAndSuccess'
import { LoadingModal } from '@/Common/Components/LoadingModal'
import { Modal } from '@/Common/Components/Modal'

type Props = {
  bIndex: number
  eventData: EventData
}

/**
 * Reset button for a bracket
 */
export const ResetButton = (props: Props) => {
  const { bIndex, eventData } = props

  const [resetState, setResetState] = useImmer(getInitialResetState)

  useEffect(() => {
    if (resetState.success.length > 0) {
      window.location.href = `/manage/event/${eventData.eventDetails.id}`
    }
  }, [resetState])

  return (
    <>
      <div className="flex flex-col mt-4">
        <ErrorAndSuccess
          error={resetState.error}
          success={resetState.success}
          clearMessageFn={() =>
            setResetState((draft) => {
              draft.error = ''
              draft.success = ''
            })
          }
        />

        <Button
          variant="danger"
          className="max-w-xs"
          onClick={() =>
            setResetState((draft) => {
              draft.warningModalVisible = true
            })
          }
        >
          Reset Bracket
        </Button>
      </div>

      {resetState.loading && <LoadingModal />}

      {resetState.warningModalVisible && (
        <Modal
          onClose={() =>
            setResetState((draft) => {
              draft.warningModalVisible = false
            })
          }
          size="md"
        >
          <Dialog.Title
            as="h3"
            className="text-center text-xl font-medium text-black"
          >
            Are you sure you want to reset the bracket?
          </Dialog.Title>
          <div className="flex flex-col items-center mt-4 ">
            <div>
              <Button
                className="ml-2"
                variant="danger"
                onClick={() => resetBracket(bIndex, eventData, setResetState)}
              >
                Yes
              </Button>

              <Button
                className="ml-2"
                onClick={() =>
                  setResetState((draft) => {
                    draft.warningModalVisible = false
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
