// renders an individual insight tile
import React from 'react'
import propTypes from 'prop-types'

import './InsightsTile.css'

const InsightsTile = props => (
  <div
    className='insights-tile'
    onClick={() => {props.onClick(props.id)}} // view relevant insight when clicked
  >
      <b>{props.title}</b><br/>
      <hr/>
      {props.description && <div className='description'>{props.description}</div>}
      {props.imageSrc && <img src={props.imageSrc} alt='example graph' className='insight-image'/>}
  </div>
)

InsightsTile.propTypes = {
    title: propTypes.string.isRequired,
    description: propTypes.string,
    imageSrc: propTypes.string,
    onClick: propTypes.func.isRequired,
  }

export default InsightsTile
