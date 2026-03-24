import {
  Match,
  MatchEntrant,
  MatchWinnerStatus,
} from '@/Common/Components/BracketDetails/BracketForm.types'

/**
 * Only adds a pair of empty players if this is the first round
 * Otherwise push an empty array so that advancers can be pushed into the list.
 */
export const getEmptySinglesMatch = (
  isFirstRound: boolean,
  numRounds: number,
): Match => {
  return isFirstRound
    ? {
        players: [
          getEmptyMatchPlayer(numRounds),
          getEmptyMatchPlayer(numRounds),
        ],
      }
    : { players: [getFuturePlayer(), getFuturePlayer()] }
}

/**
 * Creates an empty player for the first round
 */
export const getEmptyMatchPlayer = (numRounds: number): MatchEntrant => {
  const emptyPlayer: MatchEntrant = {
    average: 0,
    id: 'Bye_007',
    isWinner0: MatchWinnerStatus.In_Progress,
    isWinner1: MatchWinnerStatus.In_Progress,
    isWinner2: MatchWinnerStatus.In_Progress,
    lane: '0',
    name: 'Bye',
    photo: 'null',
    roundScore0: 0,
    roundScore1: 0,
    roundScore2: 0,
  }

  if (numRounds >= 4) {
    emptyPlayer.isWinner3 = MatchWinnerStatus.In_Progress
    emptyPlayer.roundScore3 = 0
  }
  if (numRounds >= 5) {
    emptyPlayer.isWinner4 = MatchWinnerStatus.In_Progress
    emptyPlayer.roundScore4 = 0
  }
  if (numRounds >= 6) {
    emptyPlayer.isWinner5 = MatchWinnerStatus.In_Progress
    emptyPlayer.roundScore5 = 0
  }
  if (numRounds >= 7) {
    emptyPlayer.isWinner6 = MatchWinnerStatus.In_Progress
    emptyPlayer.roundScore6 = 0
  }
  if (numRounds >= 8) {
    emptyPlayer.isWinner7 = MatchWinnerStatus.In_Progress
    emptyPlayer.roundScore7 = 0
  }

  return emptyPlayer
}

/**
 * Creates an empty player for the upcoming rounds
 */
export const getFuturePlayer = (): MatchEntrant => {
  const emptyPlayer: MatchEntrant = {
    id: 'TBD_007',
    name: 'TBD',
    lane: '0',
    average: 0,
    photo: 'null',
    roundScore0: 0,
    roundScore1: 0,
    roundScore2: 0,
    isWinner0: MatchWinnerStatus.In_Progress,
    isWinner1: MatchWinnerStatus.In_Progress,
    isWinner2: MatchWinnerStatus.In_Progress,
  }

  return emptyPlayer
}
