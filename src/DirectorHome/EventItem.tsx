import {
  CalendarIcon,
  MapPinIcon,
  UsersIcon,
  ChevronRightIcon,
} from '@heroicons/react/20/solid'
import { Link } from 'react-router-dom'

import type { EventDetails } from '@/Common/Common.types'

import { getStatusColors } from '@/Common/Utils/UtilityFunctions'

type Props = {
  eventDetails: EventDetails
  isPlayer?: boolean
}

/**
 * A single event in the event list
 */
export const EventItem = (props: Props) => {
  const { eventDetails, isPlayer = false } = props

  const { date, id, location, name, numParticipants, status } = eventDetails

  const route = isPlayer ? `event/${id}` : `/manage/event/${id}`

  return (
    <Link to={route} state={eventDetails} className="block hover:bg-gray-50">
      <div className="px-4 py-4 sm:px-6">
        <div className="flex items-center justify-between">
          <p className="text-md flex font-medium text-black truncate items-center">
            {name}{' '}
            <ChevronRightIcon
              className="shrink-0 ml-1.5 h-6 w-5"
              aria-hidden="true"
            />
          </p>
          <div className="ml-2 shrink-0 flex">
            <p
              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColors(
                status,
              )}`}
            >
              {status}
            </p>
          </div>
        </div>
        <div className="mt-2 sm:flex sm:justify-between">
          <div className="sm:flex">
            <p className="flex items-center text-sm text-gray-500">
              <CalendarIcon
                className="shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              {date ? date : 'N/A'}
            </p>
            <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
              <MapPinIcon
                className="shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              {location ? location : 'N/A'}
            </p>
          </div>
          <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
            <UsersIcon
              className="shrink-0 mr-1.5 h-5 w-5 text-gray-400"
              aria-hidden="true"
            />

            <p>{numParticipants} participants</p>
          </div>
        </div>
      </div>
    </Link>
  )
}
