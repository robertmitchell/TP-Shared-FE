import type { TournamentPlayer } from './TournamentForm.types'

import LOGO from '@/assets/logo.png'

type Props = {
  rowIndex: number
  winner: TournamentPlayer
}

/**
 * Table row for a player in an ended Match Play Tournament
 */
export const MPRow = (props: Props) => {
  const { rowIndex, winner } = props

  const { email, firstName, isMale, lastName, photo } = winner
  const gender = isMale ? '(M)' : '(F)'

  return (
    <div
      className={`table-row ${rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-100'}`}
    >
      <div className="table-cell p-3 text-sm whitespace-nowrap border-r border-gray-200">
        <div className="flex items-center">
          {/* <div className="flex-shrink-0 h-10 w-10">
            <img
              className="h-10 w-10 rounded-full"
              src={photo || LOGO}
              alt="Player photo"
            />
          </div> */}

          <div className="ml-4">
            <div className="font-medium text-gray-900">
              {gender} {firstName} {lastName}
            </div>
            <div className="text-gray-500">{email}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
