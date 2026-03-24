import { useEffect, useState } from 'react'
import QRCode from 'react-qr-code'
import {
  ChartPieIcon,
  MagnifyingGlassIcon,
  StarIcon,
} from '@heroicons/react/20/solid'
import { Bars3Icon } from '@heroicons/react/24/outline'

import { fetchPlayerData, getInitialPlayerData } from './PlayerHome.helpers'
import { checkLoginStatus } from '@/Common/Utils/checkLoginStatus'

import { PlayerHomeStatus } from './PlayerHome.types'
import { PlayerSideBar } from './PlayerSideBar'
import { Tile } from '@/Common/Components/Tile'

/**
 * Entrypoint for the player dashboard
 */
export const PlayerHome = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [playerData, setPlayerData] = useState(getInitialPlayerData)

  useEffect(() => {
    checkLoginStatus(false)
  }, [])

  useEffect(() => {
    fetchPlayerData(playerData, setPlayerData)
  }, [])

  switch (playerData.status) {
    case PlayerHomeStatus.Loading:
      return (
        <h1 className="text-center mt-10 text-2xl font-medium">Loading...</h1>
      )

    case PlayerHomeStatus.Success:
      return (
        <div>
          <PlayerSideBar
            playerData={playerData}
            setSidebarOpen={setSidebarOpen}
            sidebarOpen={sidebarOpen}
          />

          <div className="md:pl-64">
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

            <div className="flex mt-2 mx-2 md:mx-10">
              <Tile
                headerText="Browse Events"
                onClick={() => (window.location.href = '/events')}
                icon={
                  <MagnifyingGlassIcon
                    className="shrink-0 h-12 w-12"
                    aria-hidden="true"
                  />
                }
                className="mr-2 md:mr-10 cursor-pointer"
              />

              {/* <Tile
                headerText="My Enrolled Events"
                onClick={() => (window.location.href = '/my-events')}
                icon={
                  <StarIcon className="shrink-0 h-12 w-12" aria-hidden="true" />
                }
                className="mr-2 md:mr-10"
              /> */}

              {/* <Tile
                headerText="Track Stats"
                onClick={() => (window.location.href = '/stats')}
                icon={
                  <ChartPieIcon
                    className="shrink-0 h-12 w-12"
                    aria-hidden="true"
                  />
                }
              /> */}
            </div>

            {playerData.userId ? (
              <div className="flex flex-col items-center mb-4">
                <h1 className="text-center mt-10 text-2xl font-medium text-indigo-500">
                  Use this QR code to sign up for events
                </h1>
                <QRCode className="mt-5" value={JSON.stringify(playerData)} />
              </div>
            ) : (
              <h1 className="text-center mt-10 text-2xl font-medium text-red-600">
                Unable to load your player Data. Please try again later.
              </h1>
            )}
          </div>
        </div>
      )

    case PlayerHomeStatus.Error:
      return (
        <h1 className="text-center mt-10 text-2xl font-medium text-red-600">
          {playerData.error}
        </h1>
      )

    default:
      return (
        <h1 className="text-center mt-10 text-2xl font-medium text-red-600">
          Something went wrong. Please try again later.
        </h1>
      )
  }
}
