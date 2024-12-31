import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "../Components/Button";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useProducts } from "../../Context/ProductContext";
const CreateProduct = () => {
  const { setProducts } = useProducts(); // Use context
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [productImage, setProductImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [owner, setOwner] = useState("");
  const [product, setProduct] = useState(null); // Ensure this is an object, not a string

  const onSubmit = async (data) => {
    if (!owner) {
      alert("Owner is required. Please log in.");
      return;
    }

    const formData = new FormData();
    formData.append("productName", data.productName);
    formData.append("productInfo", data.productInfo);
    formData.append("productCategory", data.productCategory);
    formData.append("price", data.price);
    formData.append("condition", data.condition);
    formData.append("contactPreference", data.contactPreference);

    if (productImage) {
      formData.append("productImage", productImage);
    }
    formData.append("owner", owner);

    try {
      setUploading(true);
      const response = await axios.post(
        "http://localhost:8000/v1/api/products/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      const newProduct = response.data; // Store the response product
      setProduct(newProduct); // Update the state
      setProducts((prevProducts) => [newProduct, ...prevProducts]); // Update the context
      alert("Product added successfully.");
      navigate("/products");
    } catch (error) {
      alert(error.response?.data?.error || "Product creation failed.");
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData && userData.username) {
      setOwner(userData.username);
    } else {
      alert("User not logged in. Please log in to add a product.");
      navigate("/login");
    }
  }, [navigate]);

  const handleFileChange = (e) => {
    setProductImage(e.target.files[0]);
  };

  const onClose = () => {
    navigate("/products");
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-[#f0f4f2] rounded-lg shadow-lg p-6 w-full max-w-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 focus:outline-none"
          aria-label="Close"
        >
          <CloseIcon />
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center">Add Product to Sell</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">
                <span className="text-gray-700">Product Name:</span>
                <input
                  {...register("productName", {
                    required: "Product name is required",
                    minLength: 3,
                    maxLength: 50,
                  })}
                  className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:border-blue-500 p-2"
                />
              </label>
              {errors.productName && (
                <p className="text-red-500 text-sm mb-2">
                  {errors.productName.message}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-1">
                <span className="text-gray-700">Category:</span>
                <select
                  {...register("productCategory", {
                    required: "Category is required",
                  })}
                  className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:border-blue-500 p-2"
                >
                  <option value="">Select Category</option>
                  <option value="Books">Books</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Stationary">Stationary</option>
                </select>
              </label>
              {errors.productCategory && (
                <p className="text-red-500 text-sm mb-2">
                  {errors.productCategory.message}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-1">
                <span className="text-gray-700">Price:</span>
                <input
                  type="number"
                  {...register("price", {
                    required: "Price is required",
                    min: 1,
                  })}
                  className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:border-blue-500 p-2"
                />
              </label>
              {errors.price && (
                <p className="text-red-500 text-sm mb-2">{errors.price.message}</p>
              )}
            </div>

            <div>
              <label className="block mb-1">
                <span className="text-gray-700">Condition:</span>
                <select
                  {...register("condition", {
                    required: "Condition is required",
                  })}
                  className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:border-blue-500 p-2"
                >
                  <option value="">Select Condition</option>
                  <option value="New">New</option>
                  <option value="Like New">Like New</option>
                  <option value="Used">Used</option>
                </select>
              </label>
              {errors.condition && (
                <p className="text-red-500 text-sm mb-2">
                  {errors.condition.message}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-1">
                <span className="text-gray-700">Contact Preference:</span>
                <input
                  type="text"
                  {...register("contactPreference", {
                    required: "Contact preference is required",
                  })}
                  className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:border-blue-500 p-2"
                />
              </label>
              {errors.contactPreference && (
                <p className="text-red-500 text-sm mb-2">
                  {errors.contactPreference.message}
                </p>
              )}
            </div>
          </div>

          <div className="mt-4">
            <label className="block mb-1">
              <span className="text-gray-700">Product Info:</span>
              <textarea
                {...register("productInfo", {
                  required: "ProductInfo is required",
                  minLength: 10,
                  maxLength: 500,
                })}
                className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:border-blue-500 p-2"
                rows="3"
              ></textarea>
            </label>
            {errors.productInfo && (
              <p className="text-red-500 text-sm mb-2">
                {errors.productInfo.message}
              </p>
            )}
          </div>

          <div className="mt-4">
            <label className="block mb-1">
              <span className="text-gray-700">Product Image:</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:border-blue-500 p-2"
              />
            </label>
          </div>

          <Button
            type="submit"
            disabled={uploading}
            className="w-full text-white rounded-md py-2 mt-6 bg-[#6b8fa9] hover:bg-[#8eb8d6]"
          >
            {uploading ? "Uploading..." : "Submit"}
          </Button>
        </form>
        {product && (
        

        <div className="mt-6">
           {console.log("event details",product)}
          <h3 className="text-xl font-semibold mb-4 text-center">Product Details</h3>
          <ProductCard key={product._id} productName={productName} productInfo={productInfo} price={price} productImage={productImage}/> {/* Pass event data to EventCard */}
        </div>
      )}
      </div>
    </div>
  );
};

export default CreateProduct;
