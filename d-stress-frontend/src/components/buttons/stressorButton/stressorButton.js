// generic button that handles in app
import React from 'react'
import propTypes from 'prop-types'

import './stressorButton.css'

const StressorButton = props => (
  <button
    className='stressor-button'
    value={props.value}
    onClick={() => props.onClick()}
    >
      {props.button}
  </button>
)

StressorButton.propTypes = { //takes in value, button text and its onClick function
    button: propTypes.string.isRequired,
    value: propTypes.string,
    onClick: propTypes.func,
}

StressorButton.defaultProps = {
    value: '',
    onClick: () => {}
}

export default StressorButton
