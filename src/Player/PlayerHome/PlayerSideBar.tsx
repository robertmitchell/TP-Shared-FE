import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon, TrophyIcon } from '@heroicons/react/24/outline'

import type { SetState } from '@/Common/Common.types'
import type { PlayerInfoResponse } from './PlayerHome.types'
import { LogoutButton } from '../../Common/Components/LogoutButton'
import LOGO_FULL from '../../assets/logo_full.png'

type Props = {
  playerData: PlayerInfoResponse
  setSidebarOpen: SetState<boolean>
  sidebarOpen: boolean
}

export const PlayerSideBar = (props: Props) => {
  const { playerData, setSidebarOpen, sidebarOpen } = props
  const playerName = `${playerData.firstName} ${playerData.lastName}`

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-gray-900">
      <div className="flex items-center px-4 py-5 border-b border-gray-700">
        <img className="h-8 w-auto" src={LOGO_FULL} alt="Tournament Planet" />
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        <a
          href="/events"
          className="flex items-center gap-2 px-3 py-2 rounded-md text-gray-300 hover:bg-gray-800 hover:text-white text-sm font-medium transition-colors"
        >
          <TrophyIcon className="h-4 w-4 text-amber-400" />
          Browse Events
        </a>

        <div className="px-3 py-2">
          <LogoutButton />
        </div>
      </nav>

      <div className="border-t border-gray-700 px-4 py-4">
        <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Player</p>
        <p className="text-sm font-medium text-white truncate">{playerName}</p>
      </div>
    </div>
  )

  return (
    <>
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
            <div className="relative flex-1 flex flex-col max-w-xs w-full">
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
                    className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <XMarkIcon className="h-6 w-6 text-white" />
                  </button>
                </div>
              </Transition.Child>

              <SidebarContent />
            </div>
          </Transition.Child>

          <div className="shrink-0 w-14" aria-hidden="true" />
        </Dialog>
      </Transition.Root>

      <div className="hidden md:flex md:w-52 md:flex-col md:fixed md:inset-y-0">
        <SidebarContent />
      </div>
    </>
  )
}