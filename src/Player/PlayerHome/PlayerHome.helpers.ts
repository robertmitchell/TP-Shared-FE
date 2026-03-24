import { getAuth } from 'firebase/auth'
import { getDatabase, onValue, ref } from 'firebase/database'

import { SetState, UserType } from '../../Common/Common.types'
import { PlayerHomeStatus, PlayerInfoResponse } from './PlayerHome.types'

export const getInitialPlayerData = (): PlayerInfoResponse => ({
  email: '',
  error: '',
  firstName: '',
  isMale: true,
  lastName: '',
  photo: null,
  status: PlayerHomeStatus.Loading,
  userId: null,
  userType: UserType.Player,
})

/**
 * Gets the players data
 */
export const fetchPlayerData = async (
  playerData: PlayerInfoResponse,
  setPlayerData: SetState<PlayerInfoResponse>,
) => {
  try {
    // Get user
    const auth = getAuth()
    const user = auth.currentUser

    if (!user) {
      throw new Error('Error code: PHHTS_001')
    }
    // Get user data
    const db = getDatabase()
    const eventRef = ref(db, `players/${user.uid}`)

    onValue(eventRef, (snapshot) => {
      const data = snapshot.val()
      if (data !== null) {
        const { email, firstName, lastName, photo } = data

        setPlayerData({
          ...playerData,
          email,
          firstName,
          lastName,
          photo,
          status: PlayerHomeStatus.Success,
          userId: user.uid,
        })
      } else {
        setPlayerData({
          ...playerData,
          status: PlayerHomeStatus.Error,
          error: 'Error code: PHHTS_002',
        })
      }
    })
  } catch (error) {
    setPlayerData({
      ...playerData,
      status: PlayerHomeStatus.Error,
      error: `There was an error getting your player data: ${error}`,
    })
  }
}
