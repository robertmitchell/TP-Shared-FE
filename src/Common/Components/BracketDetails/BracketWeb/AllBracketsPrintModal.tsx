import { useEffect, useRef, useState } from 'react'
import { Dialog } from '@headlessui/react'
import { useReactToPrint } from 'react-to-print'

import type { BracketWeb } from '../BracketForm.types'
import type { EventData } from '@/Common/Common.types'

import { getPrintPageMargins } from '@/Common/Utils/getPrintPageMargins'

import { Button } from '@/Common/Components/Button'
import { Modal } from '@/Common/Components/Modal'
import { TextInput } from '@/Common/Components/TextInput'
import { Web } from './Web'

type Props = {
  bIndex: number
  eventData: EventData
  onClose: () => void
}

/**
 * All brackets in a modal for easy printing
 */
export const AllBracketsPrintModal = (props: Props) => {
  const { bIndex, eventData, onClose } = props

  const printRef = useRef(null)
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  })

  const bracketWebs = eventData.brackets[bIndex].bracketWebs

  const [startIndex, setStartIndex] = useState(0)
  const [endIndex, setEndIndex] = useState(bracketWebs.length - 1)
  const [filteredWebs, setFilteredWebs] = useState(bracketWebs)

  // Updates the brackets displayed to match from and to
  useEffect(() => {
    const updatedWebs: BracketWeb[] = []

    for (let i = startIndex; i <= endIndex; i++) {
      updatedWebs.push(bracketWebs[i])
    }
    setFilteredWebs(updatedWebs)
  }, [startIndex, endIndex])

  return (
    <Modal onClose={onClose}>
      <style>{getPrintPageMargins()}</style>

      <div>
        <Dialog.Title
          as="h3"
          className="text-center text-xl font-medium mb-2 text-black"
        >
          Print Brackets
        </Dialog.Title>
      </div>

      <div className="grid grid-cols-6 gap-6 my-4 mx-2 sm:mx-0 border-t-2">
        <TextInput
          isEditing
          type="number"
          className="mb-0"
          labelText="From"
          tooltipText='Must be greater than 0 and less than the "To" value'
          value={startIndex + 1}
          onChange={(e) => {
            if (e.currentTarget.valueAsNumber <= 0) {
              setStartIndex(0)
            } else if (e.currentTarget.valueAsNumber > bracketWebs.length - 1) {
              setStartIndex(bracketWebs.length - 1)
            } else {
              setStartIndex(e.currentTarget.valueAsNumber - 1)
            }
          }}
        />
        <TextInput
          isEditing
          type="number"
          className="mb-0"
          labelText="To"
          tooltipText={`Must be greater than the "From" value and less than ${bracketWebs.length}`}
          value={endIndex + 1}
          onChange={(e) => {
            if (e.currentTarget.valueAsNumber <= 0) {
              setStartIndex(0)
            } else if (e.currentTarget.valueAsNumber > bracketWebs.length - 1) {
              setStartIndex(bracketWebs.length - 1)
            } else {
              setEndIndex(e.currentTarget.valueAsNumber - 1)
            }
          }}
        />
      </div>

      <div className="flex justify-center items-end">
        <Button className="ml-2" onClick={() => handlePrint()}>
          Print
        </Button>
      </div>

      <div ref={printRef}>
        {filteredWebs.map((bracketWeb, index) => (
          <div key={`${bracketWeb.id}_${index}`}>
            <h2 className="text-3xl font-medium text-black text-center px-4">
              Bracket: {index + 1 + startIndex}
            </h2>

            <Web
              eventBracket={eventData.brackets[bIndex]}
              bracketWeb={bracketWeb}
              displayedIndex={index}
              eventData={eventData}
            />
          </div>
        ))}
      </div>
    </Modal>
  )
}
