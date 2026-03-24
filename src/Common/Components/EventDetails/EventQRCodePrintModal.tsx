import { useRef } from 'react'
import { Dialog } from '@headlessui/react'
import { useReactToPrint } from 'react-to-print'
import QRCode from 'react-qr-code'

import { getPrintPageMargins } from '@/Common/Utils/getPrintPageMargins'

import { Button } from '@/Common/Components/Button'
import { Modal } from '@/Common/Components/Modal'

type Props = {
  onClose: () => void
  qrCodeString: string
}

/**
 * Shows the Event's QR Code in a modal for easy printing
 */
export const EventQRCodePrintModal = (props: Props) => {
  const { onClose, qrCodeString } = props

  const printRef = useRef(null)
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  })

  return (
    <Modal onClose={onClose}>
      <style>{getPrintPageMargins()}</style>

      <Dialog.Title
        as="h3"
        className="text-center text-xl font-medium mb-2 text-black"
      >
        Event QR Code
      </Dialog.Title>

      <div ref={printRef}>
        <div className="flex flex-col items-center">
          <p className="text-xl font-medium">
            PLAYERS: Scan this QR code to open this event directly.
          </p>
          <p className="mb-2 text-sm text-red-600 font-medium">
            NOTE: You must be logged into the website before scanning.
          </p>
          <QRCode className="mb-6" size={400} value={qrCodeString} />
        </div>
      </div>

      <Button className="ml-2" onClick={() => handlePrint()}>
        Print
      </Button>
    </Modal>
  )
}
