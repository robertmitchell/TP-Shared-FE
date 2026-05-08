import type { EventData } from '../../Common/Common.types'

import { GamesList } from './GamesList'

type Props = {
  eventData: EventData
  isPlayer?: boolean
}

export const EventGames = (props: Props) => {
  const { eventData, isPlayer = false } = props

  return (
    <div className="bg-white drop-shadow-md rounded-md p-0 sm:rounded-lg sm:p-6">
      <div className="flex flex-col pb-6">
        <div className="items-center mb-4">
          <h3 className="flex text-lg font-medium leading-6 text-gray-900">
            Event Games
          </h3>
          {!isPlayer && (
            <span className="flex mt-1 text-sm text-gray-500 italic mb-4">
              Click the Game to change its status.
            </span>
          )}
        </div>
      </div>

      <GamesList eventData={eventData} isPlayer={isPlayer} />
    </div>
  )
}
