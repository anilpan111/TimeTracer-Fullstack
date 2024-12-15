import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaRegPlayCircle } from "react-icons/fa";
import NewCalendar from "../Components/NewCalendar";
import eventAPIs from "../APIcalls/eventAPIs";
import moment from "moment";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Tooltip,
} from "@nextui-org/react";
import Stopwatch from "../Components/Stopwatch";

function CalendarPage() {
  const [viewEvent, setViewEvent] = useState(null);
  const selectedEvent = useSelector((state) => state.events.userEvents);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // console.log("View event:",viewEvent)

  useEffect(() => {
    if (selectedEvent) {
      (async () => {
        try {
          const eventData = await eventAPIs.loadOneEvent(selectedEvent.id);
          if (eventData) {
            setViewEvent(eventData.data);
            // console.log("Event data :", eventData.data);
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

  //to convert milliseconds into formated time
  const convertTimeFormat = (milliseconds) => {
    const totalSeconds = milliseconds / 1000;

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);

    return {hours,minutes,seconds}
  };

  const formatedTaskDuartion = convertTimeFormat(viewEvent?.duration)
  // console.log("Formated task duration:",formatedTaskDuartion)
  const formatedCompletedDuration  = convertTimeFormat(viewEvent?.completedDuration)

  const remainingDuration = viewEvent?.duration - viewEvent?.completedDuration;
  const formatedRemainingDuration = convertTimeFormat(remainingDuration);
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
                <FaRegPlayCircle
                  size={120}
                  className="flex mx-auto mt-8 hover:text-colorLevel5 cursor-pointer"
                  onClick={onOpen}
                />

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
                  <span className="text-gray-500 ">{`${formatedTaskDuartion.hours}h: ${formatedTaskDuartion.minutes}m: ${formatedTaskDuartion.seconds}s`}</span>
                </p>
                <p className="pt-3 text-2xl font-bold pb-2 ">
                  Completed Duration:{" "}
                  <span className="text-gray-500 ">{`${formatedCompletedDuration.hours}h: ${formatedCompletedDuration.minutes}m: ${formatedCompletedDuration.seconds}s`}</span>
                </p>
                <p className="pt-3 text-2xl font-bold pb-2 ">
                  Remaining Duration:{" "}
                  <span className="text-gray-500 ">{`${formatedRemainingDuration.hours}h: ${formatedRemainingDuration.minutes}m: ${formatedRemainingDuration.seconds}s`}</span>
                </p>
              </div>
            </div>
          )}
        </div>
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          isDismissable={false}
          size="2xl"
          isKeyboardDismissDisabled={true}
          className="bg-colorLevel2"
        >
          <ModalContent>
            <ModalHeader className="flex flex-col gap-1 text-xl font-bold">
              Start timer or select as completed
            </ModalHeader>
            <ModalBody>
              <Stopwatch />
            </ModalBody>
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
}

export default CalendarPage;
