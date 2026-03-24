import cn from 'classnames'
import { Dialog } from '@headlessui/react'

type Props = {
  titleText: string
  className?: string
}

export const ModalTitle = (props: Props) => {
  const { titleText, className } = props

  return (
    <Dialog.Title
      as="h3"
      className={cn(
        'text-center text-xl font-medium mb-4 text-black',
        className,
      )}
    >
      {titleText}
    </Dialog.Title>
  )
}
