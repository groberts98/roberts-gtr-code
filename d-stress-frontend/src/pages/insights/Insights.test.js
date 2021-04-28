import { fireEvent, render, screen, waitFor, cleanup } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'

import Insights from './Insights'

const mockResponse = [
  {"id":"1","title":"Test 1","date":"2121-01-01","description":"description 1","coping-plan":"coping plan 1","cp-executed":"0","anticipated-SL":"5","actual-SL":null,"uncertainty":"1","uncontrollability":"0","hidden":"0"},
  {"id":"2","title":"Test 2","date":"2121-01-01","description":"description 2","coping-plan":"coping plan 2","cp-executed":"0","anticipated-SL":"5","actual-SL":null,"uncertainty":"1","uncontrollability":"0","hidden":"0"},
  {"id":"3","title":"Test 3","date":"2121-01-01","description":"description 3","coping-plan":"coping plan 3","cp-executed":"0","anticipated-SL":"5","actual-SL":null,"uncertainty":"1","uncontrollability":"0","hidden":"0"},
  {"id":"4","title":"Test 4","date":"2121-01-01","description":"description 4","coping-plan":"coping plan 4","cp-executed":"0","anticipated-SL":"5","actual-SL":null,"uncertainty":"1","uncontrollability":"0","hidden":"0"},
  {"id":"5","title":"Test 5","date":"2121-01-01","description":"description 5","coping-plan":"coping plan 5","cp-executed":"0","anticipated-SL":"5","actual-SL":null,"uncertainty":"1","uncontrollability":"0","hidden":"0"},
  {"id":"6","title":"Test 6 - hidden","date":"2121-01-01","description":"description 6","coping-plan":"coping plan 6","cp-executed":"0","anticipated-SL":"5","actual-SL":null,"uncertainty":"1","uncontrollability":"0","hidden":"1"},
]

global.fetch = jest.fn(() => (
  Promise.resolve({
    json: () => Promise.resolve(mockResponse)
  })
))

beforeEach(() => {
  delete window.location
  window.location = new URL('http://localhost/AddStressor')
})

afterEach(cleanup)

test('it renders the insights page', () => {
  render(<Router><Insights /></Router>)

  expect(screen.getByText(/Analytics/i)).toBeInTheDocument()
})

test('it loads insight selected', () => {
  render(<Router><Insights /></Router>)

  fireEvent.click(screen.getAllByText(/Line Graph/i)[0])

  expect(screen.getByText(/Description/i)).toBeInTheDocument()
})

test('it retrieves and displays all stressor data', async () => {
  render(<Router><Insights /></Router>)

  fireEvent.click(screen.getByText(/Analytics/i))

  expect(fetch).toHaveBeenCalledTimes(1)
  expect(fetch).toHaveBeenCalledWith('https://dstress-backend.herokuapp.com/api/stressor/GetStressor.php?id=&filter=')
})
