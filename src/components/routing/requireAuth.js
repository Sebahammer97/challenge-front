import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../context/useAuth";

// Components
import Layout from "../layout/layout";

// Summary: Verifies if the user is allowed to access to the private routes
const RequireAuth = ({ children }) => {
  let auth = useAuth();
  let location = useLocation();

  if (!auth.user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Layout>{children}</Layout>;
};

export default RequireAuth;
