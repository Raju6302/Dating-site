import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeUser } from "../redux/userSlice";
import { BASE_URL } from "../utils/constants";
import logo from "../assets/flareheart.png"

const Header = () => {
  const navigate = useNavigate();
  const [showLinks, setShowLinks] = useState(false);

  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const handleShowLinks = () => {
    setShowLinks(!showLinks);
  };

  const handleLogout = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/logout",
        {},
        { withCredentials: true }
      );
      if (res.status === 200) {
        dispatch(removeUser());
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <header className="flex flex-wrap justify-between items-center bg-gray-800 text-white px-4 py-3 md:px-8 relative">
      {/* Logo */}
      <div className="text-xl font-bold">
        <Link to="/">
          <img
            className="w-[40px] h-full object-cover rounded-full border-2 border-white cursor-pointer"
            alt="logo"
            src={logo}
          />
        </Link>
      </div>

      {/* User Section */}
      {user && (
        <div className="flex items-center gap-4 mt-3 md:mt-0 relative">
          <p className="text-sm md:text-base">
            Welcome, {user.firstName}
          </p>
          <div className="w-10 h-10 relative">
            <img
              onClick={handleShowLinks}
              className="w-full h-full object-cover object-[center_0%] rounded-full border-2 border-white cursor-pointer"
              alt="User photo"
              src={user.photoUrl}
            />

            {showLinks && (
              <div className="absolute right-0 mt-2 w-44 bg-white text-gray-800 rounded-md shadow-lg z-20 overflow-hidden flex flex-col">
                <Link
                  to="/profile"
                  className="px-4 py-2 hover:bg-gray-100 border-b"
                >
                  Profile
                </Link>
                <Link
                  to="/connections"
                  className="px-4 py-2 hover:bg-gray-100 border-b"
                >
                  Connections
                </Link>
                <Link
                  to="/requests"
                  className="px-4 py-2 hover:bg-gray-100 border-b"
                >
                  Requests
                </Link>
                <Link
                  to="/premium"
                  className="px-4 py-2 hover:bg-gray-100 border-b"
                >
                  Premium
                </Link>
                <button
                  className="text-left px-4 py-2 hover:bg-red-100 text-red-600 cursor-pointer"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
