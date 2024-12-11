import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import {  useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "../NextComponents/Login.jsx";
import Signup from "../NextComponents/Signup.jsx";
import {  Button } from "@nextui-org/react";
function Navbar() {
  const [nav, setNav] = useState(false);
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleNav = () => {
    setNav(!nav);
  };

  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);
  const loggedInUser = useSelector((state) => state.auth.userData);
  // console.log("UserData:",loggedInUser)
  const navItems = [
    {
      name: "Home",
      navigate: "/",
      status: true,
    },
    {
      name: "About",
      navigate: "/about",
      status: true,
    },
    {
      name: "Contact",
      navigate: "/contact",
      status: true,
    },
  ];

  return (
    <div className="w-full fixed top-0 z-10 bg-colorLevel2 border-b-2 border-black">
      <div className="text-black  h-24 flex justify-between items-center max-w-[1240px] mx-auto px-8">
        <h1 className="w-full text-black  text-3xl font-myFont cursor-pointer">
          TimeTracer
        </h1>

        <ul className="hidden md:flex">
          {navItems.map((item) =>
            item.status ? (
              <li key={item.name}>
                <button
                  onClick={() => navigate(item.navigate)}
                  className={`p-4 cursor-pointer hover:text-colorLevel5 font-myFont ${
                    isActive(item.navigate) ? "text-colorLevel5" : "text-black"
                  }`}
                >
                  {item.name}
                </button>
              </li>
            ) : null
          )}
        </ul>

        {!authStatus ? (
          <ul className="hidden md:flex gap-4 my-auto items-center font-myFont ">
            <li className="hover:text-colorLevel5">
              <Login className=" border-none" />
            </li>
            <li className="hover:text-colorLevel5 ">
              <Signup className=" border-none" />
            </li>
          </ul>
        ) : (
          <ul className="hidden md:flex gap-4 my-auto items-center font-myFont ">
            <Button color="warning" variant="ghost">
              Logout
            </Button>
          </ul>
        )}

        <div onClick={handleNav} className="block md:hidden cursor-pointer ">
          {!nav ? <AiOutlineMenu size={30} /> : <AiOutlineClose size={30} />}
        </div>
        <div
          className={
            nav
              ? "fixed top-0 left-0 w-[60%] h-full bg-colorLevel5 border-r border-r-gray-900 ease-in-out duration-500 "
              : "fixed left-[-100%] ease-in-out duration-500"
          }
        >
          <h1 className="w-full text-black text-3xl font-bold m-4  ">
            Time Tracer
          </h1>

          <ul className="p-4 uppercase ">
            {navItems.map((item) =>
              item.status ? (
                <li key={item.name}>
                  <button
                    onClick={() => {
                      navigate(item.navigate);
                      handleNav();
                    }}
                    className="p-4 cursor-pointer hover:text-colorLevel5"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {!authStatus && (
              <li className="p-4 cursor-pointer hover:text-colorLevel5">
                <Login className=" border-none" />
              </li>
            )}
            {!authStatus && (
              <li className="p-4 cursor-pointer hover:text-colorLevel5">
                <Signup className=" border-none" />
              </li>
            )}
            {authStatus && (
              <li className="p-4 cursor-pointer hover:text-colorLevel5">
                <Button
                  color="warning"
                  variant="ghost"
                  className="p-4 cursor-pointer hover:text-colorLevel5"
                >
                  Logout
                </Button>
              </li>
            )}
          </ul>

          {/* {authStatus && <Avatar src={loggedInUser.avatar} />}   */}

          
        </div>
      </div>
    </div>
  );
}

export default Navbar;
