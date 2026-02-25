import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../redux/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);
  console.log(requests);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests(res?.data));
      console.log(res.data.id);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleReviewRequest = async (status, _id) => {
    try {
      await axios.post(
        BASE_URL + "/request/view/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (error) {
      console.error(error);
    }
  };

  if (!requests) return null;

  if (requests.length <= 0) return <h1>no requests found</h1>;

  return (
    <div className="grid gap-6 p-6 sm:grid-cols-2 lg:grid-cols-3">
      {requests.map((request) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about } =
          request.fromUserId;
        return (
          <div
            key={_id}
            className="bg-white shadow-xl rounded-xl overflow-hidden border hover:shadow-2xl transition duration-300"
          >
            <img
              src={photoUrl}
              alt="user photo"
              className="w-full h-60 object-cover object-[center_0%]"
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

              <div className="flex justify-around gap-2 pt-4">
                <button
                  onClick={() => handleReviewRequest("Rejected", request._id)}
                  className="px-4 py-1 text-sm bg-red-300 hover:bg-red-400 rounded-lg transition cursor-pointer"
                >
                  Reject
                </button>
                <button
                  onClick={() => handleReviewRequest("Accepted", request._id)}
                  className="px-4 py-1 text-sm bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition cursor-pointer"
                >
                  Accept
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
