import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import PageRouter from './pages/PageRouter' 
import Header from './components/header/Header'

import './App.css'

const App = () => (
    <Router>
      <div className="App">
        <Header />
        <PageRouter />
      </div>
    </Router>
)

export default App
