import React from 'react';
import { specialityData } from '../assets/assets';
import { Link } from 'react-router-dom';

const SpecialityMenu = () => {
  return (
    <div id="speciality" className="bg-gray-50 py-12 px-6 flex-col justify-center mx-10 my-10">
      {/* Header Section */}
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-4">
        Find by Speciality
      </h1>
      <p className="text-gray-600 text-center mb-6 max-w-2xl mx-auto">
        Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.
      </p>

      {/* Horizontal Scroll Section */}
      <div className="flex space-x-4 overflow-x-auto scrollbar-hide px-4">
        {specialityData.map((item, index) => (
          <Link onClick={()=>scrollTo(0,0)}
            key={index}
            to={`/doctors/${item.speciality}`}
            className="group flex-shrink-0 bg-white  rounded-lg overflow-hidden hover:shadow-lg gap-4 transition duration-300 w-40"
          >
            {/* Image */}
            <img
              src={item.image}
              alt={item.speciality}
              className="w-full h-20 "
            />
            {/* Text */}
            <div className="p-4">
              <p className="text-center text-sm font-medium text-gray-800 group-hover:text-blue-500 transition duration-300">
                {item.speciality}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SpecialityMenu;
