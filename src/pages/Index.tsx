
import React from "react";
import { Navigate } from "react-router-dom";

// Redirect to home page from the index
const Index = () => {
  return <Navigate to="/" replace />;
};

export default Index;
