import React from "react";
import { Navigate } from "react-router-dom";
import { Sidebar } from "../components/Sidebar/Sidebar";

interface Props {
  isAuth: boolean,
  component: React.ComponentType,
}

export const PrivateRoute: React.FC<Props> = ({ isAuth, component }) => {
  if (isAuth) {
    return (
      <>
        <Sidebar />
        {React.createElement(component)}
      </>
    )
  }

  return <Navigate to="/login" /> 
}