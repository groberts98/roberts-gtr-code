// confirmation screen component
import React from 'react'
import propTypes from 'prop-types'

import StressorButton from '../../buttons/stressorButton/stressorButton' 

import './Confirmation.css'

const Confirmation = props => (
  <div className='confirmation'>
    <h1>Are you sure you want to {props.action} this stressor?</h1><br/>
    <StressorButton
      button='Cancel'
      onClick={() => props.cancelFunction()}    
    />
    <StressorButton
      button='Confirm'
      onClick={() => props.confrimFunction()}    
    />
    <br/>
    <br/>
  </div>
) // br tags at bottom of pages to add some breathing room

Confirmation.propTypes = {
  action: propTypes.string.isRequired, // what you are confirming
  confirmFunction: propTypes.func, // what happens when you confirm
  cancelFunction: propTypes.func // what happens when you cancel
}

Confirmation.defaultProps = {
  confirmFunction: () => {},
  cancelFunction: () => {}
}

export default Confirmation
