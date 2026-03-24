import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Dialog } from '@headlessui/react'
import { QrReader } from 'react-qr-reader'

import type { Player } from '@/Common/Common.types'

import { buildPlayerFromQRData } from './QRModal.helpers'

import { Modal } from '@/Common/Components/Modal'

type Props = {
  onClose: () => void
  setPlayerData: Dispatch<SetStateAction<Player>>
}

/**
 * Modal for scanning a player's QR Code
 */
export const QRModal = (props: Props) => {
  const { onClose, setPlayerData } = props

  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  // Close the modal after scanning
  useEffect(() => {
    if (success) {
      onClose()
    }
  }, [success])

  return (
    <Modal onClose={onClose}>
      <Dialog.Title
        as="h3"
        className="text-center text-xl font-medium mb-2 text-black"
      >
        Scan a player's QR code to enroll them
      </Dialog.Title>

      {error.length > 0 && (
        <p className="text-red-600 my-4">
          There was an error scanning the QR code. Please refresh and try again.
          Error Code: QRMTSX_001
        </p>
      )}

      <QrReader
        constraints={{ facingMode: { ideal: 'environment' } }}
        onResult={(result, error) => {
          if (!!result) {
            const data = JSON.parse(result?.getText())
            data.id = data.userId

            const updatedPlayer = buildPlayerFromQRData(data)

            setPlayerData(updatedPlayer)
            setSuccess(true)
          }

          if (!!error && JSON.stringify(error) !== JSON.stringify({})) {
            console.error(error)
            setError(error.message)
          }
        }}
      />
    </Modal>
  )
}
