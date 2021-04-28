// add stressor page
import React from 'react'

import Navbar from '../../components/navbar/Navbar'
import StressorForm from '../../components/stressor-components/stressor-form/StressorForm'

const AddStressor = () => (
  <div className='page-container'>
    <StressorForm
      function='Save'
    />
    <Navbar />
  </div>
)

export default AddStressor
