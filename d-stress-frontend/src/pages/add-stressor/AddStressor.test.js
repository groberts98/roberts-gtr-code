import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'

import AddStressor from './AddStressor'

global.fetch = jest.fn(() => {
  Promise.resolve({
    json: () => Promise.resolve({mockResponse})
  })
})

beforeEach(() => {
  delete window.location
  window.location = new URL('http://localhost/AddStressor')
})

afterEach(cleanup)

test('it renders the add stressor page', () => {
  render(
    <Router>
      <AddStressor />
    </Router>
  )

  expect(screen.getByText(/Title/i)).toBeInTheDocument()
})

test('shows the missing fields error message', () => {
  render(
    <Router>
      <AddStressor />
    </Router>
  )

  fireEvent.click(screen.getByText(/Save/i))
  
  expect(screen.getByText(/Please fill all fields marked with/i)).toBeInTheDocument()
})
