

import { HashLoader } from 'react-spinners'

export default function Loader() {

    
  return (
    <div className="flex justify-center items-center h-screen w-full">
    <HashLoader color="#36d7b7" size={100} loading={true} />
  </div>
  )
}
