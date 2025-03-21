import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const TopDoctors = () => {

  const navigate=useNavigate()
  const {doctors}=useContext(AppContext)
  return (
    <div className="flex flex-col items-center gap-4 my-16 text-[#262626] md:mx-10">
  {/* Header Section */}
  <h1 className="text-3xl font-medium">Top Doctors to Book</h1>
  <p className="sm:w-1/3 text-center text-sm">
    Simply browse through our extensive list of trusted doctors.
  </p>

  {/* Doctors Grid */}
  <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 pt-5 gap-y-6 px-3 sm:px-0">
    {doctors.slice(0, 10).map((item, index) => (
      <div
        onClick={() => {
          navigate(`/appointment/${item._id}`);
          scrollTo(0, 0);
        }}
        key={index}
        className="border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
      >
        {/* Doctor Image */}
        <img
          src={item.image}
          alt={item.name}
          className="bg-[#EAEFFF] w-full h-48 object-cover"
        />
        {/* Doctor Details */}
        <div className="p-4">
          {/* Availability */}
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm text-gray-500">Availability</p>
            <p
              className={`text-xs font-semibold ${
                item.available ? 'text-green-500' : 'text-red-500'
              }`}
            >
              {item.available ? 'Online' : 'Offline'}
            </p>
          </div>
          {/* Name */}
          <p className="text-lg font-medium text-gray-800">{item.name}</p>
          {/* Speciality */}
          <p className="text-sm text-gray-600">{item.speciality}</p>
        </div>
      </div>
    ))}
  </div>

  {/* More Button */}
  <div className="text-center mt-8">
    <button
      onClick={() => {
        navigate('/doctors');
        scrollTo(0, 0);
      }}
      className="px-6 py-3 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600 transition duration-300"
    >
      More
    </button>
  </div>
</div>

  );
};

export default TopDoctors;
