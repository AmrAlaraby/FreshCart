
import { useEffect } from 'react'

import Products from '../products/products'
import CatigoriesSlider from '../CatigoriesSlider/CatigoriesSlider'
import MainSlider from '../MainSlider/MainSlider'

export default function Home() {
    

    useEffect(() => {
      
    }, [])
    
  return (<>
    <MainSlider/>
    <CatigoriesSlider/>
    <Products/>
  </>
  )
}
