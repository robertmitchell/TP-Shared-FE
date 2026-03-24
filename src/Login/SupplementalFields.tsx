import { useState } from 'react'

import { Button } from '@/Common/Components/Button'
import { ForgotPasswordModal } from './ForgotPasswordModal'

export const SupplementalFields = () => {
  const [isForgotModalVisible, setIsForgotModalVisible] = useState(false)

  return (
    <div className="flex items-center justify-between">
      <div className="text-sm">
        <Button
          className="pl-0"
          variant="text"
          onClick={() => setIsForgotModalVisible(true)}
        >
          Forgot your password?
        </Button>
      </div>

      <ForgotPasswordModal
        isVisible={isForgotModalVisible}
        setVisible={setIsForgotModalVisible}
      />
    </div>
  )
}
