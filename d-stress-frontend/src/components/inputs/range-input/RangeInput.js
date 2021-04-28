// component for slider input
import React from 'react'
import PropTypes from 'prop-types'

import './RangeInput.css'

const RangeInput = props => (
  <div className='slider-container' id={props.colour}>{/* Change the colour of the range input box based on its value*/}
    <input
      id={props.id}
      value={props.value}
      onChange={event => {props.onChange(event.target.value)} /* pass value up component tree*/}
      type='range'
      min={props.min} 
      max={props.max}
      className='slider'
    />
    <label htmlFor={props.id}>
      {props.label}
    </label>
  </div>
)

RangeInput.propTypes = { // generic component so pass in label, max/min values, and default value 
  id: PropTypes.string.isRequired,
  value: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
  min: PropTypes.string,
  max: PropTypes.string,
  colour: PropTypes.string
}

RangeInput.defaultProps = {
  value: '',
  label: '',
  onChange: () => {},
  min: 0,
  max: 5,
  colour: '' //By default, don't change the input box colour
}

export default RangeInput
