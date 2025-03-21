import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { assets } from "../assets/assets";
import { toast } from 'react-toastify';
import axios from 'axios';

const MyProfile = () => {
  const { userData, setUserData, token, backendUrl, loadUserProfileData } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);

  const updateUserProfileData = async () => {
    try {
        const formData = new FormData();
        formData.append('name', userData.name);
        formData.append('phone', userData.phone);
        formData.append('address', JSON.stringify(userData.address));
        formData.append('gender', userData.gender);
        formData.append('dob', userData.dob);  // Ensure this is being added

        if (image) formData.append('image', image);

        console.log("Form Data before sending:", Object.fromEntries(formData.entries())); // Debugging

        const { data } = await axios.post(`${backendUrl}/api/user/update-profile`, formData, {
            headers: { token },
        });

        if (data.success) {
            toast.success(data.success);
            await loadUserProfileData(); // Refresh data after updating
            setIsEdit(false);
            setImage(false);
        } else {
            toast.error(data.message);
        }
    } catch (error) {
        console.log("Error updating profile:", error);
        toast.error(error.message);
    }
};


  return userData && (
    <div className="min-h-screen bg-gray-100 py-6 px-8">
      {/* Profile Card */}
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <div className="flex justify-start mb-8">
          {
            isEdit
            ? <label htmlFor='image'>
                <div className="inline-block relative cursor-pointer">
                  <img className='w-36 rounded opacity-75' src={image ? URL.createObjectURL(image) : userData.image} alt="" />
                  <img className='w-10 absolute bottom-12 right-12' src={image ? '' : assets.upload_icon} alt="" />
                </div>
                <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden />
              </label>
            : <img
                src={userData.image}
                alt="Profile"
                className="w-32 h-32 rounded-lg border-4 border-blue-500"
              />
          }
        </div>

        {/* Editable/Non-editable Fields */}
        <div className="space-y-6">
          {/* Name */}
          <div className="flex items-center space-x-4">
            <label className="block text-sm font-medium text-gray-700 w-1/3">Full Name:</label>
            {isEdit ? (
              <input
                type="text"
                value={userData.name}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, name: e.target.value }))
                }
                className="w-2/3 px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-gray-900 font-semibold w-2/3">{userData.name}</p>
            )}
          </div>

          {/* Email (Non-editable) */}
          <div className="flex items-center space-x-4">
            <label className="block text-sm font-medium text-gray-700 w-1/3">Email:</label>
            <p className="text-gray-900 w-2/3">{userData.email}</p>
          </div>

          {/* Phone */}
          <div className="flex items-center space-x-4">
            <label className="block text-sm font-medium text-gray-700 w-1/3">Phone:</label>
            {isEdit ? (
              <input
                type="text"
                value={userData.phone}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, phone: e.target.value }))
                }
                className="w-2/3 px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-gray-900 w-2/3">{userData.phone}</p>
            )}
          </div>

          {/* Address */}
          <div className="flex flex-col space-y-2">
            <label className="block text-sm font-medium text-gray-700">Address:</label>
            {isEdit ? (
              <>
                <input
                  type="text"
                  value={userData.address.line1}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line1: e.target.value },
                    }))
                  }
                  className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  value={userData.address.line2}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line2: e.target.value },
                    }))
                  }
                  className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </>
            ) : (
              <p className="text-gray-900">{userData.address.line1} <br /> {userData.address.line2}</p>
            )}
          </div>

          {/* Gender */}
          <div className="flex items-center space-x-4">
            <label className="block text-sm font-medium text-gray-700 w-1/3">Gender:</label>
            {isEdit ? (
              <select
              value={userData.gender}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, gender: e.target.value }))
              }
              className="w-2/3 px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            ) : (
              <p className="text-gray-900 w-2/3">{userData.gender}</p>
            )}
          </div>

          {/* Date of Birth */}
          <div className="flex items-center space-x-4">
            <label className="block text-sm font-medium text-gray-700 w-1/3">Date of Birth:</label>
            {isEdit ? (
             <input
             type="date"
             value={userData.dob || ''}
             onChange={(e) => {
               console.log("New DOB:", e.target.value);
               setUserData((prev) => ({ ...prev, dob: e.target.value }));
             }}
             className="w-2/3 px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
           />
            ) : (
              <p className="text-gray-900 w-2/3">{userData.dob}</p>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end mt-8 space-x-4">
          {isEdit ? (
            <button
              onClick={updateUserProfileData}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => setIsEdit(true)}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
