import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { NavLink, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
 
  const {token,setToken,userData}=useContext(AppContext)
  const logout=()=>{
    setToken(false)
    localStorage.removeItem('doctor-token')
  }
  return (
    <div className="flex items-center justify-between text-ellipsis py-4 mb-5 border-b border-b-gray-300">
      {/* Logo */}
      <img
        onClick={() => navigate('/')}
        src="https://dcassetcdn.com/design_img/1306483/83087/83087_6720751_1306483_433f0d70_image.jpg"
        alt="Logo"
        className="h-20 w-56 cursor-pointer object-cover rounded-lg "
      />

      {/* Desktop Navigation Links */}
      <ul className="hidden md:flex items-center space-x-6 text-gray-800">
        <NavLink className="hover:text-blue-500" to="/">
          <li className="cursor-pointer font-medium">Home</li>
        </NavLink>
        <NavLink className="hover:text-blue-500" to="/doctors">
          <li className="cursor-pointer font-medium">All Doctors</li>
        </NavLink>
        <NavLink className="hover:text-blue-500" to="/about">
          <li className="cursor-pointer font-medium">About</li>
        </NavLink>
        <NavLink className="hover:text-blue-500" to="/contact">
          <li className="cursor-pointer font-medium">Contact</li>
        </NavLink>
      </ul>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Profile or Button */}
        {token && userData ? (
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <img className="w-8 rounded-full" src={userData.image} alt="Profile" />
            <img className="w-2.5" src={assets.dropdown_icon} alt="Dropdown Icon" />
            <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
              <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
                <p
                  onClick={() => navigate('/my-profile')}
                  className="hover:text-primary cursor-pointer"
                >
                  My Profile
                </p>
                <p
                  onClick={() => navigate('/my-appointments')}
                  className="hover:text-primary cursor-pointer"
                >
                  My Appointment
                </p>
                <p
                  onClick={logout}
                  className="hover:text-primary cursor-pointer"
                >
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Create Account
          </button>
        )}

        {/* Menu Icon for Mobile */}
        <img
          onClick={() => setShowMenu(true)}
          className="w-6 cursor-pointer md:hidden"
          src={assets.menu_icon}
          alt="Menu Icon"
        />
      </div>

      {/* Mobile Menu */}
      {showMenu && (
        <div className="fixed top-0 right-0 bottom-0 w-4/5 bg-white z-30 shadow-lg md:hidden transition-all">
          <div className="flex justify-between items-center px-4 py-2">
            <img src={assets.logo} alt="Logo" className="h-10 w-auto" />
            <img
              onClick={() => setShowMenu(false)}
              src={assets.cross_icon}
              alt="Close Icon"
              className="w-6 cursor-pointer"
            />
          </div>
          <ul className="flex flex-col gap-4 px-6 py-4">
            <NavLink
              to="/"
              className="text-gray-800 hover:text-blue-500 font-medium"
              onClick={() => setShowMenu(false)}
            >
              Home
            </NavLink>
            <NavLink
              to="/doctors"
              className="text-gray-800 hover:text-blue-500 font-medium"
              onClick={() => setShowMenu(false)}
            >
              All Doctors
            </NavLink>
            <NavLink
              to="/about"
              className="text-gray-800 hover:text-blue-500 font-medium"
              onClick={() => setShowMenu(false)}
            >
              About
            </NavLink>
            <NavLink
              to="/contact"
              className="text-gray-800 hover:text-blue-500 font-medium"
              onClick={() => setShowMenu(false)}
            >
              Contact
            </NavLink>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
