import React from "react";
import Header from "./Header";
import { Outlet, useLocation } from "react-router-dom";
import useFetchUser from "../hooks/useFetchUser";
const Body = () => {
  const location = useLocation();
  const hideHeader = ["/login"];
  const shouldHideHeader = hideHeader.includes(location.pathname);

  if (!shouldHideHeader) {
    useFetchUser();
  }

  return (
    <div>
      {!shouldHideHeader && <Header />}

      <Outlet />
    </div>
  );
};

export default Body;
