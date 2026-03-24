import type { Updater } from 'use-immer'

import type { Player, Game, EventData, SetState } from '@/Common/Common.types'
import { ScoreFieldState, ScoreFieldStatus } from './ScoreField.types'

export const getInitialScoreFieldState = (): ScoreFieldState => ({
  error: '',
  success: '',
  status: ScoreFieldStatus.Loading,
})

/**
 * Checks if the player is enrolled in this game's TLB
 * Also initialized/updates the scores array if they don't exist
 */
export const fetchGameData = (
  player: Player,
  game: Game,
  eventData: EventData,
  setEventData: Updater<EventData>,
  setFormStatus: SetState<ScoreFieldState>,
) => {
  let isEnrolled = false

  // Check for Tournament enrollments
  if (game.tournaments?.length > 0) {
    for (let i = 0; i < game.tournaments.length; i++) {
      // Player may not be enrolled in any tournaments
      if (player.tournaments !== undefined) {
        for (let j = 0; j < player.tournaments.length; j++) {
          if (player.tournaments[j].id === game.tournaments[i].id) {
            isEnrolled = true
          }
        }
      }

      // Check for team tournament enrollment
      for (let ti = 0; ti < eventData.teams.length; ti++) {
        // Check that this player is in the team
        if (eventData.teams[ti] !== undefined) {
          for (let pi = 0; pi < eventData.teams[ti]?.players?.length; pi++) {
            if (eventData.teams[ti].players[pi].playerId === player.id) {
              // Check that the team is enrolled in this tournament
              for (
                let tti = 0;
                tti < eventData.teams[ti].tournaments?.length;
                tti++
              ) {
                if (
                  eventData.teams[ti].tournaments[tti].id ===
                  game.tournaments[i].id
                ) {
                  isEnrolled = true
                }
              }
            }
          }
        }
      }
    }
  }

  // Check Bracket enrollments
  if (game.brackets?.length > 0) {
    for (let i = 0; i < game.brackets.length; i++) {
      // Player may not be enrolled in any brackets
      if (player.brackets !== undefined) {
        for (let j = 0; j < player.brackets.length; j++) {
          if (player.brackets[j].id === game.brackets[i].id) {
            isEnrolled = true
          }
        }
      }

      // Check for team bracket enrollment
      for (let ti = 0; ti < eventData.teams.length; ti++) {
        // Check that this player is in the team
        if (eventData.teams[ti] !== undefined) {
          for (let pi = 0; pi < eventData.teams[ti].players.length; pi++) {
            if (eventData.teams[ti].players[pi].playerId === player.id) {
              // Check that the team is enrolled in this bracket
              for (
                let tti = 0;
                tti < eventData.teams[ti].brackets?.length;
                tti++
              ) {
                if (
                  eventData.teams[ti].brackets[tti].id === game.brackets[i].id
                ) {
                  isEnrolled = true
                }
              }
            }
          }
        }
      }
    }
  }

  // If they are enrolled and we haven't saved scores before populate the scores now
  if (isEnrolled && getScoreIndex(player, game, eventData) === -1) {
    setEventData((draft) => {
      draft.scores.push({
        gameId: game.id,
        playerId: player.id,
        score: 0,
      })
    })
  }

  setFormStatus({
    error: '',
    success: '',
    status: isEnrolled
      ? ScoreFieldStatus.Enrolled
      : ScoreFieldStatus.Not_Enrolled,
  })
}

/**
 * Gets the index of the Scores array for the matching game and player
 */
export const getScoreIndex = (
  player: Player,
  game: Game,
  eventData: EventData,
) => {
  let scoreIndex = -1

  for (let i = 0; i < eventData.scores.length; i++) {
    if (
      eventData.scores[i].gameId === game.id &&
      eventData.scores[i].playerId === player.id
    ) {
      scoreIndex = i
      break
    }
  }

  return scoreIndex
}

/**
 * Ensures empty value isn't in the score input field
 */
export const checkForEmpty = (
  eventData: EventData,
  scoreIndex: number,
  setEventData: Updater<EventData>,
) => {
  if (eventData.scores[scoreIndex].score.toString() === 'NaN') {
    setEventData((draft) => {
      draft.scores[scoreIndex].score = 0
    })
  }
}
