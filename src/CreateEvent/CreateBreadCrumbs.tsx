import cn from 'classnames'

import { breadCrumbs } from './CreateBreadCrumbs.constants'
import { CreateEventStatus } from './CreateEvent.types'
import { ChevronRightIcon } from '@heroicons/react/20/solid'

type Props = {
  status: CreateEventStatus
}

/**
 * Breadcrumbs for the create flow
 */
export const CreateBreadCrumbs = (props: Props) => {
  const { status } = props

  return (
    <header className="flex justify-center items-center flex-wrap">
      {breadCrumbs.map((breadCrumb) => (
        <div key={breadCrumb} className="flex justify-center items-center">
          <span
            className={cn('mx-4 p-2 ', {
              'font-medium text-black text-xl underline': breadCrumb === status,
            })}
          >
            {breadCrumb}
          </span>

          {breadCrumb !== 'Games' && (
            <ChevronRightIcon
              className="flex-shrink-0 h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          )}
        </div>
      ))}
    </header>
  )
}
