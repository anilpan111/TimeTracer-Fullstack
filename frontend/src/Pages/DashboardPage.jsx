import React, { useEffect, useState } from "react";
import VerticalBarChart from "../Components/VerticalBarChart";
import DashBoardPiechart from "../Components/DashBoardPiechart";
import eventAPIs from "../APIcalls/eventAPIs";

function DashboardPage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const allEvents = await eventAPIs.loadEvents();
        if (allEvents) {
          setEvents(allEvents?.data?.eventList?.[0]?.eventDetails);
        }
      } catch (error) {
        console.log("Error while loading events:", error);
      }
    })();
  }, []);

  const categories = events.map((event) => event.eventName);
  const completedMinutes = events.map(
    (event) => event.completedDuration / 60000
  );
  const remainingMinutes = events.map(
    (event, index) => event.duration / 60000 - completedMinutes[index]
  );

  const eventCount = {
    official: 0,
    personal:0,
    fitness:0,
    education:0,
    household:0,
    travel:0,
    other:0
  }

  /// here having issue

  events.forEach((event)=>{
    if(event.eventType !== undefined){
      eventCount[event.eventType]++;
    }else{
      console.log("Invalid event type")
    }
  })

  const eventTypesArray = Object.values(eventCount);

 

  // console.log("Categories:",categories)
  // console.log("Completed minutes:",completedMinutes)
  // console.log("Remainng minutes:",remainingMinutes)

  // console.log("Events from dashboard:", events);
  return (
    <div className="w-full h-screen overflow-hidden bg-colorLevel4 flex pl-18 mt-24 text-black">
      <div className="w-[65%] h-full  pt-8 pl-12">
        <VerticalBarChart
          chartData={{ categories, completedMinutes, remainingMinutes }}
        />
      </div>
      <div className="w-[35%] h-full  pt-8 pl-8 mx-auto">
        <DashBoardPiechart eventTypes={eventTypesArray}/>
      </div>
    </div>
  );
}

export default DashboardPage;
