import { Outlet, NavLink, Link } from 'react-router';
import {
  FaBook,
  FaUsers,
  FaStar,
  FaVideo,
  FaThLarge,
  FaTags,
  FaSignOutAlt,
  FaMoon,
  FaSun,
  FaUserCircle,
  FaBell,
  FaBars,
} from 'react-icons/fa';
import { useState, useEffect } from 'react';
import MenuItems from '../../Components/MenuItems/MenuItems';

const DashBoardLayout = () => {
  const [isDark, setIsDark] = useState(
    localStorage.getItem('theme') === 'dark'
  );

  useEffect(() => {
    const theme = isDark ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [isDark]);

  return (
    <div className="drawer lg:drawer-open">
      <input id="admin-drawer" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex flex-col min-h-screen bg-base-200 font-sans transition-colors duration-300">
        {/* --- Top Navbar --- */}
        <header className="h-20 bg-base-100 border-b border-base-300 px-4 md:px-10 flex items-center justify-between sticky top-0 z-30 transition-colors duration-300">
          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <label
              htmlFor="admin-drawer"
              className="btn btn-ghost btn-circle drawer-button lg:hidden"
            >
              <FaBars size={20} />
            </label>
            <Link to="/" className="font-serif font-black text-xl text-primary">
              BW
            </Link>
          </div>

          <div className="hidden md:block">
            <h2 className="text-sm font-black text-base-content/40 uppercase tracking-widest italic">
              System Dashboard
            </h2>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            {/* Theme Toggle */}
            <button
              onClick={() => setIsDark(!isDark)}
              className="btn btn-ghost btn-circle text-xl text-base-content/70"
            >
              {isDark ? (
                <FaSun className="text-yellow-400" />
              ) : (
                <FaMoon className="text-primary" />
              )}
            </button>

            {/* Notifications */}
            <div className="indicator hidden sm:flex">
              <span className="indicator-item badge badge-primary badge-xs"></span>
              <button className="btn btn-ghost btn-circle text-xl text-base-content/70">
                <FaBell />
              </button>
            </div>

            {/* Profile */}
            <div className="dropdown dropdown-end">
              <label
                tabIndex={0}
                className="btn btn-ghost gap-2 px-1 md:px-2 rounded-2xl hover:bg-base-200"
              >
                <div className="text-right hidden md:block">
                  <p className="text-xs font-black leading-none">Admin User</p>
                  <p className="text-[10px] font-medium text-base-content/50">
                    Admin
                  </p>
                </div>
                <div className="avatar">
                  <div className="w-9 md:w-10 rounded-xl ring ring-primary ring-offset-base-100 ring-offset-1">
                    <img
                      src="https://ui-avatars.com/api/?name=Admin+User&background=641ae6&color=fff"
                      alt="admin"
                    />
                  </div>
                </div>
              </label>
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow-2xl menu menu-sm dropdown-content bg-base-100 rounded-2xl w-52 border border-base-200"
              >
                <li>
                  <a>
                    <FaUserCircle /> Profile
                  </a>
                </li>
                <li className="divider my-1 opacity-50"></li>
                <li>
                  <a className="text-error font-bold">
                    <FaSignOutAlt /> Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </header>

        {/* --- Dynamic Content Area --- */}
        <main className="p-4 md:p-8 lg:p-10">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>

      {/* --- Sidebar for Large Screens & Drawer for Mobile --- */}
      <div className="drawer-side z-40">
        <label
          htmlFor="admin-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="w-72 min-h-full bg-base-100 border-r border-base-300 flex flex-col transition-colors duration-300">
          <MenuItems />
        </div>
      </div>
    </div>
  );
};

export default DashBoardLayout;
