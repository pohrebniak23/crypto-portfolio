import React from "react";
import { Navigate } from "react-router-dom";

interface Props {
  isAuth: boolean,
  component: React.ComponentType,
}

export const PublicRoute: React.FC<Props> = ({ isAuth, component }) => {
  if (!isAuth) {
    return React.createElement(component)
  }

  return <Navigate to="/" />
}