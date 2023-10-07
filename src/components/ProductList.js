



import React, { useState, useEffect, } from 'react';
import axios from 'axios';

import { Link,useNavigate } from 'react-router-dom'; 



const ProductList = () => {
    // State variables
    const [products, setProducts] = useState([]); // Holds all products from the API
    const [filteredProducts, setFilteredProducts] = useState([]); // Holds products after filtering
    const [loading, setLoading] = useState(true); // Loading state while fetching data
    const [searchQuery, setSearchQuery] = useState(''); // State for search input value
    const [sortOrder, setSortOrder] = useState(''); // State for sorting order
    const [selectedCategory, setSelectedCategory] = useState(''); // State for selected category filter
  
    // Fetching products from the API on component mount
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('http://127.0.0.1:8000/products'); // Replace with your API endpoint
          setProducts(response.data); // Set products from the API response
          setLoading(false); // Update loading state to false
        } catch (error) {
          console.error('Error fetching data:', error);
          setLoading(false); // Set loading state to false in case of an error
        }
      };
  
      fetchData(); // Call the fetchData function
    }, []); // Empty dependency array ensures the effect runs once after the initial render
  
    // Filter products based on the search query and selected category whenever they change
    useEffect(() => {
      // Convert search query and product names to lowercase for case-insensitive search
      const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (selectedCategory ? product.category.toLowerCase() === selectedCategory.toLowerCase() : true)
      );
      setFilteredProducts(filteredProducts); // Set filtered products to state
    }, [searchQuery, products, selectedCategory]); // Re-run the effect whenever searchQuery, products, or selectedCategory change
  
    // Sort products based on carbonindex when sortOrder changes
    useEffect(() => {
      if (sortOrder === 'asc') {
        setFilteredProducts([...filteredProducts].sort((a, b) => a.carbonindex - b.carbonindex));
      } else if (sortOrder === 'desc') {
        setFilteredProducts([...filteredProducts].sort((a, b) => b.carbonindex - a.carbonindex));
      }
    }, [sortOrder, filteredProducts]);
    const navigate = useNavigate();
    const handleBuyNow = (productId) => {
        

        // Implement your logic for handling the "Buy Now" action, e.g., redirect to checkout page
        console.log(`Buy Now clicked for product with ID: ${productId}`);
        navigate(`/details/${productId}`);
      };
    return (
      <div className="bg-custom-glass min-h-screen text-custom-white">
        <div className="container mx-auto p-8">
          <h1 className="text-3xl font-bold mb-6">Product List</h1>
          <div className="mb-4 flex items-center overflow-x-auto">
            <input
              type="text"
              placeholder="Search by product name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-custom-black text-custom-white p-2 rounded-md mr-2"
            />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-custom-black text-custom-white p-2 rounded-md mr-2"
            >
              <option value="">All Categories</option>
              <option value="Health & Wellness">Health & Wellness</option>
              <option value="Kitchen & Dining">Kitchen & Dining</option>
              <option value="Home & Garden">Home & Garden</option>
              <option value="Fashion & Accessories">Fashion & Accessories</option>
              <option value="Electronics">Electronics</option>
              <option value="Beauty & Personal Care">Beauty & Personal Care</option>
              <option value="Fitness & Sports">Fitness & Sports</option>
            </select>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="bg-custom-black text-custom-white p-2 rounded-md"
            >
              <option value="">Sort By</option>
              <option value="asc">Low to High Carbon Index</option>
              {/* <option value="desc">High to Low Carbon Index</option> */}
            </select>
          </div>
          {loading && <p>Loading...</p>}
          {!loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredProducts.map(product => (
                <div
                  key={product._id.$oid}
                  className="flex flex-col justify-between bg-custom-black p-4 rounded-lg border border-custom-border"
                >
                                
                <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                <p className="text-sm mb-2">{product.description}</p>
                <p className="text-sm mb-2">Price: ${product.price}</p>
                <p className="text-sm mb-2">Available Quantity: {product.quantity}</p>
                <p className="text-sm mb-2">Certification: {product.certification}</p>
                <p className="text-sm mb-2">Carbon Index: {product.carbonindex}</p>
                <div className="flex space-x-2 mb-2">
                  {/* {product.image_paths.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Product ${index + 1}`}
                      className="w-full h-full object-cover object-center"
                    />
                  ))} */}
                <img
                src={product.image_paths[0]} // Access the first image directly
                alt={`Product 1`}
                className="w-full h-50 object-cover object-center"
                />
                </div>
                <div>
                  <button
                    className="bg-custom-btn text-custom-black rounded-md px-4 py-2 hover:bg-opacity-80"
                    onClick={() => handleBuyNow(product.productId)}
                  >
                    Buy Now
                  </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };
  
  export default ProductList;