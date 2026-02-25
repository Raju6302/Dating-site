import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../redux/userSlice";

const EditProfile = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl);
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [age, setAge] = useState(user?.age);
  const [gender, setGender] = useState(user?.gender);
  const [about, setAbout] = useState(user?.about);

  if (!user) return null;

  const handleSaveProfile = async () => {
    try {
      const payload = {
        firstName,
        lastName,
        age,
        gender,
        about,
        photoUrl,
      };
      const res = await axios.patch(`${BASE_URL}/profile/edit`, payload, {
        withCredentials: true,
      });
      if (res.status === 200) {
        dispatch(addUser(res.data));
        navigate("/profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    user && (
      <div className="flex items-center justify-center p-6 bg-gradient-to-br from-gray-100 to-blue-50 min-h-screen">
        <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-6">
          <div className="flex flex-col items-center">
            <img
              src={user.photoUrl}
              alt="Profile"
              className="w-32 h-32 object-cover object-[center_0%] rounded-full border-4 border-gray-500 shadow-md"
            />
            <h1 className="mt-4 text-2xl font-bold text-gray-800">
              Edit Profile
            </h1>
          </div>


          <div className="mt-6 space-y-4">
          <div>
              <label className="block text-gray-600 font-medium">
                PhotoUrl
              </label>
              <input
                type="text"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                className="w-full border rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:gray-blue-400"
              />
            </div>
            <div>
              <label className="block text-gray-600 font-medium">
                First Name
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full border rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:gray-blue-400"
              />
            </div>

            <div>
              <label className="block text-gray-600 font-medium">
                Last Name
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full border rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
            </div>

            <div>
              <label className="block text-gray-600 font-medium">Age</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full border rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
            </div>

            <div>
              <label className="block text-gray-600 font-medium">Gender</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full border rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-gray-400"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-600 font-medium">About</label>
              <textarea
                rows="3"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                className="w-full border rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-gray-400"
              ></textarea>
            </div>
          </div>

          <div className="mt-6 flex justify-center gap-4">
            <button
              onClick={handleSaveProfile}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg shadow hover:bg-gray-800 transition duration-300"
            >
              Save Profile
            </button>
            <Link to="/profile">
              <button className="px-4 py-2 bg-gray-400 text-white rounded-lg shadow hover:bg-gray-500 transition duration-300">
                Cancel
              </button>
            </Link>
          </div>
        </div>
      </div>
    )
  );
};

export default EditProfile;
