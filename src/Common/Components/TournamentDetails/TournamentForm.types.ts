import type { Player, Team } from '@/Common/Common.types'

export type TournamentFormData = {
  age: string
  areTeamsEnabled: boolean
  basedOnPercent: number
  basedOnScore: number
  dates: string
  description: string
  entryFee: number
  houseCut: number
  id: string
  isHandicap: boolean
  isMixed: boolean
  isOpen: boolean
  location: string
  matchPlayInfo: MatchPlayInfo[]
  name: string
  numLanes: number
  numRounds: number
  playerCount: number
  prizes: string
  rules: string
  sidePots: SidePots
  sport: string
  teamCount: number
  teamWinners: Team[]
  tournamentType: string
  winners: TournamentPlayer[]
}

/**
 * Different types of tournaments
 */
export const tournamentOptions = [
  'Singles',
  'Doubles',
  'Trios',
  'Teams',
  'Mystery Doubles',
  'Love Doubles',
  'Match Play',
  // 'Round Robin Singles (coming soon)',
  // 'Match Play Singles (coming soon)',
  // 'Round Robin Teams (coming soon)',
  // 'Match Play Teams (coming soon)',
  // 'Blind Singles (coming soon)',
  // 'Blind Teams (coming soon)',
]

/**
 * Contains the details related to each round in a Match Play Round
 */
export type MatchPlayInfo = {
  matchUps: MatchUp[]
  numGames: number
  scoringType: MatchPlayScoringType
  status: MatchPlayRoundStatus
}

/**
 * The information for each Match Play player matchup
 */
export type MatchUp = {
  player1Id: string
  player2Id: string
}

/**
 * Displays the player's info and their scores
 */
export type MatchupResult = {
  player1: Player
  player1Scores: number[]
  player2: Player
  player2Scores: number[]
}

/**
 * Status of a Match Play Round
 */
export enum MatchPlayRoundStatus {
  Closed = 'Closed',
  Open = 'Open',
  Shuffled = 'Shuffled',
}

/**
 * A Match Play round can be scored by either a point for each game
 * or by having the highest total score for all games.
 * or both: point for each game and one point for highest total score
 */
export type MatchPlayScoringType = 'Point' | 'Total' | 'Point + Total'

export const matchPlayScoringOptions = ['Point', 'Total', 'Point + Total']

export type TournamentPlayer = {
  average: number
  email: string
  firstName: string
  id: string
  isMale: boolean
  lane: string
  lastName: string
  photo: string | null
  scores: number[]
  totalScore: number
}

export type SidePots = {
  highPot: SidePot
  lowPot: SidePot
}

type SidePot = {
  enabled: boolean
  enrollmentFee: number
}

export enum SidePotType {
  HIGH_POT = 'High Pot',
  LOW_POT = 'Low Pot',
}
