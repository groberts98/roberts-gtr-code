// component that handles the rendering of an insight
import React, {useState, useEffect} from 'react'
import propTypes from 'prop-types'

import BarChart from '../charts/barChart/BarChart'
import PieChart from '../charts/pieChart/PieChart'
import LineChart from '../charts/lineChart/LineChart'

import backArrow from '../../../resources/backArrow.png'

import './Insight.css'

const Insight = props => {
  const [data, setData] = useState([])

  useEffect(() => { // load in all stress data when viewing an insight
    async function fetchData() {
      try {
        const response = await fetch(`https://dstress-backend.herokuapp.com/api/stressor/GetStressor.php?id=&filter=`)
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

  //Get data for analytics page
  const dates = data.map(stressor => stressor['date'])
  const titles = data.map(stressor => stressor['title'])
  const actualSLs = data.map(stressor => stressor['actual-SL'])
  const ancticipatedSLs = data.map(stressor => stressor['anticipated-SL'])
  const actualSLsHidden = data.filter(stressor => stressor['hidden']!=='1').map(stressor => stressor['actual-SL'])
  const ancticipatedSLsHidden = data.filter(stressor => stressor['hidden']!=='1').map(stressor => stressor['anticipated-SL'])
  const numberHidden = data.map(stressor => stressor['hidden']).filter(a => a==='1').length
  const stressLevels = []
  for (let i=0; i<=5; i++) { // get the number of stressors of each stress level
    stressLevels.push(data.filter((stressor) => stressor['actual-SL'] === '' + i).length)
  }

  return (
    <div className='insight'>
      <img
        onClick={() => {props.goBack()}}
        src={backArrow}
        alt='back arrow'
        className='back-arrow'
      />
      <h2>{props.title}</h2>
      <hr/>
      {(() => {
        switch (props.chartType) { // render differnt charts based on the type of insight being rendered
          case 'bar': return (
            <BarChart
              dataPack1={actualSLs.slice(0, 10)} // get 10 most recent data entries
              dataPack2={ancticipatedSLs.slice(0, 10)}
              titles={titles.slice(0, 10)}
            />
          )
          case 'pie': return (
            <PieChart
              titles={['0', '1', '2', '3', '4', '5']} // graph showing number of stressors of each stress level
              dataPack={stressLevels}
            />
          )
          case 'line': return (
            <LineChart
              dataPack1={actualSLs}
              dataPack2={ancticipatedSLs}
              dates={dates}
            />
          )
          case 'stats': return (
            <div className='stats'>
              <b>Number of stressors: </b>{data.length}<br/>
              <b>Number Hidden: </b>{numberHidden}<br/>
              <b>Average actual stress level: </b>{(actualSLs.filter(a => !!a).reduce((a, b) => parseInt(a)+parseInt(b), 0)/actualSLs.filter(a => !!a).length).toFixed(2)}<br/>
              <b>Average anticipated stress level: </b>{(ancticipatedSLsHidden.filter(a => !!a).reduce((a, b) => parseInt(a)+parseInt(b), 0)/ancticipatedSLs.filter(a => !!a).length).toFixed(2)}<br/>
              <b>Average actual stress level when hidden: </b>{(actualSLsHidden.filter(a => !!a).reduce((a, b) => parseInt(a)+parseInt(b), 0)/actualSLs.filter(a => !!a).length).toFixed(2)}<br/>
              <b>Average anticipated stress level when hidden: </b>{(ancticipatedSLs.filter(a => !!a).reduce((a, b) => parseInt(a)+parseInt(b), 0)/ancticipatedSLs.filter(a => !!a).length).toFixed(2)}<br/>
            </div>
          )
          default: return (<p>Error</p>)
        }
      })()}
      <br/>
      {props.description && <div><b>Description</b><br/>{props.description}</div>}
      <br/>
      <br/>
    </div>
  )
}

Insight.propTypes = {
  title: propTypes.string,
  description: propTypes.string,
  chartType: propTypes.string.isRequired,
  goBack: propTypes.func
}

Insight.defaultProps = {
  title: 'Insight',
  description: 'Insight description',
  goBack: () => {}
}

export default Insight
