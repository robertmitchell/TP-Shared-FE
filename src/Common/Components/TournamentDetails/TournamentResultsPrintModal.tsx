import { useRef, useState } from 'react'
import { Dialog } from '@headlessui/react'
import { useReactToPrint } from 'react-to-print'

import { EventData } from '@/Common/Common.types'

import { getPrintPageMargins } from '@/Common/Utils/getPrintPageMargins'

import { Button } from '@/Common/Components/Button'
import { Modal } from '@/Common/Components/Modal'
import { TextInput } from '@/Common/Components/TextInput'
import { TournamentPlayers } from './TournamentPlayers'
import { TournamentTeams } from './TournamentTeams'

type Props = {
  eventData: EventData
  onClose: () => void
  tIndex: number
}

/**
 * Shows the Tournament results in a modal for easy printing
 */
export const TournamentResultsPrintModal = (props: Props) => {
  const { eventData, onClose, tIndex } = props

  const [numResults, setNumResults] = useState(25)

  const printRef = useRef(null)
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  })

  return (
    <Modal onClose={onClose}>
      <div>
        <Dialog.Title
          as="h3"
          className="text-center text-xl font-medium mb-2 text-black"
        >
          Tournament Results
        </Dialog.Title>
      </div>

      <div className="flex justify-center items-end">
        <TextInput
          type="number"
          isEditing
          labelText="Number of results per page"
          value={numResults}
          onChange={(e) => setNumResults(e.target.valueAsNumber || 1)}
        />
        <Button className="ml-2" onClick={() => handlePrint()}>
          Print
        </Button>
      </div>

      <div ref={printRef}>
        <style>{getPrintPageMargins()}</style>

        {eventData.tournaments[tIndex].areTeamsEnabled ? (
          <TournamentTeams eventData={eventData} isPrinting tIndex={tIndex} />
        ) : (
          <TournamentPlayers
            eventData={eventData}
            isPrinting
            numResults={numResults}
            tIndex={tIndex}
          />
        )}
      </div>
    </Modal>
  )
}
