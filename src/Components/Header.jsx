import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
  return (
    <div className="bg-primary flex flex-col md:flex-row flex-wrap rounded px-6 md:px-10 lg:px-20">
      
        {/* ----Left Side */}
        <div className="md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] ">
          <p className="text-3xl md:text-4x1 lg:text-5x1 text-white font-semibold leading-tigh md:leading-tight lg:leading-tight">
            Book Appointment <br /> With Trusted Doctors
          </p>
          <div className="flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light">
            <img
              src={assets.group_profiles}
              alt="Group Profiles"
              className=" w-28   "
            />
            <p className="">
              Simply browse through our extensive list of trusted doctors, <br className='hidden sm:block'/> schedule your appointment hassle-free.
            </p>
          </div>
          <a
            href="#speciality"
            className="flex items-center bg-white text-gray-600 font-medium px-8 py-3 rounded-full  hover:scale-105  duration-300 transition-all text-sm m-auto gap 2 "
          >
            Book Appointment
            <img src={assets.arrow_icon} alt="Arrow Icon" className="ml-2 h-4 w-3" />
          </a>
        </div>

        {/* ----Right Side */}
        <div className="md:w-1/2 relative">
          <img
            src={assets.header_img}
            alt="Header"
            className="w-full md:absolute bottom-0 rounded-lg "
          />
        </div>
      
    </div>
  )
}

export default Header
