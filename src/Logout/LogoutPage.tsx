import { useEffect, useState } from 'react'

import { signOutUser } from './LogoutPage.helpers'

/**
 * Route that logs a user out when they navigate to it.
 */
export const LogoutPage = () => {
  const [logoutSuccess, setLogoutSuccess] = useState(false)

  useEffect(() => {
    signOutUser(setLogoutSuccess)
  }, [])

  useEffect(() => {
    if (logoutSuccess) {
      window.location.href = '/'
    }
  }, [logoutSuccess])

  return (
    <main
      className="min-h-full bg-cover bg-top sm:bg-top"
      style={{
        backgroundImage:
          'url("https://images.unsplash.com/photo-1545972154-9bb223aac798?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3050&q=80&exp=8&con=-15&sat=-75")',
      }}
    >
      <h1>Please wait while we log you out...</h1>
    </main>
  )
}
