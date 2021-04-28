// component rendered when there are no stressors to display
import React from 'react'
import propTypes from 'prop-types'

import './NoStressors.css'

const NoStressors = props => (
    <div className='no-stressors'>No {props.type}<br/>Stressors Available</div>
)

NoStressors.propTypes = {
    type: propTypes.string
}

NoStressors.defaultProps = {
    type: ''
}

export default NoStressors
