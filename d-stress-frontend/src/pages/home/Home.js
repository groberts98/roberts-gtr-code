// home page
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import Navbar from '../../components/navbar/Navbar'
import Stressor from '../../components/stressor-components/stressor/Stressor.js'
import InsightsButton from '../../components/buttons/insightsButton/InsightsButton'
import NoStressors from '../../components/stressor-components/no-stressors/NoStressors'
import StressorTile from '../../components/stressor-components/stressor-tile/StressorTile'
import AddStressorButton from '../../components/buttons/addStressorButton/AddStressorButton'

import './Home.css'

const Home = () => {
  const [data, setData] = useState('')
  const [currentTile, setCurrentTile] = useState('') // whether or not the home screen tile has been clicked

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`https://dstress-backend.herokuapp.com/api/stressor/GetStressor.php?id=&filter=current`)
        if (!response.ok) {
          throw Error(response.statusText)
        }
        setData(await response.json())
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])

  return (
    <div>
      {currentTile //if the current tiles been clicked, show the stressor page
        ? <div className='page-container'>
            <Stressor
              stressor={data.filter(obj => (obj.id === currentTile))}
              goBack={() => setCurrentTile('')}
            /> 
          </div>
        : <div className='page-container'>
            {(data && data.length) ? 
              data.map((stressor, index) => (
                <StressorTile key={index}
                  className={'stressorTileHome'}
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
              )) :
              <NoStressors />
            }
            <Link to='/insights'><InsightsButton/></Link>
            <Link to='/add-stressor'><AddStressorButton/></Link>
          </div>
      }
      <Navbar />
    </div>
  )
}

export default Home
