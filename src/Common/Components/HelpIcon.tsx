import { QuestionMarkCircleIcon } from '@heroicons/react/20/solid'

type Props = {
  slug?: string // should start with a hash. IE: '#create_event'
}

/**
 * Help icon that links to the support website and optionally a slug on the page
 */
export const HelpIcon = (props: Props) => {
  const { slug = '' } = props

  if (slug.length === 0) {
    return null
  }

  return (
    <QuestionMarkCircleIcon
      className="ml-2 h-6 w-6 text-amber-500"
      onClick={() =>
        window.open(`https://tournamentplanet.io/support/${slug}`, '_blank')
      }
    />
  )
}
