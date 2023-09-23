import { Actions } from "@/context/context";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import CustomizedSnackbars from "./toasters/Alert";

const PageWithTabWarning = () => {
  const actions = Actions();
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const [count, setCount] = useState(0);
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue =
        "Are you sure you want to refresh? Your Quiz will be close ";
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        // The page is now hidden (user switched tabs or applications)
        {
          count === 1 ? "" : setOpen(true);
        }

        setCount((prev) => prev + 1);
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
    if (count > 1) {
      router.push("/");
      setTimeout(()=>{
      actions.quizReset();
      },2000)
    }
  }, [count]);

  return (
    <CustomizedSnackbars
      open={open}
      setOpen={setOpen}
      message={"You can not leave browser , Now you have a last chance "}
      alertType={"error"}
    />
  );
};

export default PageWithTabWarning;
