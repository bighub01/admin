import { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdoOpen, setIsDropdoOpen] = useState(false);
  const [isDropOpen, setIsDropOpen] = useState(false);
  return (
    <div className="w-64 h-full bg-gradient-to-r from-blue-400 to-indigo-500 text-white shadow-lg p-4">
      <ul className="space-y-6">
        {/* E-commerce (Dropdown) */}
        <li>
          <button
            type="button"
            className="flex items-center w-full p-3 text-white transition duration-75 rounded-lg group hover:bg-blue-600"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <svg
              className="shrink-0 w-5 h-5 mr-3"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 21"
            >
              <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
            </svg>
            <span className="flex-1 text-lg">Products</span>
            <svg
              className={`w-3 h-3 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>

          {/* Dropdown Content */}
          {isDropdownOpen && (
            <ul className="py-2 space-y-2">
              <li>
                <Link
                  to="/"
                  className="flex items-center w-full p-2 pl-10 text-white transition duration-75 rounded-lg group hover:bg-blue-600"
                >
                  Create Product
                </Link>
              </li>
              <li>
                <Link
                  to="/prolist"
                  className="flex items-center w-full p-2 pl-10 text-white transition duration-75 rounded-lg group hover:bg-blue-600"
                >
                  List Product
                </Link>
              </li>
              <li>
                <Link
                  to="/proupdate"
                  className="flex items-center w-full p-2 pl-10 text-white transition duration-75 rounded-lg group hover:bg-blue-600"
                >
                  Update Product
                </Link>
              </li>
            </ul>
          )}
        </li>

        {/* Category (Dropdown) */}
        <li>
          <button
            type="button"
            className="flex items-center w-full p-3 text-white transition duration-75 rounded-lg group hover:bg-blue-600"
            onClick={() => setIsDropdoOpen(!isDropdoOpen)}
          >
            <svg
              className="shrink-0 w-5 h-5 mr-3"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 21"
            >
              <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
            </svg>
            <span className="flex-1 text-lg">Category</span>
            <svg
              className={`w-3 h-3 transition-transform ${isDropdoOpen ? "rotate-180" : ""}`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>

          {/* Dropdown Content */}
          {isDropdoOpen && (
            <ul className="py-2 space-y-2">
              <li>
                <Link
                  to="/catecreate"
                  className="flex items-center w-full p-2 pl-10 text-white transition duration-75 rounded-lg group hover:bg-blue-600"
                >
                  Category Create
                </Link>
              </li>
              <li>
                <Link
                  to="/category"
                  className="flex items-center w-full p-2 pl-10 text-white transition duration-75 rounded-lg group hover:bg-blue-600"
                >
                  Category List
                </Link>
              </li>
              <li>
                <Link
                  to="/cateupdate"
                  className="flex items-center w-full p-2 pl-10 text-white transition duration-75 rounded-lg group hover:bg-blue-600"
                >
                  Category Update
                </Link>
              </li>
            </ul>
          )}
        </li>
        <li>
          <button
            type="button"
            className="flex items-center w-full p-3 text-white transition duration-75 rounded-lg group hover:bg-blue-600"
            onClick={() => setIsDropOpen(!isDropOpen)}
          >
            <svg
              className="shrink-0 w-5 h-5 mr-3"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 21"
            >
              <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
            </svg>
            <span className="flex-1 text-lg">Order</span>
            <svg
              className={`w-3 h-3 transition-transform ${isDropOpen ? "rotate-180" : ""}`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>

          {/* Dropdown Content */}
          {isDropOpen && (
            <ul className="py-2 space-y-2">
              <li>
                <Link
                  to="/OrderList"
                  className="flex items-center w-full p-2 pl-10 text-white transition duration-75 rounded-lg group hover:bg-blue-600"
                >
                Order List
                </Link>
              </li>
            </ul>
          )}
        </li>

      </ul>
    </div>
  );
};

export default Sidebar;
