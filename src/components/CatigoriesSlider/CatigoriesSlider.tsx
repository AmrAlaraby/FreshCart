
import { useEffect } from 'react'
import { useState } from 'react'

import Slider from "react-slick";
import axios from 'axios';
import { Category } from '../products/products';

export default function CatigoriesSlider() {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    speed: 300,
    autoplaySpeed: 3000,
    swipeToSlide: true,
    arrows:false,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  const [categories,setCategories]=useState<Category[] | []>([])

  function getCategories() {
    axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
    .then(({data})=>{
      
      setCategories(data.data)
      
    }).catch((error)=>{
console.log(error);

    })
  }

    useEffect(() => {
      getCategories()
    }, [])
    
  return (
    <>
    <h2 className='py-4 text-slate-800 font-light text-xl'>Shop popular categories</h2>
    <Slider {...settings}>
      {
        categories.map((category)=>{return <div key={category._id} className="">

          <div  className="flex justify-center">
            <img className='h-[315px] w-full' src={category.image} alt={category.name} />
          </div>
            <h3 className='mt-2 text-center'>{category.name}</h3>
        </div>
        })
      }
    </Slider>
    </>
  )
}
