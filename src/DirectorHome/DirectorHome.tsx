import { useEffect, useState } from 'react'
import { getAnalytics, logEvent } from 'firebase/analytics'
import { Bars3Icon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'

import { DirectorHomeStatus } from './DirectorHome.types'

import { checkLoginStatus } from '@/Common/Utils/checkLoginStatus'
import {
  fetchDirectorData,
  getInitialDirectorData,
} from '@/Common/Utils/getDirectorInfo'

import { ErrorMessage } from '@/Common/Components/ErrorMessage'
import { EventsList } from './EventsList'
import { DirectorSidebar } from './DirectorSidebar'
import { WhatsNew } from './WhatsNew'

/**
 * Entrypoint for the Director Dashboard Pge
 */
export const DirectorHome = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [directorData, setDirectorData] = useState(getInitialDirectorData)

  useEffect(() => {
    checkLoginStatus(true)
    fetchDirectorData(directorData, setDirectorData)
  }, [])

  switch (directorData.status) {
    case DirectorHomeStatus.Loading:
      return (
        <h1 className="text-center mt-10 text-2xl font-medium">Loading...</h1>
      )

    case DirectorHomeStatus.Initial:
    case DirectorHomeStatus.Success:
      const analytics = getAnalytics()

      return (
        <div>
          <DirectorSidebar
            directorData={directorData}
            setSidebarOpen={setSidebarOpen}
            sidebarOpen={sidebarOpen}
          />

          <div className="md:pl-64 flex flex-col flex-1">
            <div className="sticky top-0 z-10 md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-gray-100">
              <button
                type="button"
                className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900"
                onClick={() => setSidebarOpen(true)}
              >
                <span className="sr-only">Open sidebar</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <main className="flex-1">
              <div className="py-6">
                <div className="flex items-center max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                  <h1 className="text-2xl font-semibold text-gray-900">
                    My Events
                  </h1>
                  <nav className="ml-8 whitespace-nowrap inline-flex items-center justify-center bg-gradient-to-r from-amber-400 to-yellow-500 bg-origin-border hover:from-yellow-500 hover:to-amber-400 px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-black">
                    <Link
                      to="/manage/create-event"
                      onClick={() => logEvent(analytics, 'sign_in_clicked')}
                    >
                      Create A New Event
                    </Link>
                  </nav>
                </div>
                <div className="mt-4 max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                  <WhatsNew />
                  <EventsList directorID={directorData.userId} />
                </div>
              </div>
            </main>
          </div>
        </div>
      )

    case DirectorHomeStatus.Error:
      return (
        <ErrorMessage>
          There was an error loading your account. Please try again.
        </ErrorMessage>
      )

    default:
      return (
        <ErrorMessage>
          An unknown error occured. Error Code: MHTSX_01
          {directorData.error}
        </ErrorMessage>
      )
  }
}
