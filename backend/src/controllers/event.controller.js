import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiErrors } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Event } from "../models/event.model.js";
import { User } from "../models/user.model.js";
import mongoose from "mongoose";

const loadEvents = asyncHandler(async (req, res) => {
  const loggedInUser = req.user;

  if (!loggedInUser) {
    throw new ApiErrors(402, "Unauthorized action");
  }

  const eventList = await User.aggregate([
    {
      $match: { _id: new mongoose.Types.ObjectId(loggedInUser._id) },
    },
    {
      $lookup: {
        from: "events",
        localField: "eventHistory",
        foreignField: "_id",
        as: "eventDetails",
      },
    },
  ]);

  if (!eventList || eventList.length === 0) {
    return res.status(404).json(
      new ApiResponse({
        success: false,
        data: null,
        message: "No events added",
      })
    );
  }

  const eventObjects = eventList[0].eventDetails.map((event) => ({
    id: event._id,
    start: event.startTime,
    end: event.endTime,
    title: event.eventName,
  }));

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { eventList, eventObjects },
        "All events fetched successfully"
      )
    );
});

const loadOneEvent = asyncHandler(async (req, res) => {
  const { eventId } = req.body;

  if (!eventId) {
    throw new ApiErrors(401,"Event id not fetched")
  }

  const currentUser = req.user;
  if(!currentUser){
    throw new ApiErrors(401,"Unauthorized action")
  }

  const event = await Event.findById(eventId)

  return res.status(200).json(
    new ApiResponse(200,event,"Selected event fetched successfully")
  )
});

const addEvent = asyncHandler(async (req, res) => {
  const { eventName, startTime, endTime, eventType } = req.body;

  if (
    [eventName, startTime, endTime, eventType].some(
      (field) => field === "" || field === null
    )
  ) {
    throw new ApiErrors(401, "All fields are required");
  }

  const start = new Date(startTime);
  const end = new Date(endTime);

  if (start > end) {
    throw new ApiErrors(400, "Start time must be earlier than end time");
  }

  const totalDuration = end - start;

  // console.log(totalDuration)

  const currentUser = req.user;

  // console.log("Current user:",currentUser)

  if (!currentUser) {
    throw new ApiErrors(404, "Unauthorized action");
  }

  const newEvent = await Event.create({
    eventName,
    startTime,
    endTime,
    duration: totalDuration,
    eventType,
    eventOwner: new mongoose.Types.ObjectId(currentUser._id),
  });

  await User.findByIdAndUpdate(
    currentUser._id, // User ID from the request
    { $push: { eventHistory: newEvent._id } }, // Push the new event ID
    { new: true } // Return the updated document
  );

  const createdEvent = await User.aggregate([
    {
      $match: { _id: new mongoose.Types.ObjectId(currentUser._id) },
    },
    {
      $project: { eventHistory: 1 },
    },
  ]);

  return res
    .status(200)
    .json(new ApiResponse(200, createdEvent, "Event added succesfully"));
});

export { loadEvents, addEvent,loadOneEvent };
