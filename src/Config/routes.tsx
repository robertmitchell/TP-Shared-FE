import { Route, Routes } from 'react-router-dom'

import { Login } from '@/Login/Login'

import { DirectorEvent } from '@/DirectorEvent/DirectorEvent'
import { DirectorHome } from '@/DirectorHome/DirectorHome'

import { PlayerHome } from '@/Player/PlayerHome/PlayerHome'
import { BrowseEvents } from '@/Player/BrowseEvents/BrowseEvents'
import { PlayerEvent } from '@/Player/PlayerEvent/PlayerEvent'

import { LogoutPage } from '@/Logout/LogoutPage'
import { NotFound } from '@/NotFound/NotFound'

export const ROUTES = () => (
  <Routes>
    {/* Loging Stuff */}
    <Route path="/" element={<Login />} />

    {/* Director */}
    <Route path="/manage/" element={<DirectorHome />} />
    <Route path="/manage/event/" element={<DirectorEvent />}>
      <Route path=":eventId" element={<DirectorEvent />} />
    </Route>

    {/* Player */}
    <Route path="/home/" element={<PlayerHome />} />
    <Route path="/events/" element={<BrowseEvents />} />
    <Route path="/events/event/" element={<PlayerEvent />}>
      <Route path=":eventId" element={<PlayerEvent />} />
      <Route path=":eventId/:directorUID" element={<PlayerEvent />} />
    </Route>

    {/* Misc */}
    <Route path="/logout/" element={<LogoutPage />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
)
