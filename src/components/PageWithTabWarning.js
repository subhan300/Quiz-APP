import { Actions } from "@/context/context";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const PageWithTabWarning = () => {
  const actions=Actions()
  const router=useRouter()
  const [count,setCount]=useState(0)
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue =
        "Are you sure you want to refresh? Your Quiz will be close ";
      // actions.quizReset()
      // router.push("/")
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        // The page is now hidden (user switched tabs or applications)
        alert(
          "Warning: You switched to another tab. you have now last chance"
        );
      
        setCount(prev=>prev+1)
      
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);
  useEffect(() => {
    // Check if visibilityChangeCount is equal to 2 and run the function
   
      if(count>1){
        actions.quizReset()
        router.push("/")
      }
    
  }, [count]); 

};

export default PageWithTabWarning;
