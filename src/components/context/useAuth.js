import { useContext } from "react";

import AuthContext from "./authContext";

// Create the context for the application
const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
