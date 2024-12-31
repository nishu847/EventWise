import { asynchandler } from "../utils/asynchandler.js";
import { ApiError } from "../utils/APIerror.js";
import { ApiResponse } from "../utils/APIresponse.js";
import {Event} from "../model/event.js"
import multer from "multer";
import { Types } from 'mongoose';  // Import Types from mongoose

import { getDynamicStorage } from "../config/cloudinaryConfig.js";
import { User } from "../model/user.js";
const storage = getDynamicStorage("event-posters"); // Use the "event-posters" folder for event banners
const upload = multer({ storage }).single("bannerImage"); 
const getallEvents=asynchandler(async(req,res)=>{
    const {date,category,venue}=req.query;

    // create filter dynamiclly
    const filter={}
    if(category)
    {
        filter.category=category
    }
    if(date)
    {
        filter.date=date
    }
    if(venue)
    {
        filter.venue=venue
    }

    //find event according to the filter 
    const events= await Event.find(filter).sort({date:1})
    if(!events)
    {
        throw new ApiError(400,"Events not accessible")
    }
    res.status(200).json(new ApiResponse(200,events,"Events successfully displayed"))

})

const getEvent=asynchandler(async(req,res)=>{
   const {userId}=req.params;
   if (!Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid userId format" });
  }
   const user=await User.findById(userId);

   if(!user)
   {
    throw new ApiError(400,"User not found")
   }

   const organizer=user.username;
   console.log("Organizer:", organizer);

   if(!organizer)
   {
    throw new ApiError(400,"Organizer is not found, check if you are registered or not")
   }
   const events=await Event.find({organizerName:user.username})
   console.log("events:", events);

   if(!events)
   {
        throw new ApiError(400,"No events created by the user")
   }

   res.status(200).json(new ApiResponse(200,events,"Events creaed by the user successfully fetched"))
})

const createEvent=asynchandler(async(req,res)=>{
    upload(req, res, async (err) => {
        if (err) {
          throw new ApiError(500, "File upload failed");
        }
    const {eventName,description,category,date,time,venue,capacity,registrationLink,organizerName
    }=req.body

    if(!eventName)
    {
        throw new ApiError(400,"Event Name is required")
    }
    if(!description)
    {
        throw new ApiError(400,"Event Description is required")
    }
    if(!category)
    {
        throw new ApiError(400,"Event Category is required")
    }
    if(!date)
    {
        throw new ApiError(400,"Event Date is required")
    }
    if(!time)
    {
        throw new ApiError(400,"Event Time is required")
    }
    if(!venue)
    {
        throw new ApiError(400,"Event Venue is required")
    }
    if(!capacity)
    {
        throw new ApiError(400,"Event Capacity is required")
    }
    const bannerImage = req.file?.path || ""; // Cloudinary URL or empty if no file uploaded
    const newEvent=await Event.create({
        eventName,
        description,
        category,
        venue,
        date,
        time,
        organizerName, 
        capacity,
        registrationLink,
        bannerImage,
    })


    res.status(200).json(new ApiResponse(200,newEvent,"Event is successfully created"))   })
})


// Update event route
const updateEvent = asynchandler(async (req, res) => {
    upload(req, res, async (err) => {
      if (err) {
        // Handle file upload errors
        return res.status(500).json({ message: "File upload failed", error: err.message });
      }
  
      const { eventId } = req.params;
      const existingEvent = await Event.findById(eventId);
      if (!existingEvent) {
          return res.status(404).json({ message: "Event not found" });
      }
  
      // Destructure the event details from the request body
      const { eventName, description, venue, date, time, category, capacity, registrationLink } = req.body;
  
      // Check if all required fields are provided
      if (!eventName || !description || !venue || !date || !time || !category || !capacity || !registrationLink) {
        return res.status(400).json({ message: "All fields are required." });
      }
  
      // Handle file upload (only if a file is provided)
      const bannerImage = req.file ? req.file.path :  existingEvent.bannerImage; // Use file path if available
  
      // Prepare the data to update
      const updatedData = {
        eventName,
        description,
        venue,
        date,
        time,
        category,
        capacity,
        registrationLink,
        bannerImage,
      };
  
      try {
        // Find and update the event
        const updatedEvent = await Event.findByIdAndUpdate(eventId, updatedData, { new: true });
  
        // If the event is not found, return a 404 error
        if (!updatedEvent) {
          return res.status(404).json({ message: "Event not found" });
        }
  
        // Return the updated event data in the response
        res.status(200).json({ data: updatedEvent });
  
      } catch (error) {
        // Log error and send a 500 response
        console.error("Error updating event:", error);
        res.status(500).json({ message: "Failed to update event", error: error.message });
      }
    });
  });
  

const deleteEvent=asynchandler(async(req,res)=>{
    const {eventId}=req.params;
    const event=await Event.findById(eventId)
    if(!event)
    {
        throw new ApiError(404,"Event not found")
    }
    await event.deleteOne()
    res.status(200).json(new ApiResponse(200,"Event deleted successfully"))
})

const getParticularEvent=asynchandler(async(req,res)=>{
    const {eventId}=req.params;
    const event=await Event.findById(eventId);
    if(!event)
    {
        throw new ApiError(400,"The particular Event not found")
    }

    res.status(200).json(new ApiResponse(200,event,"Event Successfully Retrieved"))
})
export {getallEvents,getEvent,createEvent,updateEvent,deleteEvent,getParticularEvent}