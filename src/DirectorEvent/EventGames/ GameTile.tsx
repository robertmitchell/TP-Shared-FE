import { useState } from 'react'
import cn from 'classnames'

import type { EventData } from '@/Common/Common.types'

import { getStatusColors } from '@/Common/Utils/UtilityFunctions'

import { Modal } from '@/Common/Components/Modal'
import { Title } from './Title'
import { Body } from './Body'

type Props = {
  eventData: EventData
  index: number
  isPlayer: boolean
}

export const GameTile = (props: Props) => {
  const { eventData, index, isPlayer } = props

  const [isGameModalOpen, setIsGameModalOpen] = useState(false)

  const game = eventData.games[index]

  return (
    <>
      <button
        className={cn(
          'flex flex-col text-center rounded-lg shadow divide-y divide-gray-200',
          getStatusColors(game.status),
          { 'cursor-default': isPlayer },
        )}
        onClick={() => {
          if (isPlayer) {
            return
          }
          setIsGameModalOpen(true)
        }}
      >
        <div className="flex-1 flex flex-col px-4 py-2">
          <h3 className="mt-6 text-gray-900 text-sm font-medium">
            {game.name}
          </h3>
          <dl
            className={`mt-1 flex-grow flex flex-col justify-between ${getStatusColors(
              game.status,
            )}`}
          >
            <dt className="sr-only">Average</dt>
            <dd className="text-gray-500 text-sm">{game.status}</dd>
          </dl>
        </div>
      </button>

      {isGameModalOpen && (
        <Modal size="md" onClose={() => setIsGameModalOpen(false)}>
          <Title status={eventData.games[index].status} />
          <Body
            index={index}
            eventData={eventData}
            setIsGameModalOpen={setIsGameModalOpen}
          />
        </Modal>
      )}
    </>
  )
}
