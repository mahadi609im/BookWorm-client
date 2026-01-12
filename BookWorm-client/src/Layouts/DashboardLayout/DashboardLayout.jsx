import { Outlet, NavLink, Link } from 'react-router';

const DashBoardLayout = () => {
  const adminLinks = [
    { name: 'Admin Home', path: '/admin-dashboard' },
    { name: 'Manage Books', path: '/admin-dashboard/manage-books' },
    { name: 'Manage Genres', path: '/admin-dashboard/manage-genres' },
    { name: 'Manage Users', path: '/admin-dashboard/manage-users' },
    { name: 'Moderate Reviews', path: '/admin-dashboard/moderate-reviews' },
    { name: 'Manage Tutorials', path: '/admin-dashboard/manage-tutorials' },
  ];

  return (
    <div className="flex min-h-screen bg-base-200">
      {/* Sidebar */}
      <aside className="w-64 bg-base-100 border-r border-base-300 hidden md:block">
        <div className="p-6">
          <Link to="/" className="font-serif font-black text-2xl text-primary">
            Book<span className="text-secondary">Worm</span>
          </Link>
        </div>
        <ul className="menu p-4 gap-2">
          {adminLinks.map((link, idx) => (
            <li key={idx}>
              <NavLink
                to={link.path}
                end
                className={({ isActive }) =>
                  `font-bold p-3 rounded-xl transition-all ${
                    isActive
                      ? 'bg-primary text-white shadow-md'
                      : 'hover:bg-primary/10 text-base-content/70'
                  }`
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
          <div className="divider opacity-50"></div>
          <li>
            <Link
              to="/"
              className="hover:bg-error/10 text-error font-bold p-3 rounded-xl"
            >
              Back to Site
            </Link>
          </li>
        </ul>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10">
        {/* Mobile Navbar for Admin (Optional) */}
        <div className="md:hidden flex justify-between items-center mb-6">
          <Link to="/" className="font-serif font-bold text-xl text-primary">
            BookWorm
          </Link>
        </div>

        <div className="max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashBoardLayout;
