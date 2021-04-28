// component for rendering the individual stressor tiles
import React from 'react'
import moment from 'moment'
import propTypes from 'prop-types'

import './StressorTile.css'

const StressorTile = props => {
  const stressLevel = // show actual stress level if present otherwise show anticipated stress level
    props.actualSL ?
    props.actualSL :
    props.anticipatedSL
  var colour = ''

  if (stressLevel) {
    if (stressLevel==="0") {
      colour='green' // set the colour of the corner diamond 
    } else if (stressLevel==="1") {
      colour='blue'
    } else if (stressLevel==="2") {
      colour='purple'
    } else if (stressLevel==="3") {
      colour='yellow'
    } else if (stressLevel==="4") {
      colour='orange'
    } else if (stressLevel==="5") {
      colour='red'
    }  
  }

  // calculate the suitability of a stressor for anticipation
  var suitabilityScore = 0
  if (new Date(props.date) >= new Date(Date.now()+(6.048e+8*2))) {
    suitabilityScore ++ // if the stressor is in the distant future, it is less suitable
  }
  if (stressLevel >= 4) {
    suitabilityScore ++ // if it is particularly stressful, it is not suited for anticiaption
  }
  if (props.uncertainty && props.uncertainty >= 4) {
    suitabilityScore ++ // if it is highly uncertain, it is unsuitable
  }
  if (props.uncontrollability && props.uncontrollability >= 4) {
    suitabilityScore ++ // if it is not under the control of the user, it is unsuitable
  }
  var suitability = ''
  switch (suitabilityScore) {
    case 0: suitability = 'High'
            break
    case 1: suitability = 'Medium'
            break
    case 2: suitability = 'Medium'
            break
    case 3: suitability = 'Low'
            break
    case 4: suitability = 'Low'
            break
    default: suitability = 'High' 
  }

  return (
    <div
      className={props.className}
      onClick={() => {props.onClick(props.id)}}
    >
      <b className='stressor-tile-title'>{props.title}</b>{stressLevel && <div id='square' className={colour}/>}<br/>
      <hr/>
      <b>Date: </b>{moment(props.date).format('Do MMMM YYYY')}<br/>
      {props.description && <div><b>Description: </b>{props.description}</div>}
      {props.copingPlan && <div><b>Coping Plan: </b>{props.copingPlan}</div>}
      {<div><b>Suitability: </b>{suitability}</div>}
    </div>
  )
}

StressorTile.propTypes = {
    className: propTypes.string.isRequired,
    id: propTypes.string.isRequired,
    title: propTypes.string.isRequired,
    date: propTypes.string.isRequired,
    description: propTypes.string,
    copingPlan: propTypes.string,
    anticipatedSL: propTypes.string,
    actualSL: propTypes.string,
    uncertainty: propTypes.string,
    uncontrollability: propTypes.string,
    onClick: propTypes.func.isRequired,
  }

export default StressorTile
