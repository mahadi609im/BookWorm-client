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
      {/* --- Logo Section (Visible only in Large Screens Sidebar) --- */}
      <div className="p-8 hidden lg:block">
        <Link
          to="/"
          className="font-serif font-black text-3xl text-primary tracking-tighter"
        >
          Book<span className="text-secondary italic">Worm</span>
        </Link>
        <p className="text-[10px] font-black uppercase tracking-[3px] text-base-content/40 mt-1 ml-1">
          Admin Panel
        </p>
      </div>

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

      {/* --- Footer Action --- */}
      <div className="p-4 border-t border-base-200">
        <Link
          to="/"
          className="flex items-center gap-4 px-4 py-3.5 rounded-2xl font-bold text-error hover:bg-error/10 transition-all group"
        >
          <FaSignOutAlt className="group-hover:-translate-x-1 transition-transform" />
          Back to Site
        </Link>
      </div>
    </div>
  );
};

export default MenuItems;
