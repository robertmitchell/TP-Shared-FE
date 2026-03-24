import { PlusCircleIcon } from '@heroicons/react/24/outline'

import { Button } from '@/Common/Components/Button'

type Props = {
  description: string
  disabled?: boolean
  isEditing: boolean
  addNumForms: () => void
  title: string
}

export const SectionHeader = (props: Props) => {
  const { description, disabled, isEditing, addNumForms, title } = props

  return (
    <div className="flex flex-col ml-2 sm:ml-0">
      <div className="items-center">
        <h3 className="flex text-lg font-medium leading-6 text-gray-900">
          {title}
        </h3>
        <span className="flex mt-1 text-sm text-gray-500 italic mb-4">
          {description}
        </span>

        {isEditing && (
          <Button onClick={addNumForms} disabled={disabled}>
            <PlusCircleIcon
              className="mr-4 shrink-0 h-6 w-6"
              aria-hidden="true"
            />
            Add New
          </Button>
        )}
      </div>
    </div>
  )
}
