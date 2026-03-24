import { HTMLInputTypeAttribute, TextareaHTMLAttributes } from 'react'
import cn from 'classnames'
import { InformationCircleIcon } from '@heroicons/react/20/solid'

import { Tooltip } from '@/Common/Components/Tooltip'

type AreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  className?: string
  description?: string
  // Optional styling for the description
  descClassName?: string
  hide?: boolean
  isEditing: boolean
  labelText: string
  onChange?: (e: any) => void
  placeholder?: string
  required?: boolean
  // Type of text input. Defaults to `text`
  tooltipText?: string
  type?: HTMLInputTypeAttribute
  // Optional tooltip text
  value: string | number
}

/**
 * Reusable multiline input field with label
 */
export const TextArea = (props: AreaProps) => {
  const {
    className = '',
    descClassName,
    description,
    hide,
    isEditing,
    labelText,
    value,
    onChange,
    placeholder,
    required = false,
    tooltipText = '',
    type = 'text',
    ...htmlProps
  } = props

  if (hide) {
    return null
  }

  return (
    <div className={cn('col-span-6 sm:col-span-3', className)}>
      <label
        htmlFor={labelText}
        className="mt-1 block text-sm font-bold text-gray-700 text-left"
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
        {isEditing && required && <span className="text-red-500">{''}* </span>}
        <span
          id={description}
          className={cn('ml-2 text-gray-500 italic text-xs', descClassName)}
        >
          {description !== undefined ? `${description}` : ''}
        </span>
      </label>
      {isEditing ? (
        <textarea
          {...htmlProps}
          className={cn(
            'mt-1 focus:ring-amber-400 focus:border-amber-400 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md',
            { 'border-red-500': required && !value },
          )}
          id={labelText}
          name={labelText}
          onChange={onChange}
          onFocus={(e) => e.currentTarget.select()} // select all the text when highlighting the field
          onWheel={(e) => e.currentTarget.blur()} // prevent the wheel from scrolling the value for number inputs
          placeholder={placeholder}
          value={value}
        />
      ) : (
        <span className="text-sm font-medium text-gray-600">
          {value || 'Not Provided'}
        </span>
      )}
    </div>
  )
}
