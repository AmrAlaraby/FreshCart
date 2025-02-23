import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import s from './MainSlider.module.css'
import sliderImg1 from '../../assets/images/slider-image-3.jpeg'
import sliderImg2 from '../../assets/images/slider-image-2.jpeg'
import sliderImg3 from '../../assets/images/slider-image-1.jpeg'
import blogImg1 from '../../assets/images/blog-img-1.jpeg'
import blogImg2 from '../../assets/images/blog-img-2.jpeg'
import Slider from 'react-slick'

export default function MainSlider() {

  var settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    swipeToSlide: true,
    arrows:false,
    speed: 1000,
    autoplaySpeed: 3000,
    cssEase: "linear"
  };
    let [count,setcount]=useState(0)

    useEffect(() => {
      
    }, [])
    
  return (
    <>
    <div className="row">
      <div className="w-3/4">
      <Slider {...settings}>
        <img src={sliderImg1} alt="sliderImg1" className='h-[400px]' />
        <img src={sliderImg2} alt="sliderImg2" className='h-[400px]'/>
        <img src={sliderImg3} alt="sliderImg3" className='h-[400px]'/>
      </Slider>
      </div>
      <div className="w-1/4">
      <img src={blogImg1} alt="blogImg1" className='h-[200px]'/>
      <img src={blogImg2} alt="blogImg2" className='h-[200px]'/>
      </div>
    </div>
    </>
  )
}
