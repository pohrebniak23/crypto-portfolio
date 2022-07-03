import { getAuth } from "firebase/auth";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate } from "react-router-dom";
import { Loader } from "../components/Loader/Loader";

interface Props {
  component: React.ComponentType,
}

export const PublicRoute: React.FC<Props> = ({ component }) => {
  const authFunc = getAuth();
  const [auth, loading] = useAuthState(authFunc);

  if (!loading) {
    if (auth === null) {
      return React.createElement(component)
    }
  
    return <Navigate to="/" />
  }
  
  return <Loader />;
}