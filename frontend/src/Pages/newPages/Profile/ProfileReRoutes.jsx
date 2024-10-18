import React from "react";
import { useSelector } from "react-redux";
import AdminHomePage from "../adminPages/adminHomePage/AdminHomePage";
import Profile from "./Profile";
import User from "../user/User";

const componentMapping = {
  admin: AdminHomePage,
  instructor: User,
  student: User,
};

const ProfileReRoutes = () => {
    const authUser = useSelector((state) => state.user);

  const Component = componentMapping[authUser.accountType];
  if (!Component) {
    return null;
  }
  return (
    <div>
      <Component />
    </div>
  );
};

export default ProfileReRoutes;
