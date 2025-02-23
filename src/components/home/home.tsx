import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import s from './Home.module.css'
import Products from '../products/products'
import CatigoriesSlider from '../CatigoriesSlider/CatigoriesSlider'
import MainSlider from '../MainSlider/MainSlider'

export default function Home() {
    let [count,setcount]=useState(0)

    useEffect(() => {
      
    }, [])
    
  return (<>
    <MainSlider/>
    <CatigoriesSlider/>
    <Products/>
  </>
  )
}
