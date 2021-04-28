// component rendering individual stressor
import React, { useState } from 'react'
import moment from 'moment'
import propTypes from 'prop-types'
import ReactTooltip from 'react-tooltip'

import Success from '../../screens/success/Success'
import StressorForm from '../stressor-form/StressorForm'
import Confirmation from '../../screens/confirmation/Confirmation'
import StressorButton from '../../buttons/stressorButton/stressorButton'

import backArrow from '../../../resources/backArrow.png'
import info from '../../../resources/info.png'

import './Stressor.css'

const Stressor = props => {
  const [screen, setScreen] = useState('display') // whether to show the stressor or a confirmation sreen

  const deleteStressor = () => { // function handeling the deletion of stressors
    const data = {
      id : props.stressor[0].id,
    }

    if (data) {
      fetch('https://dstress-backend.herokuapp.com/api/stressor/DeleteStressor.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then(() => {
        console.log('Success')
        setScreen('success') // if deletion successful then show success screen
      })
      .catch((error) => {
        console.error('Error:', error) // otherwise, log an error and don't change page
      })
    } else {
      console.log('error')
    }
  }

  if (screen==='display') {
    const stressLevel = // give actual stress level if available
      props.stressor[0]['actual-SL'] ?
      props.stressor[0]['actual-SL'] :
      props.stressor[0]['anticipated-SL']
    var colour = ''
    switch (stressLevel) { // set colour of diamond based on stress level
      case '0': colour='green'
                break
      case '1': colour='blue'
                break
      case '2': colour='purple'
                break
      case '3': colour='yellow'
                break
      case '4': colour='orange'
                break
      case '5': colour='red'
                break
      default : colour=''
    }

  var suitabilityScore = 0
  if (new Date(props.stressor[0]['date']) >= new Date(Date.now()+(6.048e+8*2))) {
    suitabilityScore ++
  }
  if (stressLevel >= '4') {
    suitabilityScore ++
  }
  if (props.stressor[0]['uncertainty'] && props.stressor[0]['uncertainty'] >= '4') {
    suitabilityScore ++
  }
  if (props.stressor[0]['uncontrollability'] && props.stressor[0]['uncontrollability'] >= '4') {
    suitabilityScore ++
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
      <div className='stressor'>
        <img
          onClick={() => {props.goBack()}}
          src={backArrow}
          alt='back arrow'
          className='back-arrow'
        />
        <h2 className='stressor-name'>{props.stressor[0]['title']}</h2>{stressLevel && <div id='stressor-square' className={colour}/>}
        <hr/>
        <b>Date: </b>{moment(props.stressor[0]['date']).format('Do MMMM YYYY')}<br/>
        {props.stressor[0]['description'] && <div><b>Description: </b>{props.stressor[0]['description']}</div>}
        {props.stressor[0]['coping-plan'] && <div><b>Coping Plan: </b>{props.stressor[0]['coping-plan']}</div>}
        {props.stressor[0]['cp-executed'] && props.stressor[0]['coping-plan'] && <div><b>Coping Plan Executed: </b>{props.stressor[0]['cp-executed'] === '1' ? 'Yes' : 'No'}</div>}
        {props.stressor[0]['anticipated-SL'] && <div><b>Anticipated Stress Level: </b>{props.stressor[0]['anticipated-SL']}</div>}
        {props.stressor[0]['actual-SL'] && <div><b>Actual Stress Level: </b>{props.stressor[0]['actual-SL']}</div>}
        {props.stressor[0]['uncertainty'] && <div><b>Stressor Uncertainty: </b>{props.stressor[0]['uncertainty']}</div>}
        {props.stressor[0]['uncontrollability'] && <div><b>Stressor Uncontrollability: </b>{props.stressor[0]['uncontrollability']}</div>}
        <div><b>Suitability: </b>{suitability}</div>
        <img className='info-icon' src={info} alt='Info Icon' data-tip data-for='suitablityTip' /><br/>
        <ReactTooltip className='tooltip-width' id='suitablityTip' place='right' type='dark' effect='float'>
          If a stressor is too stressful, distant, uncertain or out of your control, it may not be suitable for anticipation.
        </ReactTooltip>
        <StressorButton
          button='Edit'
          onClick={() => setScreen('edit')}
        />
        <StressorButton
          button='Delete'
          onClick={() => setScreen('confirmation')}
        />
        <br/>
        <br/>
      </div>
    )
  } else if (screen==='confirmation') {
    return (
      <Confirmation 
        action='delete'
        cancelFunction={() => setScreen('display')}
        confrimFunction={() => deleteStressor()}
      />
    )
  } else if (screen==='success') {
    return (
      <Success 
        action='Delete'
      />
    )
  } else if (screen==='edit') { // if edit clicked the render the stressor form with data pre-loaded
    return (
      <StressorForm
        id={props.stressor[0]['id']}
        title={props.stressor[0]['title']}
        date={props.stressor[0]['date']}
        description={props.stressor[0]['description']}
        copingPlan={props.stressor[0]['coping-plan']}
        cpExecuted={props.stressor[0]['cp-executed']}
        anticipatedSL={props.stressor[0]['anticipated-SL']}
        actualSL={props.stressor[0]['actual-SL']}
        uncertainty={props.stressor[0]['uncertainty']}
        uncontrollability={props.stressor[0]['uncontrollability']}
        hidden={props.stressor[0]['hidden']}
        function='Edit'
        goBack={() => {setScreen('display')}}
      />
    )
  }
}

Stressor.propTypes = {
  stressor: propTypes.array.isRequired, //supply stessor data to component
  goBack: propTypes.func
}

Stressor.defaultProps = {
  goBack: () => {}
}

export default Stressor
