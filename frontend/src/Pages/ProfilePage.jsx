import React from 'react'
import avatar from '../assets/avatar.jpg'
import { useSelector } from 'react-redux';

function ProfilePage() {
    const loggedInUser = useSelector((state)=>state.auth.userData);
  return (
    <div className="bg-colorLevel1 min-h-screen flex flex-col items-center justify-center">
        <div className="bg-colorLevel2 p-8 rounded-lg shadow-md max-w-md w-full">
            {/* User Image */}
            <div className="flex justify-center ">

                <img
                    src={loggedInUser ? loggedInUser.avatar : avatar}
                    alt="User"
                    className="w-36 h-36 rounded-full border-4 border-gray-200"
                />
            </div>

            {/* User Name */}
            <div className="mt-4 text-center">
                <h2 className="text-xl font-semibold text-black">{loggedInUser ? loggedInUser.fullName : "John Doe"}</h2>
            </div>

            {/* User Age */}
            <div className="mt-2 flex justify-center items-center">
                <span className="text-gray-600 mr-2">Age:</span>
                <span className="text-gray-800">30</span>
            </div>

            {/* User Email */}
            <div className="mt-2 flex justify-center items-center">
                <span className="text-gray-600 mr-2">Email:</span>
                <span className="text-gray-800">{loggedInUser? loggedInUser.email : "johndoe@example.com"}</span>
            </div>

            {/* User Profession */}
            <div className="mt-2 flex justify-center items-center">
                <span className="text-gray-600 mr-2">Profession:</span>
                <span className="text-gray-800">Software Engineer</span>
            </div>
        </div>
    </div>
);
}


export default ProfilePage
