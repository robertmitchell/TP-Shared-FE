import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { useImmer } from 'use-immer'

import { GenericStatus, EventData, SetState } from '@/Common/Common.types'

import { updateGameStatus } from './Body.helpers'
import { getInitialGenericFormState } from '@/Common/Utils/UtilityFunctions'

import { Button } from '@/Common/Components/Button'
import { Modal } from '@/Common/Components/Modal'
import { ErrorAndSuccess } from '@/Common/Components/ErrorAndSuccess'

type Props = {
  eventData: EventData
  index: number
  setIsGameModalOpen: SetState<boolean>
}

export const Body = (props: Props) => {
  const { eventData, index, setIsGameModalOpen } = props

  const [formState, setFormState] = useImmer(getInitialGenericFormState)
  const [isModalVisible, setIsModalVisible] = useState(false)

  const game = eventData.games[index]

  switch (game.status) {
    case GenericStatus.Open:
      return (
        <div>
          <h4 className="text-center">
            When all players are added, start the game.
          </h4>
          <div className="mt-5 sm:mt-6 flex justify-center">
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

            <Button
              className="w-80 justify-center"
              variant="danger"
              onClick={() =>
                updateGameStatus(
                  index,
                  eventData,
                  GenericStatus.In_Progress,
                  setFormState,
                  setIsGameModalOpen,
                )
              }
            >
              Start Game
            </Button>
          </div>
        </div>
      )

    case GenericStatus.In_Progress:
      return (
        <div>
          <h4 className="text-center">
            When all scores are added, end the game.
          </h4>
          <div className="mt-5 sm:mt-6 flex justify-center">
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

            <Button
              className="w-80"
              variant="danger"
              onClick={() => setIsModalVisible(true)}
            >
              End Game
            </Button>
          </div>

          {isModalVisible && (
            <Modal onClose={() => setIsModalVisible(false)}>
              <div className="flex flex-col items-center">
                <Dialog.Title
                  as="h3"
                  className="text-center text-xl font-medium mb-2 text-black"
                >
                  Are you sure you want to end the game?
                </Dialog.Title>

                <Button
                  className="w-80"
                  variant="danger"
                  onClick={() =>
                    updateGameStatus(
                      index,
                      eventData,
                      GenericStatus.Closed,
                      setFormState,
                      setIsGameModalOpen,
                    )
                  }
                >
                  End Game
                </Button>
              </div>
            </Modal>
          )}
        </div>
      )

    case GenericStatus.Closed:
    default:
      return null
  }
}
