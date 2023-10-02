import React, { useEffect, useState } from 'react'
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config"
import { useRouter } from 'next/router';
import Loader from './Loader';
function AuthGuard({children}) {
    const [userLoggedIn,setUserLoggedIn]=useState(false)
    const router=useRouter()
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
          if (user) {

            const uid = user.uid;
            // ...
            router.push("/dashboard")
            setUserLoggedIn('userLoggedIn')
          } else {
            // User is signed out
            // ...
            router.push("/Login")
            setUserLoggedIn('notLoggedIn')
          }
        });
      }, []);
      if(userLoggedIn==="userLoggedIn"){
        return children
      }else if(userLoggedIn==="notLoggedIn"){
        return <h1>user not logged In</h1>
      }else{
        return <Loader />
      }
      
  return null
}

export default AuthGuard
