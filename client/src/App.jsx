import { useEffect, useState } from "react";
import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [darkMode, setDarkMode] = useState(() => {
    return (
      localStorage.getItem("darkMode") ===
      "true"
    );
  });

  useEffect(() => {
    localStorage.setItem(
      "darkMode",
      darkMode
    );
  }, [darkMode]);

  return (
    <div
      className={
        darkMode
          ? "min-h-screen bg-slate-900"
          : "min-h-screen bg-gray-100"
      }
    >
      {user && (
        <Navbar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />
      )}

      <Routes>

        <Route
          path="/"
          element={
            user ? (
              <Dashboard
                darkMode={darkMode}
              />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/login"
          element={
            user ? (
              <Navigate to="/" replace />
            ) : (
              <Login
                darkMode={darkMode}
              />
            )
          }
        />

        <Route
          path="/signup"
          element={
            user ? (
              <Navigate to="/" replace />
            ) : (
              <Signup
                darkMode={darkMode}
              />
            )
          }
        />

      </Routes>
    </div>
  );
}

export default App;