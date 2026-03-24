import { ReactNode } from 'react'

import { Button } from '@/Common/Components/Button'
import { Link } from 'react-router-dom'

type Props = {
  children: ReactNode
  isPlayer?: boolean
}

/**
 * Shows an error message and a link to the dashboard
 */
export const ErrorMessage = (props: Props) => {
  const { children, isPlayer } = props

  const destination = isPlayer ? '/home/' : '/manage/'

  return (
    <div className="flex flex-col">
      <h1 className="text-center my-10 text-2xl font-medium text-red-600">
        {children}
      </h1>
      <Button className="w-80 mx-auto">
        <Link to={destination}>Return to Dashboard</Link>
      </Button>
    </div>
  )
}
