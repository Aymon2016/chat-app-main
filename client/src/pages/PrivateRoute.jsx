import React from 'react'
import {Outlet,Navigate} from 'react-router-dom'




function PrivateOutlet() {
    // const [auth,setauth] = useState(false)
    // useEffect( async()=>{
    //         const data = await localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    //         if(data.length > 0){
    //             setauth(true)
    //         }
       
    // },[])
    //   console.log(auth)
    const auth = true;
  return auth? <Outlet /> : <Navigate to="" />
}

export default PrivateOutlet