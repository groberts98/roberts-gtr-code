import { render, cleanup, screen, waitFor, fireEvent, getByTestId } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'

import Future from './Future'

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
  window.location = new URL('http://localhost/Future')
})

afterEach(cleanup)

test('it renders the future stressors page', () => {
  render(<Router><Future /></Router>)

  expect(screen.getByText(/No Future/i)).toBeInTheDocument()
})

test('it retrieves future stressor data', async () => {
  render(<Router><Future /></Router>)
  
  expect(fetch).toHaveBeenCalledTimes(1)
  expect(fetch).toHaveBeenCalledWith('https://dstress-backend.herokuapp.com/api/stressor/GetStressor.php?id=&filter=future')
})
