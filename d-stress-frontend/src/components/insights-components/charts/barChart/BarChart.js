// generic bar chart component
import React from 'react'
import propTypes from 'prop-types'

import { Bar } from 'react-chartjs-2'

const BarChart = props => (
  <Bar
    data={{
      labels: props.titles,
      datasets: [
        {
          label: 'Antcipated Stress Level',
          backgroundColor: 'rgba(41, 156, 157)',
          borderColor: 'black',
          borderWidth: 1,
          data: props.dataPack1
        },
        {
          label: 'Actual Stress Level',
          backgroundColor: 'rgba(97, 97, 97)',
          borderColor: 'black',
          borderWidth: 1,
          data: props.dataPack2
        },
      ]
    }}
    height={300}
    options={{
      scales: {
        xAxes: [{
          stacked: true,
        }],
        yAxes: [{ 
          stacked: false,
          ticks: {
            min: 0,
            max: 7    
        }
        }]
      },
    }}
  />
)

BarChart.propTypes = { // generic bar chart component so takes in data and titles
  titles: propTypes.arrayOf(propTypes.string).isRequired,
  dataPack1: propTypes.arrayOf(propTypes.string).isRequired,
  dataPack2: propTypes.arrayOf(propTypes.string).isRequired
}

export default BarChart
