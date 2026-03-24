import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Switch } from '@headlessui/react'
import cn from 'classnames'
import { useImmer } from 'use-immer'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/20/solid'

import { UserType } from '../Common/Common.types'

import {
  getDefaultFormData,
  routeManager,
  signInEmailUser,
} from './Login.helpers'

import { Button } from '@/Common/Components/Button'
import { ErrorAndSuccess } from '@/Common/Components/ErrorAndSuccess'
import { Header } from '@/Common/Components/Header'
import { LoadingModal } from '@/Common/Components/LoadingModal'
import { SupplementalFields } from './SupplementalFields'
import { TextInput } from '@/Common/Components/TextInput'

/**
 * Login page
 */
export const Login = () => {
  const [formData, setFormData] = useImmer(getDefaultFormData)
  const [isPlayer, setIsPlayer] = useState(true)
  const [showPass, setShowPass] = useState(false)

  // Navigate to the user correctly after success
  useEffect(() => {
    if (formData.success.length > 0) {
      if (formData.userType === UserType.Player) {
        window.location.href = '/home/'
      } else if (formData.userType === UserType.Business) {
        routeManager(formData.accountStatus)
      } else {
        setFormData((draft) => {
          draft.success = ''
          draft.error =
            'There was an error during log in. Please make sure you have an account and try again. Error code: LTSX_001'
        })
      }
    }
  }, [formData.success])

  return (
    <>
      <Header />

      <div className="min-h-full flex">
        <div className="flex-1 flex flex-col justify-center py-8 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Sign in to your account
            </h2>

            <div className="mt-8 mb-2">
              <div className="mt-6">
                <div
                  className="space-y-6"
                  onSubmit={(e) => {
                    e.preventDefault()
                  }}
                >
                  <Switch.Group as="div" className="flex items-center">
                    <Switch
                      checked={isPlayer}
                      onChange={setIsPlayer}
                      className={cn(
                        isPlayer ? 'bg-indigo-600' : 'bg-amber-400',
                        'relative inline-flex shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className={cn(
                          isPlayer ? 'translate-x-5' : 'translate-x-0',
                          'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow ring-0 transition ease-in-out duration-200',
                        )}
                      />
                    </Switch>
                    <Switch.Label as="span" className="ml-3">
                      <span className="text-sm font-medium text-gray-900">
                        I'm {isPlayer ? 'a' : 'an'}
                      </span>
                      <span
                        className={cn(
                          'text-xl font-medium',
                          isPlayer ? 'text-indigo-600' : 'text-amber-400',
                        )}
                      >
                        {isPlayer ? ' Player' : ' Event Director'}
                      </span>
                    </Switch.Label>
                  </Switch.Group>

                  <div>
                    <TextInput
                      isEditing
                      labelText="Email address"
                      onChange={(e) => {
                        setFormData((draft) => {
                          draft.email = e.target.value
                        })
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          signInEmailUser(isPlayer, formData, setFormData)
                        }
                      }}
                      type="email"
                      value={formData.email}
                    />
                  </div>

                  <div className="relative">
                    <TextInput
                      className="mr-2"
                      isEditing
                      labelText="Password"
                      onChange={(e) => {
                        setFormData((draft) => {
                          draft.password = e.target.value
                        })
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          signInEmailUser(isPlayer, formData, setFormData)
                        }
                      }}
                      type={showPass ? 'text' : 'password'}
                      value={formData.password}
                    />
                    <div
                      className="absolute top-8 right-5 cursor-pointer"
                      onClick={() => setShowPass(!showPass)}
                    >
                      {showPass ? (
                        <EyeIcon
                          className="shrink-0 h-4 w-4"
                          aria-hidden="true"
                        />
                      ) : (
                        <EyeSlashIcon
                          className="shrink-0 h-4 w-4"
                          aria-hidden="true"
                        />
                      )}
                    </div>
                  </div>

                  <SupplementalFields />

                  <div>
                    <ErrorAndSuccess
                      clearMessageFn={() =>
                        setFormData((draft) => {
                          draft.error = ''
                          draft.success = ''
                        })
                      }
                      error={formData.error}
                      success={formData.success}
                    />

                    <Button
                      fullWidth
                      onClick={() =>
                        signInEmailUser(isPlayer, formData, setFormData)
                      }
                    >
                      Sign in
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <p>
              Not a player yet?
              <Button variant="link">
                <Link to="/register/player/">Sign up now</Link>
              </Button>
            </p>

            <p>
              Not a director yet?
              <Button variant="link">
                <Link to="/register/director/">Sign up now</Link>
              </Button>
            </p>
          </div>
        </div>

        {formData.isLoading && <LoadingModal />}

        <div className="hidden lg:block relative w-0 flex-1">
          <img
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
          />
        </div>
      </div>
    </>
  )
}
