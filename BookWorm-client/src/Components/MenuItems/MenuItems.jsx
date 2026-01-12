import React from 'react';
import { NavLink, Link } from 'react-router';
import {
  FaBook,
  FaUsers,
  FaStar,
  FaVideo,
  FaThLarge,
  FaTags,
  FaSignOutAlt,
} from 'react-icons/fa';

const MenuItems = ({ closeDrawer }) => {
  // লিঙ্কগুলো এখানে রাখাই ভালো যাতে মেইন লেআউট ফাইল ক্লিন থাকে
  const adminLinks = [
    { name: 'Dashboard', path: '/admin-dashboard', icon: <FaThLarge /> },
    {
      name: 'Manage Books',
      path: '/admin-dashboard/manage-books',
      icon: <FaBook />,
    },
    {
      name: 'Manage Genres',
      path: '/admin-dashboard/manage-genres',
      icon: <FaTags />,
    },
    {
      name: 'Manage Users',
      path: '/admin-dashboard/manage-users',
      icon: <FaUsers />,
    },
    {
      name: 'Moderate Reviews',
      path: '/admin-dashboard/moderate-reviews',
      icon: <FaStar />,
    },
    {
      name: 'Manage Tutorials',
      path: '/admin-dashboard/manage-tutorials',
      icon: <FaVideo />,
    },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* --- Navigation Links --- */}
      <nav className="flex-1 px-4 space-y-2 mt-4 lg:mt-0">
        {adminLinks.map((link, idx) => (
          <NavLink
            key={idx}
            to={link.path}
            onClick={closeDrawer} // মোবাইল ড্রয়ার বন্ধ করার জন্য
            end
            className={({ isActive }) =>
              `flex items-center gap-4 px-4 py-3.5 rounded-2xl font-bold transition-all duration-300 ${
                isActive
                  ? 'bg-primary text-white shadow-lg shadow-primary/20'
                  : 'hover:bg-primary/5 text-base-content/60 hover:text-primary'
              }`
            }
          >
            <span className="text-xl">{link.icon}</span>
            <span className="tracking-wide">{link.name}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default MenuItems;
