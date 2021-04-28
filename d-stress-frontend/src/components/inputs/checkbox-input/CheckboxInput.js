// component for input checkbox
import React from 'react'
import propTypes from 'prop-types'

import './CheckboxInput.css'

const CheckboxInput = props => (
<div className='checkbox-container'>
  <label className='checkbox-input-label'>{props.label}</label>
  <input
    type='checkbox'
    className='checkbox-input'
    checked={props.checked}
    name={props.name}
    onChange={() => props.onChange()}
  />
</div>
)

CheckboxInput.propTypes = { // generic component so take in label, name and function
  label: propTypes.string,
  cheched: propTypes.bool, // specify whether or not it should be checked by default
  name: propTypes.string,
  onChange: propTypes.func
}

CheckboxInput.defaultProps = {
  lebel: '',
  cheched: false,
  name: '',
  onChange: () => {}
}

export default CheckboxInput
