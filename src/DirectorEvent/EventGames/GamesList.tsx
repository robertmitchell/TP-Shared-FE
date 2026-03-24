import type { EventData } from '@/Common/Common.types'

import { GameTile } from './ GameTile'

type Props = {
  eventData: EventData
  isPlayer: boolean
}

export const GamesList = (props: Props) => {
  const { eventData, isPlayer } = props

  return (
    <main>
      <ul
        role="list"
        className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-10"
      >
        {eventData.games.map((game, index) => (
          <GameTile
            key={game.id}
            index={index}
            eventData={eventData}
            isPlayer={isPlayer}
          />
        ))}
      </ul>
    </main>
  )
}
