import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
    trim: true,
  },
  productInfo: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    validate: {
      validator: (value) => value >= 0,
      message: "Price must be a positive number",
    },
  },
  productCategory: {
    type: String,
    required: true,
    enum: ['Books','Electronics','Stationary'], // Update with your categories
  },
  condition: {
    type: String,
    required: true,
    enum: ['New', 'Like New', 'Used'],
  },
  productImage: {
    type: String, 
  },
  owner: {
    type:String,
    required: true,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  contactPreference: {
    type: String,
    enum: ['Chat', 'Email', 'Phone'],
    default: 'Chat',
  }
},{timestamps:true});

export const Product = mongoose.model("Product", productSchema);
