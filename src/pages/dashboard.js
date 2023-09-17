import UserTable from "@/components/UserTable";
import MiniDrawer from "@/components/drawer/Drawer";
import queries from "@/firebase/firestore/queries";
import React, { useEffect, useState } from "react";

export default function Dashboard() {
    const [userData,setUserData]=useState([])
    const getData=async()=>{
        const data=await queries.getData("users")
        setUserData(data.result)
      }
     
      useEffect(() => {
        getData()
      }, []);
  return (
      <MiniDrawer>
        <h1>Dashboard</h1>
        <UserTable userData={userData} />
      </MiniDrawer>
  );
}

Dashboard.requireAuth = true;
