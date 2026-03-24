import type { ReactNode } from 'react'
import cn from 'classnames'

type Props = {
  children: string | ReactNode
  className?: string
  padding?: 'na' | 'xs' | 'sm' | 'md' | 'lg'
}

export const Card = (props: Props) => {
  const { children, className, padding = 'sm' } = props

  return (
    <div
      className={cn(
        {
          'bg-white border border-gray-200 rounded-lg drop-shadow-md': true,
          'p-0': padding === 'na',
          'p-0.5 sm:p-1 lg:p-1': padding === 'xs',
          'p-2 sm:p-2 lg:p-3': padding === 'sm',
          'p-4 sm:p-6 lg:p-8': padding === 'md',
          'p-6 sm:p-8 lg:p-10': padding === 'lg',
        },
        className,
      )}
    >
      {children}
    </div>
  )
}
