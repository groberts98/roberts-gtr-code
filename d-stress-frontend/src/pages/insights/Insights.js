// the insights page
import React from 'react'

import Navbar from '../../components/navbar/Navbar'
import InsightsList from '../../components/insights-components/insights-list/InsightsList'

const Insights = () => (
  <div>
    <div className='page-container'>
      <InsightsList />
    </div>
    <Navbar />
  </div>
)

export default Insights
