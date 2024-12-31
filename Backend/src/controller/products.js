import { asynchandler } from "../utils/asynchandler.js";
import { ApiError } from "../utils/APIerror.js";
import { ApiResponse } from "../utils/APIresponse.js";
import {Product} from "../model/product.js"
import { getDynamicStorage } from "../config/cloudinaryConfig.js";
import multer from "multer";
import { User } from "../model/user.js";
import { Types } from "mongoose";
const storage = getDynamicStorage("product-images"); // Use the "product-images" folder for product uploads
const upload = multer({ storage }).single("productImage");

const getallProducts=asynchandler(async(req,res)=>{
    const {productCategory,price,condition}=req.query;
    // add filters dynamically
    const filter={};
    if(productCategory)
    {
        filter.productCategory=productCategory
    }
    if(price)
    {
        filter.price=price;
    }
    if(condition)
    {
        filter.condition=condition;
    }
    // find the products'
    const products=await Product.find(filter);
    if(!products)
    {
        throw new ApiError(400,"No products found")
    }
    res.status(200).json(new ApiResponse(200,products,"Products successfully displayed"));
})

const getparticularProduct=asynchandler(async(req,res)=>{
    const {productId}=req.params;
    const productdetail=await Product.findById(productId);
    if(!productdetail)
    {
        throw new ApiError(400,"Product Details not fetched");
    }
    res.status(200).json(new ApiResponse(200,productdetail,"Product Details fetched successfully"));
})

const createProduct=asynchandler(async(req,res)=>{
     upload(req, res, async (err) => {
            if (err) {
              throw new ApiError(500, "File upload failed");
            }
    const {productName,productInfo,price,productCategory,condition,contactPreference,owner}=req.body;

    if(!productName)
    {
        throw new ApiError(400,"Product Name is required")
    }
    if(!productInfo)
    {
        throw new ApiError(400,"Product Info is required")
    }
    if(!price)
    {
        throw new ApiError(400,"Price is required")
    }
    if(!condition)
    {
        throw new ApiError(400,"Product Conditiony is required")
    }
    if(!contactPreference)
    {
        throw new ApiError(400,"Contact Preference is required")
    }
    if(!productCategory)
    {
        throw new ApiError(400,"Product Category is required")
    }
    const productImage=req.file?.path || ""
    const newProduct=await Product.create({
        productName,
        productInfo,
        price,
        productCategory,
        condition,
        contactPreference,
        owner,
        productImage
    })
    res.status(200).json(new ApiResponse(200,newProduct,"Product is successfully uploaded"))
})
})

const updateProduct=asynchandler(async(req,res)=>{
    upload(req, res, async (err) => {
        if (err) {
          // Handle file upload errors
          return res.status(500).json({ message: "File upload failed", error: err.message });
        }
    
    const {productId}=req.params;

    const existingproduct=await Product.findById(productId);
    if(!existingproduct)
    {
        throw new ApiError(404,"Product Not Found")
    }

    const {productName,productInfo,price,productCategory,condition,contactPreference}=req.body;
    if(!productCategory || !productInfo || !productName || !price || !condition || !contactPreference)
    {
        return res.status(400).json({ message: "All fields are required." });
    }

    const productImage=req.file ? req.file.path : existingproduct.productImage;

   const updatedProduct=await Product.findByIdAndUpdate(productId,{
    productName,
    productInfo,
    price,
    productCategory,
    condition,
    contactPreference,
    productImage
   },{new:true})
   if (!updatedProduct) {
    return res.status(404).json({ message: "Product not found" });
  }

  // Return the updated event data in the response
  res.status(200).json({ data: updatedProduct });
    
})})

const deleteProduct=asynchandler(async(req,res)=>{
    const {productId}=req.params;
    const existingProduct=await Product.findByIdAndDelete(productId)
    if(!existingProduct)
    {
        throw new ApiError(400,"Product not found")
    }
    res.status(200).json(new ApiResponse(200,"Product Successfully deleted"))
})

const getProducts=asynchandler(async(req,res)=>{
    const {userId}=req.params;
    if (!Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: "Invalid userId format" });
      }
    const user=await User.findById(userId);
    if(!user)
    {
        throw new ApiError(400,"User not found")
    }
    const owner=user.username;
    console.log("owner",owner);
    if(!owner)
    {
        throw new ApiError(400,"Owner is not found, check if you are registered or not")
    }
    const products=await Product.find({owner:user.username})
    console.log("products",products)
    if(!products)
    {
        throw new ApiError(400,"No products have been created")
    }
    res.status(200).json(new ApiResponse(200,products,"Products Successfully Fethed"))
})
export {getallProducts,getparticularProduct,createProduct,updateProduct,deleteProduct,getProducts}