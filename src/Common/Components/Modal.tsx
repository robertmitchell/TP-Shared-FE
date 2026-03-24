import { Fragment, ReactNode } from 'react'
import cn from 'classnames'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'

import { Button } from '@/Common/Components/Button'

type Props = {
  // The content of the modal
  children: ReactNode
  onClose: () => void
  padding?: 'lg' | 'md' | 'sm'
  showX?: boolean
  size?: 'lg' | 'md' | 'sm'
}

/**
 * Reusable Modal component
 */
export const Modal = (props: Props) => {
  const { children, onClose, padding = 'lg', showX = true, size = 'lg' } = props

  return (
    <Transition.Root show={true} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={onClose}
      >
        <div className="flex items-end justify-center min-h-screen p-8 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div
              className={cn(
                'inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:p-12',
                {
                  'w-11/12': size === 'lg',
                  'w-1/2': size === 'md',
                  'w-1/4': size === 'sm',
                },
                {
                  'p-8': padding === 'lg',
                  'p-6': padding === 'md',
                  'p-4': padding === 'sm',
                },
              )}
            >
              <div className="hidden sm:block absolute top-0 right-0">
                {showX && (
                  <Button
                    variant="text"
                    className="bg-white rounded-md p-1 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={() => onClose()}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-4 w-4" aria-hidden="true" />
                  </Button>
                )}
              </div>
              {children}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
