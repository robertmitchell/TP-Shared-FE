import { Dialog } from '@headlessui/react'
import { Updater } from 'use-immer'

import type { EventData } from '@/Common/Common.types'

import { getRefunds } from './NotShuffledConfirmationModal.helpers'

import { Button } from '@/Common/Components/Button'
import { Modal } from '@/Common/Components/Modal'
import { NotShuffledFormState } from './NotShuffled.types'

type Props = {
  bIndex: number
  onClose: () => void
  setFormState: Updater<NotShuffledFormState>
  updatedEventData: EventData
}

/**
 * After a bracket is shuffled shows a confirmation modal with the details
 * of how many refunds would be needed for each player
 */
export const NotShuffledConfirmationModal = (props: Props) => {
  const { bIndex, onClose, setFormState, updatedEventData } = props

  const { areTeamsEnabled } = updatedEventData.brackets[bIndex]
  const refunds = getRefunds(bIndex, updatedEventData)

  // TODO - SHOULD CHECK THAT THE BRACKETS WERE FILLED IN AS MANY PLACES AS CAN WITHOUT BYES
  return (
    <Modal onClose={onClose}>
      <Dialog.Title
        as="h3"
        className="text-center text-xl font-medium mb-2 text-black"
      >
        Confirm Bracket Shuffling
      </Dialog.Title>

      <div className="flex flex-col items-center">
        <h4 className="text-sm text-gray-400 mt-1 mb-6">
          (The following players will not be entered into the amount of brackets
          listed. Shuffling is random. You can try reshuffling to get different
          results.)
        </h4>
      </div>

      {refunds.length > 0 ? (
        <div className="shadow overflow-hidden border-b border-gray-200 rounded-lg mt-2 mb-4">
          <div className="table min-w-full divide-y divide-gray-200 pb-12 relative">
            <div className="table-header-group bg-black text-white text-center uppercase text-xs font-medium tracking-wider">
              <div className="table-row">
                <div className="table-cell p-3 border-r border-gray-200">
                  {areTeamsEnabled ? 'Team' : 'Player'} Name
                </div>

                <div className="table-cell p-3">Number of Refunds</div>
              </div>
            </div>

            {refunds.map((refund, rowIndex) => {
              const { name, numRefunds } = refund
              return (
                <div
                  key={rowIndex}
                  className={`table-row ${
                    rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-100'
                  }`}
                >
                  <div className="table-cell p-3 font-medium">{name}</div>
                  <div className="table-cell p-3 text-center">{numRefunds}</div>
                </div>
              )
            })}
          </div>
        </div>
      ) : (
        <h5 className="text-center text-lg text-black mb-2">
          No refunds needed. All players will be seeded into their requested
          number of brackets.
        </h5>
      )}

      <div className="flex justify-center mt-2">
        <Button onClick={() => console.log('this logic has been removed')}>
          Save and Shuffle
        </Button>

        <Button variant="secondary" className="ml-2" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </Modal>
  )
}
