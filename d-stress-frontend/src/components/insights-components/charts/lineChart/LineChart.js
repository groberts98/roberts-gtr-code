// generic component for line graph
import React from 'react'
import propTypes from 'prop-types'

import { Line } from 'react-chartjs-2'

const LineChart = props => (
  <Line
    data={{
      labels: props.dates,
      datasets: [
        {
          label: 'Actual SL',
          data: props.dataPack1,
          fill: true,
          backgroundColor: 'rgba(41, 156, 157, 0.7)',
          borderColor: 'black'
        },
        {
          label: 'Anticipated SL',
          data: props.dataPack2,
          fill: true,
          backgroundColor: 'rgba(97, 97, 97, 0.7)',
          borderColor: 'black'
        }
      ]
    }}
    height={300}
    options={{
      spanGaps: true,
      scales: {
        xAxes: [{
          ticks: {
            maxTicksLimit: 5
          }
        }],
        yAxes: [{
          ticks: {
            min: 0,
            max: 7    
          }
        }]
      },
    }}
  />
)

LineChart.propTypes = { // generic line chart component so takes in data and titles
  dates: propTypes.arrayOf(propTypes.string).isRequired,
  dataPack1: propTypes.arrayOf(propTypes.string).isRequired,
  dataPack2: propTypes.arrayOf(propTypes.string).isRequired
}

export default LineChart
