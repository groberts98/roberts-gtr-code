// component for navigation bar present on every page
import React from 'react'
import propTypes from 'prop-types'
import { Link } from 'react-router-dom'


import homeIcon from '../../resources/homeIcon.png'

import './Navbar.css'

const Navbar = props => (
  <div className='navbar'>
    <Link to={props.left}>
      <span className='leftNavigationArrow'>&lt;</span>
    </Link>
    <Link to='/'>
      <span><img src={homeIcon} alt='Home Icon' className='home-icon-image'/></span>
    </Link>
    <Link to={props.right}>
      <span className='rightNavigationArrow'>&gt;</span>
    </Link>
  </div>
)

Navbar.propTypes = {
  left: propTypes.string,
  right: propTypes.string
}

Navbar.defaultProps = {
  left: 'Past',
  right: 'Future'
}

export default Navbar
