import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductDetails = () => {
  const { productId } = useParams(); // Get product ID from the URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch product details from the server
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/v1/api/products/${productId}`
        );
        setProduct(response.data.data);
      } catch (err) {
        setError("Failed to fetch product details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return <div className="text-center text-gray-500 mt-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 mt-10">{error}</div>;
  }

  if (!product) {
    return <div className="text-center text-gray-500 mt-10">No product found.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-10 mt-20 relative">
      {/* Vertical Curvy Background */}
      <div className="absolute top-0 left-0 w-[102%] h-full bg-gradient-to-b from-[white] to-[#678a7a] rounded-full -z-10 transform -translate-x-1/2"></div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Product Image */}
        <div className="flex-1 lg:w-1/2 flex flex-col items-center">
          <img
            src={product.productImage || "/placeholder.jpg"}
            alt={product.productName}
            className=" h-auto rounded-lg shadow-md"
          />
        </div>

        {/* Product Details */}
        <div className="flex-1 lg:w-1/2 pl-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">{product.productName}</h1>
          <p className="text-xl text-gray-600 mb-4">{product.productInfo}</p>

          <div className="text-3xl font-bold text-[#678a7a] mb-6">
            Rs. {product.price}
          </div>
          <div className="mb-6">
            <span className="font-semibold text-2xl text-gray-500  underline">Other Details: </span>
          </div>
          <div className="text-lg text-gray-500 mb-3">
            <span className="font-semibold">Category:</span> {product.productCategory}
          </div>

          <div className="text-lg text-gray-500 mb-3">
            <span className="font-semibold">Condition:</span> {product.condition}
          </div>

          <div className="text-lg text-gray-500 mb-3">
            <span className="font-semibold">Contact Preference:</span> {product.contactPreference}
          </div>

          <div className="text-lg text-gray-500 mb-3">
            <span className="font-semibold">Owner:</span> {product.owner}
          </div>

          <button className="bg-[#6b8fa9] text-white px-8 py-3 rounded-md shadow-md hover:bg-green-700 focus:outline-none focus:ring focus:ring-green-300 w-full sm:w-auto">
Contact Owner          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
