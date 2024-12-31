import React from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ productId, productImage, productName, productInfo, price }) => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate(`/${productId}`); // Redirect to product details page with the product ID
  };

  const truncateText = (text, maxLength) => {
    if (!text) return ""; // Handle undefined or null text
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  return (
    <div
      className="bg-white shadow-md mt-4 mb-6 rounded-lg p-6 w-full cursor-pointer transition-transform transform hover:scale-95 hover:shadow-lg"
      onClick={handleNavigation}
    >
      {/* Product Image */}
      <div className="w-full">
        <img
          src={productImage || "/placeholder.jpg"} // Use a placeholder image if no image is provided
          alt={productName}
          className="w-full h-40 object-cover rounded-lg mb-4"
        />
      </div>

      {/* Product Details */}
      <div className="flex flex-col items-start">
        {/* Product Name */}
        <h2 className="text-lg font-semibold text-gray-800 mb-2 truncate">
          {productName || "Unknown Product"}
        </h2>

        {/* Product Info */}
        <p className="text-sm text-gray-600 mb-2 break-words">
          {truncateText(productInfo, 50)}
        </p>

        {/* Price */}
        <p className="text-blue-600 font-bold text-lg">Rs.{price || "N/A"}</p>
      </div>
    </div>
  );
};

export default ProductCard;
