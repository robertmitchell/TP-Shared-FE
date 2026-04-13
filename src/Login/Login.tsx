import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
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

export const Login = () => {
  const [formData, setFormData] = useImmer(getDefaultFormData)
  const [isPlayer, setIsPlayer] = useState(true)
  const [showPass, setShowPass] = useState(false)
  const [remember, setRemember] = useState(false)

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
        <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">

            <div className="mb-8">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
                Welcome back to Tournament Planet
              </h2>
              <p className="mt-2 text-sm text-gray-500 max-w-xs">
                Sign in to access your tournaments, track standings, and compete in Bowling Poker events.
              </p>
            </div>

            <div className="space-y-5 bg-white shadow-lg rounded-lg p-6">

              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Login as:</p>
                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="accountType"
                      checked={isPlayer}
                      onChange={() => setIsPlayer(true)}
                      className="accent-indigo-600"
                    />
                    <span className="text-sm font-medium text-gray-900">Player</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="accountType"
                      checked={!isPlayer}
                      onChange={() => setIsPlayer(false)}
                      className="accent-amber-400"
                    />
                    <span className="text-sm font-medium text-gray-900">Director</span>
                  </label>
                </div>
              </div>

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
                <button
                  type="button"
                  aria-pressed={showPass}
                  aria-label={showPass ? 'Hide password' : 'Show password'}
                  className="absolute top-8 right-5 p-1 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  onClick={() => setShowPass(!showPass)}
                >
                  {showPass ? (
                    <EyeIcon className="shrink-0 h-4 w-4 text-gray-600" aria-hidden="true" />
                  ) : (
                    <EyeSlashIcon className="shrink-0 h-4 w-4 text-gray-600" aria-hidden="true" />
                  )}
                </button>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    aria-label="Remember me"
                    type="checkbox"
                    checked={remember}
                    onChange={() => setRemember((v) => !v)}
                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700">Remember me</span>
                </label>

                <Link to="/forgot-password" className="text-xs text-indigo-600 hover:text-indigo-700">
                  Forgot your password?
                </Link>
              </div>

              <SupplementalFields />

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
                onClick={() => signInEmailUser(isPlayer, formData, setFormData)}
              >
                Sign In
              </Button>

              <div className="pt-2 border-t border-gray-100">
                <p className="text-sm text-gray-500 mb-1">New to Tournament Planet?</p>
                <div className="flex flex-col gap-1">
                  <Button variant="link">
                    <Link to="/register/player/">Create a Player account</Link>
                  </Button>
                  <Button variant="link">
                    <Link to="/register/director/">Create a Director account</Link>
                  </Button>
                </div>
              </div>

            </div>
          </div>
        </div>

        {formData.isLoading && <LoadingModal />}

        <div className="hidden lg:block relative w-0 flex-1">
          <img
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center p-12">
            <p className="text-white text-5xl font-bold leading-tight">
              Run Tournaments.<br />
              Track Results.<br />
              Compete Smarter.
            </p>
            <p className="text-gray-300 text-lg mt-4">
              The all-in-one platform for bowling tournament directors and players.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}