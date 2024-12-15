import React, { useEffect, useState } from "react";
import { Calendar, globalizeLocalizer } from "react-big-calendar";
import globalize from "globalize";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./Styling/bigCalendar.css";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import eventAPIs from "../APIcalls/eventAPIs";
import { taskData } from "../store/slices/eventSlice";
import { useDispatch, useSelector } from "react-redux";

const localizer = globalizeLocalizer(globalize);

const eventTypes = [
  { key: "official", label: "Office Work" },
  { key: "personal", label: "Personal" },
  { key: "fitness", label: "Health & Fitness" },
  { key: "education", label: "Education" },
  { key: "household", label: "Household Work" },
  { key: "travel", label: "Travel & Vacation" },
  { key: "other", label: "Other Task" },
];

function NewCalendar() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedStart, setSelectedStart] = useState(null);
  const [selectedEnd, setSelectedEnd] = useState(null);
  const [events, setEvents] = useState([]);
  const [eventName, setEVentName] = useState("");
  const [eventType, setEventType] = useState("");
  const [newEvent,setNewEvent]=useState(null)
  const[loading,setLoading]=useState(false)
  const dispatch= useDispatch();

  const handleSelect = ({ start, end }) => {
    
    setSelectedStart(start);
    setSelectedEnd(end);
    onOpen(); // Open the modal
  };

  const calendarStyle = {
    height: "83vh", // Set the height of the calendar
    width: "65vw", // Set the width of the calendar
    background: "white",
  };
  //   console.log("Start time:",selectedDate)

  //add event

  //load all events

  useEffect(() => {
    (async () => {
      try {
        
        const allEvents = await eventAPIs.loadEvents();
        if (allEvents) {
          // console.log("All Events:",allEvents.data.eventList[0].eventDetails)

          const formatedEvents = allEvents?.data?.eventObjects.map((event) => ({
            id: event.id,
            title: event.title,
            start: new Date(event.start),
            end: new Date(event.end),
          }));

          setEvents(formatedEvents);
        }
      } catch (error) {
        console.log("Error while loading events:", error);
      }
    })();
  }, [newEvent]);


  //add new event
  const addNewEvent = async ()=>{
    const newEvent = {
      start: selectedStart,
      end: selectedEnd,
      title: eventName,
      eventType,
    };
    try {
      setLoading(true)
      const eventCreationResponse= await eventAPIs.createEvent(newEvent)

      if(eventCreationResponse){
        setNewEvent(eventCreationResponse.data)
        console.log("New added event:",eventCreationResponse)
        setLoading(false)
      }
    } catch (error) {
      setLoading(false)
      console.log("Error while adding event",error)
    }
  }

  const handleSelectedEvent =  (selectedEvent)=>{
    const serializedEvent = {
      id: selectedEvent.id,
      title: selectedEvent.title,
      start: selectedEvent.start.toISOString(),
      end: selectedEvent.end.toISOString()
    }
    dispatch(taskData(serializedEvent))

    // console.log("Event Id:",selectedEvent)
  }

  return (
    <>
      <div>
        <Calendar
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="week"
          views={[ "week", "day"]}
          events={events}
          startAccessor="start"
          endAccessor="end"
          onSelectSlot={handleSelect}
          selectable={true}
          step={30}
          timeslots={2}
          style={{ height: "100%", width: "100%" }}
          min={new Date(2024, 11, 3, 6, 0)} // Start at 6:00 AM
          max={new Date(2024, 11, 3, 22, 0)} // End at 10:00 PM
          scrollToTime={new Date(2024, 11, 3, 9, 0)} // Scroll to 9:00 AM
          onSelectEvent={handleSelectedEvent}
          // eventPropGetter={(event) => {
          //   const backgroundColor = event.color || '#3174ad'; // Default color if `color` is not provided
          //   return {
          //     style: {
          //       backgroundColor, // Apply the color to the event
          //       color: '#fff', // Optional: text color for contrast
          //       borderRadius: '5px', // Optional: add some styling
          //       border: 'none',
          //     },
          //   };
          // }}
        />
      </div>

      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        classNames={{
          backdrop:
            "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
        }}
        className="bg-background dark text-white"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 bg-background">
                Add Event
              </ModalHeader>
              <ModalBody>
                {/* <p>Selected Start: {selectedStart ? selectedStart.toString() : "None"}</p>
                <p>Selected End: {selectedEnd ? selectedEnd.toString() : "None"}</p> */}
                <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                  <Input
                    type="text"
                    label="Event Name"
                    value={eventName}
                    onChange={(e) => setEVentName(e.target.value)}
                  />
                  <Select
                    items={eventTypes}
                    label="Event Type"
                    placeholder="Select an event"
                    className="max-w-xs text-red-500 "
                    // onChange={(value) => setEventType(value)}
                  >
                    {(event) => (
                      <SelectItem
                        key={event.value}
                        className="dark bg-background text-foreground "
                        value={event.value}
                        onClick={()=>setEventType(event.key)}
                      >
                        {event.label}
                      </SelectItem>
                    )}
                  </Select>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="warning" variant="ghost" onPress={onClose}>
                  Edit
                </Button>
                <Button color="danger" variant="ghost" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" onPress={onClose} onClick={addNewEvent}>
                  Add
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default NewCalendar;
