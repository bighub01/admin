import React from "react";
import Sidebar from "../component/Sidebar/Sidebar";

const DefaultLayout = ({ children }) => {
  return (
    <div className="h-screen flex flex-col bg-gradient-to-r from-blue-50 to-indigo-100">
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 px-4 py-6 bg-gradient-to-r from-blue-400 to-indigo-500 text-white shadow-lg">
          <Sidebar />
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto bg-white rounded-lg shadow-md mx-4 my-6">
          {children}
        </main>
      </div>

      {/* Footer */}
      <footer className="p-4 bg-gradient-to-r from-gray-700 to-gray-900 text-white text-center shadow-md">
        <span className="text-sm">© 2025 Your Company</span>
      </footer>
    </div>
  );
};

export default DefaultLayout;
