type Props = {
  description?: string
  isEditing: boolean
  labelText: string
  onChange: (e: any) => void
  value: string
}

/**
 * Reusable box input component
 */
export const BoxInput = (props: Props) => {
  const { description, isEditing, labelText, onChange, value } = props

  return (
    <div className="col-span-6 sm:col-span-3">
      <label
        htmlFor={labelText}
        className="block text-sm font-medium text-gray-700"
      >
        {labelText}
      </label>
      <div className="mt-1">
        {isEditing ? (
          <textarea
            id={labelText}
            name={labelText}
            rows={3}
            value={value}
            onChange={onChange}
            className="shadow-sm focus:ring-amber-500 focus:border-amber-500 block w-full sm:text-sm border border-gray-300 rounded-md"
          />
        ) : (
          <span className="text-sm font-medium text-gray-600">
            {value || 'Not Entered'}
          </span>
        )}
      </div>
      <p className="mt-2 text-sm text-gray-500">{description} </p>
    </div>
  )
}
