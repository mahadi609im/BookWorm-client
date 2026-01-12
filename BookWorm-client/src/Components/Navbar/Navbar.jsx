import React, { useContext, useEffect, useRef, useState } from 'react';
import { NavLink, Link } from 'react-router';
import {
  FaMoon,
  FaSun,
  FaSignOutAlt,
  FaUserEdit,
  FaShieldAlt,
} from 'react-icons/fa';
import { AuthContext } from '../../context/AuthContext';
import { toast } from 'react-toastify';

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  // Admin Check
  const isAdmin = user?.email === 'maha609im@gmail.com';

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    const handleClickOutside = e => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logoutUser()
      .then(() => {
        setOpen(false);
        toast.success('Logout successfully');
      })
      .catch(error => console.log('Logout Error:', error));
  };

  const navLinks = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'My Library', path: '/my-library' },
    { name: 'Browse Books', path: '/browse-books' },
    { name: 'Tutorials', path: '/tutorials' },
  ];

  return (
    <div className="navbar bg-base-100/95 backdrop-blur-md shadow-sm border-b border-base-300 py-3 px-4 md:px-10 fixed top-0 left-0 right-0 z-[100] transition-all duration-300">
      <div className="navbar-start">
        {/* Mobile Menu */}
        <div className="dropdown lg:hidden">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow-2xl bg-base-100 border border-base-300 rounded-box w-64 z-[110]"
          >
            {navLinks.map((link, idx) => (
              <li key={idx}>
                <NavLink to={link.path}>{link.name}</NavLink>
              </li>
            ))}
            {!user && (
              <>
                <li className="border-t border-base-300 mt-2">
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/register">Register</Link>
                </li>
              </>
            )}
          </ul>
        </div>

        <Link to="/" className="flex items-center group">
          <span className="font-serif font-bold text-2xl text-primary tracking-tight">
            Book<span className="text-secondary">Worm</span>
          </span>
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-2">
          {navLinks.map((link, idx) => (
            <li key={idx}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg font-bold transition-all ${
                    isActive
                      ? 'bg-primary text-primary-content shadow-md'
                      : 'hover:bg-primary/10 text-base-content/80 hover:text-primary'
                  }`
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      <div className="navbar-end flex items-center gap-2 md:gap-4">
        <button
          onClick={toggleTheme}
          className="btn btn-ghost btn-circle text-xl transition-transform hover:rotate-12"
        >
          {theme === 'light' ? (
            <FaMoon className="text-primary" />
          ) : (
            <FaSun className="text-accent" />
          )}
        </button>

        {user ? (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setOpen(!open)}
              className={`btn btn-ghost btn-circle avatar border-2 p-0.5 transition-all ${
                isAdmin
                  ? 'border-accent animate-pulse shadow-[0_0_10px_rgba(0,209,255,0.3)]'
                  : 'border-primary/30'
              }`}
            >
              <div className="w-10 rounded-full bg-base-300 overflow-hidden">
                <img
                  src={user?.photoURL || 'https://i.ibb.co/mR4tYpX/user.png'}
                  alt="Avatar"
                />
              </div>
            </button>

            {open && (
              <ul className="absolute right-0 mt-4 w-64 p-2 shadow-2xl rounded-2xl bg-base-100 border border-base-300 z-50 animate-in fade-in zoom-in duration-200">
                <li className="p-4 border-b border-base-300 mb-2 bg-base-200/50 rounded-t-xl">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-black truncate text-base-content">
                      {user?.displayName || 'Anonymous'}
                    </p>
                    {/* Admin Badge/Icon beside Name */}
                    {isAdmin && (
                      <div
                        className="tooltip tooltip-right"
                        data-tip="Admin Access"
                      >
                        <FaShieldAlt className="text-accent text-xs animate-pulse" />
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 mt-0.5">
                    <p className="text-[10px] text-base-content/60 truncate italic">
                      {user?.email}
                    </p>
                  </div>
                </li>

                {/* Conditional Admin Panel Route */}
                {isAdmin && (
                  <li>
                    <Link
                      to="/admin-dashboard"
                      className="flex items-center gap-3 p-3 text-accent hover:bg-accent/10 rounded-xl transition-colors text-sm font-bold"
                      onClick={() => setOpen(false)}
                    >
                      <FaShieldAlt /> Admin Panel
                    </Link>
                  </li>
                )}

                <li>
                  <Link
                    to="/profile"
                    className="flex items-center gap-3 p-3 hover:bg-primary/10 rounded-xl transition-colors text-sm font-bold"
                    onClick={() => setOpen(false)}
                  >
                    <FaUserEdit className="text-primary" /> Edit Profile
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 p-3 text-error hover:bg-error/10 rounded-xl transition-colors text-sm font-bold"
                  >
                    <FaSignOutAlt /> Sign Out
                  </button>
                </li>
              </ul>
            )}
          </div>
        ) : (
          <div className="hidden md:flex items-center gap-2">
            <Link
              to="/login"
              className="btn btn-ghost btn-sm font-bold lowercase"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="btn btn-primary btn-sm px-6 rounded-lg font-bold shadow-lg shadow-primary/20"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
