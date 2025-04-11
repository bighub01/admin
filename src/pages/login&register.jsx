import React, { useState } from "react";
import LoginPage from "../components/login";
import RegisterPage from "../components/register";
import CreNewPass from "../components/crenewpass";
import SendOPT from "../components/OPT";

const LoginAndRegister = () => {
  const [currentPage, setCurrentPage] = useState("login"); // Quản lý trạng thái trang hiện tại

  return (
    <div className="h-screen flex justify-center items-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-xl">
        {/* Hiển thị các trang khác nhau tùy thuộc vào trạng thái */}
        {currentPage === "login" && (
          <LoginPage
            onSwitchPage={() => setCurrentPage("register")}
            onForgotPassword={() => setCurrentPage("forgotPassword")}
          />
        )}
        {currentPage === "register" && (
          <RegisterPage
            onSwitchPage={() => setCurrentPage("login")}
          />
        )}
        {currentPage === "forgotPassword" && (
          <CreNewPass
            onSwitchPage={() => setCurrentPage("login")}
            onSendOPT={() => setCurrentPage("sendOPT")} // Chuyển đến SendOPT từ CreNewPass
          />
        )}
        {currentPage === "sendOPT" && (
          <SendOPT onSwitchPage={() => setCurrentPage("login")} />
        )}
      </div>
    </div>
  );
};

export default LoginAndRegister;
