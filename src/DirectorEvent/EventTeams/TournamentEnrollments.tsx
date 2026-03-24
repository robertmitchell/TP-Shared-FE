import type { Updater } from 'use-immer'

import type { EnrollmentData, EventData } from '@/Common/Common.types'

import { Checkbox } from '@/Common/Components/Checkbox'

type Props = {
  enrollmentData: EnrollmentData[]
  eventData: EventData
  isPlayer: boolean
  setEnrollmentData: Updater<EnrollmentData[]>
}

/**
 * Shows the tournament section of the player enrollments
 */
export const TournamentEnrollments = (props: Props) => {
  const { enrollmentData, eventData, isPlayer, setEnrollmentData } = props

  let hasTeamTournaments = false
  for (let i = 0; i < eventData.tournaments.length; i++) {
    if (eventData.tournaments[i].areTeamsEnabled) {
      hasTeamTournaments = true
      break
    }
  }

  if (!hasTeamTournaments) {
    return <div>No Team Tournaments have been enabled.</div>
  }

  return (
    <>
      {eventData.tournaments.map((tournament, tIndex) => {
        if (!tournament.areTeamsEnabled) {
          return null
        }

        return (
          <Checkbox
            key={tournament.id}
            isEditing={!isPlayer}
            labelText={tournament.name}
            description={`${tournament.teamCount} teams enrolled`}
            containerClassName="mb-2"
            isChecked={enrollmentData[tIndex].isEnrolled}
            onChange={() =>
              setEnrollmentData((draft) => {
                draft[tIndex].isEnrolled = !enrollmentData[tIndex].isEnrolled
              })
            }
          />
        )
      })}
    </>
  )
}
