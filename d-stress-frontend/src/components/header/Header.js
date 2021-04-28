// component for the header present on every page
import React from 'react'
import {Link} from 'react-router-dom'

import CalendarIcon from '../../resources/calendarIcon.png'
import DStressLogo from '../../resources/DStressLogo.png'

import './Header.css'

const Header = () => (
  <div className='header'>
    <Link to='/'>{/* D-Stress logo links back to home screen */}
      <span><img src={DStressLogo} alt='D-Stress Logo' className='dstress-logo'/></span>
    </Link>
    <Link to='/calendar'>
      <span><img src={CalendarIcon} alt='Calendar Icon' className='calendarIcon' /></span>
    </Link>
  </div>
)

export default Header
