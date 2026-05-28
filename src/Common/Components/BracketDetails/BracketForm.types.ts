import type { Updater } from 'use-immer'

import type {
  GenericFormState,
  EventData,
  SetState,
} from '@/Common/Common.types'

export type AdvanceRoundParams = {
  bi: number // eventBracket index
  eventData: EventData
  setAdvanceModal: SetState<boolean>
  setEventData: Updater<EventData>
  setFormState: Updater<GenericFormState>
}

export type BracketFormData = {
  activeRound: number
  age: string
  areTeamsEnabled: boolean
  basedOnPercent: number
  basedOnScore: number
  bracketNumPlayers: number
  bracketScoringType: 'Standard' | 'Reverse' | 'Mystery'
  bracketType: BracketType
  bracketWebs: BracketWeb[]
  dates: string
  description: string
  entryFee: number
  firstPayout: number
  fourthPayout: number
  houseCut: number
  id: string
  isHandicap: boolean
  location: string
  loserBrackets: BracketWeb[]
  name: string
  numLanes: number
  playerCount: number
  prizes: string
  rules: string
  secondPayout: number
  format: string
  sport: string
  status: BracketStatus
  teamCount: number
  thirdPayout: number
}

export enum BracketStatus {
  Not_Shuffled = 'Not Shuffled',
  Shuffled = 'Shuffled',
  Closed = 'Closed',
}

export type BracketType =
  | 'Singles'
  | 'Eliminator'
  | 'Doubles'
  | 'Teams'
  | 'Double Elimination'
  | 'Super Bracket'

export const bracketOptions = [
  // 'Baker'
  'Singles',
  'Eliminator',
  'Doubles',
  'Teams',
  'Double Elimination',
  'Super Bracket',
]

export const bracketNumPlayers = ['2', '4', '8', '16', '32', '64', '128', '256']
export const bracketNumPlayersDES = ['2', '4', '8']

export const bracketScoringTypes = ['Standard', 'Reverse', 'Mystery']

export const bracketFormatTypes = [
  'Standard 8 man 1/2/3',
  'Eliminator',
  'Reverse',
  'Mystery Score Brackets',
]

export type BracketWeb = {
  id: string
  rounds: Round[]
}

type Round = {
  matches: Match[]
}

export type Match = {
  players: MatchEntrant[]
}

// Used for Bracket Players and Teams
export type MatchEntrant = {
  average: number
  id: string | null
  isWinner0: MatchWinnerStatus
  isWinner1: MatchWinnerStatus
  isWinner2: MatchWinnerStatus
  isWinner3?: MatchWinnerStatus
  isWinner4?: MatchWinnerStatus
  isWinner5?: MatchWinnerStatus
  isWinner6?: MatchWinnerStatus
  isWinner7?: MatchWinnerStatus
  lane: string
  name: string
  photo: string | null
  roundScore0: number
  roundScore1: number
  roundScore2: number
  roundScore3?: number
  roundScore4?: number
  roundScore5?: number
  roundScore6?: number
  roundScore7?: number
}

export enum MatchWinnerStatus {
  Advanced = 'Advanced',
  In_Progress = 'In Progress',
  Lost = 'Lost',
  Won = 'Won',
  Error = 'Error',
}
