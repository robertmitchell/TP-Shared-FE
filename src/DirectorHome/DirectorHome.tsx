import { useEffect, useState } from 'react'
import { getAnalytics, logEvent } from 'firebase/analytics'
import { Bars3Icon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'

import { DirectorHomeStatus } from './DirectorHome.types'
import { checkLoginStatus } from '@/Common/Utils/checkLoginStatus'
import { fetchDirectorData, getInitialDirectorData } from '@/Common/Utils/getDirectorInfo'
import { ErrorMessage } from '@/Common/Components/ErrorMessage'
import { EventsList } from './EventsList'
import { DirectorSidebar } from './DirectorSidebar'
import { WhatsNew } from './WhatsNew'

export const DirectorHome = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [directorData, setDirectorData] = useState(getInitialDirectorData)

  useEffect(() => {
    checkLoginStatus(true)
    fetchDirectorData(directorData, setDirectorData)
  }, [])

  switch (directorData.status) {
    case DirectorHomeStatus.Loading:
      return <p className="text-center mt-10 text-gray-500">Loading...</p>

    case DirectorHomeStatus.Initial:
    case DirectorHomeStatus.Success:
      const analytics = getAnalytics()
      return (
        <div className="bg-gray-50 min-h-screen">
          <DirectorSidebar
            directorData={directorData}
            setSidebarOpen={setSidebarOpen}
            sidebarOpen={sidebarOpen}
          />
          <div className="md:pl-52 flex flex-col flex-1">
            {/* Mobile header */}
            <div className="sticky top-0 z-10 md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-gray-50">
              <button
                type="button"
                className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900"
                onClick={() => setSidebarOpen(true)}
              >
                <Bars3Icon className="h-6 w-6" />
              </button>
            </div>

            <main className="flex-1 px-6 py-8 max-w-5xl">
              {/* Page header */}
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">My Events</h1>
                  <p className="text-sm text-gray-500 mt-0.5">
                    Manage your tournaments and track results
                  </p>
                </div>
                <Link
                  to="/manage/create-event"
                  onClick={() => logEvent(analytics, 'sign_in_clicked')}
                  className="inline-flex items-center px-4 py-2 bg-amber-400 hover:bg-amber-500 text-black text-sm font-semibold rounded-lg shadow-sm transition-colors"
                >
                  + Create A New Event
                </Link>
              </div>

              <div className="mt-6">
                <WhatsNew />
                <EventsList directorID={directorData.userId} />
              </div>
            </main>
          </div>
        </div>
      )

    case DirectorHomeStatus.Error:
      return <ErrorMessage>There was an error loading your account. Please try again.</ErrorMessage>

    default:
      return <ErrorMessage>An unknown error occurred. Error Code: MHTSX_01 {directorData.error}</ErrorMessage>
  }
}