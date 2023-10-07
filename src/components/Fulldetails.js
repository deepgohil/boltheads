// import React, { useState, useEffect } from 'react';
// import { useParams,Link,useNavigate} from 'react-router-dom';

// import axios from 'axios';

// const Fulldetails = () => {
//   const { productId } = useParams();
//   const [product, setProduct] = useState(null);

//   useEffect(() => {
//     const fetchProductDetails = async () => {
//       try {
//         const response = await axios.get(`http://127.0.0.1:8000/productdetail/${productId}`);
//         setProduct(response.data);
//       } catch (error) {
//         console.error('Error fetching product details:', error);
//         setProduct(null); // Set product to null in case of an error
//       }
//     };

//     fetchProductDetails(); // Call the fetchProductDetails function when component mounts
//   }, [productId]); // The effect will re-run whenever productId changes
//   const navigate = useNavigate();
//   const handleBuyNow = (productId) => {
        

//     // Implement your logic for handling the "Buy Now" action, e.g., redirect to checkout page
//     console.log(`Buy Now clicked for product with ID: ${productId}`);
//     navigate(`/Buy/${productId}`);
//   };
//   return (
//     <div className="bg-custom-glass min-h-screen text-custom-white">
//       <div className="container mx-auto p-8">
//         <h1 className="text-3xl font-bold mb-6">Product Fulldetails</h1>

//         {product ? (
//           <div className="bg-custom-black p-4 rounded-lg border border-custom-border">
//             <h2 className="text-xl font-semibold mb-2">Product Name: {product.name}</h2>
//             <p className="text-sm mb-2">Description: {product.description}</p>
//             <p className="text-sm mb-2">Price: ${product.price}</p>
//             <p className="text-sm mb-2">Available Quantity: {product.quantity}</p>
//             <p className="text-sm mb-2">Certification: {product.certification}</p>
//             <p className="text-sm mb-2">Carbon Index: {product.carbonindex}</p>
//             <p className="text-sm mb-2">Rating: {product.rating}★</p>
//             <div className="flex space-x-2 mb-2 overflow-x-auto">
//               {product.image_paths.map((image, index) => (
//                 <img
//                   key={index}
//                   src={image}
//                   alt={`Product ${index + 1}`}
//                   className="w-80 h-80 object-cover"
//                 />
//               ))}
//             </div>
//             <button
//                     className="bg-custom-btn text-custom-black rounded-md px-4 py-2 hover:bg-opacity-80"
//                     onClick={() => handleBuyNow(product.productId)}
//                   >
//                     Buy Now
//                   </button>
//           </div>
//         ) : (
//           <p>Loading...</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Fulldetails;




import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Fulldetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/productdetail/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product details:', error);
        setProduct(null);
      }
    };

    fetchProductDetails();
  }, [productId]);

  const handleBuyNow = (productId) => {
    console.log(`Buy Now clicked for product with ID: ${productId}`);
    navigate(`/Buy/${productId}`);
  };

  const handleImageDownload = (imageUrl, imageName) => {
    // Create an anchor element
    const anchor = document.createElement('a');
    anchor.href = imageUrl;
    anchor.download = imageName; // Set the download attribute with the desired image name
    anchor.click();
  };

  return (
    <div className="bg-custom-glass min-h-screen text-custom-white">
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-6">Product Full-Details</h1>

        {product ? (
          <div className="bg-custom-black p-4 rounded-lg border border-custom-border">
            <h2 className="text-xl font-semibold mb-2">Product Name: {product.name}</h2>
            <p className="text-sm mb-2">Description: {product.description}</p>
            <p className="text-sm mb-2">Price: ${product.price}</p>
            <p className="text-sm mb-2">Available Quantity: {product.quantity}</p>
            <p className="text-sm mb-2">Certification: {product.certification}</p>
            <p className="text-sm mb-2">Carbon Index: {product.carbonindex}</p>
            <p className="text-sm mb-2">Rating: {product.rating}★</p>
            <button
                className="bg-custom-btn text-custom-black rounded-md px-4 py-2 hover:bg-opacity-80"
                onClick={() => handleImageDownload(product.image_paths[0], 'image.jpg')}
              >
                Certificate
              </button>
            <div className="flex space-x-2 mb-2 overflow-x-auto mt-5">
              {product.image_paths.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Product ${index + 1}`}
                  className="w-80 h-80 object-cover"
                />
              ))}
            </div>
            <div className="mb-4 flex justify-center">

            </div>
            <button
              className="bg-custom-btn text-custom-black rounded-md px-4 py-2 hover:bg-opacity-80"
              onClick={() => handleBuyNow(product.productId)}
            >
              Buy Now
            </button>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Fulldetails;





