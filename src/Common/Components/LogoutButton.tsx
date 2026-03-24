import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline'

import { Button } from '@/Common/Components/Button'

/**
 * Common button for logging a user out
 */
export const LogoutButton = () => (
  <Button
    className="my-2"
    fullWidth
    onClick={() => (window.location.href = '/logout')}
  >
    <ArrowRightOnRectangleIcon
      className="mr-4 shrink-0 h-6 w-6"
      aria-hidden="true"
    />
    Logout
  </Button>
)
