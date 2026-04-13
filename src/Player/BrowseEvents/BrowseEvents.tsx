import { useEffect, useState } from 'react'
import { useImmer } from 'use-immer'
import { Link } from 'react-router-dom'
import { MagnifyingGlassIcon, CalendarIcon, MapPinIcon, UsersIcon } from '@heroicons/react/20/solid'

import type { PlayerEventDetails } from '@/Common/Common.types'
import { fetchAllEvents, getFilteredEvents, getInitialSearchState } from './BrowseEvents.helpers'
import { checkLoginStatus } from '@/Common/Utils/checkLoginStatus'
import { LoadingModal } from '@/Common/Components/LoadingModal'
import { getStatusColors } from '@/Common/Utils/UtilityFunctions'

const STATUS_TABS = ['Past Events', "Today's Events", 'Upcoming Events']

const LiveBadge = ({ status }: { status: string }) => {
  if (status === 'In Progress') {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-bold rounded-full bg-red-100 text-red-600">
        <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
        LIVE
      </span>
    )
  }
  return (
    <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${getStatusColors(status)}`}>
      {status}
    </span>
  )
}

export const BrowseEvents = () => {
  const [state, setState] = useImmer(getInitialSearchState)
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredEvents, setFilteredEvents] = useState<PlayerEventDetails[]>([])
  const [selectedTab, setSelectedTab] = useState(1)

  useEffect(() => { checkLoginStatus(false) }, [])
  useEffect(() => { fetchAllEvents(setState) }, [])
  useEffect(() => {
    setFilteredEvents(getFilteredEvents(state.events, searchTerm, selectedTab))
  }, [selectedTab, state.events])

  const featuredEvent = filteredEvents[0]
  const restEvents = filteredEvents.slice(1)

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Top bar */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <Link
          to="/home/"
          className="text-sm text-gray-500 hover:text-amber-600 transition-colors"
        >
          ← Back to Dashboard
        </Link>
        <h1 className="text-lg font-bold text-gray-900">Event Discovery</h1>
        <div className="w-24" />
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Search */}
        <div className="relative mb-6">
          <MagnifyingGlassIcon className="absolute left-4 top-3 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search events by name..."
            value={searchTerm}
            onChange={(e) => {
              setFilteredEvents(getFilteredEvents(state.events, e.target.value, selectedTab))
              setSearchTerm(e.target.value)
            }}
            className="w-full pl-11 pr-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white"
          />
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          {STATUS_TABS.map((tab, i) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(i)}
              className={`px-4 py-2 text-sm font-medium rounded-lg border transition-colors ${
                selectedTab === i
                  ? 'bg-amber-400 border-amber-400 text-black'
                  : 'bg-white border-gray-200 text-gray-600 hover:border-amber-400'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Featured event */}
        {featuredEvent && (
          <div className="mb-6">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Featured Event</p>
            <Link
              to={`event/${featuredEvent.id}`}
              state={featuredEvent}
              className="block bg-gradient-to-r from-gray-900 to-gray-700 rounded-2xl p-6 hover:from-gray-800 transition-all group"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold text-white mb-1">{featuredEvent.name}</h2>
                  <LiveBadge status={featuredEvent.status} />
                </div>
                <span className="text-amber-400 text-sm font-medium group-hover:underline">
                  View Event →
                </span>
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                <span className="flex items-center gap-1.5">
                  <CalendarIcon className="h-4 w-4" />
                  {featuredEvent.date || 'TBD'}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPinIcon className="h-4 w-4" />
                  {featuredEvent.location || 'TBD'}
                </span>
                <span className="flex items-center gap-1.5">
                  <UsersIcon className="h-4 w-4" />
                  {featuredEvent.numParticipants} participants
                </span>
              </div>
            </Link>
          </div>
        )}

        {/* Event list */}
        {restEvents.length > 0 && (
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">All Events</p>
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              {restEvents.map((event) => (
                <Link
                  key={event.id}
                  to={`event/${event.id}`}
                  state={event}
                  className="flex items-start justify-between px-6 py-4 border-b border-gray-100 last:border-0 hover:bg-amber-50 transition-colors group"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1.5">
                      <p className="text-sm font-semibold text-gray-900 group-hover:text-amber-600 transition-colors truncate">
                        {event.name}
                      </p>
                      <LiveBadge status={event.status} />
                    </div>
                    <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <CalendarIcon className="h-3.5 w-3.5 text-gray-400" />
                        {event.date || 'TBD'}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPinIcon className="h-3.5 w-3.5 text-gray-400" />
                        {event.location || 'TBD'}
                      </span>
                      <span className="flex items-center gap-1">
                        <UsersIcon className="h-3.5 w-3.5 text-gray-400" />
                        {event.numParticipants} participants
                      </span>
                    </div>
                  </div>
                  <span className="shrink-0 ml-4 text-xs font-medium text-amber-600 group-hover:underline self-center">
                    {event.status === 'Open' ? 'Join Event →' : 'View Event →'}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Empty state */}
        {filteredEvents.length === 0 && !state.loading && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="h-14 w-14 rounded-full bg-gray-100 flex items-center justify-center mb-4">
              <MagnifyingGlassIcon className="h-7 w-7 text-gray-400" />
            </div>
            <h3 className="text-base font-semibold text-gray-900 mb-1">No events found</h3>
            <p className="text-sm text-gray-500 max-w-xs">
              No events available right now — check back soon or try a different filter.
            </p>
          </div>
        )}
      </div>

      {state.loading && <LoadingModal displayText="Loading events..." />}
    </div>
  )
}