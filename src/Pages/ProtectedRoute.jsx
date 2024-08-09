// import { Route, Navigate } from "react-router-dom";
// import { useAuth } from "../Components/common/AuthProvider";

// const ProtectedRoute = ({ children }) => {
//   const { user } = useAuth();
//   return user ? children : <Navigate to="/login" />;
// };

// export default ProtectedRoute;
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Components/common/AuthProvider";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      alert("Silakan login untuk mengakses halaman ini.");
      navigate("/login");
    }
  }, [user, navigate]);

  return user ? children : null; // Render children jika user ada, atau null jika tidak
};

export default ProtectedRoute;
