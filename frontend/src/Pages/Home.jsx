import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import appwriteAuth from '../appwrite/appwriteAuth';
import { login as loginSlice} from '../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import Hero from '../Components/Hero';
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
            if (userData) {
              dispatch(loginSlice(authData));
            navigate("/")
            }
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
    <>
      <div className=''>
      <Hero />
      </div>
    </>
  )
}

export default Home



