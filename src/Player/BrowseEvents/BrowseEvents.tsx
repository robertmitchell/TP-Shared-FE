import { useEffect, useState } from 'react'
import { useImmer } from 'use-immer'

import type { PlayerEventDetails } from '@/Common/Common.types'

import {
  fetchAllEvents,
  getFilteredEvents,
  getInitialSearchState,
} from './BrowseEvents.helpers'
import { checkLoginStatus } from '@/Common/Utils/checkLoginStatus'

import { Button } from '@/Common/Components/Button'
import { EventItem } from '@/DirectorHome/EventItem'
import { Link } from 'react-router-dom'
import { LoadingModal } from '@/Common/Components/LoadingModal'
import { TextInput } from '@/Common/Components/TextInput'

/**
 * Entrypoint for the browse events page
 */
export const BrowseEvents = () => {
  const [state, setState] = useImmer(getInitialSearchState)
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredEvents, setFilteredEvents] = useState<PlayerEventDetails[]>([])
  const [selectedTab, setSelectedTab] = useState(1)

  useEffect(() => {
    checkLoginStatus(false)
  }, [])

  // Gets all events on page load
  useEffect(() => {
    fetchAllEvents(setState)
  }, [])

  // Updates the filtered events if the events changes
  useEffect(() => {
    setFilteredEvents(getFilteredEvents(state.events, searchTerm, selectedTab))
  }, [selectedTab, state.events])

  return (
    <main className="px-20 bg-white shadow overflow-hidden rounded-md">
      <Button className="mx-auto mt-4">
        <Link to="/home/">Back to Dashboard</Link>
      </Button>

      <h1 className="text-center my-5 text-2xl font-medium">
        Search for events
      </h1>

      <div className="flex justify-center items-center">
        <TextInput
          isEditing
          className="mr-2 w-80"
          labelText="Find a specific Event"
          placeholder="Enter an Event's name"
          value={searchTerm}
          onChange={(e) => {
            setFilteredEvents(
              getFilteredEvents(state.events, e.target.value, selectedTab),
            )
            setSearchTerm(e.target.value)
          }}
        />
      </div>

      <div className="flex flex-wrap justify-center my-2">
        <Button
          className="m-2"
          onClick={() => setSelectedTab(0)}
          variant={selectedTab === 0 ? 'primary' : 'secondary'}
        >
          Past Events
        </Button>
        <Button
          className="m-2"
          onClick={() => setSelectedTab(1)}
          variant={selectedTab === 1 ? 'primary' : 'secondary'}
        >
          Today's Events
        </Button>
        <Button
          className="m-2"
          onClick={() => setSelectedTab(2)}
          variant={selectedTab === 2 ? 'primary' : 'secondary'}
        >
          Upcoming Events
        </Button>
      </div>

      <ul role="list" className="mt-2 divide-y divide-gray-200">
        {filteredEvents.map((event) => (
          <li key={event.id}>
            <EventItem isPlayer eventDetails={event} />
          </li>
        ))}
      </ul>

      {state.loading && (
        <LoadingModal displayText="Searching for events please wait..." />
      )}
    </main>
  )
}
