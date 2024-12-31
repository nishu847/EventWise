import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    eventName: {
      type: String,
      required: [true, "Event name is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Event description is required"],
    },
    category: {
      type: String,
      enum: ["Technical", "Cultural", "Sports", "Workshop","Seminar", "Other"], // Adjust categories as needed
      required: [true, "Category is required"],
    },
    date: {
      type: Date,
      required: [true, "Event date is required"],
    },
    time: {
      type: String, // Optionally, use a Date object if time precision is required
      required: [true, "Event time is required"],
    },
    venue: {
      type: String,
      required: [true, "Event venue is required"],
    },
    organizerName: {
     type:String,
     required:true
    },
    capacity: {
      type: Number, // Maximum number of attendees
      required: [true, "Event capacity is required"],
      default: 100, // Default capacity
    },
    isActive: {
      type: Boolean,
      default: true, // Events can be deactivated if canceled or finished
    },
    bannerImage: {
      type: String, // URL or file path for the event banner
      required: false, // Optional field
    },
    registrationLink:{
      type:String,
      required:false,
      default:"ON-TIME REGISTRATION"
    }
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  }
);

export const Event = mongoose.model("Event", eventSchema);
