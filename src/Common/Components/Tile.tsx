import type { ReactNode } from 'react'
import cn from 'classnames'

type Props = {
  className?: string
  headerText: string
  icon: ReactNode
  onClick: () => void
  padding?: 'na' | 'xs' | 'sm' | 'md' | 'lg'
}

/**
 * Reusable tile - a square for holding text and an icon
 */
export const Tile = (props: Props) => {
  const { className, headerText, icon, onClick, padding = 'sm' } = props

  return (
    <div
      className={cn(
        {
          'flex flex-col justify-between items-center bg-white rounded-lg drop-shadow-md border-2 w-40 h-40':
            true,
          'p-0': padding === 'na',
          'p-0.5 sm:p-1 lg:p-1': padding === 'xs',
          'p-2 sm:p-2 lg:p-3': padding === 'sm',
          'p-4 sm:p-6 lg:p-8': padding === 'md',
          'p-6 sm:p-8 lg:p-10': padding === 'lg',
        },
        className,
      )}
      onClick={onClick}
    >
      <h3 className="text-center text-md md:text-xl font-medium">
        {headerText}
      </h3>
      {icon}
    </div>
  )
}
