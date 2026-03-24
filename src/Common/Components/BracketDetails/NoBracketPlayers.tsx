import {
  NO_PLAYERS_IN_BRACKET,
  NO_PLAYERS_IN_BRACKET_PLAYER,
} from './BracketForm.constants'

type Props = {
  isPlayer: boolean
}

/**
 * Standard message for when there are no players in a bracket
 */
export const NoBracketPlayers = (props: Props) => {
  const { isPlayer } = props

  return (
    <h3 className="text-lg text-center mt-2 text-red-600">
      {isPlayer ? NO_PLAYERS_IN_BRACKET_PLAYER : NO_PLAYERS_IN_BRACKET}
    </h3>
  )
}
