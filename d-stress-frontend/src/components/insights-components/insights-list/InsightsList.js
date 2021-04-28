// renders list of insights available to view
import React, { useState } from 'react'

import Insight from '../insight/Insight'
import InsightsTile from '../insights-tile/InsightsTile'

import barChart from '../../../resources/barChart.png'
import pieChart from '../../../resources/pieChart.png'
import lineChart from '../../../resources/lineChart.png'
import analytics from '../../../resources/analytics.png'

import './InsightsList.css'

const InsightsList = () => {
  const [currentTile, setCurrentTile] = useState('')

  const displayInsights = () => ( // 4 pre-set insights to view
    <div className='insights-list'>
      <InsightsTile
        title='Analytics'
        description='Data on stress history'
        imageSrc={analytics}
        onClick={() => setCurrentTile('analytics')}
      />
      <InsightsTile
        title='Line Graph'
        description='Line graph displaying the SL over time'
        imageSrc={lineChart}
        onClick={() => setCurrentTile('line')}
      />
      <InsightsTile
        title='Bar Chart'
        description='Bar chart displaying the anticipated SL and actual SL of events'
        imageSrc={barChart}
        onClick={() => setCurrentTile('bar')}
      />
      <InsightsTile
        title='Pie Chart'
        description='Pie chart displaying the spread of stress level'
        imageSrc={pieChart}
        onClick={() => setCurrentTile('pie')}
      />  
    </div>
  )
  
  return (
    <div>
      {(() => {
        switch (currentTile) { // display a specific insight or list of insight tiles
          case 'analytics': return (
            <Insight
              chartType='stats'
              title='Analytics'
              description='Stats on stress history'
              goBack={() => {setCurrentTile('')}}
            />
          )
          case 'line': return (
            <Insight
              chartType='line'
              title='Line Graph'
              description='Line graph displaying the SL over time'
              goBack={() => {setCurrentTile('')}}
            />
          )
          case 'bar': return (
            <Insight
              chartType='bar'
              title='Bar Chart'
              description='Bar chart displaying the anticipated SL and actual SL of events'
              goBack={() => {setCurrentTile('')}}
            />
          )
          case 'pie': return (
            <Insight
              chartType='pie'
              title='Pie Chart'
              description='Pie chart displaying the spread of stress level'
              goBack={() => {setCurrentTile('')}}
            />
          )
          default: return (
            displayInsights()
          )
        }
      })()}
    </div>
  )
}

export default InsightsList
