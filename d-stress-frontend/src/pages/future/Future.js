// future stressors page
import React, { useState, useEffect } from 'react'

import Navbar from '../../components/navbar/Navbar'
import StressorList from '../../components/stressor-components/stressor-list/StressorList'

const Future = () => {
  const [data, setData] = useState('')

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://dstress-backend.herokuapp.com/api/stressor/GetStressor.php?id=&filter=future')
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
    <div className='page-container'>
      <StressorList 
        data={data}
        header='Future'
      />
      <Navbar
        left='/'
      />
    </div>
  )
}

export default Future
