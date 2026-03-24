import { ReactNode } from 'react'
import { useInView } from 'react-intersection-observer'
import cn from 'classnames'

type Props = {
  children: ReactNode
}

/**
 * Reusable sticky footer
 */
export const StickyFooter = (props: Props) => {
  const { children } = props

  const { ref, inView } = useInView()

  return (
    <>
      <div ref={ref} />

      <div
        className={cn({
          'justify-center': inView,
          'sticky bottom-0 left-0 right-0 bg-gray-300 border-b-8 border-white opacity-80':
            !inView,
        })}
      >
        <div className="flex flex-col justify-center items-center py-2">
          {children}
        </div>
      </div>
    </>
  )
}
