import { EventData } from '@/Common/Common.types'

/**
 * Gets the tab index based on the tab's label
 * For use in a Dropdown
 */
export const getTabIndex = (selected: string) => {
  switch (selected) {
    case 'Players':
      return 0

    case 'Teams':
      return 1

    case 'Scores':
      return 2

    case 'Games':
      return 3

    case 'Tournaments':
      return 4

    case 'Brackets':
      return 5

    case 'Details':
      return 6

    case 'Results':
      return 7

    case 'Generator':
      return 8

    // case 'Leagues':
    //   return 9

    default:
      return 0
  }
}

export const getTabValue = (index: number) => {
  switch (index) {
    case 0:
      return 'Players'

    case 1:
      return 'Teams'

    case 2:
      return 'Scores'

    case 3:
      return 'Games'

    case 4:
      return 'Tournaments'

    case 5:
      return 'Brackets'

    case 6:
      return 'Details'

    case 7:
      return 'Results'

    case 8:
      return 'Generator'

    default:
      return 'Players'
  }
}

/**
 * Enables generators in the database
 * TODO THIS IS TEMPORARY AND NEEDS TO BE REMOVED
 */
export const enableGenerators = (eventData: EventData) => {}
