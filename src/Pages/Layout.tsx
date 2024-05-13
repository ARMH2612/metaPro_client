import { useDispatch, useSelector } from "react-redux"
import Sidebar from "../Components/Sidebar"
import { FaBell } from "react-icons/fa"
import { FaRightFromBracket } from "react-icons/fa6"
import { checkLoginStatus, logout } from "../state/user/userSlice"
import { useNavigate,Outlet, Navigate } from "react-router-dom"
import { useEffect } from "react"

const Layout = () => {
  const {user,isLoggedIn} = useSelector(state => state.user)

  const dispatch = useDispatch()
  const navigate = useNavigate();
  const handlLogout = ()=>{
    dispatch(logout())
    navigate('/');
  }

  useEffect(()=>{
    dispatch(checkLoginStatus())
  },[dispatch])
  if(isLoggedIn){  
  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-48 w-full">
        <div className="w-full flex justify-between p-2 border-b">
          <p>
            Hello {user.name}
          </p>
          <div className="flex space-x-3 pr-3">
            <FaBell className="cursor-pointer" />
            <FaRightFromBracket className="cursor-pointer" onClick={()=>handlLogout()} />
          </div>
        </div>
    
        <Outlet />
       
      </div>
    </div>
  )}
  else{
    <Navigate replace to="/" />
  }
}

export default Layout