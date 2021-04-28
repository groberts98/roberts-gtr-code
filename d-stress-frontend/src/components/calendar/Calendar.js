// component for rendering the calendar
import React, { useState, useEffect } from 'react'
import moment from 'moment'

import StressorList from '../stressor-components/stressor-list/StressorList'
import StressorForm from '../stressor-components/stressor-form/StressorForm'

import addIcon from '../../resources/addIcon.png'

import './Calendar.css'

const Calendar = () => {
  const [dateObject, setDateObject] = useState(moment()) //controls current dates shown in the calendar
  const [data, setData] = useState([])
  const [selectedDate, setSelectedDate] = useState(moment(new Date()).format('YYYY-MM-DD'))
  const [screen, setScreen] = useState('stressorList')

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://dstress-backend.herokuapp.com/api/stressor/GetStressor.php?id=&filter=')
        if (!response.ok) {
          throw Error(response.statusText)
        }
        setData(await response.json())
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])

  const getHeaders = () => (
    ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
      <th key={day} className="day-heading">{day}</th> // display calendar as table with days as headers
    ))
  )
  
  const getDays = () => { // function returning the table content for current given month
    let j=0
    let emptyCells = []  // have emtpy cells till first day of month
    for (let i=0; i<moment(dateObject).startOf("month").format('d')-1; i++) {
      emptyCells.push(<td key={j} className='day-empty'>{''}</td>)
      j++
    }
  
    let daysInMonth = [] // all the days in the current month
    for (let i=1; i<=dateObject.daysInMonth(); i++) {
      const current = moment(dateObject).set('date', i).format('YYYY-MM-DD')
      const isCurrent = current === moment().format('YYYY-MM-DD') ? '-current' : '' // is current day this cell?
      var colour = '' 
      if (!isCurrent) { // if its the current day, simply render it as a teel block
        const todaysStressors = data.filter(stressor => ( //find all stressors occuring on given day
          (stressor['hidden'] === '0') &&
          current === stressor['date']
        ))
        const max = Math.max.apply(Math, todaysStressors.map(stressor => ( // find the max stress level for that day
            stressor['actual-SL'] ?
            stressor['actual-SL'] :
            stressor['anticipated-SL']
          ))
        )
        switch (max) { // colour square based on the max stress level
          case 0: colour = '-green'
                  break
          case 1: colour = '-blue'
                  break
          case 2: colour = '-purple'
                  break
          case 3: colour = '-yellow'
                  break
          case 4: colour = '-oragne'
                  break
          case 5: colour = '-red'
                  break
          default: colour = ''
        }
      }
      daysInMonth.push(
        <td
          key={j}
          className={`day${colour}${isCurrent}`}
          onClick={() => {
            setSelectedDate(current)}}
        >
          {i}
        </td>
      )
      j++
    }

    let totalSlots = [...emptyCells, ...daysInMonth] // all the cells in that month

    while (totalSlots.length%7 !== 1) { // fill out remaining squares in calendar with empty cells
      totalSlots.push(<td key={j} className='day-empty'>{''}</td>)
      j++
    }

    var tableContent = []
    for (let i=1; i<totalSlots.length; i++) {
      let row = []
      while (i%7 !== 0) { // organise array of cells into rows of 7
        row.push(totalSlots[i-1])
        i++
      }
      row.push(totalSlots[i-1])
      tableContent.push(row)
    }

    return(tableContent.map((row, i) => (
      <tr key={i}>{row}</tr>
    )))
  }

  return (
    <div>
      <div className='calendar'>
        <div className='navigation-bar'>{/* Select month and year via the navigaiton bar */}
          <span
            className='month'
            onClick={e => {
              setDateObject(moment(dateObject).subtract(1, 'months')) // when clicking left arrow for month, go back 1 month
            }}
          >
            <b>&lt;</b>
          </span>
          <span className='month'>
            <b>{dateObject.format('MMMM')}</b>{/* display current month */} 
          </span>
          <span
            className='month'
            onClick={e => {
              setDateObject(moment(dateObject).add(1, 'months')) // alternatively, go foward 1 month
            }}
          >
            <b>&gt;</b>
          </span>
          <span
            className='year'
            onClick={e => {
              setDateObject(moment(dateObject).add(1, 'years')) // do the same for years
            }}
          >
            <b>&gt;</b>
          </span>
          <span className='year'>
            <b>{dateObject.format('Y')}</b>{/* show currently chosen year */}
          </span>
          <span
            className='year'
            onClick={e => {
              setDateObject(moment(dateObject).subtract(1, 'years'))
            }}
          >
            <b>&lt;</b>
          </span>
        </div>
        <table cellSpacing='0' className='calendar-table'>{/* build calendar */}
          <thead className='calendar-table-header'>
            <tr>{getHeaders()}</tr>
          </thead>
          <tbody className='calendar-table-content'>{getDays()}</tbody>
        </table>
      </div>
      <div className='calendar-content'>
        <img
          src={addIcon}
          alt='add stressor'
          className='add-icon'
          onClick={() => setScreen('addStressor')} // select add icon to add stressor for given day
        />
        <h3 className='current-date'>{moment(selectedDate).format('dddd, Do MMMM YYYY')}</h3>{/* show selected date */}
        <hr/>
      </div>
      {screen === 'addStressor' && // show stressor list or stressor form under calendar
        <StressorForm 
          date={selectedDate}
          function='Save'
          goBack={() => setScreen('stressorList')}
        />
      }
      {screen === 'stressorList' &&
        <StressorList
          data={data.filter(stressor => stressor['date']===selectedDate)}
        />
      }
      <br/><br/>
    </div>
  )
}

export default Calendar
