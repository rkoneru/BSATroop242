import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import IndexPage from './IndexPage.jsx'
import StoriesPage from './StoriesPage.jsx'
import CalendarPage from './CalendarPage.jsx'
import MembersPage from './MembersPage.jsx'
import CampingPage from './CampingPage.jsx'
import ScoutCamping from './ScoutCamping.jsx'
import Troop242Hero from './troop242-hero.jsx'
import TroopCamping from './troop242-full.jsx'
import { AnnouncementProvider } from './AnnouncementContext.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AnnouncementProvider>
      <BrowserRouter basename="/BSATroop242">
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/about" element={<IndexPage />} />
          <Route path="/stories" element={<StoriesPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/members" element={<MembersPage />} />
          <Route path="/camping" element={<CampingPage />} />
          <Route path="/scout-camping" element={<ScoutCamping />} />
          <Route path="/troop242" element={<Troop242Hero />} />
          <Route path="/troop-camping" element={<TroopCamping />} />
        </Routes>
       </BrowserRouter>
    </AnnouncementProvider>
  </React.StrictMode>,
)
