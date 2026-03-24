import { useRef, MutableRefObject } from 'react'

type ReturnType = [MutableRefObject<any>, () => void | undefined]

const defaultOptions: ScrollIntoViewOptions = {
  behavior: 'smooth',
  block: 'start',
  inline: 'nearest',
}

/**
 * Customn Hook to scrroll an element into view smoothly
 */
export const useScrollToElement = (
  scrollIntoViewOptions: ScrollIntoViewOptions = defaultOptions,
): ReturnType => {
  const ref = useRef<HTMLElement | null>(null)
  const scroll = () =>
    ref.current?.scrollIntoView({
      ...defaultOptions,
      ...scrollIntoViewOptions,
    })

  return [ref, scroll]
}
