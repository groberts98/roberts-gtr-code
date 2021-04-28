// component for rendering the stressor form
import React, { useState, useEffect } from 'react'
import propTypes from 'prop-types'
import ReactTooltip from 'react-tooltip'
import DatePicker from 'react-datepicker'

import Success from '../../screens/success/Success'
import TextInput from '../../inputs/text-input/TextInput'
import RangeInput from '../../inputs/range-input/RangeInput'
import CheckboxInput from '../../inputs/checkbox-input/CheckboxInput'
import StressorButton from '../../buttons/stressorButton/stressorButton'

import backArrow from '../../../resources/backArrow.png'
import info from '../../../resources/info.png'

import './StressorForm.css'
import 'react-datepicker/dist/react-datepicker.css'

const StressorForm = props => {
  const [id] = useState(props.id ?? '') // pre load inputs if data supplied
  const [title, setTitle] = useState(props.title ?? '')
  const [date, setDate] = useState(props.date ? new Date(props.date) : new Date())
  const [description, setDescription] = useState(props.description ?? '')
  const [copingPlan, setCopingPlan] = useState(props.copingPlan ?? '')
  const [cpExecuted, setCPExecuted] = useState(props.cpExecuted==='1' ? true : false)
  const [anticipatedSL, setAnticipatedSL] = useState(props.anticipatedSL ?? '2')
  const [actualSL, setActualSL] = useState(props.actualSL ?? '2')
  const [uncertainty, setUncertainty] = useState(props.uncertainty ?? '2')
  const [uncontrollability, setUncontrollability] = useState(props.uncontrollability ?? '2')
  const [hidden, setHidden] = useState(props.hidden==='1' ? true : false)
  const [screen, setScreen] = useState('formScreen')
  const currentDate = new Date()

  var dateColour = '' // set colour of date input box based on how far in future selected date is
  if (date<=new Date(Date.now()+(6.048e+8 * 1))) {
    dateColour = 'green'
  } else if (date<=new Date(Date.now()+(6.048e+8*2))) {
    dateColour = 'orange'
  } else {
    dateColour = 'red'
  }

  var anticipatedSLColour = ''
  switch (anticipatedSL) { // colour stress level input box based on input
    case '0': anticipatedSLColour = 'green'
            break
    case '1': anticipatedSLColour = 'blue'
            break
    case '2': anticipatedSLColour = 'purple'
            break
    case '3': anticipatedSLColour = 'yellow'
            break
    case '4': anticipatedSLColour = 'orange'
            break
    case '5': anticipatedSLColour = 'red'
            break
    default: anticipatedSLColour = ''
  }

  var actualSLColour = ''
  switch (actualSL) { // colour stress level input box based on input
    case '0': actualSLColour = 'green'
            break
    case '1': actualSLColour = 'blue'
            break
    case '2': actualSLColour = 'purple'
            break
    case '3': actualSLColour = 'yellow'
            break
    case '4': actualSLColour = 'orange'
            break
    case '5': actualSLColour = 'red'
            break
    default: actualSLColour = ''
  }

  useEffect(() => {
    ReactTooltip.rebuild()
  })

  const handleSubmit = event => {
      event.preventDefault()

      const data = { // data to send to backend 
        id : id ?? undefined, // undefined if its a new stressor
        title : title,
        date : date,
        description : description,
        copingPlan : copingPlan,
        cpExecuted: date<currentDate && copingPlan!=='' ?  cpExecuted : undefined,
        anticipatedSL: anticipatedSL,
        actualSL: date<currentDate ? actualSL : undefined,
        uncertainty: date>currentDate ? uncertainty : undefined,
        uncontrollability: date>currentDate ? uncontrollability : undefined,
        hidden: hidden
      }

      if (title && date) { // title and date needed to save stressor
        fetch('https://dstress-backend.herokuapp.com/api/stressor/' + props.function + 'Stressor.php', { // either edit or save stressor
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
        .then(() => {
          console.log('Success')
          setScreen('successScreen')
        })
        .catch((error) => {
          console.error('Error:', error)
          setScreen('failScreen')
        })
      } else {
        console.log('error')
        setScreen('failScreen')
      }
  }

  const form = showFail => ( // returns stressor form
    <div className='form-container'>
      {props.goBack &&
        <img
          onClick={() => {props.goBack()}}
          src={backArrow}
          alt='back arrow'
          className='back-arrow'
        />
      }
      <form className='stressor-form' autoComplete="off" onSubmit={handleSubmit}>
        <br/>
        {showFail && <p>Please fill all fields marked with *</p>}
        <TextInput
          id='title'
          label='Title *'
          value={title}
          onChange={title => setTitle(title)}
        />
        <img className='info-icon' src={info} alt='Info Icon' data-tip data-for='dateTip' /><br/>
        <DatePicker
          className='date-picker'
          id={dateColour}
          dateFormat='dd/MM/yyyy'
          selected={date} 
          onChange={date => setDate(date)}
        />
        <TextInput
          id='description'
          label='Description'
          value={description}
          onChange={description => setDescription(description)}
        />
        <TextInput
          id='copingPlan'
          label='Coping Plan'
          value={copingPlan}
          onChange={copingPlan => setCopingPlan(copingPlan)}
        />
        {date<currentDate && copingPlan!=='' &&
          <CheckboxInput
            label='Coping Plan Executed'
            name='cpExecuted'
            checked={cpExecuted}
            onChange={() => setCPExecuted(!cpExecuted)}
          />
        }
        <RangeInput
          id='anticipatedSL'
          label='Anticipated Stress Level'
          value={anticipatedSL}
          onChange={anticipatedSL => setAnticipatedSL(anticipatedSL)}
          min='0'
          max='5'
          colour={anticipatedSLColour}
        />
        {date<currentDate &&
          <RangeInput
            id='actualSL'
            label='Actual Stress Level'
            value={actualSL}
            onChange={actualSL => setActualSL(actualSL)}
            min='0'
            max='5'
            colour={actualSLColour}
          />
        }
        {date>currentDate &&
          <div>
            <img className='info-icon' src={info} alt='Info Icon' data-tip data-for='uncertaintyTip' />
            <RangeInput
              id='uncertainty'
              label='Stressor Uncertainty'
              value={uncertainty}
              onChange={uncertainty => setUncertainty(uncertainty)}
              min='0'
              max='5'
            />
          </div>
        }
        {date>currentDate &&
          <div>
            <img className='info-icon' src={info} alt='Info Icon' data-tip data-for='uncontrollabilityTip' />
            <RangeInput
              id='uncontrollability'
              label='Stressor uncontrollability'
              value={uncontrollability}
              onChange={uncontrollability => setUncontrollability(uncontrollability)}
              min='0'
              max='5'
            />
          </div>
        }
        <img className='info-icon' src={info} alt='Info Icon' data-tip data-for='hiddenTip' />
        <CheckboxInput
          label='Hidden'
          name='hidden'
          checked={hidden}
          onChange={() => setHidden(!hidden)}
        />
        <StressorButton button='Save' value='submit'/>
      </form>
      <ReactTooltip className='tooltip-width' id='dateTip' place='top' type='dark' effect='float'>
        The further in the future a stressor is, the less suitable it is for anticipation. The colours represent suitability of selected date
      </ReactTooltip>
      <ReactTooltip className='tooltip-width' id='hiddenTip' place='top' type='dark' effect='float'>
        Not all stressors are suitable to anticiapte; you may whish to hide a stressor if it is particularly stressful 
      </ReactTooltip>
      <ReactTooltip className='tooltip-width' id='uncertaintyTip' place='top' type='dark' effect='float'>
        The higher the uncertainty of the details surrounding a stressor, the less suitable it is for anticiaption
      </ReactTooltip>
      <ReactTooltip className='tooltip-width' id='uncontrollabilityTip' place='top' type='dark' effect='float'>
        The less control you have over a stressor, the less suitable it is for anticiaption
      </ReactTooltip>
      <br/>
      <br/>
    </div>
  )

  if (screen==='formScreen') { // render the form without red input instructions
    return(form(false))
  } else if (screen==='successScreen') { // render success component
    return (
      <Success
        action={props.function}
      />
    )
  } else if (screen==='failScreen') { // render with instructions
    return (form(true))
  }
}

StressorForm.propTypes = {
  id: propTypes.string,
  title: propTypes.string,
  date: propTypes.string,
  description: propTypes.string,
  copingPlan: propTypes.string,
  cpExecuted: propTypes.string,
  anticipatedSL: propTypes.string,
  actualSL: propTypes.string,
  uncertainty: propTypes.string,
  uncontrollability: propTypes.string,
  hidden: propTypes.string,
  function: propTypes.string.isRequired,
  goBack: propTypes.func
}

export default StressorForm
