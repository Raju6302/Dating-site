import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../redux/connectionSlice";
import { Link } from "react-router-dom";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);

  const getAllConnections = async () => {
    const res = await axios.get(BASE_URL + "/user/connections", {
      withCredentials: true,
    });
    console.log("res", res)
    dispatch(addConnection(res?.data?.data));
  };

  useEffect(() => {
    getAllConnections();
  }, []);

  if (!connections) return null;

  if (connections.length <= 0) return <h1>No connections</h1>;

  console.log("connections",connections);

  return (
    <div className="grid gap-6 p-6 sm:grid-cols-2 lg:grid-cols-3">
      {connections.map((connection) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about } =
          connection;
        return (
          <div
            key={_id}
            className="bg-white shadow-xl rounded-xl overflow-hidden border hover:shadow-2xl transition duration-300"
          >
            <img
              src={photoUrl}
              alt="user photo"
              className="w-full h-64 object-cover object-[center_0%]"
            />
            <div className="p-4 space-y-2">
              <h1 className="text-xl font-semibold text-gray-800">
                {firstName + " " + lastName}
              </h1>
              {age && gender && (
                <p className="text-sm text-gray-600">
                  {age} | {gender}
                </p>
              )}
              {about && <p className="text-gray-700 text-sm">{about}</p>}

              <div className="flex items-center gap-2 pt-4">
                <Link to='/chat'>
                  <button className="px-4 py-1 text-sm bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition cursor-pointer">
                    Chat
                  </button>
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
