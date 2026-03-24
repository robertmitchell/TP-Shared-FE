import cn from 'classnames'

type Props = {
  containerClassName?: string
  descClassName?: string
  description?: string
  isEditing: boolean
  isChecked: boolean
  labelText: string
  onChange: Function
}

export const Checkbox = (props: Props) => {
  const {
    containerClassName,
    descClassName,
    description,
    isEditing,
    isChecked,
    labelText,
    onChange,
  } = props

  return (
    <div className="col-span-6 sm:col-span-6">
      <legend className="sr-only">{labelText}</legend>
      <div className={cn('flex items-start', containerClassName)}>
        <div className="flex items-center h-5">
          <input
            id={labelText}
            aria-describedby={labelText}
            name={labelText}
            type="checkbox"
            checked={isChecked}
            onChange={() => {
              if (isEditing) onChange()
            }}
            className={cn(
              'h-4 w-4 text-black border-gray-300 rounded',
              isEditing
                ? 'focus:ring-amber-400'
                : 'focus:ring-0 focus:ring-transparent',
            )}
          />
        </div>
        <div className="ml-3 text-sm text-left">
          <label htmlFor={labelText} className="font-medium text-gray-700">
            {labelText}
          </label>
          <span
            id={description}
            className={cn('ml-2 text-gray-500 italic text-xs', descClassName)}
          >
            {description !== undefined ? `${description}` : ''}
          </span>
        </div>
      </div>
    </div>
  )
}
