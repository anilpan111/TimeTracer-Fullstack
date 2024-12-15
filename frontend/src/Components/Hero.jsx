import React from "react";
import { ReactTyped } from "react-typed";
import { useNavigate } from "react-router-dom";
import PieChart from "./PieChart";
import BarChart from "./BarChart";

function Hero() {
  const navigate = useNavigate();
  return (
    <div className="w-full h-screen grid grid-cols-1 md:grid-cols-2 md:overflow-hidden text-black">
      

      <div className="w-full h-auto bg-colorLevel3 mt-24 pr-8 ">
        <div className="h-[40%] w-full flex mt-8  ">
            <div className="w-[65%]  md:ml-16  flex mx-auto">
                <PieChart className='w-52 '/>
            </div>
            <div className="w-[35%]  flex flex-col items-center justify-center text-black">
                <p className="font-bold text-3xl">Effortlessly</p>
                <p className="text-center text-lg font-semibold"> understand your task breakdown with this pie <span className="text-red-400">charts</span></p>
            </div>
        </div>
        <div className="h-[60%] ml-8  ">
            <BarChart/>
        </div>
        
      </div>
      <div className="text-white md:mt-10 pt-10 md:pt-0 z-0 bg-colorLevel1 w-full ">
        <div className="h-auto md:h-screen w-full max-w-[800px]  flex flex-col justify-center text-center mx-auto overflow-y-hidden">
          <p className="text-black p-2 md:text-3xl sm:text-2xl ">
            Your Personal Time Assistant: Time Tracer
          </p>
          <h1 className="font-bold md:text-7xl sm:text-6xl text-4xl  md:py-6 text-colorLevel5">
            Plan. Track. Succeed.
          </h1>
          <div className="flex items-center justify-center">
            <p className="md:text-4xl sm:text-3xl text-xl py-1 font-bold text-colorLevel5">
              Welcome to TimeTracer. Stay{" "}
            </p>
            <ReactTyped
              className="md:text-4xl sm:text-3xl text-xl py-1 pl-2 font-bold text-colorLevel5"
              strings={["Organized", "Focused", "Productive"]}
              typeSpeed={120}
              backSpeed={140}
              loop
            />
          </div>
          <div>
            <p className="md:text-3xl sm:text-2xl text-[18px] py-1 font-bold text-gray-500">
              Effortlessly track your schedule, boost productivity, and gain
              insights into your time management habits.
            </p>
            <button
              className="rounded-md bg-colorLevel5 mx-auto my-6 px-6 py-2 text-black  font-bold cursor-pointer hover:bg-colorLevel4 hover:border-1 hover:border-black"
              onClick={() => navigate("/calendar")}
            >
              Get Started
            </button>
            <button className="rounded-md bg-colorLevel5 mx-auto ml-3 my-6 px-6 py-2 text-black  font-bold cursor-pointer hover:bg-colorLevel4 hover:border-1 hover:border-black"
              onClick={() => navigate("/calendar")}
            
            >
              Try Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
