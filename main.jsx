import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import IndexPage from './IndexPage.jsx'
import StoriesPage from './StoriesPage.jsx'
import CalendarPage from './CalendarPage.jsx'
import MembersPage from './MembersPage.jsx'
import CampingPage from './CampingPage.jsx'
import ScoutCamping from './ScoutCamping.jsx'
import TroopCamping from './troop242-full.jsx'
import { AnnouncementProvider } from './AnnouncementContext.jsx'
import './index.css'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AnnouncementProvider>
      <BrowserRouter basename="/BSATroop242">
        <Routes>
          <Route path="/" element={<TroopCamping />} />
          <Route path="/home" element={<App />} />
          <Route path="/about" element={<IndexPage />} />
          <Route path="/stories" element={<StoriesPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/members" element={<MembersPage />} />
          <Route path="/camping" element={<CampingPage />} />
          <Route path="/scout-camping" element={<ScoutCamping />} />
          <Route path="/troop-camping" element={<TroopCamping />} />
        </Routes>
       </BrowserRouter>
    </AnnouncementProvider>
  </React.StrictMode>,
)