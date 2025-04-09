import React from "react";
import Sidebar from "../component/Sidebar/Sidebar";

const DefaultLayout = ({ children }) => {
  return (
    <div className="h-screen flex flex-col">
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 px-3 py-4 bg-gray-50 dark:bg-gray-800">
          <Sidebar />
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 overflow-y-auto">{children}</main>
      </div>

      {/* Footer */}
      <footer className="p-4 bg-gray-100 dark:bg-gray-900 text-center">
        Footer
      </footer>
    </div>
  );
};

export default DefaultLayout;
