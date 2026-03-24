import type { ReactNode } from 'react'
import { Popover as HeadlessPopover } from '@headlessui/react'

type Props = {
  children: ReactNode
  trigger: string | ReactNode
}

/**
 * A reusable popover component
 */
export const Popover = (props: Props) => {
  const { children, trigger } = props

  return (
    <HeadlessPopover className="relative">
      <HeadlessPopover.Button>{trigger}</HeadlessPopover.Button>

      <HeadlessPopover.Panel className="absolute z-10">
        {children}
      </HeadlessPopover.Panel>
    </HeadlessPopover>
  )
}
