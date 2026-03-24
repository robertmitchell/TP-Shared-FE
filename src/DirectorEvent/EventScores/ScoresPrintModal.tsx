import { useRef } from 'react'
import { Dialog } from '@headlessui/react'
import { useReactToPrint } from 'react-to-print'
import type { Updater } from 'use-immer'

import type { EventData } from '@/Common/Common.types'

import { getPrintPageMargins } from '@/Common/Utils/getPrintPageMargins'

import { Button } from '@/Common/Components/Button'
import { Modal } from '@/Common/Components/Modal'
import { ScoresBody } from './ScoresBody'
import { ScoresHeader } from './ScoresHeader'

type Props = {
  eventData: EventData
  onClose: () => void
  setEventData: Updater<EventData>
}

/**
 * Shows the scores table in a modal for easy printing
 */
export const ScoresPrintModal = (props: Props) => {
  const { eventData, onClose, setEventData } = props

  const printRef = useRef(null)
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  })

  return (
    <Modal onClose={onClose}>
      <style>{getPrintPageMargins()}</style>

      <div>
        <Dialog.Title
          as="h3"
          className="text-center text-xl font-medium mb-2 text-black"
        >
          Scores
        </Dialog.Title>
      </div>

      <div className="flex justify-center items-end">
        <Button className="ml-2 mb-2" onClick={() => handlePrint()}>
          Print
        </Button>
      </div>

      <div ref={printRef}>
        <div className="shadow overflow-hidden border-b border-gray-200 rounded-lg mt-2 mb-4">
          <div className="table min-w-full divide-y divide-gray-200 pb-12 relative">
            <ScoresHeader eventData={eventData} showTotals />
            <ScoresBody
              filterTerm=""
              eventData={eventData}
              setEventData={setEventData}
              sortByNames={false}
              isPrintMode
              isPlayer={false}
              showTotals
            />
          </div>
        </div>
      </div>
    </Modal>
  )
}
