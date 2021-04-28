// generic pie chart component
import React from 'react'
import propTypes from 'prop-types'

import { Pie } from 'react-chartjs-2'

const PieChart = props => (
  <Pie
    data={{
      labels: props.titles,
      datasets: [{
        data: props.dataPack,
        backgroundColor: [
          'rgba(0, 128, 0, 0.808)',
          'rgba(0, 0, 255, 0.808)',
          'rgba(128, 0, 128, 0.808)',
          'rgba(255, 255, 0, 0.808)',
          'rgba(255, 166, 0, 0.808)',
          'rgba(255, 0, 0, 0.808)'
        ],
        borderColor: 'black'
      }]
    }}
    height={300}
  />
)

PieChart.propTypes = { // generic pie chart component so takes in data and titles
  titles: propTypes.arrayOf(propTypes.string).isRequired,
  dataPack: propTypes.arrayOf(propTypes.number).isRequired
}

export default PieChart
