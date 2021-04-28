// component for outputting a list of stressor tiles
import React, { useState } from 'react'
import propTypes from 'prop-types'

import Stressor from '../stressor/Stressor'
import NoStressors from '../no-stressors/NoStressors'
import StressorTile from '../stressor-tile/StressorTile'

import './StressorList.css'

const StressorList = props => {
  const [currentTile, setCurrentTile] = useState('') // display stressor tile content when clicked
  const [showAll, setShowAll] = useState(false) // whether or not to show hidden stressors

  const displayStressors = () => (
    (props.data && props.data.length) ? 
    <div className='stressor-list'>
      <div className='list-header'>
        {props.header && <h2>{props.header} Stressors</h2>}
        {props.header && <hr/>}
        <div className='showAllCheckbox-container'>{/* render the showall checkbox*/}
          <label className='checkbox-label'>Show All</label>
          <input
            data-testid='showAll'
            className='checkbox'
            type='checkbox'
            name='showAll'
            onChange={() => setShowAll(!showAll)}
          />
        </div>
      </div>
      {props.data.map( (stressor, index) => (
        (showAll || stressor['hidden']==='0') && // display all stressors if showall is selected otherwise show non hidden ones
          <StressorTile key={index}
            className={'stressorTile'}
            id={stressor['id']}
            title={stressor['title']}
            date={stressor['date']}
            description={stressor['description']}
            copingPlan={stressor['coping-plan']}
            anticipatedSL={stressor['anticipated-SL']}
            actualSL={stressor['actual-SL']}
            uncertainty={stressor['uncertainty']}
            uncontrollability={stressor['uncontrollability']}
            onClick={id => setCurrentTile(id)}
          />
      ))}
    </div> :
    <NoStressors type={props.header} />
  )

  return (
    <div>
      {currentTile && props.data.map(obj => (obj.id)).includes(currentTile) ? // either show a specific stressor tiles content or the entire list of tiles
        <Stressor
          stressor={props.data.filter(obj => (obj.id===currentTile))}
          goBack={() => {setCurrentTile('')}}
        /> : 
        displayStressors()
      }
    </div>
  )
}

StressorList.propTypes = {
  data: propTypes.array.isRequired,
  header: propTypes.string,
}

export default StressorList
