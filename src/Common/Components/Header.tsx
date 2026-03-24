import { Popover } from '@headlessui/react'

import { Logo } from './Logo'

/**
 * Generic Header for login pages
 */
export const Header = () => {
  return (
    <header>
      <Popover className="relative bg-indigo-50">
        <div className="flex justify-between items-center max-w-7xl mx-auto px-4 py-6 sm:px-6 md:justify-start md:space-x-10 lg:px-8">
          <Logo />
        </div>
      </Popover>
    </header>
  )
}
