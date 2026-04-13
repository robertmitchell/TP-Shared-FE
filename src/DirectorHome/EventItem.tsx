import { CalendarIcon, MapPinIcon, UsersIcon } from '@heroicons/react/20/solid'
import { Link } from 'react-router-dom'

import type { EventDetails } from '@/Common/Common.types'
import { getStatusColors } from '@/Common/Utils/UtilityFunctions'

type Props = {
  eventDetails: EventDetails
  isPlayer?: boolean
}

export const EventItem = (props: Props) => {
  const { eventDetails, isPlayer = false } = props
  const { date, id, location, name, numParticipants, status } = eventDetails
  const route = isPlayer ? `event/${id}` : `/manage/event/${id}`

  return (
    <Link to={route} state={eventDetails} className="block group cursor-pointer">
      <div className="px-6 py-5 hover:bg-amber-50 hover:shadow-sm transition-all duration-150 border-b border-gray-100 last:border-0">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <p className="text-base font-bold text-gray-900 group-hover:text-amber-600 transition-colors truncate">
                {name}
              </p>
              <span className={`shrink-0 px-2 py-0.5 text-xs font-semibold rounded-full ${getStatusColors(status)}`}>
                {status}
              </span>
            </div>
            <div className="flex flex-wrap gap-4 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <CalendarIcon className="h-3.5 w-3.5 text-gray-400" />
                {date || 'No date set'}
              </span>
              <span className="flex items-center gap-1">
                <MapPinIcon className="h-3.5 w-3.5 text-gray-400" />
                {location || 'No location set'}
              </span>
              <span className="flex items-center gap-1">
                <UsersIcon className="h-3.5 w-3.5 text-gray-400" />
                {numParticipants} participants
              </span>
            </div>
          </div>
          <div className="shrink-0 flex items-center">
            <span className="hidden sm:inline text-xs font-medium text-amber-600 group-hover:underline">
              Manage →
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}