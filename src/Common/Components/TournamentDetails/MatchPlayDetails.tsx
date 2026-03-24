import type { Updater } from 'use-immer'

import type { EventData } from '@/Common/Common.types'
import { matchPlayScoringOptions } from './TournamentForm.types'
import { TOURNAMENT_TEXT } from './TournamentForm.constants'

import { getEmptyMatchPlayInfos } from './MatchPlayDetails.helpers'

import { Dropdown } from '@/Common/Components/Dropdown'
import { TextInput } from '@/Common/Components/TextInput'

type Props = {
  eventData: EventData
  isEditing: boolean
  setEventData: Updater<EventData>
  tIndex: number
}

/**
 * Sub form for displaying the details for the match play tournament
 */
export const MatchPlayDetails = (props: Props) => {
  const { eventData, isEditing, setEventData, tIndex } = props

  const { matchPlayInfo } = eventData.tournaments[tIndex]

  return (
    <div className="col-span-6 sm:col-span-6 border rounded-md shadow p-2">
      <h3 className="my-3 text-center text-2xl font-medium">
        Match Play Details
      </h3>

      {/** Reuse the numRounds field to simplify Tournament validation */}
      <TextInput
        required
        type="number"
        isEditing={isEditing}
        labelText="Number of Rounds"
        tooltipText={TOURNAMENT_TEXT.MATCH_PLAY_ROUNDS}
        value={eventData.tournaments[tIndex].numRounds}
        onChange={(e) =>
          setEventData((draft) => {
            draft.tournaments[tIndex].numRounds = e.target.valueAsNumber
            draft.tournaments[tIndex].matchPlayInfo = getEmptyMatchPlayInfos(
              e.target.valueAsNumber,
            )
          })
        }
      />

      <div className="grid grid-cols-6 gap-4">
        {matchPlayInfo.map((MPInfo, index) => (
          <div
            key={`match_play_info_${index}`}
            className="col-span-6 sm:col-span-3 border border-dashed rounded-md p-2"
          >
            <h4>Round {index + 1}</h4>

            <TextInput
              required
              type="number"
              isEditing={isEditing}
              labelText="Number of Games"
              tooltipText={TOURNAMENT_TEXT.MATCH_PLAY_GAMES}
              value={MPInfo.numGames}
              onChange={(e) =>
                setEventData((draft) => {
                  draft.tournaments[tIndex].matchPlayInfo[index].numGames =
                    e.target.valueAsNumber
                })
              }
            />

            <Dropdown
              isEditing={isEditing}
              labelText="Scoring Type"
              tooltipText={TOURNAMENT_TEXT.SCORING}
              items={matchPlayScoringOptions}
              value={
                eventData.tournaments[tIndex].matchPlayInfo[index].scoringType
              }
              onChange={(e) =>
                setEventData((draft) => {
                  draft.tournaments[tIndex].matchPlayInfo[index].scoringType =
                    e.target.value
                })
              }
            />
          </div>
        ))}
      </div>
    </div>
  )
}
