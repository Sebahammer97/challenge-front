import { Routes, Route } from "react-router-dom";

// Pages
import Login from "../../pages/login";
import Home from "../../pages/home";
import TaskTable from "../../pages/taskTable";

// Routing
import RequireAuth from "./requireAuth";

// Summary: Routes that are allowed on the application. Some of them authentication is required to access
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/home"
        element={
          <RequireAuth>
            <Home />
          </RequireAuth>
        }
      />
      <Route
        path="/tasks"
        element={
          <RequireAuth>
            <TaskTable />
          </RequireAuth>
        }
      />
      <Route
        path="*"
        element={
          <RequireAuth>
            <Home />
          </RequireAuth>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
