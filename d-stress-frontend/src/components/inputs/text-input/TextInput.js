// component for text input
import React, { useState } from 'react'
import PropTypes from 'prop-types'

import './TextInput.css'

const TextInput = props => {
  const [focussed, setFocussed] = useState(false) // whether or not the text box is selected

  return (
    <div className={`field ${focussed && 'focussed'}`}>
      <input
        id={props.id}
        type="text"
        value={props.value}
        placeholder={props.label}
        onChange={event => {props.onChange(event.target.value)} /* pass value up component tree*/}
        onFocus={() => setFocussed(true)}
        onBlur={() => setFocussed(false)}
      />
      <label htmlFor={props.id}>
        {props.label}
      </label>
    </div>
  )
}

TextInput.propTypes = {
    id: PropTypes.string.isRequired,
    value: PropTypes.string,
    label: PropTypes.string,
    onChange: PropTypes.func,
}

TextInput.defaultProps = {
    value: '',
    label: '',
    onChange: () => '',
}

export default TextInput
