import { useEffect, useState } from "react";
import axios from "../api/axios";


function Users() {

    const[users, setUsers]=useState(); 


    useEffect(() =>{
        let isMounted=true;
        const controller=new AbortController();

        const getUsers=async () =>{
            try{
                        
                const response=await axios.get('/users',{
                    signal: controller.signal
                });
                console.log(response.data);
                isMounted && setUsers(response.data);
             }catch (err){
                console.error(err);
            }
        }
        getUsers();

        return () => {
            isMounted=false;
            controller.abort();
        }
    },[])

  return (
    <div>Users</div>
  )
}

export default Users