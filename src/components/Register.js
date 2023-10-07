import React, { useState } from 'react';
import { Link } from 'react-router-dom';
const Register = () => {
  const [formData, setFormData] = useState({
    mail: '',
    password: '',
    phone: '',
    name: '',
  });

  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Perform API call
      const response = await fetch('http://127.0.0.1:8000/clogin', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Handle successful login
        console.log('Login successful!');
      } else {
        // Handle login error
        const data = await response.json();
        setError(data.error); // Assuming the API response contains an error field
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('An error occurred during login.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-custom-black text-white">
      <div className="max-w-md mx-auto bg-custom-black p-8">
        <h2 className="text-custom-white text-2xl mb-4 font-poppins">Login</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="mail"
            value={formData.mail}
            onChange={handleInputChange}
            placeholder="Email"
            className="my-2 p-2 bg-custom-black border rounded border-custom-border text-custom-white w-full"
            required
          />          
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Phone"
            className="my-2 p-2 bg-custom-black border rounded border-custom-border text-custom-white w-full"
            required
          />          
<input
  type="text" // Corrected from "txt" to "text"
  name="name" // Updated name attribute
  value={formData.name}
  onChange={handleInputChange}
  placeholder="Name"
  className="my-2 p-2 bg-custom-black border rounded border-custom-border text-custom-white w-full"
  required
/>


          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Password"
            className="my-2 p-2 bg-custom-black border rounded border-custom-border text-custom-white w-full"
            required
          />
          <Link to="/products">
          <button
            type="submit"
            className="bg-custom-btn hover:bg-custom-marq text-custom-white font-bold py-2 px-4 rounded mt-4"
          >
            Login
          </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Register;
