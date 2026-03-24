import { HTMLInputTypeAttribute, InputHTMLAttributes, forwardRef } from 'react'
import cn from 'classnames'
import { InformationCircleIcon } from '@heroicons/react/20/solid'

import { Tooltip } from '@/Common/Components/Tooltip'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  required?: boolean
  isEditing: boolean
  labelText: string
  value: string | number
  onChange?: (e: any) => void
  description?: string
  // Optional styling for the description
  descClassName?: string
  placeholder?: string
  hide?: boolean
  // Type of text input. Defaults to `text`
  type?: HTMLInputTypeAttribute
  className?: string
  // Optional tooltip text
  tooltipText?: string
}

/**
 * Reusable input field with label
 */
export const TextInput = forwardRef<HTMLInputElement, InputProps>(
  (props: InputProps, ref) => {
    const {
      required = false,
      isEditing,
      labelText,
      value,
      onChange,
      description,
      descClassName,
      placeholder,
      hide,
      type = 'text',
      className = '',
      tooltipText = '',
      ...htmlProps
    } = props

    if (hide) {
      return null
    }

    return (
      <div className={cn('col-span-6 sm:col-span-3', className)}>
        <label
          htmlFor={labelText}
          className="mt-1 block text-sm font-medium text-gray-700 text-left"
        >
          {tooltipText.length > 0 && (
            <Tooltip tooltipText={tooltipText}>
              <InformationCircleIcon
                className="shrink-0 h-4 w-4"
                aria-hidden="true"
                onSubmit={(e: React.FormEvent) => e.preventDefault()}
                onClick={(e: React.FormEvent) => e.preventDefault()}
              />
            </Tooltip>
          )}
          {labelText}
          {isEditing && required && (
            <span className="text-red-600">{''}* </span>
          )}
          <span
            id={description}
            className={cn('ml-2 text-gray-500 italic text-xs', descClassName)}
          >
            {description !== undefined ? `${description}` : ''}
          </span>
        </label>
        {isEditing ? (
          <input
            {...htmlProps}
            className={cn(
              'mt-1 focus:ring-amber-400 focus:border-amber-400 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md',
              { 'border-red-600': required && !value },
            )}
            id={labelText}
            name={labelText}
            onChange={onChange}
            onFocus={(e) => e.currentTarget.select()} // select all the text when highlighting the field
            onWheel={(e) => e.currentTarget.blur()} // prevent the wheel from scrolling the value for number inputs
            placeholder={placeholder}
            ref={ref}
            type={type}
            value={value}
          />
        ) : (
          <span className="text-sm font-medium text-gray-600">
            {value || 'Not Entered'}
          </span>
        )}
      </div>
    )
  },
)
