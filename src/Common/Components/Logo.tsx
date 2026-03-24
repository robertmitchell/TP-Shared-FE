import { Link } from 'react-router-dom'

import LOGO from '@/assets/logo.png'
import LOGO_FULL from '@/assets/logo_full.png'

type Props = {
  isSmall?: boolean
}

/**
 * Logo that resizes based on prop passed
 */
export const Logo = (props: Props) => {
  const { isSmall } = props

  if (isSmall) {
    return (
      <nav>
        <Link to="/">
          <img className="h-8 w-auto" src={LOGO} alt="tournament planet logo" />
        </Link>
      </nav>
    )
  }

  return (
    <div className="flex justify-start lg:w-0 lg:flex-1">
      <nav>
        <Link className="flex items-end" to="/">
          <span className="sr-only">Tournament Planet</span>
          <img
            className="h-8 w-auto sm:h-10"
            src={LOGO_FULL}
            alt="tournament planet logo"
          />
          <span className="ml-2 text-xs text-gray-500">(Beta)</span>
        </Link>
      </nav>
    </div>
  )
}
