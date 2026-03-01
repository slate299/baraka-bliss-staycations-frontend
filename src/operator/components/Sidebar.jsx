// src/components/Sidebar.jsx
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaPlus, FaInbox, FaBars, FaTimes } from "react-icons/fa";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { path: "/operator/", icon: <FaHome />, label: "Dashboard" },
    { path: "/operator/add", icon: <FaPlus />, label: "Add Apartment" },
    { path: "/operator/inquiries", icon: <FaInbox />, label: "Inquiries" },
  ];

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Hamburger Button - MOVED TO RIGHT */}
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-4 right-4 z-50 bg-[#4A7C59] text-white p-3 rounded-lg shadow-lg"
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Overlay for mobile when sidebar is open */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar - slides from LEFT still */}
      <aside
        className={`
          bg-[#383838] w-64 min-h-screen p-4 fixed left-0 top-0 z-50
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* Logo */}
        <div className="mb-8 pb-4 border-b border-[#2C2C2C]">
          <h1 className="text-white font-bold text-xl">Baraka Bliss</h1>
          <p className="text-text-secondary text-xs mt-1">Admin Dashboard</p>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={closeSidebar}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                  isActive
                    ? "bg-[#4A7C59] text-white"
                    : "text-text-secondary hover:bg-[#2C2C2C] hover:text-white"
                }`
              }
              end={item.path === "/"}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-4 left-4 right-4 pt-4 border-t border-[#2C2C2C]">
          <div className="text-text-secondary text-xs">
            <p>© 2024 Baraka Bliss</p>
            <p className="mt-1">v1.0.0</p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
