// Routes
import AppRoutes from "./components/routing/routes";

// Styles
import "./App.css";

// Context
import AuthProvider from "./components/context/authProvider";

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
