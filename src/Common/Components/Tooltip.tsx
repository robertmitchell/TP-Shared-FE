import type { ReactNode } from 'react'

import * as RTooltip from '@radix-ui/react-tooltip'

type Props = {
  children: ReactNode
  delayDuration?: number
  tooltipText: string
}

/**
 * A resuable tooltip component
 */
export const Tooltip = (props: Props) => {
  const { children, delayDuration = 300, tooltipText } = props

  return (
    <RTooltip.Provider delayDuration={delayDuration} skipDelayDuration={500}>
      <RTooltip.Root>
        <RTooltip.Trigger>{children}</RTooltip.Trigger>
        <RTooltip.Content className="p-3 shadow-sm rounded-md bg-gray-900 text-white whitespace-pre-wrap">
          {tooltipText}
          <RTooltip.Arrow offset={5} width={11} height={5} />
        </RTooltip.Content>
      </RTooltip.Root>
    </RTooltip.Provider>
  )
}
