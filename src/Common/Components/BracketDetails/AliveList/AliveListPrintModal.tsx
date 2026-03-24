import { useRef } from 'react'
import { Dialog } from '@headlessui/react'
import { useReactToPrint } from 'react-to-print'

import { EventData } from '@/Common/Common.types'

import { getPrintPageMargins } from '@/Common/Utils/getPrintPageMargins'

import { AliveListTable } from './AliveListTable'
import { Button } from '@/Common/Components/Button'
import { Modal } from '@/Common/Components/Modal'

type Props = {
  bIndex: number
  eventData: EventData
  onClose: () => void
}

/**
 * Shows the Alive List in a modal for easy printing
 */
export const AliveListPrintModal = (props: Props) => {
  const { bIndex, eventData, onClose } = props

  const printRef = useRef(null)
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  })

  return (
    <Modal onClose={onClose} padding="sm">
      <style>{getPrintPageMargins()}</style>

      <Dialog.Title
        as="h3"
        className="text-center text-xl font-medium text-black"
      >
        Alive List
      </Dialog.Title>

      <h4 className="text-xs text-gray-400 text-center my-2">
        (You may need to scroll to see the full table depending on device size)
      </h4>

      <div className="flex justify-center items-end">
        <Button className="ml-2" onClick={() => handlePrint()}>
          Print
        </Button>
      </div>

      <div ref={printRef}>
        <AliveListTable
          bIndex={bIndex}
          eventData={eventData}
          showAmountDue
          showCollected
        />
      </div>
    </Modal>
  )
}
