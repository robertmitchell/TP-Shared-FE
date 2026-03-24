import { useState } from 'react'
import { getAuth } from 'firebase/auth'
import { useLocation } from 'react-router-dom'
import { Updater, useImmer } from 'use-immer'
import QRCode from 'react-qr-code'

import {
  GenericFormStatus,
  EventData,
  TLBViewStatus,
} from '@/Common/Common.types'
import { EVENT_TEXT } from './EventDetails.constants'

import { getInitialGenericFormState } from '@/Common/Utils/UtilityFunctions'
import { saveEventDetailsChanges } from './EventDetails.helpers'

import { BoxInput } from '@/Common/Components/BoxInput'
import { Button } from '@/Common/Components/Button'
import { Checkbox } from '@/Common/Components/Checkbox'
import { EventQRCodePrintModal } from './EventQRCodePrintModal'
import { HelpIcon } from '@/Common/Components/HelpIcon'
import { PhotoUpload } from '@/Common/Components/PhotoUpload'
import { StickyFooter } from '@/Common/Components/StickyFooter'
import { TextInput } from '@/Common/Components/TextInput'

type Props = {
  eventData: EventData
  isPlayer?: boolean
  setEventData: Updater<EventData>
  tLBViewStatus: TLBViewStatus
}

export const EventDetails = (props: Props) => {
  const { eventData, isPlayer = false, setEventData, tLBViewStatus } = props

  const [formState, setFormState] = useImmer(
    getInitialGenericFormState(GenericFormStatus.Success),
  )
  const [showPrintModal, setShowPrintModal] = useState(false)

  const [isEditing, setIsEditing] = useState(
    tLBViewStatus === TLBViewStatus.Create ||
      tLBViewStatus === TLBViewStatus.Editing,
  )

  // The `directorUID` needs to be passed into the QR code so that players
  // can know where to lookup the information in the database
  let directorUID = ''
  if (isPlayer) {
    const location = useLocation()
    directorUID = location.state.directorUID
  } else {
    const user = getAuth().currentUser
    if (!user) {
      setFormState({
        error: 'Please log in and try again. Error Code: EDTSX_001',
        success: '',
        status: GenericFormStatus.Error,
      })
    } else {
      directorUID = user.uid
    }
  }

  const qrCodeString = `https://tournamentplanetapp.com/events/event/${eventData.eventDetails.id}/${directorUID}`

  return (
    <div className="bg-white drop-shadow-md rounded-md px-0 my-4 sm:rounded-lg sm:px-6">
      <div className="py-2">
        <h3 className="flex text-lg font-medium leading-6 text-gray-900 ml-2 sm:ml-0">
          Event Details
        </h3>
        {!isPlayer && (
          <>
            <p className="mt-1 text-sm text-gray-500 italic ml-2 sm:ml-0">
              {EVENT_TEXT.DESCRIPTION_1}
            </p>
            <p className="mt-1 text-sm text-gray-500 italic ml-2 sm:ml-0">
              {EVENT_TEXT.DESCRIPTION_2}
            </p>
          </>
        )}
      </div>

      <div className="md:mt-0 md:col-span-2">
        <div className="grid grid-cols-6 gap-6 my-4 mx-2 sm:mx-0">
          <TextInput
            required
            autoFocus
            isEditing={isEditing}
            labelText="Event Name"
            tooltipText={isPlayer ? '' : EVENT_TEXT.NAME}
            value={eventData.eventDetails.name}
            onChange={(e) =>
              setEventData((draft) => {
                draft.eventDetails.name = e.target.value
              })
            }
          />

          <TextInput
            type="date"
            isEditing={isEditing}
            labelText="Start Date"
            value={eventData.eventDetails.date}
            onChange={(e) =>
              setEventData((draft) => {
                draft.eventDetails.date = e.target.value
              })
            }
          />

          <TextInput
            isEditing={isEditing}
            labelText="Location"
            value={eventData.eventDetails.location}
            onChange={(e) =>
              setEventData((draft) => {
                draft.eventDetails.location = e.target.value
              })
            }
          />

          <BoxInput
            isEditing={isEditing}
            labelText="Description"
            value={eventData.eventDetails.description}
            onChange={(e) =>
              setEventData((draft) => {
                draft.eventDetails.description = e.target.value
              })
            }
          />

          <PhotoUpload hide />

          {/* <Checkbox
              isEditing={isEditing}
              labelText="Notifications Enabled"
              description="We'll notifications to players after updates."
              isChecked={eventData.eventDetails.areNotificationsEnabled}
              onChange={() =>
                setEventData((draft) => {
                  draft.eventDetails.areNotificationsEnabled =
                    !eventData.eventDetails.areNotificationsEnabled
                })
              }
            />

            <Checkbox
              isEditing={isEditing}
              labelText="Private/Unlisted"
              description="Making the event private prevents others from finding it."
              isChecked={eventData.eventDetails.isPrivate}
              onChange={() =>
                setEventData((draft) => {
                  draft.eventDetails.isPrivate =
                    !eventData.eventDetails.isPrivate
                })
              }
            /> */}
        </div>

        <div className="grid grid-cols-6 gap-6 my-4 mx-2 sm:mx-0">
          <h2 className="col-span-6 text-center text-xl font-medium">
            Director's Info
          </h2>

          <TextInput
            isEditing={isEditing}
            labelText="Payment Link"
            value={eventData.eventDetails.paymentLink}
            description="You can send payments here to enroll in the event."
            onChange={(e) =>
              setEventData((draft) => {
                draft.eventDetails.paymentLink = e.target.value
              })
            }
          />

          <TextInput
            isEditing={isEditing}
            labelText="Director Name"
            value={eventData.eventDetails.directorInfo.name}
            onChange={(e) =>
              setEventData((draft) => {
                draft.eventDetails.directorInfo.name = e.target.value
              })
            }
          />

          <TextInput
            isEditing={isEditing}
            labelText="Director Phone"
            value={eventData.eventDetails.directorInfo.phone}
            onChange={(e) =>
              setEventData((draft) => {
                draft.eventDetails.directorInfo.phone = e.target.value
              })
            }
          />

          <TextInput
            className="mb-2"
            isEditing={isEditing}
            labelText="Director Email"
            onChange={(e) =>
              setEventData((draft) => {
                draft.eventDetails.directorInfo.email = e.target.value
              })
            }
            value={eventData.eventDetails.directorInfo.email}
          />
        </div>

        {tLBViewStatus !== TLBViewStatus.Create && (
          <div className="flex flex-col items-center">
            <p className="text-xl font-medium ml-2 sm:ml-0">
              PLAYERS: Scan this QR code to open this event directly.
            </p>
            <p className="mb-2 text-sm text-red-600 font-medium">
              NOTE: You must be logged into the website before scanning.
            </p>
            <QRCode className="mb-6" value={qrCodeString} />
          </div>
        )}

        {tLBViewStatus !== TLBViewStatus.Create &&
          tLBViewStatus !== TLBViewStatus.ReadOnly && (
            <>
              {isEditing ? (
                <StickyFooter>
                  <div className="flex">
                    <Button
                      variant="primary"
                      onClick={() => {
                        saveEventDetailsChanges(eventData, setFormState)
                        setIsEditing(false)
                      }}
                    >
                      Save
                    </Button>

                    <Button
                      variant="dangertext"
                      onClick={() => (window.location.href = '/manage')}
                    >
                      Cancel
                    </Button>
                  </div>
                </StickyFooter>
              ) : (
                <div>
                  <Button
                    className="ml-2 sm:ml-0"
                    onClick={() => {
                      setIsEditing(true)
                    }}
                    variant="secondary"
                  >
                    Edit Event Details
                  </Button>
                  <Button
                    className="ml-2 mb-2"
                    onClick={() => setShowPrintModal(true)}
                  >
                    Print QR Code
                  </Button>
                </div>
              )}
            </>
          )}
      </div>

      {showPrintModal && (
        <EventQRCodePrintModal
          onClose={() => setShowPrintModal(false)}
          qrCodeString={qrCodeString}
        />
      )}
    </div>
  )
}
