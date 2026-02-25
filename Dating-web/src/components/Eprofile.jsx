import React from "react";
import EditProfile from "./EditProfile";
import { useSelector } from "react-redux";

const Eprofile = () => {
  const user = useSelector((store) => store.user);
  if (!user) return null;
  return (
      <div>
        <EditProfile user={user}/>
      </div>
  );
};

export default Eprofile;
