import type { BracketFormData } from '@/Common/Components/BracketDetails/BracketForm.types'
import type { TournamentFormData } from '@/Common/Components/TournamentDetails/TournamentForm.types'

/**
 * Gets the index of a tournament to be used in the tournament select dropdown
 */
export const getTIndex = (
  name: string,
  tournaments: TournamentFormData[],
): number => {
  for (let i = 0; i < tournaments.length; i++) {
    if (name === tournaments[i].name) {
      return i
    }
  }

  return -1
}

/**
 * Gets the index of a bracket to be used in the bracket select dropdown
 */
export const getBIndex = (
  name: string,
  brackets: BracketFormData[],
): number => {
  for (let i = 0; i < brackets.length; i++) {
    if (name === brackets[i].name) {
      return i
    }
  }

  return -1
}
