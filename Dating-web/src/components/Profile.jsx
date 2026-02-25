import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Profile = () => {
  const user = useSelector((store) => store.user);
  console.log("User data in Profile: ", user);
  if (!user) return null;
  const { photoUrl, firstName, lastName, age, gender, about } = user;

  return (
      <div className="flex items-center justify-center p-6">
        <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-6">
          <div className="flex flex-col items-center">
            <img
              src={photoUrl}
              alt="Profile"
              className="w-32 h-32 object-cover object-[center_0%] rounded-full border-4 border-gray-500 shadow-md"
            />
            <h1 className="mt-4 text-2xl font-bold text-gray-800">
              {firstName} {lastName}
            </h1>
            {/* <p className="text-gray-500 text-sm">
            @{user.firstName.toLowerCase()}
          </p> */}
          </div>

          <div className="mt-6 space-y-3">
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-600 font-medium">Name:</span>
              <span className="text-gray-800">
                {firstName} {lastName}
              </span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-600 font-medium">Age:</span>
              <span className="text-gray-800">{age || "N/A"}</span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-600 font-medium">Gender:</span>
              <span className="text-gray-800 capitalize">
                {gender || "N/A"}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600 font-medium">About:</span>
              <span className="text-gray-800 text-right">
                {about || "No description provided."}
              </span>
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <Link to="/editprofile">
              <button className="px-4 py-2 bg-gray-600 text-white rounded-lg shadow hover:bg-gray-800 transition duration-300 cursor-pointer">
                Edit Profile
              </button>
            </Link>
          </div>
        </div>
      </div>
  );
};

export default Profile;
