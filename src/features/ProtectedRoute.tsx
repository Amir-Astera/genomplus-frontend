import React from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../features/redux/hooks";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  if (!isAuth) {
    console.log(isAuth)
    return <Navigate to="/authorization" replace />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;