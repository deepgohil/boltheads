import React from 'react';
import { Link } from 'react-router-dom';
import Marquee from "react-fast-marquee";

const Homepage = () => {
  return (
    <>
                <Marquee className="bg-custom-black pt-5 font-mono text-custom-btn text-4 font-bold text-center relative">
                It is not the man who has too little, but the man who craves more, that is poor.
            </Marquee>
    <div className="min-h-screen flex items-center justify-center bg-custom-black text-white">
      <div className="text-center">
      <h1 className="font-mono text-gray-200 text-4xl font-bold text-center relative mb-5">
                Sustainability is no longer about doing less harm<br/>It's about doing more good.
                    <span className="mt-5 absolute bottom-0 left-1/2 transform -translate-x-1/2 h-1 w-20 bg-indigo-600 rounded-full"></span>
                </h1>
 
        <div className="mb-4">
          <Link to="/clogin">
            <button className="bg-custom-btn hover:bg-custom-marq text-custom-white font-bold py-2 px-4 rounded mr-4">
              Login
            </button>
          </Link>
          <Link to="/register">
            <button className="bg-custom-btn hover:bg-custom-marq text-custom-white font-bold py-2 px-4 rounded">
              Register
            </button>
          </Link>
        </div>
      </div>
    </div>
    </>
  );
};

export default Homepage;


