// past stressors page
import React, { useEffect, useState } from 'react'

import Navbar from '../../components/navbar/Navbar'
import StressorList from '../../components/stressor-components/stressor-list/StressorList'

const Past = () => {
  const [data, setData] = useState('')

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://dstress-backend.herokuapp.com/api/stressor/GetStressor.php?id=&filter=past')
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
        header='Past'
      />
      <Navbar
        right='/'
      />
    </div>
  )
}

export default Past
