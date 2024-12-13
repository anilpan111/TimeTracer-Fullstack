import React, { useEffect, useState } from "react";
import { FaRegPlayCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { IoIosSearch } from "react-icons/io";
import Stopwatch from "../Components/Stopwatch";
import eventAPIs from "../APIcalls/eventAPIs";
function TaskPage() {
  const [taskObject,setTaskObject]=useState([]);
  const taskList = useSelector( (state)=> state.events.userEvents);
  const [currentTask,setCurrentTask]=useState();
  const [currentStartDate,setCurrentStartDate]=useState();
  const [currentEndDate,setCurrentEndDate]=useState();
  const [currentDuration,setCurrentDuration]=useState();
  const [isClicked,setIsClicked]=useState(false);
  

  // useEffect(() => {
  //   if (taskList) {
  //     const objectTask = taskList.map(task => ({
  //       ...task,
  //       start: new Date(task.start),
  //       end: new Date(task.end)
  //     }));
  //     setTaskObject(objectTask);
  //   }
  // }, []);

  useEffect(()=>{
    (async ()=>{
      try {
        const allEvents = await eventAPIs.loadEvents();
        if(allEvents){
          console.log("TaskList:",allEvents.data.eventList[0].eventDetails)
        }
      } catch (error) {
        console.log("ERR:",error)
      }
    })()
  },[])
  return (
    <div className="bg-[#283346] w-full h-screen overflow-hidden flex">
      {/* <div className="w-[70%] h-screen bg-red-50 mt-24 ml-16 ">
        <div className="w-full h-[7%] bg-[#3d4c65] shadow-xl border-b-2 flex items-center ">
          <ul className="flex w-full justify-between mx-4">
            <li className="font-myFont text-2xl ">Your Plans</li>
            <li>
              <label htmlFor="filter-tasks" className="font-myFont text-lg ">Filter tasks:</label>
              <select id="filter-tasks" className="w-60 bg-[#576c90] font-normal">
                <option value="all">All Tasks</option>
                <option value="today">Today</option>
                <option value="this-week">This Week</option>
                <option value="this-month">This Month</option>
              </select>
            </li>
            <li className="flex">
              <input type="text" placeholder="Search Task" className="rounded-lg bg-[#576c90] text-lg text-black pl-2"
              />
              <IoIosSearch size={30}/>
            </li>
          </ul>
        </div>
        <div className="w-full h-[93%] px-2 pb-20 bg-[#283346]">
          <ul className="w-full h-full  pb-10 overflow-y-auto">
            { 
            
            taskObject ? taskObject.map((task)=>(
              <li key={task.id} className=" w-[90%] h-20 rounded-md bg-[#b0b0b0] mx-auto my-3 cursor-pointer" onClick={
                ()=>{
                  setCurrentTask(task.title);
                  setCurrentStartDate(task.start.toLocaleDateString());
                  setCurrentEndDate(task.end.toLocaleDateString())
                  setCurrentDuration( Math.floor((task.end - task.start)/3600000));
                  setIsClicked(true);
                }
              }>
              <div className="flex justify-between px-4 items-center w-full h-full">
                <div className="">
                <p className="font-myFont text-2xl">{task.title}</p>
                <p className="font-bold text-sm mt-2">{ Math.floor((task.end - task.start)/3600000)} hour</p>
                </div>
                <p className="font-myFont text-xl">{task.start.toLocaleDateString()} - {task.end.toLocaleDateString()}</p>
                <div>
                <FaRegPlayCircle size={30}/>
                </div>
              </div>
            </li>
            ) ) : <p> Add Tasks please</p>

            }
            
          </ul>
        </div>
      </div> */}

      <div className="w-[30%] h-screen border-l-2">
        <div className="w-full h-[35%]  justify-center flex mt-24 align-center border-b-2 ">
          <div className="w-auto h-auto flex"> <Stopwatch/> </div>
        </div>
        <div className={`w-full h-[65%] ${isClicked ? 'bg-[#b0b0b0]' : ''}`} >
          <p className=" w-full h-[10%]   flex items-center justify-center font-myFont text-lg border-b-2">{currentTask}</p>
          <div className=" w-auto h-auto flex justify-center item-center pt-5 cursor-pointer">
          {isClicked && < FaRegPlayCircle size={120}/>}
          </div>
          <div className="w-full h-[50%]">
            <p className="flex items-center justify-center font-myFont text-3xl pt-5 ">{currentStartDate} - {currentEndDate}</p>
            <p className=" flex items-center justify-center font-myFont text-lg">{currentDuration}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskPage;

{/* <div className="w-full h-10 bg-fuchsia-500 ">
  <div className="  h-24 flex justify-between items-center max-w-[1240px] mx-auto"></div>
</div>; */}
