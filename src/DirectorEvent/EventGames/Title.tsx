import { GenericStatus } from '@/Common/Common.types'

import { ModalTitle } from '@/Common/Components/ModalTitle'

type Props = {
  status: GenericStatus
}

export const Title = (props: Props) => {
  const { status } = props

  switch (status) {
    case GenericStatus.Open:
      return <ModalTitle titleText="Start the game?" />

    case GenericStatus.In_Progress:
      return <ModalTitle titleText="Enter Game Scores" />

    case GenericStatus.Closed:
      return <ModalTitle titleText="This Game is Closed" />

    default:
      return <ModalTitle titleText="Something went wrong loading the game" />
  }
}
