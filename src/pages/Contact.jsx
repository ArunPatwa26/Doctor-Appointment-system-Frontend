import React from 'react';
import { assets } from '../assets/assets';

const Contact = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Title Section */}
      <div className="text-center mb-10">
        <p className="text-3xl font-semibold">
          Contact <span className="text-primary">Us</span>
        </p>
      </div>

      {/* Main Content Section */}
      <div className="flex flex-col md:flex-row items-center gap-8">
        {/* Left Side: Image */}
        <div className="w-full md:w-2/3 ">
          <img
            src={assets.contact_image}
            alt="Contact Us"
            className="w-full h-auto object-cover rounded-lg shadow-md"
          />
        </div>

        {/* Right Side: Text */}
        <div className="w-full md:w-2/1 text-gray-700 p-4 ">
          {/* Office Info */}
          <div className="mb-8">
            <b className="text-lg font-semibold">Our Office</b>
            <p className="mt-2 text-sm leading-relaxed">
              00000 Willms Station <br />
              Suite 000, Washington, USA
            </p>
            <p className="mt-2 text-sm leading-relaxed">
              Tel: (000) 000-0000 <br />
              Email: abc1234@gmail.com
            </p>
          </div>

          {/* Careers Info */}
          <div className="mb-8">
            <b className="text-lg font-semibold">CAREERS AT PRESCRIPTO</b>
            <p className="mt-2 text-sm leading-relaxed">
              Learn more about our teams and job openings.
            </p>
          </div>

          {/* Button */}
          <div>
            <button className="bg-primary text-white py-2 px-6 rounded-lg hover:bg-primary-dark transition duration-300">
              Explore Jobs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
