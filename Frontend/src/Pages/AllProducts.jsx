import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../Components/ProductCard";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useProducts } from "../../Context/ProductContext";
const AllProducts = () => {
  const {products, setProducts}= useProducts();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [price, setPrice] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [condition, setCondition] = useState("");

  const navigate = useNavigate();

  const createProduct = () => {
    navigate("create");
  };

  useEffect(() => {
    fetchProducts();
  },[setProducts]);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);

    try {
      const params = {};
      if (price) params.price = price;
      if (productCategory) params.productCategory = productCategory;
      if (condition) params.condition = condition;

      const response = await axios.get("http://localhost:8000/v1/api/products", { params });
      setProducts(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred while fetching products.");
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter((product) =>
    searchTerm ? product.productName.toLowerCase().includes(searchTerm.toLowerCase()) : true
  );
  useEffect(() => {
    console.log("Products updated:", products);
  }, [products]);
  return (
    <div className="min-h-screen bg-[#f7f9f8] p-6">
      <div className="max-w-[100%] mx-auto">
        {/* Page Title */}
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8 mt-20 relative">
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#cbeddd] to-[#30433a]">
            Available Products
          </span>
          <div className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-20 h-1 bg-gradient-to-r from-[#cbeddd] to-[#3d5449] rounded-full"></div>
        </h1>

        {/* Filters and Add Product Button */}
        <div className="flex flex-wrap items-center gap-4 mb-8">
          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search products..."
            className="p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 flex-grow"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {/* Price Filter */}
          <input
            type="number"
            placeholder="Max Price"
            className="p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          {/* Category Filter */}
          <select
            className="p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={productCategory}
            onChange={(e) => setProductCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="Books">Books</option>
            <option value="Electronics">Electronics</option>
            <option value="Stationary">Stationary</option>
          </select>

          {/* Condition Filter */}
          <select
            className="p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
          >
            <option value="">All Conditions</option>
            <option value="New">New</option>
            <option value="Like New">Like New</option>
            <option value="Used">Used</option>
          </select>

          {/* Add Product Button */}
          <button
            className="bg-[#6b8fa9] text-white font-medium px-6 py-3 rounded-lg shadow hover:bg-[#80a4bd] transition duration-300"
            onClick={createProduct}
          >
            + Add Product
          </button>
        </div>

        {/* Products List */}
        {loading ? (
          <div className="text-center text-gray-500 text-lg">Loading products...</div>
        ) : error ? (
          <div className="text-center text-red-600 text-lg">Error: {error}</div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product._id}
                productId={product._id}
                productImage={product.productImage}
                productName={product.productName}
                productInfo={product.productInfo}
                price={product.price}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 text-lg">No products found.</p>
        )}
      </div>
      <Outlet />
    </div>
  );
};

export default AllProducts;
