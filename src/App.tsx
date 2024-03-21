import React, { Children, useState } from "react";
import "./App.css";

// import { BrowserRouter, Route, Routes } from "react-router-dom";

// import HomePage from "./pages/HomePage";
// import NavBar from "./components/NavBar";
// import SignupPage from "./pages/SignupPage";
// import LoginPage from "./pages/LoginPage";
// import ForgotPasswordPage from "./pages/ForgotPasswordPage";
// import { ToastContainer } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.min.css';
// import { useTheme } from "./context/ThemeContext";
// import ProfilePage from "./pages/ProfilePage";
// import ProtectedRoute from "./components/core/ProtectedRoute";
import DarkModeSwitcher from "./components/DarkModeSwitcher";
import AppNavBar from "./components/AppNavBar";
import Sidebar from "./components/Sidebar";

function App() {
  // const {theme} = useTheme();

  const [sidebarOpen, setSidebarOpen] = useState(true);
  return (
    <div className="min-h-full h-screen bg-white dark:bg-gray-900">
      {/* <NavBar />
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 transition-all">
        <div className="max-w-md w-full space-y-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <ProtectedRoute path="/profile" component={ProfilePage} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          </Routes>
        </div>
      </div>
      <ToastContainer theme={theme} /> */}
      <AppNavBar />
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
    </div>
  );
}

export default App;
