import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import IndexPage from './IndexPage.jsx'
import App from './App.jsx'
import StoriesPage from './StoriesPage.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename="/BSATroop242">
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/index" element={<IndexPage />} />
        <Route path="/stories" element={<StoriesPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
