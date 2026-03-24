import { useState } from 'react'
import { PaginatedList } from 'react-paginated-list'

import type { EventData } from '@/Common/Common.types'
import { SidePotType } from './TournamentForm.types'
import { TWENTY_FIVE_PER_PAGE } from './TournamentPlayerPots.constants'

import {
  getEnrolledPotPlayers,
  getSortedPlayerScores,
} from './TournamentPlayerPots.helpers'
import { PlayerInfo } from '@/Common/Components/Tables/PlayerInfo/PlayerInfo'

import { Button } from '@/Common/Components/Button'
import { SidePotPrintModal } from './SidePotPrintModal'

import {
  ControlContainer,
  TournamentTableContainer,
} from '@/Common/Utils/paginationStyles'

type Props = {
  eventData: EventData
  tIndex: number
}

/**
 * Displays the pots for singles tournaments
 */
export const TournamentPlayerPots = (props: Props) => {
  const { eventData, tIndex } = props

  const hasPots =
    eventData.tournaments[tIndex].sidePots &&
    ((eventData.tournaments[tIndex].sidePots.highPot &&
      eventData.tournaments[tIndex].sidePots.highPot.enabled) ||
      (eventData.tournaments[tIndex].sidePots.lowPot &&
        eventData.tournaments[tIndex].sidePots.lowPot.enabled))

  if (!hasPots) {
    return (
      <h3 className="text-lg text-center mt-2 text-red-600">
        There are no pots added to this tournament.
      </h3>
    )
  }

  const [sidePotType, setSidePotType] = useState(SidePotType.HIGH_POT)
  const [showPrintModal, setShowPrintModal] = useState(false)

  const enrolledPlayers = getEnrolledPotPlayers(tIndex, eventData, sidePotType)
  const { basedOnPercent, basedOnScore, isHandicap, numRounds } =
    eventData.tournaments[tIndex]
  const roundArray = new Array(numRounds).fill(true)

  return (
    <section className="my-4">
      <h3 className="flex mb-2 text-lg font-medium leading-6 text-gray-900 ml-2 sm:ml-0">
        Displaying {sidePotType}
      </h3>
      <h4 className="flex mt-1 text-sm text-gray-500 italic ml-2 sm:ml-0">
        {enrolledPlayers.length} players entered
      </h4>

      <Button
        className="mr-2 my-2 ml-2 sm:ml-0"
        onClick={() => setShowPrintModal(true)}
      >
        Print Pot
      </Button>

      <Button
        disabled={sidePotType === SidePotType.HIGH_POT}
        onClick={() => setSidePotType(SidePotType.HIGH_POT)}
      >
        Show High Pot
      </Button>

      <Button
        className="mx-2"
        disabled={sidePotType === SidePotType.LOW_POT}
        onClick={() => setSidePotType(SidePotType.LOW_POT)}
      >
        Show Low Pot
      </Button>

      <div className="flex flex-col mt-4">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="flex shadow overflow-hidden border-b border-gray-200 rounded-lg">
              {roundArray.map((_round, roundIndex) => {
                const sortedPlayers = getSortedPlayerScores(
                  tIndex,
                  enrolledPlayers,
                  eventData,
                  roundIndex,
                  sidePotType,
                )

                return (
                  <div
                    className="shadow overflow-hidden border-b border-gray-200 rounded-lg mt-2 mb-4 mx-1"
                    key={roundIndex}
                  >
                    <div className="table min-w-full divide-y divide-gray-200 pb-12 relative">
                      <div className="table-header-group bg-black text-white text-center uppercase text-xs font-medium tracking-wider">
                        <div className="table-row">
                          <div className="table-cell p-3 border-r border-gray-200">
                            Game {roundIndex + 1}
                          </div>
                          <div className="table-cell p-3">Scores</div>
                        </div>
                      </div>
                      <PaginatedList
                        list={sortedPlayers}
                        itemsPerPage={TWENTY_FIVE_PER_PAGE}
                        useMinimalControls
                        displayNumbers={
                          sortedPlayers.length > TWENTY_FIVE_PER_PAGE
                        }
                        PaginatedListContainer={TournamentTableContainer}
                        ControlContainer={ControlContainer}
                        renderList={(list) => (
                          <>
                            {list.map((potPlayer, rowIndex) => {
                              const { player, score } = potPlayer

                              return (
                                <div
                                  key={player.id}
                                  className={`table-row ${
                                    rowIndex % 2 === 0
                                      ? 'bg-white'
                                      : 'bg-gray-100'
                                  }`}
                                >
                                  <PlayerInfo
                                    basedOnPercent={basedOnPercent}
                                    basedOnScore={basedOnScore}
                                    gameScore={score}
                                    isHandicap={isHandicap}
                                    player={player}
                                  />
                                </div>
                              )
                            })}
                          </>
                        )}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {showPrintModal && (
        <SidePotPrintModal
          onClose={() => setShowPrintModal(false)}
          sidePotType={sidePotType}
          tIndex={tIndex}
          eventData={eventData}
        />
      )}
    </section>
  )
}
