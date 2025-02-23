import { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

import { useFormik } from 'formik'
import axios from 'axios'
import { Link,  useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import { UserContext } from '../../Context/UserContext'

interface register {
  
    name:string,
    phone:string,
    email:string,
    password:string,
    rePassword:string
  
}
export default function Signup() {
  const userContext = useContext(UserContext);
        if (!userContext) {
          throw new Error("useContext must be used within a CartContextProvider");
        }
        const { setUserLogin } = userContext;

  const [apiError,setapiError]=useState('')
  const [isLoading,setisLoading]=useState(false)
const navigate = useNavigate()

const validationYup =yup.object().shape({
  name:yup.string().min(3,'name minlength is 3').max(10,'name maxlength is 10').required('name is required'),
  email:yup.string().email('email is invalid').required('email is required'),
  phone:yup.string().matches(/^01[0125][0-9]{8}$/,'phone is invalid').required('phone is required'),
  password:yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/,'password must start with a upperCace').required('password is required'),
  rePassword:yup.string().oneOf([yup.ref('password')],'you must match the password').required('password is required'),
})

  const formik = useFormik({
    initialValues:{
      name:'',
      phone:'',
      email:'',
      password:'',
      rePassword:''
    },
    validationSchema:validationYup
    ,

    onSubmit:handelRegister
  })
 function handelRegister(formValues:register) {
  setisLoading(true)
  axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',formValues)
  .then(
    (res)=>{
      if(res?.data?.message === 'success')
      setisLoading(false)
      localStorage.setItem('userToken',res.data.token)
      setUserLogin(res.data.token)
      
      
      navigate('/')
    }
  )
  .catch(
    (error)=>{
      setisLoading(false)
      console.log(error.response.data.message);
      setapiError(error.response.data.message)
    }
  )
  
  
    
  }

    useEffect(() => {
      
    }, [])
    
  return (
    <>
    <div className="py-6 max-w-xl min-h-screen mx-auto">

    <h2 className='text-3xl font-bold mb-6'>
      Register Now
    </h2>

   
  {apiError? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  {apiError}
</div>:null}


   <form onSubmit={formik.handleSubmit} className=" mx-auto">
  <div className="relative z-0 w-full mb-5 group">
    <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} type="text" name="name" id="name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
    <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name :</label>
  </div>
  {formik.errors.name && formik.touched.name ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  {formik.errors.name}
</div>:null}
  <div className="relative z-0 w-full mb-5 group">
    <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
    <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email :</label>
  </div>
  {formik.errors.email && formik.touched.email ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  {formik.errors.email}
</div>:null}
  <div className="relative z-0 w-full mb-5 group">
    <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone} type="tel" name="phone" id="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
    <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone :</label>
  </div>
  {formik.errors.phone && formik.touched.phone ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  {formik.errors.phone}
</div>:null}
  <div className="relative z-0 w-full mb-5 group">
    <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} type="password" name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
    <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password :</label>
  </div>
  {formik.errors.password && formik.touched.password ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  {formik.errors.password}
</div>:null}
  <div className="relative z-0 w-full mb-5 group">
    <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.rePassword} type="password" name="rePassword" id="rePassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
    <label htmlFor="rePassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">rePassword :</label>
  </div>
  {formik.errors.rePassword && formik.touched.rePassword ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  {formik.errors.rePassword}
</div>:null}
<div className="flex justify-end">
{isLoading?  <div className="w-full flex justify-center items-center">
   <i className='fas fa-spinner fa-spin fa-xl my-4'></i>
  </div>
  :<button type="submit" className="text-white  bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Submit</button>}</div>
  <div className=""> have an account alrady ? <span className='font-semibold'><Link to={'/login'}>Login Now</Link></span></div>
</form>
    </div>

    </>
  )
}
