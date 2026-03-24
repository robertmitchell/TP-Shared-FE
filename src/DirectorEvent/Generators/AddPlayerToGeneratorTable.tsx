import cn from 'classnames'
import { PaginatedList } from 'react-paginated-list'

import type { GeneratorPlayer, SetState } from '@/Common/Common.types'
import { TEN_ITEMS_PER_PAGE } from './AddPlayerToGeneratorTable.constants'

import { getIsDesktop } from '@/Common/Utils/getIsDesktop'
import { getIsMobile } from '@/Common/Utils/getIsMobile'

import { TextInput } from '@/Common/Components/TextInput'

import { ControlContainer } from '@/Common/Utils/paginationStyles'

type Props = {
  generatorPlayers: GeneratorPlayer[]
  isPlayer: boolean
  setWeights: SetState<number[]>
  weights: number[]
}

/**
 * List of players to be added to the Generator
 * TODO THE RENDER OF THIS COULD USE SOME CLEANUP
 */
export const AddPlayerToGeneratorTable = (props: Props) => {
  const { generatorPlayers, isPlayer, setWeights, weights } = props

  const isMobile = getIsMobile()

  if (isMobile) {
    return (
      <main>
        <div>
          <PaginatedList
            ControlContainer={ControlContainer}
            displayNumbers={generatorPlayers.length > TEN_ITEMS_PER_PAGE}
            itemsPerPage={TEN_ITEMS_PER_PAGE}
            list={generatorPlayers}
            useMinimalControls
            renderList={(list) => (
              <>
                {list.map((person, index) => (
                  <div
                    key={`${person.uid}_${index}`}
                    className={cn(
                      `p-2 mt-2 rounded-lg shadow divide-y divide-gray-200 ${
                        index % 2 === 0 ? 'bg-blue-100' : 'bg-gray-100'
                      }`,
                    )}
                  >
                    <TextInput
                      isEditing={!isPlayer}
                      labelText={person.name}
                      onChange={(e) => {
                        const newWeights = [...weights]
                        newWeights[index] = e.currentTarget.valueAsNumber || 0
                        setWeights(newWeights)
                      }}
                      type="number"
                      value={weights[index]}
                    />
                  </div>
                ))}
              </>
            )}
          />
        </div>
      </main>
    )
  }

  const isDesktop = getIsDesktop()

  if (isDesktop) {
    const numPlayers = generatorPlayers.length
    const part1 = generatorPlayers.slice(0, Math.floor(numPlayers / 3))
    const part2 = generatorPlayers.slice(
      Math.floor(numPlayers / 3),
      Math.floor((2 * numPlayers) / 3),
    )
    const part3 = generatorPlayers.slice(Math.floor((2 * numPlayers) / 3))

    const offset2 = Math.floor(numPlayers / 3)
    const offset3 = Math.floor((2 * numPlayers) / 3)

    return (
      <main>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <PaginatedList
            ControlContainer={ControlContainer}
            displayNumbers={part1.length > TEN_ITEMS_PER_PAGE}
            itemsPerPage={TEN_ITEMS_PER_PAGE}
            list={part1}
            useMinimalControls
            renderList={(list) => (
              <>
                {list.map((person, index) => (
                  <div
                    key={`${person.uid}_${index}`}
                    className={cn(
                      `p-2 mt-2 rounded-lg shadow divide-y divide-gray-200 ${
                        index % 2 === 0 ? 'bg-blue-100' : 'bg-gray-100'
                      }`,
                    )}
                  >
                    <TextInput
                      isEditing={!isPlayer}
                      labelText={person.name}
                      onChange={(e) => {
                        const newWeights = [...weights]
                        newWeights[index] = e.currentTarget.valueAsNumber || 0
                        setWeights(newWeights)
                      }}
                      type="number"
                      value={weights[index]}
                    />
                  </div>
                ))}
              </>
            )}
          />

          <PaginatedList
            ControlContainer={ControlContainer}
            displayNumbers={part2.length > TEN_ITEMS_PER_PAGE}
            itemsPerPage={TEN_ITEMS_PER_PAGE}
            list={part2}
            useMinimalControls
            renderList={(list) => (
              <>
                {list.map((person, index) => (
                  <div
                    key={`${person.uid}_${index}`}
                    className={cn(
                      `p-2 mt-2 rounded-lg shadow divide-y divide-gray-200 ${
                        index % 2 === 0 ? 'bg-blue-100' : 'bg-gray-100'
                      }`,
                    )}
                  >
                    <TextInput
                      isEditing={!isPlayer}
                      labelText={person.name}
                      onChange={(e) => {
                        const newWeights = [...weights]
                        newWeights[index + offset2] =
                          e.currentTarget.valueAsNumber || 0
                        setWeights(newWeights)
                      }}
                      type="number"
                      value={weights[index + offset2]}
                    />
                  </div>
                ))}
              </>
            )}
          />

          <PaginatedList
            ControlContainer={ControlContainer}
            displayNumbers={part3.length > TEN_ITEMS_PER_PAGE}
            itemsPerPage={TEN_ITEMS_PER_PAGE}
            list={part3}
            useMinimalControls
            renderList={(list) => (
              <>
                {list.map((person, index) => (
                  <div
                    key={`${person.uid}_${index}`}
                    className={cn(
                      `p-2 mt-2 rounded-lg shadow divide-y divide-gray-200 ${
                        index % 2 === 0 ? 'bg-blue-100' : 'bg-gray-100'
                      }`,
                    )}
                  >
                    <TextInput
                      isEditing={!isPlayer}
                      labelText={person.name}
                      onChange={(e) => {
                        const newWeights = [...weights]
                        newWeights[index + offset3] =
                          e.currentTarget.valueAsNumber || 0
                        setWeights(newWeights)
                      }}
                      type="number"
                      value={weights[index + offset3]}
                    />
                  </div>
                ))}
              </>
            )}
          />
        </div>
      </main>
    )
  }

  const numPlayers = generatorPlayers.length
  const part1 = generatorPlayers.slice(0, Math.floor(numPlayers / 2))
  const part2 = generatorPlayers.slice(
    Math.floor(numPlayers / 2),
    Math.floor((2 * numPlayers) / 2),
  )
  const offset = Math.floor(numPlayers / 2)

  // Tablet
  return (
    <main>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <PaginatedList
          ControlContainer={ControlContainer}
          displayNumbers={part1.length > TEN_ITEMS_PER_PAGE}
          itemsPerPage={TEN_ITEMS_PER_PAGE}
          list={part1}
          useMinimalControls
          renderList={(list) => (
            <>
              {list.map((person, index) => (
                <div
                  key={`${person.uid}_${index}`}
                  className={cn(
                    `p-2 mt-2 rounded-lg shadow divide-y divide-gray-200 ${
                      index % 2 === 0 ? 'bg-blue-100' : 'bg-gray-100'
                    }`,
                  )}
                >
                  <TextInput
                    isEditing={!isPlayer}
                    labelText={person.name}
                    onChange={(e) => {
                      const newWeights = [...weights]
                      newWeights[index] = e.currentTarget.valueAsNumber || 0
                      setWeights(newWeights)
                    }}
                    type="number"
                    value={weights[index]}
                  />
                </div>
              ))}
            </>
          )}
        />

        <PaginatedList
          ControlContainer={ControlContainer}
          displayNumbers={part2.length > TEN_ITEMS_PER_PAGE}
          itemsPerPage={TEN_ITEMS_PER_PAGE}
          list={part2}
          useMinimalControls
          renderList={(list) => (
            <>
              {list.map((person, index) => (
                <div
                  key={`${person.uid}_${index}`}
                  className={cn(
                    `p-2 mt-2 rounded-lg shadow divide-y divide-gray-200 ${
                      index % 2 === 0 ? 'bg-blue-100' : 'bg-gray-100'
                    }`,
                  )}
                >
                  <TextInput
                    isEditing={!isPlayer}
                    labelText={person.name}
                    onChange={(e) => {
                      const newWeights = [...weights]
                      newWeights[index + offset] =
                        e.currentTarget.valueAsNumber || 0
                      setWeights(newWeights)
                    }}
                    type="number"
                    value={weights[index + offset]}
                  />
                </div>
              ))}
            </>
          )}
        />
      </div>
    </main>
  )
}
