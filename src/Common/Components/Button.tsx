import { ButtonHTMLAttributes, ReactNode } from 'react'
import cn from 'classnames'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode

  // Primary - the main app color
  // Secondary - a plain white button
  // Tertiary - a text only buttton
  // Danger - a red button
  // Green - a green button
  variant?:
    | 'primary'
    | 'secondary'
    | 'danger'
    | 'black'
    | 'text'
    | 'dangertext'
    | 'link'
  fullWidth?: boolean
  className?: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  onClick?: () => void
}

/**
 * Reusable button
 */
export const Button = (props: ButtonProps) => {
  const {
    children,
    variant = 'primary',
    fullWidth: fullWidth = false,
    className = '',
    type = 'button',
    disabled,
    onClick,
    ...htmlProps
  } = props

  return (
    <button
      {...htmlProps}
      disabled={disabled}
      type={type}
      onClick={onClick}
      className={cn({
        // Common to all
        'px-4 py-2 h-10 whitespace-nowrap inline-flex items-center justify-center rounded-md text-base font-medium':
          true,

        // All but Text
        'border shadow-sm':
          variant !== 'text' && variant !== 'dangertext' && variant !== 'link',

        // Primary
        'text-black border-transparent bg-gradient-to-r from-amber-400 to-yellow-500 bg-origin-border hover:from-yellow-500 hover:to-amber-400 disabled:from-gray-500 disabled:to-gray-500':
          variant === 'primary',

        // Secondary
        'text-gray-700 border-gray-300 bg-gray-100 hover:bg-gray-200 hover:text-gray-900 disabled:bg-gray-400':
          variant === 'secondary',

        // Danger
        'text-white border-transparent bg-red-600 hover:bg-red-700 focus:ring-red-500 disabled:bg-gray-400':
          variant === 'danger',

        // Black
        'text-white border-transparent bg-gray-700 hover:bg-gray-800 disabled:bg-gray-400':
          variant === 'black',

        // Text
        'text-black hover:text-gray-900 focus:ring-gray-500':
          variant === 'text',

        // Danger Text
        'text-red-600 hover:text-gray-900 text-sm border-transparent':
          variant === 'dangertext',

        // Link
        'text-indigo-600 hover:text-indigo-500': variant === 'link',

        // Full Width
        'w-full': fullWidth,

        // Overides
        [className]: true,
      })}
    >
      {children}
    </button>
  )
}
