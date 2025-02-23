import { useContext, useEffect } from 'react'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { Product } from '../products/products'
import Loader from '../Loader/Loader'
import Slider from "react-slick";
import toast from 'react-hot-toast'
import { CartContext } from '../../Context/CartContext'

export default function ProductDetails() {
  const [isLoading,setIsLoading]=useState<boolean>(false)
    const cartContext = useContext(CartContext);
    if (!cartContext) {
      throw new Error("useContext must be used within a CartContextProvider");
    }
    const { addToCart,setCart } = cartContext;
  const settings = {
    dots: true,
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
  const settingsRelated = {
    dots: true,
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    swipeToSlide: true,
    arrows:false,
    autoplay: true,
    speed: 300,
    autoplaySpeed: 3000,
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
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  const {id} =useParams()
  
  
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  function getProduct() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then(({ data }) => {
        setProduct(data.data);
        getRelatedProducts(data.data.category?._id);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function getRelatedProducts(categoryId: string | undefined) {
    if (!categoryId) return;
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products?category[in]=${categoryId}`)
      .then(({ data }) => {
        setRelatedProducts(data.data);
        
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function addProductToCart(productId:string){
    setIsLoading(true)
    const res = await addToCart(productId)
    if (res.status == 'success') {
      setCart(res)

     if (res.message) {
      toast.success(res.message,{
        duration:2000,
        position:"top-right"
      })
     }
      
    }else{
      console.log('error');
      toast.success('error adiing to the cart',{
        duration:2000,
        position:"top-right"
      })
      
    }
      setIsLoading(false)
  }

    useEffect(() => {
      getProduct()
      
    }, [])
      
    return (
      <>
        {product?<div className="row">
          <div className="md:w-1/4 w-full">
          <Slider className='w-full' {...settings}>
            {product?.images.map((img)=>{
             return<>
              <div key={img}>
      <img src={img} alt={product?.title} className="w-full rounded-lg" />
      </div></>
            })}
      
      
    </Slider>
          
          </div>
          <div className='md:w-3/4 w-full p-4'>
            <h1 className="text-2xl font-bold">{product.title}</h1>
            <p className="text-gray-600 my-2">{product.description}</p>
            <div className="flex justify-between items-center w-full">
            <p className="text-lg font-semibold">Price: {product.price} EGP</p>
            <p><i className='fas fa-star text-yellow-400'></i>{product.ratingsAverage}</p>
            </div>
            <button className="mt-4 w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600">
              + Add to Cart
            </button>
          </div>
        </div>:<Loader/>}

        {relatedProducts?<>
        <h2 className='text-3xl font-bold text-main'>Related Products :</h2>
        <Slider  className='w-full ' {...settingsRelated} >
          {
            relatedProducts.map((product)=>{
              return<>
              <div className="product p-2">
                <Link to={`/productdetails/${product.id}`}>
                <div className="flex justify-center">
                <img className='w-auto h-[315px]' src={product.imageCover} alt={product.title} /></div>
                <span className='block font-light text-main'>{product.category.name}</span>
                <h3 className='text-lg text-slate-800'>{product.title.split(' ').slice(0,2).join(' ')}</h3>
                <div className="flex justify-between items-center">
                <p>Price: ${product.price}</p>
                <p><i className='fas fa-star text-yellow-400'></i>{product.ratingsAverage}</p>
                </div></Link>
                <div className="w-full flex justify-center">
                  <div className="btn">
                  <button onClick={()=>addProductToCart(product._id)} className="text-white  bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                    {isLoading? <i className="fas fa-spinner mx-4 fa-spin"></i>:'Add to cart'}
                    
                  </button>                  </div>
                </div>
                  
              </div>
              </>
            })
          }
        </Slider>
        </>
        :<Loader/>
      }
        </>
    );
  }

