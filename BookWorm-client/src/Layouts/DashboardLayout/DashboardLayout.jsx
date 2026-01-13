import { Outlet, Link, useNavigate } from 'react-router';
import {
  FaSignOutAlt,
  FaMoon,
  FaSun,
  FaUserCircle,
  FaBars,
  FaShieldAlt,
} from 'react-icons/fa';
import { useState, useEffect, useContext } from 'react';
import MenuItems from '../../Components/MenuItems/MenuItems';
import { AuthContext } from '../../context/AuthContext'; // পাথ ঠিক আছে কিনা নিশ্চিত হয়ে নিন

const DashBoardLayout = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate('');
  const [isDark, setIsDark] = useState(
    localStorage.getItem('theme') === 'dark'
  );

  const isAdmin = user?.email === 'maha609im@gmail.com';

  useEffect(() => {
    const theme = isDark ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [isDark]);

  const handleLogout = () => {
    logoutUser()
      .then(() => {
        navigate('/');
      })
      .catch(error => console.log('Logout Error:', error));
  };

  return (
    <div className="drawer lg:drawer-open">
      <input id="admin-drawer" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex flex-col min-h-screen bg-base-200 font-sans transition-colors duration-300">
        {/* --- Updated Minimal Top Navbar --- */}
        <header className="h-20 bg-base-100 border-b border-base-300 px-4 md:px-10 flex items-center justify-between sticky top-0 z-30 transition-colors duration-300">
          {/* Mobile Menu Toggle & Brand */}
          <div className="flex items-center gap-2 lg:hidden">
            <label
              htmlFor="admin-drawer"
              className="btn btn-ghost btn-circle drawer-button"
            >
              <FaBars size={20} className="text-primary" />
            </label>
            <Link
              to="/"
              className="font-serif font-black text-xl text-primary tracking-tighter"
            >
              BW<span className="text-secondary">.</span>
            </Link>
          </div>

          {/* Desktop Dashboard Title */}
          <div className="hidden lg:block">
            <div className="flex items-center gap-2">
              <FaShieldAlt
                className={`text-accent ${isAdmin ? 'animate-pulse' : ''}`}
              />
              <h2 className="text-sm font-black text-base-content/40 uppercase tracking-[0.3em]">
                {isAdmin ? 'System Admin' : 'User Panel'}
              </h2>
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={() => setIsDark(!isDark)}
              className="btn btn-ghost btn-circle text-xl transition-all active:scale-90"
            >
              {isDark ? (
                <FaSun className="text-yellow-400" />
              ) : (
                <FaMoon className="text-primary" />
              )}
            </button>

            {/* Profile Dropdown - Names removed from outside */}
            <div className="dropdown dropdown-end">
              <label
                tabIndex={0}
                className="btn btn-ghost btn-circle avatar ring-2 ring-offset-base-100 ring-offset-2 transition-all hover:ring-primary overflow-hidden"
              >
                <div className="w-10 rounded-full">
                  <img
                    src={
                      user?.photoURL ||
                      `https://ui-avatars.com/api/?name=${
                        user?.displayName || 'User'
                      }&background=641ae6&color=fff`
                    }
                    alt="profile"
                  />
                </div>
              </label>

              <ul
                tabIndex={0}
                className="mt-4 z-[1] p-2 shadow-2xl menu menu-sm dropdown-content bg-base-100 rounded-2xl w-60 border border-base-200 animate-in fade-in zoom-in duration-200"
              >
                <li className="p-4 border-b border-base-200 mb-2 bg-base-200/40 rounded-t-xl">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-black text-base-content truncate max-w-[140px]">
                      {user?.displayName || 'Active User'}
                    </p>
                    {isAdmin && (
                      <FaShieldAlt className="text-accent text-[12px]" />
                    )}
                  </div>
                  <p className="text-[10px] text-base-content/50 truncate italic">
                    {user?.email}
                  </p>
                </li>

                <li>
                  <Link
                    to="/profile"
                    className="flex items-center gap-3 py-3 font-bold hover:text-primary transition-colors"
                  >
                    <FaUserCircle className="text-lg" /> View Profile
                  </Link>
                </li>

                <li>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 py-3 text-error font-black hover:bg-error/10 transition-colors"
                  >
                    <FaSignOutAlt className="text-lg" /> Logout Session
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </header>

        {/* --- Dynamic Content Area --- */}
        <main className="p-4 md:p-8 lg:p-10 flex-grow">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>

      {/* --- Sidebar --- */}
      <div className="drawer-side z-40">
        <label
          htmlFor="admin-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="w-72 min-h-full bg-base-100 border-r border-base-300 flex flex-col transition-colors duration-300">
          {/* Brand Logo Section */}
          <div className="p-8 border-b border-base-300">
            <Link to="/" className="flex items-center gap-2 group">
              <span className="font-serif font-black text-2xl text-primary tracking-tight">
                Books<span className="text-secondary">Worm</span>
              </span>
            </Link>
            <p className="text-[10px] font-bold text-base-content/30 uppercase tracking-widest mt-1 italic">
              Control Center
            </p>
          </div>

          <div className="flex-grow overflow-y-auto pt-4">
            <MenuItems />
          </div>

          {/* Sidebar Footer Logout */}
          <div className="p-4 mt-auto border-t border-base-300">
            <button
              onClick={handleLogout}
              className="group flex items-center justify-between w-full p-3 
               bg-base-200 hover:bg-error/10  cursor-pointer
               rounded-2xl transition-all duration-300 ease-in-out
               border border-transparent hover:border-error/20"
            >
              <div className="flex items-center gap-3">
                {/* আইকন বক্স */}
                <div
                  className="w-10 h-10 rounded-xl bg-base-100 flex items-center justify-center 
                    shadow-sm group-hover:bg-error group-hover:text-white 
                    transition-all duration-300"
                >
                  <FaSignOutAlt className="text-lg" />
                </div>

                {/* টেক্সট */}
                <div className="text-left">
                  <p className="text-xs font-black text-base-content group-hover:text-error transition-colors">
                    Sign Out
                  </p>
                  <p className="text-[10px] text-base-content/40 font-medium">
                    End current session
                  </p>
                </div>
              </div>

              {/* একটি ছোট অ্যারো যা হোভারে দেখা যাবে */}
              <div className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
                <svg
                  className="w-4 h-4 text-error"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoardLayout;
