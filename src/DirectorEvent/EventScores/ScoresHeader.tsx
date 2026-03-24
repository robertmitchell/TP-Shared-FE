import type { EventData } from '@/Common/Common.types'

type Props = {
  eventData: EventData
  showTotals: boolean
}

/**
 * Displays the headers for the scores table
 */
export const ScoresHeader = (props: Props) => {
  const { eventData, showTotals } = props

  return (
    <div className="table-header-group bg-black text-white text-center uppercase text-xs font-medium tracking-wider">
      <div className="table-row">
        <div className="table-cell p-3">Player Name</div>
        {eventData.games.map((game) => (
          <div key={game.id} className="table-cell p-3">
            {game.name}
          </div>
        ))}

        {showTotals && <div className="table-cell p-3">Total</div>}
      </div>
    </div>
  )
}
