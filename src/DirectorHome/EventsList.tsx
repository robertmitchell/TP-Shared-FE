import { useEffect, useState } from 'react'
import { useImmer } from 'use-immer'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'

import { EventListState } from './EventList.types'
import { fetchEventsData, getInitialEventData } from './EventList.helpers'
import { ErrorMessage } from '@/Common/Components/ErrorMessage'
import { EventItem } from './EventItem'

type Props = {
  directorID: string
}

export const EventsList = (props: Props) => {
  const { directorID } = props
  const [eventsData, setEventsData] = useImmer(getInitialEventData)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')

  useEffect(() => {
    fetchEventsData(directorID, setEventsData)
  }, [])

  switch (eventsData.status) {
    case EventListState.Loading:
      return <p className="text-center mt-10 text-gray-500">Loading events...</p>

    case EventListState.No_Events:
      return (
        <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
          <p className="text-gray-400 text-sm">No events yet.</p>
          <p className="text-gray-400 text-sm mt-1">Click "Create A New Event" to get started.</p>
        </div>
      )

    case EventListState.Success:
      const allEvents = eventsData.events
      const statuses = ['All', ...Array.from(new Set(allEvents.map(e => e.eventDetails.status)))]
      const filtered = allEvents.filter(e => {
        const matchSearch = e.eventDetails.name.toLowerCase().includes(search.toLowerCase())
        const matchFilter = filter === 'All' || e.eventDetails.status === filter
        return matchSearch && matchFilter
      })

      const totalParticipants = allEvents.reduce((sum, e) => sum + (e.eventDetails.numParticipants || 0), 0)
      const openCount = allEvents.filter(e => e.eventDetails.status === 'Open').length
      const inProgressCount = allEvents.filter(e => e.eventDetails.status === 'In Progress').length

      return (
        <div>
          {/* Summary cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            {[
              { label: 'Total Events', value: allEvents.length },
              { label: 'Open', value: openCount },
              { label: 'In Progress', value: inProgressCount },
              { label: 'Total Participants', value: totalParticipants },
            ].map(card => (
              <div key={card.label} className="bg-white rounded-xl border border-gray-200 px-4 py-3">
                <p className="text-xs text-gray-400 uppercase tracking-wide">{card.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{card.value}</p>
              </div>
            ))}
          </div>

          {/* Search + filter */}
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <div className="relative flex-1">
              <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search events..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {statuses.map(s => (
                <button
                  key={s}
                  onClick={() => setFilter(s)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                    filter === s
                      ? 'bg-amber-400 border-amber-400 text-black'
                      : 'bg-white border-gray-200 text-gray-600 hover:border-amber-400'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Event list */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            {filtered.length === 0
              ? <p className="text-center py-10 text-sm text-gray-400">No events match your search.</p>
              : filtered.map(event => (
                  <EventItem key={event.eventDetails.id} eventDetails={event.eventDetails} />
                ))
            }
          </div>
        </div>
      )

    case EventListState.Error:
      return <ErrorMessage>There was an error loading your events. {eventsData.error}</ErrorMessage>

    default:
      return <ErrorMessage>An unknown error occurred. Error Code: ELTSX_001</ErrorMessage>
  }
}