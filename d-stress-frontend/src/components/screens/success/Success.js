// success screen component
import React from 'react'
import propTypes from 'prop-types'

import StressorButton from '../../buttons/stressorButton/stressorButton'

import { Link } from 'react-router-dom'

import './Success.css'

const Success = props => (
  <div className='success-screen'>
    <h1>Success!</h1>
    <hr/>
    {(() => {
      switch (props.action) { // switch display text based on action prop
        case 'Save': return (<p>New stressor saved</p>)
        case 'Edit': return (<p>Edit made to stresssor</p>)
        case 'Delete': return (<p>Stressor deleted</p>)
        default: return (<p>Action complete</p>)
      }
    })()} 
    <br/>
    <Link to='/'> {/* send user back to home screen when hitting return*/}               
      <StressorButton button='Return' className='return-button'/>
    </Link>
    <br/>
    <br/>
  </div>
)

Success.propTypes = {
  action: propTypes.string.isRequired // action which has been successful
}

export default Success
