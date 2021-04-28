// calendar page
import React from 'react'

import Navbar from '../../components/navbar/Navbar'
import CalendarComponent from '../../components/calendar/Calendar'

const Calendar = () => (
  <div className='page-container'>
    <CalendarComponent/>
    <Navbar />
  </div>
)

export default Calendar
