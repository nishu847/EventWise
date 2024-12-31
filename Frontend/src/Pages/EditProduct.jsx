import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
const EditProduct = () => {

  const [ productDetails, setProductDetails ] = useState({
    productName:"",
    productInfo:"",
    price:"",
    productCategory:"",
    condition:"",
    contactPreference:"",
    productImage:""
  });
  const [selectedImage, setSelectedImage] = useState(null);

  const navigate = useNavigate();
  const { productId } = useParams();
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/v1/api/products/${productId}`
        );
        console.log("response is :", response.data.data);
        setProductDetails(response.data.data);
      } catch (error) {
        console.error("Failed to fetch product details", error);
        alert("Failed to load product details.");
      }
    };
    fetchProductDetails();
  }, [productId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value, // Update the correct field in the state
    }));
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      console.log("Selected Image:", file); // Log the selected image
      setEventDetails((prevDetails) => ({
        ...prevDetails,
        productImage: URL.createObjectURL(file), // Preview the image URL
      }));
    }
  };

  const onSave = async () => {
    try {
      const formData = new FormData();
      formData.append("productName", productDetails.productName);
      formData.append("productInfo", productDetails.productInfo);
      formData.append("price", productDetails.price);
      formData.append("productCategory", productDetails.productCategory);
      formData.append("condition", productDetails.condition);
      formData.append("contactPreference", productDetails.contactPreference);
  
      // Check if an image is selected
      if (selectedImage) {
        formData.append("productImage", selectedImage);
      }
  
      // Log FormData before sending
      console.log("FormData being sent:", formData);
  
      // Perform the PUT request to update the event
      const response = await axios.put(
        `http://localhost:8000/v1/api/products/update/${productId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      console.log("onSave response:", response);
      if (response.data.data) {
        setProductDetails(response.data.data);
        alert("product updated successfully!");
        navigate("/profile");
      } else {
        alert("Failed to update product. Please try again.");
      }
    } catch (error) {
      console.error("Failed to update product", error);
      alert("Failed to update the product. Please try again.");
    }
  };
  
  return (
    <div>
      <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8 mt-20 relative">
  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#cbeddd] to-[#30433a] mb-10">
Edit Product  </span>
  <div className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-20 h-1 bg-gradient-to-r from-[#cbeddd] to-[#3d5449] rounded-full"></div>
</h1>
        <div className="bg-white p-6 rounded-xl shadow-lg max-w-5xl mx-auto border border-gray-200">
          {/* Form Section */}
          <div className="space-y-6">
            {/* Event Name, Venue, and Capacity */}
            <div className="grid grid-cols-3 gap-6">
              <div>
                <label className="block text-lg font-medium text-gray-700">
                  Product Name
                </label>
                <input
                  type="text"
                  name="productName"
                  value={productDetails.productName}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>
  
              <div>
                <label className="block text-lg font-medium text-gray-700">
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  value={productDetails.price}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
  
            {/* Banner Image */}
            <div className="grid grid-cols-3 gap-6">
              <div>
                <label className="block text-lg font-medium text-gray-700">
                  Product Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>
  
              {productDetails.productImage && (
                <div className="col-span-2 flex items-center">
                  <img
                    src={productDetails.productImage}
                    alt="Selected product"
                    className="w-full max-w-sm h-auto object-cover rounded-lg border border-gray-300"
                  />
                </div>
              )}
            </div>
  
            {/* Description */}
            <div>
              <label className="block text-lg font-medium text-gray-700">
                Product Info
              </label>
              <textarea
                name="productInfo"
                value={productDetails.productInfo}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>
  
            {/* Date, Time, and Category */}
            <div className="grid grid-cols-3 gap-6">
              <div>
                <label className="block text-lg font-medium text-gray-700">
                  Product Category
                </label>
                <select
                  name="productCategory"
                  value={productDetails.productCategory}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                >
                <option value="">Select Category</option>
                  <option value="Books">Books</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Stationary">Stationary</option>
                </select>
              </div>
  
              <div>
                <label className="block text-lg font-medium text-gray-700">
                  Contact Preference
                </label>
                <input
                  type="text"
                  name="contactPreference"
                  value={productDetails.contactPreference}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>
  
              <div>
                <label className="block text-lg font-medium text-gray-700">
                  Condition
                </label>
                <select
                  name="condition"
                  value={productDetails.condition}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                >
                 <option value="">Select Condition</option>
                  <option value="New">New</option>
                  <option value="Like New">Like New</option>
                  <option value="Used">Used</option>
                </select>
              </div>
            </div>
  
            {/* Save Button */}
            <div className="text-center">
              <button
                onClick={onSave}
                className="bg-[#6b8fa9] hover:bg-[#8eb8d6] text-white px-6 py-3 rounded-lg transition-transform transform hover:scale-105"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
