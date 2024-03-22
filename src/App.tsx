import React, { Children, useState } from "react";
import "./App.css";

// import { BrowserRouter, Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
// import NavBar from "./components/NavBar";
// import SignupPage from "./pages/SignupPage";
// import LoginPage from "./pages/LoginPage";
// import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import { ToastContainer } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.min.css';
import { useTheme } from "./context/ThemeContext";
// import ProfilePage from "./pages/ProfilePage";
// import ProtectedRoute from "./components/core/ProtectedRoute";
import DarkModeSwitcher from "./components/DarkModeSwitcher";
import AppNavBar from "./components/AppNavBar";
import Sidebar from "./components/Sidebar";
import { Route, Routes } from "react-router-dom";
import ProfilePage from "./pages/ProfilePage";

function App() {
  const { theme } = useTheme();

  return (
    <div className="flex min-h-full h-screen bg-white dark:bg-gray-900">
      <AppNavBar />
      <Sidebar />
      <div className="flex-1 mt-[80px] p-4 m-2">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
        <ToastContainer theme={theme} />
      </div>
    </div>
  );
}

export default App;
