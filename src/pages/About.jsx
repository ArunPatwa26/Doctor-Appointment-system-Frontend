import React from 'react';
import { assets } from '../assets/assets';

const About = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* About Us Section */}
      <div className="text-center mb-10">
        <p className="text-3xl font-semibold">
          About <span className="text-primary">Us</span>
        </p>
      </div>
      <div className="flex flex-col md:flex-row items-center gap-4 mb-12">
        {/* Left Side: Image */}
        <div className="w-full md:w-1/2">
          <img
            src={assets.about_image}
            alt="About Us"
            className="w-96 h-auto object-cover rounded-lg shadow-md"
          />
        </div>
        {/* Right Side: Text */}
        <div className="w-full md:w-2/1 text-gray-700 p-4">
          <p className="text-sm leading-relaxed mb-8">
            Welcome to <strong>Prescripto</strong>, your trusted partner in managing your healthcare needs conveniently and efficiently. At Prescripto, we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.
          </p>
          <p className="text-sm leading-relaxed mb-8">
            Prescripto is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service. Whether you're booking your first appointment or managing ongoing care, Prescripto is here to support you every step of the way.
          </p>
          <b className="text-lg font-medium block mb-4">Our Vision</b>
          <p className="text-sm leading-relaxed">
            Our vision at Prescripto is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.
          </p>
        </div>
      </div>
      {/* Why Choose Us Section */}
      <div className="text-center mb-8">
        <b className="text-2xl font-semibold">
          Why <span className="text-primary">Choose Us</span>
        </b>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Box 1 */}
        <div className="p-6 border rounded-lg shadow-md hover:bg-primary hover:text-white transition duration-300">
          <b className="block mb-6 text-lg">EFFICIENCY:</b>
          <p>Streamlined appointment scheduling that fits into your busy lifestyle.</p>
        </div>
        {/* Box 2 */}
        <div className="p-6 border rounded-lg shadow-md hover:bg-primary hover:text-white transition duration-300">
          <b className="block mb-6 text-lg">CONVENIENCE:</b>
          <p>Access to a network of trusted healthcare professionals in your area.</p>
        </div>
        {/* Box 3 */}
        <div className="p-6 border rounded-lg shadow-md hover:bg-primary hover:text-white transition duration-300">
          <b className="block mb-6 text-lg">PERSONALIZATION:</b>
          <p>Tailored recommendations and reminders to help you stay on top of your health.</p>
        </div>
      </div>
    </div>
  );
};

export default About;
