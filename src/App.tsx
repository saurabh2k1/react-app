import React from "react";
import "./App.css";

import HomePage from "./pages/HomePage";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';
import { useTheme } from "./context/ThemeContext";
import AppNavBar from "./components/AppNavBar";
import Sidebar from "./components/Sidebar";
import { Route, Routes } from "react-router-dom";
import ProfilePage from "./pages/ProfilePage";
import { useAuth } from "./auth/AuthContext";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import useColorMode from "./utils/useColorMode";
import UserList from "./components/UserList";

function App() {
  const [colorMode] = useColorMode();
  const {isLoggedIn} = useAuth();



  return (
    <div className="flex min-h-full h-screen bg-white dark:bg-gray-900">
      <AppNavBar />
      {isLoggedIn && <Sidebar />}
      <div className="flex-1 mt-[60px] p-4 m-2">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/users" element={<UserList />} />
        </Routes>
        <ToastContainer theme={colorMode === 'dark' ? "dark" : "light"} />
      </div>
    </div>
  );
}

export default App;
