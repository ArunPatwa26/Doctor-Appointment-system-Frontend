import React from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const Banner = () => {
    const navigate =useNavigate();
  return (
    <div className="bg-primary flex flex-col md:flex-row flex-wrap rounded px-6 md:px-10 lg:px-20 my-20">
      
      {/* ----Left Side */}
      <div className="md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw]">
        <div className="text-white">
          <p className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight">
            Book Appointment
          </p>
          <p className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight">
            With 100+ Trusted Doctors
          </p>
        </div>
        <button onClick={()=>{navigate('/login'); scrollTo(0,0)}} className="bg-white text-gray-600 font-medium px-8 py-3 rounded-full hover:scale-105 duration-300 transition-all text-sm">
          Create Account
        </button>
      </div>

      {/* ----Right Side */}
      <div className="md:w-1/2 relative">
        <img 
          src={assets.appointment_img}
          alt="Appointment"
          className="w-lg md:absolute bottom-0 rounded-lg"
        />
      </div>
      
    </div>
  );
};

export default Banner;
