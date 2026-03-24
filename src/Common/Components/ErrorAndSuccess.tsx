import { useEffect } from 'react'
import cn from 'classnames'

type Props = {
  clearMessageFn?: () => void // SHOULD ONLY BE USED TO CLEAR THE MESSAGE
  constainerClassName?: string
  delay?: number // the number of milliseconds to delay before calling the function - defaults to 5 seeconds
  error: string
  success: string
}

/**
 * Displays a styled error or success message to the user
 * Optionally can clear the message after a delay
 */
export const ErrorAndSuccess = (props: Props) => {
  const {
    clearMessageFn: clearMessage,
    constainerClassName,
    delay = 5000,
    error,
    success,
  } = props

  // Clears the message after the delay
  useEffect(() => {
    if (clearMessage !== undefined) {
      const interval = setInterval(() => {
        clearMessage()
      }, delay)
      return () => clearInterval(interval)
    }
  }, [])

  return (
    <div className={cn(constainerClassName)}>
      {error.length > 0 && <span className="text-red-600 mb-4">{error}</span>}
      {success.length > 0 && (
        <span className="text-green-500 mb-4">{success}</span>
      )}
    </div>
  )
}
