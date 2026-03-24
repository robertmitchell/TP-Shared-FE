import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { Updater, useImmer } from 'use-immer'

import { EventData, GenericFormState } from '@/Common/Common.types'

import {
  getInitialGeneratorData,
  saveGenerator,
} from './NewGeneratorModal.helpers'

import { AddPlayerToGeneratorTable } from './AddPlayerToGeneratorTable'
import { BoxInput } from '@/Common/Components/BoxInput'
import { Button } from '@/Common/Components/Button'
import { ErrorAndSuccess } from '@/Common/Components/ErrorAndSuccess'
import { Modal } from '@/Common/Components/Modal'
import { TextInput } from '@/Common/Components/TextInput'

type Props = {
  eventData: EventData
  formState: GenericFormState
  isPlayer: boolean
  onClose: () => void
  setFormState: Updater<GenericFormState>
}

/**
 * Allows a Director to create a new Generator
 */
export const NewGeneratorModal = (props: Props) => {
  const { eventData, formState, isPlayer, onClose, setFormState } = props

  const [generatorData, setGeneratorData] = useImmer(
    getInitialGeneratorData(eventData),
  )

  const [weights, setWeights] = useState(
    generatorData.generatorPlayers.map((player) => player.weight),
  )

  return (
    <Modal onClose={onClose}>
      <div>
        <Dialog.Title as="h3" className="text-center text-xl font-medium mb-2">
          Create A New Random Generator
        </Dialog.Title>
      </div>

      <TextInput
        isEditing={!isPlayer}
        labelText="Random Generator Name"
        description="How will you reference this?"
        onChange={(e) =>
          setGeneratorData((draft) => {
            draft.name = e.target.value
          })
        }
        required
        value={generatorData.name}
      />

      <BoxInput
        isEditing={!isPlayer}
        labelText="Additional Notes"
        description="Anything additional to note about why you needed to choose a player at random"
        value={generatorData.note}
        onChange={(e) =>
          setGeneratorData((draft) => {
            draft.note = e.target.value
          })
        }
      />

      <AddPlayerToGeneratorTable
        generatorPlayers={generatorData.generatorPlayers}
        isPlayer={isPlayer}
        setWeights={setWeights}
        weights={weights}
      />

      <ErrorAndSuccess
        error={formState.error}
        success={formState.success}
        clearMessageFn={() =>
          setFormState((draft) => {
            draft.error = ''
            draft.success = ''
          })
        }
      />

      <Button
        className="mt-4"
        disabled={generatorData.name.length < 1}
        onClick={() =>
          saveGenerator(eventData, generatorData, setFormState, weights)
        }
      >
        Save Random Generator
      </Button>
    </Modal>
  )
}
