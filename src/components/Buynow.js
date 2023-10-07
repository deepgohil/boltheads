import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Fulldetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [paymentMode, setPaymentMode] = useState('cod');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [carbonIndex, setCarbonIndex] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/productdetail/${productId}`);
        setProduct(response.data);
        setCarbonIndex(response.data.carbonindex);
        setFinalPrice(response.data.price * quantity);
      } catch (error) {
        console.error('Error fetching product details:', error);
        setProduct(null);
      }
    };

    fetchProductDetails();
  }, [productId, quantity]);

  const navigate = useNavigate();

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value, 10);
    setQuantity(newQuantity);
    setFinalPrice(product.price * newQuantity);
  };


  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleZipcodeChange = (event) => {
    setZipcode(event.target.value);
  };

  const handleCarbonIndexChange = (event) => {
    setCarbonIndex(event.target.value);
  };
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  const handlePaymentModeChange = (event) => {
    setPaymentMode(event.target.value);
    // Reset card details when payment mode changes
    setCardNumber('');
    setExpiryDate('');
    setCvv('');
  };
  const handleOrderButtonClick = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/place-order', {
        productId: productId,
        phoneNumber: phoneNumber
      });
  
      console.log('Order placed successfully:', response.data.message);
      // Handle success, show confirmation message, or redirect to another page
    } catch (error) {
      console.error('Error placing order:', error);
      // Handle error, show error message to the user
    }
  };

  return (
    <div className="bg-gray-200 min-h-screen flex justify-center items-center">
    {product ? (
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Product Fulldetails</h1>
        <div className="mb-4 flex justify-center items-center">
          <label className="mr-2 text-sm font-medium text-gray-700">Quantity:</label>
          <input
            type="number"
            className="my-2 p-2 bg-custom-black border rounded border-custom-border text-custom-white w-full"
            value={quantity}
            onChange={handleQuantityChange}
          />
        </div>
        <div className="mb-4 flex justify-center items-center">
        <label className="mr-2 text-sm font-medium text-gray-700">Payment Mode:</label>
        <select
          className="my-2 p-2 bg-custom-black border rounded border-custom-border text-custom-white w-full"
          value={paymentMode}
          onChange={handlePaymentModeChange}
        >
          <option value="cod">Cash on Delivery</option>
          <option value="card">Credit/Debit Card</option>
        </select>
      </div>
      {/* Show card details input fields only when payment mode is "Credit/Debit Card" */}
      {paymentMode === 'card' && (
        <>
          <div className="mb-4 flex justify-center items-center">
            <label className="mr-2 text-sm font-medium text-gray-700">Card Number:</label>
            <input
              type="text"
              className="my-2 p-2 bg-custom-black border rounded border-custom-border text-custom-white w-full input-field"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
            />
          </div>
          <div className="mb-4 flex justify-center items-center">
            <label className="mr-2 text-sm font-medium text-gray-700">Expiry Date:</label>
            <input
              type="text"
              className="my-2 p-2 bg-custom-black border rounded border-custom-border text-custom-white w-full input-field"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
            />
          </div>
          <div className="mb-4 flex justify-center items-center">
            <label className="mr-2 text-sm font-medium text-gray-700">CVV:</label>
            <input
              type="text"
              className="my-2 p-2 bg-custom-black border rounded border-custom-border text-custom-white w-full input-field"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
            />
          </div>
        </>
      )}
        <div className="mb-4 flex justify-center items-center">
          <label className="mr-2 text-sm font-medium text-gray-700">Phone Number:</label>
          <input
            type="text"
            className="my-2 p-2 bg-custom-black border rounded border-custom-border text-custom-white w-full"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
          />
        </div>
        <div className="mb-4 flex justify-center items-center">
          <label className="mr-2 text-sm font-medium text-gray-700">Address:</label>
          <input
            type="text"
            className="my-2 p-2 bg-custom-black border rounded border-custom-border text-custom-white w-full input-field"
            value={address}
            onChange={handleAddressChange}
          />
        </div>
        <div className="mb-4 flex justify-center items-center">
          <label className="mr-2 text-sm font-medium text-gray-700">Zipcode:</label>
          <input
            type="text"
            className="my-2 p-2 bg-custom-black border rounded border-custom-border text-custom-white w-full input-field"
            value={zipcode}
            onChange={handleZipcodeChange}
          />
        </div>
        <div className="mb-4 flex justify-center items-center">
          <label className="mr-2 text-sm font-medium text-gray-700">Carbon Index:</label>
          {/* <br></br> */}
          <input
            type="number"
            className="my-2 p-2 bg-custom-black border rounded border-custom-border text-custom-white w-full input-field"
            value={carbonIndex}
            onChange={handleCarbonIndexChange}
          />
        </div>
        <p className="text-sm text-gray-700 mb-2">Final Price: ${finalPrice}</p>
        <div className="flex justify-center items-center space-x-4 mb-4">
          {product.image_paths.slice(0, 2).map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Product ${index + 1}`}
              className="w-32 h-32 object-cover"
            />
          ))}
        </div>
        <button
          className="bg-custom-btn hover:bg-custom-marq text-custom-white font-bold py-2 px-4 rounded mt-4"
          onClick={handleOrderButtonClick}
        >
          Order Now
        </button>
      </div>
    ) : (
      <p>Loading...</p>
    )}
  </div>
  );
};

export default Fulldetails;
