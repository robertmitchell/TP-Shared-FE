import { ReactNode } from 'react'
import cn from 'classnames'
import { InformationCircleIcon } from '@heroicons/react/20/solid'

import type { DropdownData } from './Dropdown.types'

import { TextInput } from '@/Common/Components/TextInput'
import { Tooltip } from '@/Common/Components/Tooltip'

type Props = {
  children?: ReactNode // Should only be used for a Popover
  className?: string
  containerClassName?: string
  descClassName?: string // Styling for the description
  description?: string
  isEditing: boolean
  items: string[] | DropdownData[]
  labelText: string
  numActive?: number
  onChange: (e: any) => void
  tooltipText?: string
  value: string | number
}

/**
 * Reusable dropdown component
 */
export const Dropdown = (props: Props) => {
  const {
    children,
    className = '',
    containerClassName = '',
    descClassName,
    description,
    isEditing,
    items,
    labelText,
    numActive = items.length,
    onChange,
    tooltipText = '',
    value,
  } = props

  if (isEditing) {
    return (
      <div className={cn('col-span-6 sm:col-span-3', containerClassName)}>
        <label
          className="flex mt-1 md:mr-2 text-sm font-medium text-gray-700"
          htmlFor={labelText}
        >
          {tooltipText.length > 0 && (
            <Tooltip tooltipText={tooltipText}>
              <InformationCircleIcon
                aria-hidden="true"
                className="shrink-0 h-4 w-4"
                onClick={(e: React.FormEvent) => e.preventDefault()}
                onSubmit={(e: React.FormEvent) => e.preventDefault()}
              />
            </Tooltip>
          )}

          {labelText}

          {description !== undefined && (
            <span
              className={cn('ml-2 text-gray-500 italic text-xs', descClassName)}
              id={description}
            >
              {description}
            </span>
          )}

          {children}
        </label>
        <select
          className={cn(
            'cursor-pointer mt-1 pl-3 pr-10 py-2 text-base border-gray-300 sm:text-sm rounded-md focus:ring-amber-400 focus:border-amber-400',
            className,
            { 'border-red-600 border-2': value === 'NA' },
          )}
          id={labelText}
          name={labelText}
          onChange={onChange}
          value={value}
        >
          {items.map((item, index) => (
            <option
              className="border-red-600"
              disabled={index >= numActive}
              key={index}
            >
              {typeof item === 'string' ? item : item.name}
            </option>
          ))}
        </select>
      </div>
    )
  }

  return (
    <TextInput
      description={description}
      isEditing={isEditing}
      labelText={labelText}
      tooltipText={tooltipText}
      value={value}
    />
  )
}
