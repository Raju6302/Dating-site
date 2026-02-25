import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeFeed } from "../redux/feedSlice";

const FeedCard = ({ feed }) => {
  const dispatch = useDispatch();

  const { _id, firstName, lastName, photoUrl, age, gender, about } = feed;

  const handleSendRequest = async (status, userId) => {
    try {
      await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeFeed(userId));
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="max-w-sm mx-auto bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-200 transition transform hover:scale-105 duration-300 mt-[100px]">
      <img
        src={photoUrl}
        alt={`${firstName}'s photo`}
        className="w-full h-64 object-cover object-[center_0%]"
      />

      <div className="p-4">
        <h1 className="text-xl font-bold text-gray-800">
          {firstName + " " + lastName}
        </h1>

        {age && gender && (
          <p className="text-sm text-gray-600 mt-1">
            {age} • {gender}
          </p>
        )}

        <p className="text-gray-700 mt-3 text-sm">{about}</p>

        <div className="mt-4 flex justify-between">
          <button
            onClick={() => handleSendRequest("Ignored", _id)}
            className="px-4 py-1 text-sm bg-red-300 hover:bg-red-400 rounded-lg transition cursor-pointer"
          >
            Ignore
          </button>
          <button
            onClick={() => handleSendRequest("Interested", _id)}
            className="px-4 py-1 text-sm bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition cursor-pointer"
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
