import { fireEvent, render, screen, cleanup } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'

import Calendar from './Calendar'

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

jest.mock('moment', () => {
  return () => jest.requireActual('moment')('2021-01-01T00:00:00.000Z')
})

beforeEach(() => {
  delete window.location
  window.location = new URL('http://localhost/Calendar')
})

afterEach(cleanup)

test('it renders the calendar page', () => {
  render(<Router><Calendar /></Router>)

  expect(screen.getByText(/Mon/i)).toBeInTheDocument()
})

test('it changes month', () => {
  render(<Router><Calendar /></Router>)
  
  expect(screen.getAllByText(/January/i)[0]).toBeInTheDocument()
  expect(screen.getAllByText(/2021/i)[0]).toBeInTheDocument()

  fireEvent.click(screen.getAllByText(/</i)[0])

  expect(screen.getAllByText(/December/i)[0]).toBeInTheDocument()
  expect(screen.getAllByText(/2020/i)[0]).toBeInTheDocument()
})

test('it changes year', () => {
  render(<Router><Calendar /></Router>)
  
  expect(screen.getAllByText(/January/i)[0]).toBeInTheDocument()
  expect(screen.getAllByText(/2021/i)[0]).toBeInTheDocument()

  fireEvent.click(screen.getAllByText(/</i)[0])

  expect(screen.getAllByText(/January/i)[0]).toBeInTheDocument()
  expect(screen.getAllByText(/2020/i)[0]).toBeInTheDocument()
})

test('it renders the add stressor form on the calendar day with correct date', () => {
  render(<Router><Calendar /></Router>)

  fireEvent.click(screen.getByAltText(/add stressor/i))

  expect(screen.getByText(/Title/i)).toBeInTheDocument()
  expect(screen.getByText(/Hidden/i)).toBeInTheDocument()
})

test('it renders the correct stressors for the selected day', async () => {
  render(<Router><Calendar /></Router>)

  expect(fetch).toHaveBeenCalledTimes(1)
  expect(fetch).toHaveBeenCalledWith('https://dstress-backend.herokuapp.com/api/stressor/GetStressor.php?id=&filter=')
})
