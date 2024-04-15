import React from "react";
import { useSelector } from "react-redux";

const LoginGuard = ({ children }) => {
  const user = useSelector((state) => state.user);
  if (!user) {
    return <p>not logged in, can't upload</p>;
  }
  return children;
};

export default LoginGuard;
