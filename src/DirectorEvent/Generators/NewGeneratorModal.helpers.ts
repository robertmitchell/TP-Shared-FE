import type { Updater } from 'use-immer'
import { v4 as uuidv4 } from 'uuid'

import {
  EventData,
  GeneratorData,
  GeneratorPlayer,
  GenericFormState,
  GenericFormStatus,
} from '@/Common/Common.types'

/**
 * The initial shape of the data for a Generator
 */
export const getInitialGeneratorData = (
  eventData: EventData,
): GeneratorData => ({
  name: '',
  note: '',
  generatorPlayers: buildInitialSelectedPlayers(eventData),
  uid: uuidv4(),
  winners: [],
})

/**
 * Builds a list of generator players from guestPlayers
 */
const buildInitialSelectedPlayers = (eventData: EventData) => {
  const generatorPlayer: GeneratorPlayer[] = []

  return generatorPlayer
}

/**
 * Saves a new generator
 * Merges the weights that were saved separately for performance
 */
export const saveGenerator = async (
  eventData: EventData,
  generatorData: GeneratorData,
  setFormState: Updater<GenericFormState>,
  weights: number[],
) => {
  setFormState({
    error: 'This logic has been removed',
    status: GenericFormStatus.Error,
    success: '',
  })
}
