import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'

import type { SetState } from '@/Common/Common.types'
import type { PlayerInfoResponse } from './PlayerHome.types'

import { LogoutButton } from '../../Common/Components/LogoutButton'

import LOGO from '../../assets/logo.png'
import LOGO_FULL from '../../assets/logo_full.png'

type Props = {
  playerData: PlayerInfoResponse
  setSidebarOpen: SetState<boolean>
  sidebarOpen: boolean
}

/**
 * Sidebar for the Player home screen
 */
export const PlayerSideBar = (props: Props) => {
  const { playerData, setSidebarOpen, sidebarOpen } = props

  const playerName = `${playerData.firstName} ${playerData.lastName}`

  return (
    <>
      {/* Dynamic sidebar for mobile */}
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 flex z-40 md:hidden"
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative flex-1 flex flex-col max-w-xs w-full bg-black">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute top-0 right-0 -mr-12 pt-2">
                  <button
                    type="button"
                    className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XMarkIcon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </Transition.Child>
              <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                <div className="shrink-0 flex items-center px-4">
                  <img
                    className="h-8 w-auto"
                    src={LOGO_FULL}
                    alt="Tournament Planet"
                  />
                </div>

                <nav className="mt-5 px-2">
                  <LogoutButton />
                </nav>
              </div>
              <div className="shrink-0 flex border-t border-gray-500 p-4">
                <a href="#" className="shrink-0 group block">
                  <div className="flex items-center">
                    {/* <div>
                      <img
                        className="inline-block h-10 w-10 rounded-full"
                        src={playerData.photo || LOGO}
                        alt=""
                      />
                    </div> */}
                    <div className="ml-3">
                      <p className="text-base font-medium text-white">
                        {playerName}
                      </p>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </Transition.Child>
          <div className="shrink-0 w-14" aria-hidden="true">
            {/* Force sidebar to shrink to fit close icon */}
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex-1 flex flex-col min-h-0 bg-black">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center shrink-0 px-4">
              <img className="w-auto" src={LOGO_FULL} alt="Tournament Planet" />
            </div>

            <nav className="mt-5 flex-1 px-2 space-y-1">
              <LogoutButton />
            </nav>
          </div>
          <div className="shrink-0 flex border-t border-gray-500 p-4">
            <a href="#" className="shrink-0 w-full group block">
              <div className="flex items-center">
                {/* <div>
                  <img
                    className="inline-block h-9 w-9 rounded-full"
                    src={playerData.photo || LOGO}
                    alt=""
                  />
                </div> */}
                <div className="ml-3">
                  <p className="text-sm font-medium text-white">{playerName}</p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
