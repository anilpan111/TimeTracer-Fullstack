import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaHome, FaRegCalendarAlt, FaTasks } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { useSelector } from "react-redux";
import { Avatar } from "@nextui-org/react";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const authStatus = useSelector((state)=>state.auth.status);
  const userData = useSelector((state)=>state.auth.userData)


  const sidebarItems = [
    {
      name: <FaHome size={35} />,
      navigate: "/",
      status: true,
      key: "homepage"
    },
    {
      name: <FaRegCalendarAlt size={35} />,
      navigate: "/calendar",
      status: true,
      key: "calendarpage"
    },
    {
      name: <FaTasks size={35} />,
      navigate: "/tasks",
      status: true,
      key: "taskpage",
    },
    {
      name: <MdDashboard size={35} />,
      navigate: "/dashboard",
      status: true,
      key: "dashboardpage",
    },
    {
      name: <CgProfile size={35} />,
      navigate: "/profile",
      status: !authStatus,
      key: "profileWithoutLogin"
    },
    {
      name: <Avatar isBordered src={userData?.avatar} />,
      navigate: "/profile",
      status: authStatus,
      key: "profileWithLogin"
    },
  ];
  return (
    <div className="md:h-screen md:w-16 h-16 w-full md:bg-colorLevel1 bg-colorLevel3 fixed md:left-0 bottom-0 md:top-24 shadow-xl flex text-black z-10  border-t-2 border-black">
      <div className="item-center align-middle md:max-w-[80%] w-full  ">
        <ul className=" flex md:flex-col font-bold pl-1 justify-around items-center mt-2">
          {sidebarItems.map((item) =>
            item.status ? (
              <li key={item.key} className="">
                <button
                  onClick={() => navigate(item.navigate)}
                  className={`md:my-8 md:mx-auto cursor-pointer w-full hover:text-colorLevel5  ${
                    isActive(item.navigate) ? "text-colorLevel5" : "text-black"
                  }`}
                >
                  {item.name}
                </button>
              </li>
            ) : null
          )}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
