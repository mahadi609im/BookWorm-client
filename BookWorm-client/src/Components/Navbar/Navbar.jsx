import React, { useEffect, useRef, useState } from 'react';
import { NavLink, Link } from 'react-router';
import { FaMoon, FaSun } from 'react-icons/fa';

const Navbar = () => {
  // Ekhonkar moto user check bad dilam testing-er jonno
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

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
            <li className="border-t border-base-300 mt-2">
              <NavLink to="/login">Login</NavLink>
            </li>
            <li>
              <NavLink to="/register">Register</NavLink>
            </li>
          </ul>
        </div>

        <Link to="/" className="flex items-center group">
          <span className="font-serif font-black text-2xl text-primary tracking-tight">
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
                      ? 'bg-primary text-primary-content shadow-sm'
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

      <div className="navbar-end flex items-center gap-3">
        <button
          onClick={toggleTheme}
          className="btn btn-ghost btn-circle text-xl"
        >
          {theme === 'light' ? (
            <FaMoon className="text-primary" />
          ) : (
            <FaSun className="text-accent" />
          )}
        </button>

        {/* User profile dropdown - Always visible for UI testing */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setOpen(!open)}
            className="btn btn-ghost btn-circle avatar border-2 border-primary/20 p-0.5"
          >
            <div className="w-10 rounded-full">
              <img src="https://i.ibb.co/mR4tYpX/user.png" alt="Avatar" />
            </div>
          </button>
          {open && (
            <ul className="absolute right-0 mt-4 w-60 p-2 shadow-2xl rounded-xl bg-base-100 border border-base-300 z-50 animate-in fade-in zoom-in duration-200">
              <li className="p-4 border-b border-base-300">
                <p className="text-[10px] uppercase font-bold opacity-60">
                  Testing Mode
                </p>
                <p className="text-sm font-black truncate">Demo User</p>
              </li>
              <li>
                <Link
                  to="/admin-dashboard"
                  className="flex p-3 hover:bg-primary/10 rounded-lg"
                >
                  Admin Panel
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="flex p-3 text-error hover:bg-error/10 rounded-lg font-bold"
                >
                  Logout (Demo)
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
