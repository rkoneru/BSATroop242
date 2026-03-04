import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import IndexPage from './IndexPage.jsx'
import StoriesPage from './StoriesPage.jsx'
import CalendarPage from './CalendarPage.jsx'
import MembersPage from './MembersPage.jsx'
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
        </Routes>
       </BrowserRouter>
    </AnnouncementProvider>
  </React.StrictMode>,
)
