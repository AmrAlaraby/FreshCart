import { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useFormik } from 'formik'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import { UserContext } from '../../Context/UserContext'


interface ResetPassword {
    email:string,
    newPassword:string, 
}

export default function Resetpassword() {
    const userContext = useContext(UserContext);
          if (!userContext) {
            throw new Error("useContext must be used within a CartContextProvider");
          }
          const { setUserLogin } = userContext;
  const [apiError,setapiError]=useState('')
  const [isLoading,setisLoading]=useState(false)
const navigate = useNavigate()

const validationYup =yup.object().shape({

  email:yup.string().email('email is invalid').required('email is required'),
  newPassword:yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/,'password must start with a upperCace').required('password is required'),

})

  const formik = useFormik({
    initialValues:{
      email:'',
      newPassword:'',
    },
    validationSchema:validationYup
    ,

    onSubmit:handelResetPassword
  })
 function handelResetPassword(formValues:ResetPassword) {
  setisLoading(true)

  axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword',formValues)
  .then(
    (x)=>{
      setUserLogin(x.data.token)
      setisLoading(false)
      localStorage.setItem('userToken',x.data.token)
      
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
    <div className="py-6 min-h-screen max-w-xl mx-auto">

    <h2 className='text-3xl font-bold mb-6'>
      Reset Your Password Now !!
    </h2>

   
  {apiError? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  {apiError}
</div>:null}


   <form onSubmit={formik.handleSubmit} className=" mx-auto">
  
  <div className="relative z-0 w-full mb-5 group">
    <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
    <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email :</label>
  </div>
  {formik.errors.email && formik.touched.email ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  {formik.errors.email}
</div>:null}
  
  <div className="relative z-0 w-full mb-5 group">
    <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.newPassword} type="password" name="newPassword" id="newPassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
    <label htmlFor="newPassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password :</label>
  </div>
  {formik.errors.newPassword && formik.touched.newPassword ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  {formik.errors.newPassword}
</div>:null}
  
<div className="flex justify-end">
{isLoading?  <div className="w-full flex justify-center items-center">
   <i className='fas fa-spinner fa-spin fa-xl my-4'></i>
  </div>
  :<button type="submit" className="text-white  bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Submit</button>}</div>
  <div className=""> don`t have an account yet ? <span className='font-semibold'><Link to={'/register'}>Register Now</Link></span></div>
  <div className="">  <span className='font-semibold'><Link to={'/forgetpassword'}>forgot your password ?</Link></span></div>
</form>
    </div>

    </>
  )
}
