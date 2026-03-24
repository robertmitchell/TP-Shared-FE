import { getAuth } from 'firebase/auth'
import { getDatabase, onValue, ref } from 'firebase/database'

import {
  DirectorHomeStatus,
  DirectorInfoResponse,
} from '@/DirectorHome/DirectorHome.types'
import { SetState, UserType } from '@/Common/Common.types'

export const getInitialDirectorData = (): DirectorInfoResponse => ({
  businessName: '',
  email: '',
  error: '',
  name: '',
  photo: null,
  status: DirectorHomeStatus.Loading,
  success: '',
  userId: '',
  userType: UserType.Business,
})

export const fetchDirectorData = async (
  directorData: DirectorInfoResponse,
  setDirectorData: SetState<DirectorInfoResponse>,
) => {
  try {
    // Get user
    const user = getAuth().currentUser

    if (!user) {
      setDirectorData({
        ...directorData,
        error:
          'There was an error getting your account data. Error code: MHHTS_001',
        status: DirectorHomeStatus.Error,
      })
      return
    }

    // Get user data
    const db = getDatabase()
    const directorRef = ref(db, `directors/${user.uid}`)
    onValue(directorRef, (snapshot) => {
      const data = snapshot.val()

      if (data !== null) {
        setDirectorData(buildDirectorResponseObj(data, user.uid))
      } else {
        setDirectorData({
          ...directorData,
          error:
            'There was an error getting your account data. Error code: MHHTS_002',
          status: DirectorHomeStatus.Error,
        })
      }
    })
  } catch (error) {
    setDirectorData({
      ...directorData,
      error: `There was an error getting your account data: ${error}`,
      status: DirectorHomeStatus.Error,
    })
  }
}

const buildDirectorResponseObj = (
  documentData: any,
  userId: string,
): DirectorInfoResponse => ({
  businessName: documentData.businessName,
  email: documentData.email,
  error: '',
  name: documentData.name || '',
  photo: documentData.photo,
  status: DirectorHomeStatus.Initial,
  success: '',
  userId: userId,
  userType: UserType.Business,
})
