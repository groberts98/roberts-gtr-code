import { render, cleanup, screen, fireEvent, waitFor } from '@testing-library/react'

import App from './App'

beforeEach(() => {
  delete window.location
  window.location = new URL('http://localhost/')
})

afterEach(cleanup)

test('it renders the react app', () => {
  render(<App />)

  expect(screen.getByAltText(/D-Stress Logo/i)).toBeInTheDocument()
  expect(screen.getByText(/No Stressors/i)).toBeInTheDocument()
  expect(screen.getByAltText(/Home Icon/i)).toBeInTheDocument()
})

test('the right navigation button', async () => {
  render(<App />)

  expect(screen.queryByText(/Future/i)).toBeFalsy()

  fireEvent.click(screen.getByText(/>/i))

  expect(await screen.getByText(/Future/i)).toBeInTheDocument()
})

test('the left navigation button', async () => {
  render(<App />)

  expect(screen.queryByText(/Past/i)).toBeFalsy()

  fireEvent.click(screen.getByText(/</i))

  expect(await screen.queryByText(/Past/i)).toBeInTheDocument()
})

test('the home navigation button', async () => {
  render(<App />)

  expect(screen.queryByText(/Add/i)).toBeInTheDocument()

  fireEvent.click(screen.getByAltText(/D-Stress Logo/i))

  expect(await waitFor(() => screen.queryByText(/Add/i))).toBeInTheDocument()
})

test('the view insights button', async () => {
  render(<App />)

  expect(screen.queryByText(/Analytics/i)).toBeFalsy()

  fireEvent.click(screen.getByText(/Insights/i))

  expect(await screen.queryByText(/Analytics/i)).toBeInTheDocument()
})

test('the add stressor button', async () => {
  render(<App />)

  expect(screen.queryByText(/Save/i)).toBeFalsy()

  fireEvent.click(screen.getByText(/Add/i))

  expect(await screen.queryByText(/Save/i)).toBeInTheDocument()
})

test('the calendar button', async () => {
  render(<App />)

  expect(screen.queryByText(/Mon/i)).toBeFalsy()

  fireEvent.click(screen.getByAltText(/Calendar Icon/i))

  expect(await screen.queryByText(/Mon/i)).toBeInTheDocument()
})

test('the D-Stress logo navigation', async () => {
  render(<App />)

  expect(screen.queryByText(/Add/i)).toBeInTheDocument()

  fireEvent.click(screen.getByAltText(/D-Stress Logo/i))

  expect(await waitFor(() => screen.queryByText(/Add/i))).toBeInTheDocument()
})
