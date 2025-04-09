import React, { useState } from "react";
import LoginPage from "../components/login";
import RegisterPage from "../components/register";
import CreNewPass from "../components/crenewpass";
import SendOPT from "../components/OPT";

const LoginAndRegister = () => {
  const [currentPage, setCurrentPage] = useState("login"); // Quản lý trạng thái trang hiện tại

  return (
    <div>
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
  );
};

export default LoginAndRegister;
