import type { EventData } from '../../Common/Common.types'
import { TrophyIcon } from '@heroicons/react/24/outline'
import { GamesList } from './GamesList'

type Props = {
  eventData: EventData
  isPlayer?: boolean
}

export const EventGames = (props: Props) => {
  const { eventData, isPlayer = false } = props

  const hasGames = eventData.tournaments?.length > 0 || eventData.brackets?.length > 0

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 mt-4">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-900">Event Games</h3>
        {!isPlayer && (
          <p className="text-sm text-gray-500 mt-0.5">
            Click a game to update its status.
          </p>
        )}
      </div>

      {!hasGames ? (
        <div className="flex flex-col items-center justify-center py-16 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50">
          <div className="flex items-center justify-center h-14 w-14 rounded-full bg-gray-100 mb-4">
            <TrophyIcon className="h-7 w-7 text-gray-400" />
          </div>
          <h4 className="text-base font-semibold text-gray-900 mb-1">No games yet</h4>
          <p className="text-sm text-gray-500 text-center max-w-xs">
            Set up your tournament or bracket structure first to generate games.
          </p>
        </div>
      ) : (
        <GamesList eventData={eventData} isPlayer={isPlayer} />
      )}
    </div>
  )
}