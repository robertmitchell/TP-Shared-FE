import { ExclamationCircleIcon } from '@heroicons/react/20/solid'

/**
 * Shows notifications on the Director Dashboard about what is new
 */
export const WhatsNew = () => {
  return (
    <div className="p-2 mb-2 items-center shadow rounded-md bg-white">
      <div className="flex">
        <ExclamationCircleIcon
          className="shrink-0 h-6 w-6 text-amber-400"
          aria-hidden="true"
          onSubmit={(e: React.FormEvent) => e.preventDefault()}
          onClick={(e: React.FormEvent) => e.preventDefault()}
        />
        <h2 className="text-bold text-lg">Latest changes/updates:</h2>
      </div>

      <div>
        <ul className="list-disc ml-3">
          <li>
            Fixed an issue with Round Robin print results not displaying the
            correct number of results requested.
          </li>
          <li>
            Fixed an issue with Round Robin not having the correct numbers for
            their final results ranking.
          </li>
          <li>
            Limiting Double Elimination Singles to 8 player maximum due to an
            issue with large brackets.
          </li>
          <li>
            Added a clarification label for ending tournaments - Thanks for the
            suggestion from Stacie W.
          </li>
          <li>
            Fixed an issue with Eliminator brackets with a large number of
            players.
          </li>
        </ul>
      </div>
    </div>
  )
}
