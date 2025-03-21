import { createContext,useEffect,useState } from "react";
import {toast} from 'react-toastify'
import axios from 'axios'

export const AppContext=createContext()

const AppContextProvider=(props)=>{
    const currentSymbol='$'
    const backendUrl=import.meta.env.VITE_BACKEND_URL

    const [doctors,setDoctors]=useState([])
    const [token,setToken]=useState(localStorage.getItem('doctor-token')?localStorage.getItem('doctor-token'):false)
    const [userData,setUserData]=useState(false)

 
    const getDoctorsData=async ()=>{
        try {
            const {data}=await axios.get(backendUrl+"/api/doctor/list")
            if(data.success){
                setDoctors(data.doctors)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }

    }
    const loadUserProfileData = async () => {
        try {
            const { data } = await axios.get(backendUrl + "/api/user/get-profile", { headers: { token } });
            console.log("API Response:", data); // Log the full response for debugging
            if (data.success) {
                setUserData(data.userData); // Access the correct field from the response
            } else {
                toast.error(data.message); // Handle API errors
            }
        } catch (error) {
            console.error("Error fetching profile data:", error);
            toast.error(error.message); // Handle network or server errors
        }
    };
    
    
     
    const value ={
        doctors,getDoctorsData,
        currentSymbol,
        token,setToken,
        backendUrl,
        userData,setUserData,
        loadUserProfileData
    }

    useEffect(()=>{
        getDoctorsData()
    },[])

    useEffect(()=>{
        if(token){
            loadUserProfileData()
        }else{
            setUserData(false)
        }
    },[token])
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}
export default AppContextProvider