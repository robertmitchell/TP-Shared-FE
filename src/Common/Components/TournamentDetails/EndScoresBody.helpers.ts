import type { TournamentPlayer } from './TournamentForm.types'

/**
 * Match all players with each other and then sort by combined total scores
 */
export const getRRTteams = (
  isMixed: boolean,
  tournamentWinners: TournamentPlayer[],
) => {
  let rRCouples = []

  // Loop through players starting at 0 but not doing the last player
  for (let i = 0; i < tournamentWinners.length - 1; i++) {
    // Loop through all of the remaining players to add to them as a group
    for (let j = i + 1; j < tournamentWinners.length; j++) {
      const rRCouple = [tournamentWinners[i], tournamentWinners[j]]
      rRCouples.push(rRCouple)
    }
  }

  // If they are mixed only match an M with an F
  if (isMixed) {
    rRCouples = rRCouples.filter((rRCouple) => {
      return rRCouple[0].isMale !== rRCouple[1].isMale
    })
  }

  rRCouples.sort(
    (coupleA, coupleB) =>
      coupleB[0].totalScore +
      coupleB[1].totalScore -
      (coupleA[0].totalScore + coupleA[1].totalScore),
  )

  return rRCouples
}
