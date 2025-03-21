import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Doctors = () => {
  const { speciality } = useParams();
  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false); // State to toggle filter visibility
  const { doctors } = useContext(AppContext);
  const navigate = useNavigate();

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(
        doctors.filter(
          (doc) =>
            doc.speciality.toLowerCase().trim() ===
            speciality.toLowerCase().trim()
        )
      );
    } else {
      setFilterDoc(doctors);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <p className="text-lg font-medium text-gray-800 mb-4">
        Browse through the doctors by their specialities.
      </p>

      {/* Filter Button for Small Screens */}
      <button
        onClick={() => setShowFilter(!showFilter)}
        className="lg:hidden mb-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
      >
        {showFilter ? "Hide Filters" : "Show Filters"}
      </button>

      <div className="flex flex-col lg:flex-row lg:space-x-8">
        {/* Left Side - Speciality List */}
        <div
          className={`lg:block ${
            showFilter ? "block" : "hidden"
          } w-full lg:w-1/4 mb-6 lg:mb-0`}
        >
          <div className="space-y-4 bg-white p-4 rounded-lg ">
            {[
              "General Physician",
              "Gynecologist",
              "Dermatologist",
              "Pediatricians",
              "Neurologist",
              "Gastroenterologist",
            ].map((spec, index) => (
              <p
                key={index}
                onClick={() =>
                  navigate(
                    speciality === spec ? "/doctors" : `/doctors/${spec}`
                  )
                }
                className={`text-lg font-medium px-4 py-2 border rounded-md cursor-pointer hover:bg-blue-100 transition duration-300 ${
                  speciality === spec
                    ? "bg-indigo-100 text-black"
                    : "text-gray-800"
                }`}
              >
                {spec}
              </p>
            ))}
          </div>
        </div>

        {/* Right Side - Doctors Grid */}
        <div className="lg:w-3/4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filterDoc && filterDoc.length > 0 ? (
              filterDoc.map((item, index) => (
                <div
                  onClick={() => navigate(`/appointment/${item._id}`)}
                  key={index}
                  className="border border-gray-200 rounded-lg overflow-hidden cursor-pointer hover:shadow-lg hover:-translate-y-2 transition-all duration-300"
                >
                  {/* Doctor Image */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-48 object-cover  bg-indigo-100"
                  />
                  {/* Doctor Details */}
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-sm text-gray-500">Available</p>
                      <p
                        className={`text-xs font-semibold ${
                          item.available ? "text-green-500" : "text-red-500"
                        }`}
                      >
                        {item.available ? "Online" : "Offline"}
                      </p>
                    </div>
                    <p className="text-lg font-medium text-gray-800">
                      {item.name}
                    </p>
                    <p className="text-sm text-gray-600">{item.speciality}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-lg text-gray-500 col-span-full">
                No doctors available in this speciality.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Doctors;
