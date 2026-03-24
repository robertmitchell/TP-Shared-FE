import type { EventData, Player } from '@/Common/Common.types'

import { calculateTotalScore } from './TotalScoreField.helpers'

import { TextInput } from '@/Common/Components/TextInput'

type Props = {
  eventData: EventData
  player: Player
}

/**
 * Total score field for the Scores Tab
 */
export const TotalScoreField = (props: Props) => {
  const { eventData, player } = props

  return (
    <div className="table-cell p-3 whitespace-nowrap text-sm text-black min-w-[7rem]">
      <TextInput
        isEditing={false}
        type="number"
        labelText=""
        value={calculateTotalScore(player, eventData)}
      />
    </div>
  )
}
