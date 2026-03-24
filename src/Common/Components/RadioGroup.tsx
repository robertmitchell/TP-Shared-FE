import cn from 'classnames'
import { InformationCircleIcon } from '@heroicons/react/20/solid'

import { Tooltip } from '@/Common/Components/Tooltip'

type Props = {
  className?: string
  description?: string
  isEditing: boolean
  items: string[]
  labelText: string
  onChange: (e: any) => void
  tooltipText?: string
  value: string | number
  vertical?: boolean
}

/**
 * Reusable component for adding radio buttons to a form
 */
export const RadioGroup = (props: Props) => {
  const {
    className = '',
    description,
    isEditing,
    labelText,
    items,
    onChange,
    tooltipText = '',
    value,
    vertical = false,
  } = props

  return (
    <div className={cn('mb-4 col-span-6 sm:col-span-3', className)}>
      <label
        className="text-base font-medium text-gray-900"
        htmlFor={labelText}
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
      </label>
      <p className="text-sm leading-5 text-gray-500">{description}</p>

      <fieldset className="mt-4">
        <legend className="sr-only">{labelText}</legend>
        <div
          className={`sm:flex space-y-4 sm:items-start sm:space-y-0 ${
            vertical ? 'flex-col' : 'sm:space-x-10'
          }`}
        >
          {items.map((item) => {
            // Don't show the other options if not editable
            if (!isEditing && item !== value) {
              return null
            }

            return (
              <div key={item} className="flex items-center">
                <input
                  disabled={!isEditing}
                  name={item}
                  type="radio"
                  value={item}
                  checked={item === value}
                  onChange={onChange}
                  className="focus:ring-amber-400 h-4 w-4border-gray-300"
                />
                <label
                  htmlFor={item}
                  className="ml-3 block text-sm font-medium text-gray-700"
                >
                  {item}
                </label>
              </div>
            )
          })}
        </div>
      </fieldset>
    </div>
  )
}
