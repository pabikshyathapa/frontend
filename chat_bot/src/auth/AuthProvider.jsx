import { createContext, useState,useEffect,useContext } from "react";
export const AuthContext=createContext()
export const useAuth = () => useContext(AuthContext);

const AuthContextProvider =({children})=> {
    const [user,setUser]=useState(null)
    const[loading,setLoading]=useState(true)
    
    const login =(userData,token)=> {
        setLoading(true)
        localStorage.setItem("token",token)
        localStorage.setItem("user",JSON.stringify(userData))
        setUser(userData)
        setLoading(false)
    }
    const logout =()=>{
        setLoading(true)
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        setUser(null)
        setLoading(false)
    }
    useEffect(()=> {
        setLoading(true)
        const token = localStorage.getItem("token")
        const storedUser = localStorage.getItem("user")
        if(token && storedUser){
            setUser(JSON.parse(storedUser))
        }else{
            logout()
        }
        setLoading(false)
    },[])
    return(
    <AuthContext.Provider
    value={ {user,login,loading,logout, isAuthenticated:user !== null}}
    >
        {children}
    </AuthContext.Provider>
    )
}
export default AuthContextProvider