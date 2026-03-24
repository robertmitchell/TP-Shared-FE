import { useRef } from 'react'
import { Dialog } from '@headlessui/react'
import { useReactToPrint } from 'react-to-print'
import { PaginatedList } from 'react-paginated-list'

import type { EventData } from '@/Common/Common.types'
import { SidePotType } from './TournamentForm.types'
import { TWENTY_FIVE_PER_PAGE } from './TournamentPlayerPots.constants'

import { getPrintPageMargins } from '@/Common/Utils/getPrintPageMargins'
import {
  getEnrolledPotPlayers,
  getSortedPlayerScores,
} from './TournamentPlayerPots.helpers'

import { Button } from '@/Common/Components/Button'
import { Modal } from '@/Common/Components/Modal'
import { PlayerInfo } from '@/Common/Components/Tables/PlayerInfo/PlayerInfo'

import {
  ControlContainer,
  TournamentTableContainer,
} from '@/Common/Utils/paginationStyles'

type Props = {
  eventData: EventData
  onClose: () => void
  sidePotType: SidePotType
  tIndex: number
}

/**
 * Side pots in a modal for easy printing
 */
export const SidePotPrintModal = (props: Props) => {
  const { eventData, onClose, sidePotType, tIndex } = props

  const printRef = useRef(null)
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  })

  const enrolledPlayers = getEnrolledPotPlayers(tIndex, eventData, sidePotType)
  const { basedOnPercent, basedOnScore, isHandicap, numRounds } =
    eventData.tournaments[tIndex]
  const roundArray = new Array(numRounds).fill(true)

  return (
    <Modal onClose={onClose}>
      <style>{getPrintPageMargins()}</style>

      <div>
        <Dialog.Title
          as="h3"
          className="text-center text-xl font-medium mb-2 text-black"
        >
          Print Pots
        </Dialog.Title>
      </div>

      <div className="flex justify-center items-end">
        <Button className="ml-2" onClick={() => handlePrint()}>
          Print
        </Button>
      </div>

      <div ref={printRef}>
        <div className="flex flex-col mt-4">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="flex overflow-hidden rounded-lg">
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
                      className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg mt-2 mb-4 mx-1"
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
      </div>
    </Modal>
  )
}
