import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaRegPlayCircle } from "react-icons/fa";
import NewCalendar from "../Components/NewCalendar";
import eventAPIs from "../APIcalls/eventAPIs";
import moment from "moment";

function CalendarPage() {
  const [viewEvent, setViewEvent] = useState(null);
  const selectedEvent = useSelector((state) => state.events.userEvents);

  useEffect(() => {
    if (selectedEvent) {
      (async () => {
        try {
          const eventData = await eventAPIs.loadOneEvent(selectedEvent.id);
          if (eventData) {
            setViewEvent(eventData.data);
            console.log("Event data :", eventData.data);
          }
        } catch (error) {
          console.log("Error while loading event:", error);
        }
      })();
    }
  }, [selectedEvent]);

  const formattedStartTime = moment(viewEvent?.startTime).format(
    "ddd MMM DD YYYY hh:mm A"
  );
  const formattedEndTime = moment(viewEvent?.endTime).format(
    "ddd MMM DD YYYY hh:mm A"
  );
  const durationInMilliseconds = new Date(viewEvent?.duration).getTime();
  const totalSeconds = durationInMilliseconds / 1000;

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);


  return (
    <div className="w-full h-auto bg-colorLevel1 pt-24 md:pl-28 pl-3 md:pr-8 pr-3 flex  ">
      <div className="flex md:flex-row flex-col w-full my-4">
        <div className="md:w-[70%] w-full">
          <NewCalendar className="" />
        </div>
        <div className="text-black  h-auto md:w-[30%] w-full  bg-colorLevel3 md:ml-7 flex flex-col rounded-md md:mt-0 mt-8 mb-20 md:mb-0">
          <h1 className="font-bold text-2xl text-ellipse text-pretty mx-auto  border-b-2 border-black mt-2">
            {viewEvent ? viewEvent.eventName : "Select any event"}
          </h1>
          {viewEvent && (
            <div className="mt-3  block">
              <div className="max-h-[65vh] overflow-y-auto px-4">
                <FaRegPlayCircle size={120} className="flex mx-auto mt-8" />
                <p className="pt-10 text-2xl font-bold pb-2 ">
                  Start Time :{" "}
                  <span className="text-gray-500 ">{formattedStartTime}</span>
                </p>
                <p className="pt-3 text-2xl font-bold pb-2 ">
                  Ending Time :{" "}
                  <span className="text-gray-500 ">{formattedEndTime}</span>
                </p>
                <p className="pt-3 text-2xl font-bold pb-2 ">
                  Totla Duration:{" "}
                  <span className="text-gray-500 ">{`${hours}h: ${minutes}m: ${seconds}s`}</span>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CalendarPage;
