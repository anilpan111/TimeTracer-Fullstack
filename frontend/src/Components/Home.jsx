import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import appwriteAuth from '../appwrite/appwriteAuth';
import { login } from '../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import BigCalendar from './BigCalendar';
function Home() {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  
  useEffect(() => {
    const authData = JSON.parse(localStorage.getItem("userdata"));
    if (authData) {
      const loginData = {
        email: authData.email,
        password: authData.password
      }
      const reLogin = async ()=>{
        appwriteAuth.login(loginData).then(
          function (response) {
            const userData = appwriteAuth.getCurrentUser();
            if (userData) dispatch(login(authData));
            navigate("/")
          },
          function(error){
            console.error(error)
          }
        )
      }
      reLogin()
    }
  }, [])
  return (
    <div>
      <h1>Home</h1>
    </div>
  )
}

export default Home
