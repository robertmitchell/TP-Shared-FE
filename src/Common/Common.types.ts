import type { Dispatch } from 'react'
import type { BracketFormData } from './Components/BracketDetails/BracketForm.types'
import type { LeagueFormData } from './Components/LeagueDetails/LeagueForm/LeagueForm.types'
import type {
  SidePots,
  TournamentFormData,
} from '@/Common/Components/TournamentDetails/TournamentForm.types'

// Details containing a player's enrollment in a bracket
export type BracketAliveInfo = {
  aliveList: BracketAliveList
  id: string
  numBrackets: number
  results: BracketResults
  sidePots: SidePots
}

// Shows the brackets that a player is still alive in and is dead in
export type BracketAliveList = {
  alive: number[]
  dead: number[]
}

// Shows the player's results in the bracket
export type BracketResults = {
  firstPlace: number[]
  firstTies: number[]
  secondPlace: number[]
  secondTies: number[]
  thirdPlace: number[]
  thirdTies: number[]
  fourthPlace: number[]
  fourthTies: number[]
}

/**
 * Info about the person running the event
 */
type DirectorInfo = {
  email: string
  name: string
  phone: string
}

// Used for determining if a player/team is enrolled
export type EnrollmentData = {
  isEnrolled: boolean
  numBrackets: number
  sidePots: SidePots
}

/**
 * The main info for an event
 */
export type EventData = {
  brackets: BracketFormData[]
  eventDetails: EventDetails
  games: Game[]
  generators: GeneratorData[]
  guestPlayers: Player[]
  leagues: LeagueFormData[]
  players: Player[]
  scores: Score[]
  teams: Team[]
  tournaments: TournamentFormData[]
}

/**
 * The descriptive info for an event
 */
export type EventDetails = {
  areNotificationsEnabled: boolean
  createdAt: string
  date: string
  description: string
  directorInfo: DirectorInfo
  generatorsEnabled: boolean
  id: string
  isPrivate: boolean
  location: string
  name: string
  numParticipants: number
  paymentLink: string
  photo: string | null
  status: GenericStatus
}

export type Game = {
  brackets: GameTLB[]
  id: string
  leagues: GameTLB[]
  name: string
  status: GenericStatus
  tournaments: GameTLB[]
}

type GameTLB = {
  id: string
  roundNum: string // 'NA' or the round number as a string - selected from a dropdown
}

/**
 * For selecting a player at random with a weight
 */
export type GeneratorData = {
  name: string
  note: string
  generatorPlayers: GeneratorPlayer[]
  uid: string
  winners: GeneratorPlayer[]
}

/**
 * A player's info
 */
export type GeneratorPlayer = {
  name: string
  uid: string
  weight: number
}

export type GenericFormState = {
  error: string
  status: GenericFormStatus
  success: string
}

export enum GenericFormStatus {
  Loading = 'Loading',
  Success = 'Success',
  Error = 'Error',
}

export type GenericModalFormState = {
  error: string
  isModalVisible: boolean
  status: GenericFormStatus
  success: string
}

export enum GenericStatus {
  Open = 'Open',
  In_Progress = 'In Progress',
  Closed = 'Closed',
}

// Player data for an event
export type Player = {
  average: number
  brackets: BracketAliveInfo[]
  email: string
  firstName: string
  id: string
  isMale: boolean
  lane: string
  lastName: string
  // List of Ids of the leagues they are enrolled in
  leagues: string[]
  // An Identification number for some membership organization
  organizationId: string
  // The name of the organization they are a member of
  organizationName: string
  photo: string | null
  teams: string[]
  tournaments: TournamentEnrollments[]
}

export type PlayerEventDetails = EventDetails & {
  directorUID: string
}

// Generic React Dispatch for types
export type SetState<T> = Dispatch<T>

export type Score = {
  gameId: string
  playerId: string
  score: number
}

// The status of a Director's subscription
export enum SubscriptionStatus {
  Active = 'Active',
  Inactive = 'Inactive',
}

// Team in an event
export type Team = {
  brackets: BracketAliveInfo[]
  id: string
  lane: number
  leagues: string[]
  name: string
  players: TeamPlayer[]
  totalScore: number // Only used when there is a copy for an alive list to make things easier for a deadline
  tournaments: TournamentEnrollments[]
}

// Individual player in a team
export type TeamPlayer = {
  isGuest: boolean // Tells whether they are a player in this event (Guest) or a saved player with an account
  isMale: boolean
  name: string
  playerId: string // Id for the player so it can be looked up
}

export type TournamentEnrollments = {
  id: string
  sidePots: SidePots
}

// Used for knowing where a TLB came from and what can be done
export enum TLBViewStatus {
  Create = 'Create', // During create event flow
  Editable = 'Editable', // Director Read Only View
  Editing = 'Editing', // Director actively making edits
  ReadOnly = 'Read_Only', // Player view
}

// App specific types used in multiple places
export enum UserType {
  Business = 'business',
  None = 'none',
  Player = 'player',
}
