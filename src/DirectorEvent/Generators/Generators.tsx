import { useState } from 'react'
import { useImmer } from 'use-immer'

import { GenericFormStatus, EventData } from '@/Common/Common.types'

import { getInitialGenericFormState } from '@/Common/Utils/UtilityFunctions'
import { chooseRandomPlayer } from './Generators.helpers'

import { Button } from '@/Common/Components/Button'
import { Card } from '@/Common/Components/Card'
import { LoadingModal } from '@/Common/Components/LoadingModal'
import { NewGeneratorModal } from './NewGeneratorModal'

type Props = {
  eventData: EventData
  isPlayer?: boolean
}

/**
 * Used for Generating a random player
 */
export const Generators = (props: Props) => {
  const { eventData, isPlayer = false } = props

  const [newModal, setNewModal] = useState(false)
  const [formState, setFormState] = useImmer(
    getInitialGenericFormState(GenericFormStatus.Success),
  )

  const { generators } = eventData

  return (
    <section>
      <h3 className="text-2xl font-medium mb-6">Generate a player at random</h3>
      <p>
        Use this to pick a player at random from a list. You can add weights to
        the player as needed. The possibilities are endless and only limited by
        your imagination.
      </p>

      <p className="mt-4 font-medium">Possible usages could include:</p>
      <ul className="list-disc ml-3">
        <li>
          Two player are tied and there isn't time for a rolloff or tiebreaker.
          Choose the winner randomly.
        </li>
        <li>
          Two players requested to be in a bracket, but you only have one spot
          remaining. Choose one of them at random.
        </li>
      </ul>

      {!isPlayer && (
        <Button className="mt-8" onClick={() => setNewModal(true)}>
          Create New Generator
        </Button>
      )}

      {generators.map((generator, index) => (
        <Card className="my-2" key={`${generator.name}_${index}`}>
          <h3 className="text-xl font-medium">Generator: {generator.name}</h3>

          <h4 className="mt-4 text-lg font-medium text-center underline">
            Players:
          </h4>
          {generator.generatorPlayers === undefined ? (
            <h4 className="mt-4 text-lg font-medium text-center underline">
              No players have been added yet
            </h4>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-6">
              {generator.generatorPlayers.map((player, playerIndex) => (
                <div
                  className="my-2 col-span-6 sm:col-span-3"
                  key={`${player.name}_${player.weight}_${playerIndex}`}
                >
                  <div>
                    <span className="font-medium">Name:</span> {player.name}
                  </div>
                  <div>
                    <span className="font-medium">Weight:</span> {player.weight}
                  </div>
                </div>
              ))}
            </div>
          )}

          {generator.winners === undefined ? (
            <h4 className="mt-4 text-lg font-medium text-center underline">
              Press the "Choose New Random Player" button to show the chosen
              player/s
            </h4>
          ) : (
            <>
              <h4 className="mt-4 text-lg font-medium text-center underline">
                Chosen Player/s:
              </h4>
              <div className="grid grid-cols-3 sm:grid-cols-6">
                {generator.winners.map((winner, winnerIndex) => (
                  <div
                    className="my-2 col-span-6 sm:col-span-3"
                    key={`${winner.name}_${winner.weight}_${winnerIndex}`}
                  >
                    <div>
                      <span className="font-medium">Name:</span> {winner.name}
                    </div>
                    <div>
                      <span className="font-medium">Weight:</span>{' '}
                      {winner.weight}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {!isPlayer && (
            <Button
              className="mt-8"
              onClick={() =>
                chooseRandomPlayer(eventData, generator, setFormState)
              }
            >
              Choose New Random Player
            </Button>
          )}
        </Card>
      ))}

      {newModal && (
        <NewGeneratorModal
          eventData={eventData}
          formState={formState}
          isPlayer={isPlayer}
          onClose={() => setNewModal(false)}
          setFormState={setFormState}
        />
      )}

      {formState.status === GenericFormStatus.Loading && (
        <LoadingModal displayText="Ending Event. Please wait..." />
      )}
    </section>
  )
}
